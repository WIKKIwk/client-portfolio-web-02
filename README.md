This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Gallery Content

You can add portfolio content without changing code by editing the `public/aka/` folder.

Conventions:

- Each top-level folder inside `public/aka/` becomes one gallery group.
- Put one image named `base.*`, `aka.*`, `cover.*`, or `main.*` in that folder to use it as the cover image.
- Add any other images in the same folder or in nested folders; they will appear inside that group.
- Supported image types: `png`, `jpg`, `jpeg`, `webp`, `gif`, `avif`, `svg`.

Example:

```text
aka/
  project-1/
    base.webp
    1.webp
    2.webp
    extra/
      3.webp
  project-2/
    base.png
    a.png
    b.png
```

Because the app reads directly from `public/aka/`, new folders and images will show up after a refresh in development. In production, a rebuild is still required.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
