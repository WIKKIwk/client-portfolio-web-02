import Hero from "@/components/Hero";
import AnimatedIntro from "@/components/AnimatedIntro";
import CurvedLoop from "@/components/CurvedLoop";
import FadeInItem from "@/components/FadeInItem";
import ShinyText from "@/components/ShinyText";
import BlurText from "@/components/BlurText";
import PortfolioGrid from "@/components/PortfolioGrid";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import LightRays from "@/components/LightRays";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { getAkaGalleryGroups } from "@/lib/akaGallery";
import {
  contactPhones,
  portfolioProjects,
  seoKeywords,
  serviceOffers,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  telegramUrl,
} from "@/lib/seo";

const poppinsFont = Poppins({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: siteName,
      alternateName: ["Qadoqchi", "Qadoq dizayn", "Qadoqdizayn"],
      url: siteUrl,
      inLanguage: "uz",
      description: siteDescription,
      keywords: seoKeywords.join(", "),
      publisher: {
        "@id": `${siteUrl}/#business`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: siteTitle,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#business`,
      },
      mainEntity: [
        {
          "@id": `${siteUrl}/#service-catalog`,
        },
        {
          "@id": `${siteUrl}/#portfolio-list`,
        },
      ],
      primaryImageOfPage: {
        "@id": `${siteUrl}/#hero-image`,
      },
      inLanguage: "uz",
      description: siteDescription,
    },
    {
      "@type": "ImageObject",
      "@id": `${siteUrl}/#hero-image`,
      url: `${siteUrl}/gogo.webp`,
      caption: "Qadoqdizayn.uz qadoq dizayn portfolio sahifasi",
    },
    {
      "@type": ["ProfessionalService", "LocalBusiness"],
      "@id": `${siteUrl}/#business`,
      name: siteName,
      legalName: "Qadoqdizayn.uz",
      url: siteUrl,
      image: `${siteUrl}/logo.svg`,
      logo: `${siteUrl}/logo.svg`,
      description: siteDescription,
      slogan: "Dizayn orqali qadriyatni qadoqlayman.",
      priceRange: "$$",
      founder: {
        "@id": `${siteUrl}/#islombek-botirov`,
      },
      telephone: contactPhones,
      contactPoint: contactPhones.map((telephone) => ({
        "@type": "ContactPoint",
        telephone,
        contactType: "customer service",
        availableLanguage: ["uz"],
      })),
      areaServed: [
        {
          "@type": "Country",
          name: "Uzbekistan",
        },
        {
          "@type": "Place",
          name: "Toshkent",
        },
      ],
      sameAs: [telegramUrl],
      knowsAbout: seoKeywords,
      hasOfferCatalog: {
        "@id": `${siteUrl}/#service-catalog`,
      },
      makesOffer: serviceOffers.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          ...service,
          provider: {
            "@id": `${siteUrl}/#business`,
          },
        },
      })),
    },
    {
      "@type": "OfferCatalog",
      "@id": `${siteUrl}/#service-catalog`,
      name: "Qadoq dizayn va package design xizmatlari",
      itemListElement: serviceOffers.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          "@id": `${siteUrl}/#service-${index + 1}`,
          ...service,
          provider: {
            "@id": `${siteUrl}/#business`,
          },
          areaServed: {
            "@type": "Country",
            name: "Uzbekistan",
          },
        },
      })),
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#portfolio-list`,
      name: "Qadoq dizayn portfolio",
      description:
        "Qadoqdizayn.uz portfolio bo'limidagi package design va qadoq dizayn ishlari.",
      itemListElement: portfolioProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          "@id": `${siteUrl}/#${project.id}`,
          name: project.name,
          image: project.image,
          creator: {
            "@id": `${siteUrl}/#islombek-botirov`,
          },
          about: ["Qadoq dizayn", "Package design", "Packaging design"],
        },
      })),
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#islombek-botirov`,
      name: "Islombek Botirov",
      jobTitle: "Qadoq dizayner",
      url: siteUrl,
      worksFor: {
        "@id": `${siteUrl}/#business`,
      },
      sameAs: [telegramUrl],
      knowsAbout: [
        "Qadoq dizayn",
        "Package design",
        "Packaging design",
        "Poligrafik dizayn",
        "Rebranding",
        "Mockup tayyorlash",
        "Premium packaging",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Qadoqdizayn.uz",
          item: siteUrl,
        },
      ],
    },
  ],
};

export default async function Home() {
  const akaGroups = await getAkaGalleryGroups();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ScrollToTopButton />
      <main className="relative min-h-screen bg-black text-white selection:bg-white/30 flex flex-col items-center">
      <div id="asoschi" className="w-full">
        <Hero />
        <AnimatedIntro />
      </div>

      <div className="theme-light-strip relative w-full bg-black min-h-[80vh] md:min-h-[100vh] flex flex-col items-center justify-start overflow-hidden pt-0 md:pt-4">
        {/* Yuqori qismdagi CurvedLoop */}
        <div
          className="w-full relative h-[120px] md:h-[200px] pointer-events-auto -mt-8 md:-mt-12"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
          }}
        >
          <CurvedLoop
            marqueeText="REBRANDING ✦ QADOQ DIZAYN ✦ POLIGRAFIK DIZAYN ✦ INDUVIDUAL YONDASHUV ✦ BOZOR TAHLILI ✦ "
            speed={0.6}
            curveAmount={0}
            pathY={93}
            className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-[0.15em] fill-current"
          />
        </div>

        {/* Matnli qism rasmlardan oldin olib tashlandi */}

        {/* Bog'lanish qismi (Portfolio rasmlari oldiga ko'chirildi) */}
        <div className="w-full max-w-[1920px] relative z-10 pt-8 md:pt-12 pb-20 px-6 md:px-12 lg:px-24 flex flex-col items-start justify-start text-left border-t border-white/5 mt-0">
          <FadeInItem delay={0.2}>
            <div className="w-full flex flex-col items-start w-full max-w-7xl">
              <div className="w-full flex flex-col xl:flex-row justify-between items-start xl:items-center gap-16 xl:gap-32 w-full">
                {/* Chap tomon: 3 ta qatorli gap */}
                <div className={`text-gray-200 font-light text-2xl md:text-3xl lg:text-4xl leading-[1.3] md:leading-[1.4] lg:leading-[1.4] flex flex-col gap-4 md:gap-6 mb-16 xl:mb-0 max-w-3xl ${poppinsFont.className}`}>
                  <div className="w-full relative">
                    <BlurText
                      text="Har bir qadoq oddiy mahsulot emas, balki brend hikoyasining bir qismi."
                      delay={20}
                      animateBy="words"
                      direction="top"
                    />
                  </div>
                  <div className="w-full relative">
                    <BlurText
                      text="100 dan ortiq loyihalarda shakl, rang va tuyg‘ularni uyg‘unlashtirganman."
                      initialDelay={200}
                      delay={20}
                      animateBy="words"
                      direction="top"
                    />
                  </div>
                  <div className="w-full relative text-white">
                    <BlurText
                      text="Qadoq dizayningizdagi muammolarga birgalikda yechim topamiz."
                      initialDelay={400}
                      delay={20}
                      animateBy="words"
                      direction="top"
                    />
                  </div>
                </div>

                {/* O'ng tomon: Katta Statistika */}
                <div className={`flex flex-col items-center shrink-0 border-l-0 xl:border-l border-white/10 pl-0 xl:pl-16 pb-8 xl:pb-0 ${poppinsFont.className}`}>
                  <div className="theme-stat-block flex flex-col items-center text-center mb-10 xl:mb-16">
                    <span className="theme-stat-number text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-wider mb-2 flex items-center justify-center">
                      <AnimatedCounter targetValue={100} fontSize={60} places={[100, 10, 1]} fontWeight="700" />
                      <span className="ml-1 md:ml-2">+</span>
                    </span>
                    <span className={`text-xs md:text-sm text-gray-500 tracking-[0.2em] ${poppinsFont.className}`}>Muvaffaqiyatli loyihalar</span>
                  </div>
                  <div className="theme-stat-block flex flex-col items-center text-center">
                    <span className="theme-stat-number text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-wider mb-2 flex items-center justify-center">
                      <AnimatedCounter targetValue={6} fontSize={60} places={[1]} fontWeight="700" />
                    </span>
                    <span className={`text-xs md:text-sm text-gray-500 tracking-[0.2em] ${poppinsFont.className}`}>Yillik amaliy tajriba</span>
                  </div>
                </div>
              </div>

            </div>
          </FadeInItem>
        </div>

        {/* Portfolio Rasmlari Gird'i */}
        <PortfolioGrid akaGroups={akaGroups} />
      </div>

      {/* Takliflar + Footer wrapper: SVG shu ikki qismni qamrab oladi */}
      <div className="relative w-full">
        {/* Chap tomondagi vertikal chiziq — takliflardan logoga qadar */}
        <div className="theme-vertical-lines-top-wrap absolute left-[1%] md:left-[3%] lg:left-[4%] top-[150px] md:top-[180px] lg:top-[200px] bottom-[140px] md:bottom-[180px] lg:bottom-[200px] w-[120px] md:w-[180px] lg:w-[220px] opacity-60 pointer-events-none z-[30] hidden md:block">
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Безымянный-3.svg`}
            alt="Vertical Lines"
            fill
            className="theme-vertical-lines theme-vertical-lines-top object-cover object-left-top"
          />
        </div>

        {/* LightRays — viewport o'ng devorga yopishgan */}
        <div
          className="absolute top-0 right-0 w-[70vw] h-full pointer-events-none z-[2]"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
          }}
        >
          <LightRays
            raysOrigin="right"
            raysColor="#ffffff"
            raysSpeed={0.5}
            lightSpread={2.2}
            rayLength={2.5}
            fadeDistance={1.2}
            followMouse={true}
            mouseInfluence={0.06}
          />
        </div>

        {/* Hizmatlar/Takliflar haqida ma'lumot qismi */}
        <div id="takliflar" className={`theme-light-panel relative w-full max-w-7xl mx-auto py-16 md:py-24 px-6 md:px-12 flex flex-col gap-12 text-gray-300 ${poppinsFont.className}`}>
          {/* Sarlavha: Takliflar */}
          <div className="w-full text-left pl-0 md:pl-32 lg:pl-40 md:pb-4 border-b border-white/5 pb-6 relative z-[35]">
            <FadeInItem delay={0.1}>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-[0.1em] text-white">
                <ShinyText
                  text="TAKLIFLAR"
                  disabled={false}
                  speed={3}
                  className="shiny-text uppercase"
                />
              </h2>
            </FadeInItem>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-16 relative z-[35] w-full pl-0 md:pl-32 lg:pl-40">
            {/* Chap tomon: Matnlar */}
            <div className="flex flex-col gap-8 w-full lg:w-[60%] xl:w-[65%]">
              <FadeInItem delay={0.1}>
                <div className="flex flex-col gap-2">
                  <BlurText
                    text="- Individuallashgan qadoqlash dizayni"
                    delay={20}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-white font-medium inline-block"
                  />
                  <BlurText
                    text="Brendingiz xarakteriga mos, 100% noyob va professional qadoqlash dizaynlarini ishlab chiqamiz. Minimalistik, premium yoki o'ziga xos kreativ yechimlar - tanlov sizniki."
                    delay={10}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl font-light leading-relaxed pl-5 inline-block"
                  />
                </div>
              </FadeInItem>

              <FadeInItem delay={0.2}>
                <div className="flex flex-col gap-2">
                  <BlurText
                    text="- Mahsulotni sotadigan vizual identitet"
                    delay={20}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-white font-medium inline-block"
                  />
                  <BlurText
                    text="Mahsuloting polkada ajralib turishi uchun ko'zga yoqimli, savdo konversiyasini oshiradigan dizayn konsepsiyalarini yaratamiz."
                    delay={10}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl font-light leading-relaxed pl-5 inline-block"
                  />
                </div>
              </FadeInItem>

              <FadeInItem delay={0.3}>
                <div className="flex flex-col gap-2">
                  <BlurText
                    text="- Premium & luxury packaging"
                    delay={20}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-white font-medium inline-block"
                  />
                  <BlurText
                    text="Gold-foil, emboss, deboss, mat/soft-touch kabi premium effektlarga mos ekskluziv dizaynlar."
                    delay={10}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl font-light leading-relaxed pl-5 inline-block"
                  />
                </div>
              </FadeInItem>

              <FadeInItem delay={0.4}>
                <div className="flex flex-col gap-2">
                  <BlurText
                    text="- Tezkor dizayn xizmati"
                    delay={20}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-white font-medium inline-block"
                  />
                  <BlurText
                    text="Shoshilinch loyihalar uchun 24-48 soatda sifatli dizayn tayyorlab berish xizmati."
                    delay={10}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl font-light leading-relaxed pl-5 inline-block"
                  />
                </div>
              </FadeInItem>

              <FadeInItem delay={0.5}>
                <div className="flex flex-col gap-2">
                  <BlurText
                    text="- Qadoqlash strukturasi va mockup tayyorlash"
                    delay={20}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-white font-medium inline-block"
                  />
                  <BlurText
                    text="Nafaqat dizayn, balki qadoq shakli, o'lcham variantlari hamda fotorealistik 3D mockup yaratish."
                    delay={10}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl font-light leading-relaxed pl-5 inline-block"
                  />
                </div>
              </FadeInItem>

              <FadeInItem delay={0.6}>
                <div className="flex flex-col gap-2">
                  <BlurText
                    text="- Brend stiliga mos kompleks qadoqlash"
                    delay={20}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-white font-medium inline-block"
                  />
                  <BlurText
                    text="Mahsulot liniyangiz uchun yagona uslubda- quti, paket, yorliq, stiker, sleeve va boshqalar bo'yicha to'liq set."
                    delay={10}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl font-light leading-relaxed pl-5 inline-block"
                  />
                </div>
              </FadeInItem>

              <FadeInItem delay={0.7}>
                <div className="flex flex-col gap-2">
                  <BlurText
                    text="- Eksport bozorlariga mos dizayn"
                    delay={20}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-white font-medium inline-block"
                  />
                  <BlurText
                    text="Xalqaro talablar, til variantlari va eksport standartlariga moslashtirilgan dizaynlar."
                    delay={10}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl font-light leading-relaxed pl-5 inline-block"
                  />
                </div>
              </FadeInItem>

              <FadeInItem delay={0.8}>
                <div className="flex flex-col gap-2">
                  <BlurText
                    text="- Qadoqlashni yangilash (rebranding)"
                    delay={20}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-white font-medium inline-block"
                  />
                  <BlurText
                    text="Mavjud qadoqlashingizni modern uslubda qayta ishlash va sotuv samaradorligini oshirish."
                    delay={10}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl font-light leading-relaxed pl-5 inline-block"
                  />
                </div>
              </FadeInItem>

              <FadeInItem delay={0.9}>
                <div className="flex flex-col gap-2">
                  <BlurText
                    text="- Raqobatchilar tahlili + yechim"
                    delay={20}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl text-white font-medium inline-block"
                  />
                  <BlurText
                    text="Bozordagi raqiblar dizaynini tahlil qilib, sizni ajratib turadigan yuqori samarali dizayn konsepsiyasi."
                    delay={10}
                    animateBy="words"
                    direction="top"
                    className="text-lg md:text-xl font-light leading-relaxed pl-5 inline-block"
                  />
                </div>
              </FadeInItem>
            </div>

            {/* O'ng tomon: Rasm + LightRays */}
            <div className="w-full lg:w-[40%] xl:w-[35%] flex items-start justify-center relative">
              <FadeInItem delay={0.4}>
                <div className="relative w-full flex justify-center lg:justify-end">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Pasted image.png`}
                    alt="Qadoqlash Ustasi"
                    title="Qadoqchi"
                    width={500}
                    height={500}
                    className="w-full max-w-[150px] md:max-w-[180px] lg:max-w-[200px] xl:max-w-[230px] h-auto object-contain drop-shadow-2xl relative z-10"
                  />
                </div>
              </FadeInItem>
            </div>
          </div>
        </div>

        {/* Eng pastki qism - Kulrang konda (Footer) */}
        <div id="boglanish" className="w-full h-[140px] md:h-[180px] lg:h-[200px] bg-[#1a1a1a] relative z-20 flex items-center justify-center">
          <div className="theme-vertical-lines-bottom-wrap absolute left-[1%] md:left-[3%] lg:left-[4%] top-0 bottom-0 w-[120px] md:w-[180px] lg:w-[220px] opacity-70 pointer-events-none z-[31] hidden md:block">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/Безымянный-3.svg`}
              alt="Vertical Lines Bottom"
              fill
              className="theme-vertical-lines-bottom object-cover object-left-top"
            />
          </div>

          {/* Chap tomon: Logo (Absolute holatda) */}
          <div className="absolute left-[18%] md:left-[21%] lg:left-[23%] top-1/2 transform -translate-y-1/2 z-10 hidden md:flex">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.svg`}
              alt="Logo"
              width={160}
              height={80}
              className="w-28 md:w-40 lg:w-48 opacity-80"
            />
          </div>

          {/* O'ng tomon: Kontaktlar */}
          <div className="theme-contact-block flex flex-col items-center justify-center gap-3 md:gap-4 z-10 relative ml-16 md:ml-28 lg:ml-[152px]">
            <div className="flex flex-col items-center gap-1 text-white font-medium text-lg md:text-2xl lg:text-4xl tracking-wide font-sans leading-tight">
              <a href="tel:+998913514261" className="hover:text-gray-300 transition-colors inline-block">+99891 351-42-61</a>
              <a href="tel:+998949024261" className="hover:text-gray-300 transition-colors inline-block">+99894 902-42-61</a>
            </div>

            <div className="flex items-center justify-center gap-6 md:gap-10 text-[#888888] font-medium text-[10px] md:text-sm lg:text-base tracking-[0.05em] mt-1 md:mt-2">
              <a href="https://t.me/lslombek" target="_blank" className="hover:text-white transition-colors">Telegram</a>
              <a href="#" target="_blank" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" target="_blank" className="hover:text-white transition-colors">Behance</a>
            </div>
          </div>
        </div>

        {/* Imzo — hamma narsadan ustida (wrapper darajasida) */}
        <div className="absolute bottom-0 right-0 w-full h-[1000px] overflow-hidden pointer-events-none z-[9999]">
          <div className="absolute -bottom-10 -right-20 md:-bottom-20 md:-right-32 lg:-bottom-28 lg:-right-48 opacity-100 transform -rotate-12">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/qol.svg`}
              alt="Qo'l"
              width={700}
              height={700}
              className="w-[230px] md:w-[380px] lg:w-[620px] xl:w-[700px] object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>
      </main>
    </>
  );
}
