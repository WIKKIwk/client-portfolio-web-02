import { readdir } from "node:fs/promises";
import path from "node:path";
import type { GalleryGroup } from "@/lib/galleryTypes";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif", ".svg"]);
const COVER_NAME_ALIASES = new Set(["base", "aka", "cover", "main"]);

function naturalSort(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

type ImageEntry = {
  relativePath: string;
  fileName: string;
  depth: number;
};

function isImageFile(fileName: string) {
  return IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase());
}

async function collectImageEntries(folderPath: string, relativeFolder = "", depth = 0): Promise<ImageEntry[]> {
  const entries = await readdir(folderPath, { withFileTypes: true });
  const sortedEntries = entries.sort((a, b) => naturalSort(a.name, b.name));

  const collected = await Promise.all(sortedEntries.map(async (entry) => {
    const absolutePath = path.join(folderPath, entry.name);
    const relativePath = relativeFolder ? path.posix.join(relativeFolder, entry.name) : entry.name;

    if (entry.isDirectory()) {
      return collectImageEntries(absolutePath, relativePath, depth + 1);
    }

    if (!entry.isFile() || !isImageFile(entry.name)) {
      return [];
    }

    return [{
      relativePath: `/aka/${relativePath.split(path.sep).join("/")}`,
      fileName: entry.name,
      depth,
    }];
  }));

  return collected.flat().sort((a, b) => naturalSort(a.relativePath, b.relativePath));
}

function pickCover(entries: ImageEntry[]) {
  const rootCover = entries.find((entry) => {
    const stem = path.parse(entry.fileName).name.toLowerCase();
    return entry.depth === 0 && COVER_NAME_ALIASES.has(stem);
  });
  if (rootCover) return rootCover.relativePath;

  const nestedCover = entries.find((entry) => COVER_NAME_ALIASES.has(path.parse(entry.fileName).name.toLowerCase()));
  if (nestedCover) return nestedCover.relativePath;

  return entries[0]?.relativePath;
}

async function readFolder(folderPath: string, folderName: string): Promise<GalleryGroup | null> {
  const entries = await collectImageEntries(folderPath, folderName);

  if (entries.length === 0) {
    return null;
  }

  const cover = pickCover(entries);
  const images = [cover, ...entries.map((entry) => entry.relativePath).filter((relativePath) => relativePath !== cover)];

  return {
    id: `aka-${folderName}`,
    label: `Aka ${folderName}`,
    cover,
    images,
  };
}

export async function getAkaGalleryGroups(): Promise<GalleryGroup[]> {
  const sourceRoot = path.resolve(process.cwd(), "public", "aka");

  try {
    const entries = await readdir(sourceRoot, { withFileTypes: true });
    const folders = entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort(naturalSort);

    const groups = await Promise.all(
      folders.map((folderName) => readFolder(path.join(sourceRoot, folderName), folderName)),
    );

    return groups.filter((group): group is GalleryGroup => Boolean(group));
  } catch {
    return [];
  }
}
