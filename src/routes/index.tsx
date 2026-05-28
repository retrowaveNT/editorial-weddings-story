import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import JSZip from "jszip";

import hero from "@/assets/photos/hero-main.jpg";
import brideMorning1 from "@/assets/photos/bride-morning-01.jpg";
import brideMorning2 from "@/assets/photos/bride-morning-02.jpg";
import brideMorning3 from "@/assets/photos/bride-morning-03.jpg";
import brideMorning4 from "@/assets/photos/bride-morning-04.jpg";
import groomMorning1 from "@/assets/photos/groom-morning-01.jpg";
import groomMorning2 from "@/assets/photos/groom-morning-02.jpg";
import groomMorning3 from "@/assets/photos/groom-morning-03.jpg";
import groomMorning4 from "@/assets/photos/groom-morning-04.jpg";
import ceremony1 from "@/assets/photos/ceremony-01.jpg";
import ceremony2 from "@/assets/photos/ceremony-02.jpg";
import ceremony3 from "@/assets/photos/ceremony-03.jpg";
import ceremony4 from "@/assets/photos/ceremony-04.jpg";
import walk1 from "@/assets/photos/walk-01.jpg";
import walk2 from "@/assets/photos/walk-02.jpg";
import walk3 from "@/assets/photos/walk-03.jpg";
import walk4 from "@/assets/photos/walk-04.jpg";
import banquet1 from "@/assets/photos/banquet-01.jpg";
import banquet2 from "@/assets/photos/banquet-02.jpg";
import banquet3 from "@/assets/photos/banquet-03.jpg";
import banquet4 from "@/assets/photos/banquet-04.jpg";
import party1 from "@/assets/photos/party-01.jpg";
import party2 from "@/assets/photos/party-02.jpg";
import party3 from "@/assets/photos/party-03.jpg";
import party4 from "@/assets/photos/party-04.jpg";
import silent1 from "@/assets/photos/silent-01.jpg";
import silent2 from "@/assets/photos/silent-02.jpg";
import silent3 from "@/assets/photos/silent-03.jpg";
import silent4 from "@/assets/photos/silent-04.jpg";
import thankYou from "@/assets/photos/thank-you-01.jpg";
import story1 from "@/assets/photos/story-01.jpg";
import story2 from "@/assets/photos/story-02.jpg";
import story3 from "@/assets/photos/story-03.jpg";
import story4 from "@/assets/photos/story-04.jpg";
import story5 from "@/assets/photos/story-05.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A & D — Наш день. Наша история" },
      {
        name: "description",
        content:
          "Редакция нашего свадебного дня — 20 августа 2026. Фотографии, видео, история и пожелания, собранные в одной коллекции.",
      },
      { property: "og:title", content: "A & D — Наш день. Наша история" },
      {
        property: "og:description",
        content:
          "Эксклюзивная цифровая редакция нашей свадьбы. Бережно собранные моменты.",
      },
      { property: "og:image", content: hero },
    ],
  }),
  component: WeddingMagazine,
});

/* --------------------------------- helpers -------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(24px)",
        transition:
          "opacity 1.1s cubic-bezier(0.2,0.7,0.2,1), transform 1.1s cubic-bezier(0.2,0.7,0.2,1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Comp>
  );
}

/* --------------------------------- data ----------------------------------- */

const navItems = [
  { id: "story", label: "История" },
  { id: "day", label: "День свадьбы" },
  { id: "photo", label: "Фото" },
  { id: "video", label: "Видео" },
  { id: "wishes", label: "Пожелания" },
  { id: "guests", label: "Для гостей" },
];

const storyTimeline = [
  {
    year: "2019",
    title: "Первая встреча",
    text: "Случайный вечер, который оказался не случайным.",
    glyph: "I",
    image: story1,
  },
  {
    year: "2020",
    title: "Начало отношений",
    text: "Тихое да, сказанное между строк.",
    glyph: "II",
    image: story2,
  },
  {
    year: "2022",
    title: "Путешествия",
    text: "Лиссабон, Прага, Амальфи. Мир — наш альбом.",
    glyph: "III",
    image: story3,
  },
  {
    year: "2025",
    title: "Предложение",
    text: "Зимний вечер. Свеча. Кольцо. Слёзы.",
    glyph: "IV",
    image: story4,
  },
  {
    year: "2026",
    title: "Наша свадьба",
    text: "День, который мы будем рассказывать всю жизнь.",
    glyph: "V",
    image: story5,
  },
];

type Stage = {
  id: string;
  number: string;
  title: string;
  time: string;
  description: string;
  count: string;
  images: { src: string; alt: string; tall?: boolean; wide?: boolean }[];
};

const stages: Stage[] = [
  {
    id: "morning",
    number: "01",
    title: "Утро невесты",
    time: "09:00 — 11:00",
    description:
      "Нежное утро, наполненное волнением и самыми тёплыми моментами.",
    count: "45 фото",
    images: [
      { src: brideMorning1, alt: "Утро невесты", tall: true },
      { src: brideMorning2, alt: "Деталь" },
      { src: brideMorning3, alt: "Сборы" },
      { src: brideMorning4, alt: "Портрет невесты", tall: true },
    ],
  },
  {
    id: "groom",
    number: "02",
    title: "Сборы жениха",
    time: "10:00 — 11:30",
    description:
      "Спокойствие, сосредоточенность и едва уловимая улыбка перед самым важным днём.",
    count: "28 фото",
    images: [
      { src: groomMorning1, alt: "Сборы жениха", tall: true },
      { src: groomMorning2, alt: "Деталь костюма" },
      { src: groomMorning3, alt: "Момент" },
      { src: groomMorning4, alt: "Портрет", tall: true },
    ],
  },
  {
    id: "ceremony",
    number: "03",
    title: "Церемония",
    time: "13:00 — 14:30",
    description:
      "Слова, которые останутся с нами навсегда. Тишина, заполненная любовью.",
    count: "72 фото",
    images: [
      { src: ceremony1, alt: "Церемония", wide: true },
      { src: ceremony2, alt: "Гости" },
      { src: ceremony3, alt: "Эмоция", tall: true },
      { src: ceremony4, alt: "Кольца" },
    ],
  },
  {
    id: "walk",
    number: "04",
    title: "Прогулка",
    time: "15:00 — 17:30",
    description: "Закат, поле, ветер в волосах и наш первый общий вечер.",
    count: "56 фото",
    images: [
      { src: walk1, alt: "Прогулка", tall: true },
      { src: walk2, alt: "Закат", wide: true },
      { src: walk3, alt: "Силуэты" },
      { src: walk4, alt: "Поле", tall: true },
    ],
  },
  {
    id: "banquet",
    number: "05",
    title: "Банкет",
    time: "18:00 — 21:00",
    description:
      "Слова близких, бокалы шампанского и сотни маленьких поводов улыбаться.",
    count: "94 фото",
    images: [
      { src: banquet1, alt: "Банкет", wide: true },
      { src: banquet2, alt: "Сервировка" },
      { src: banquet3, alt: "Гости", tall: true },
      { src: banquet4, alt: "Деталь" },
    ],
  },
  {
    id: "party",
    number: "06",
    title: "Вечеринка",
    time: "21:00 — 02:00",
    description: "Первый танец, музыка до утра и наши люди вокруг.",
    count: "118 фото",
    images: [
      { src: party1, alt: "Вечеринка", wide: true },
      { src: party2, alt: "Танцпол", tall: true },
      { src: party3, alt: "Свет" },
      { src: party4, alt: "Финал ночи" },
    ],
  },
];

const wishes = [
  {
    name: "Мария К.",
    date: "21 августа 2026",
    text: "Это был один из самых красивых дней, что я видела. Любви вам долгой и тихой.",
    initial: "М",
  },
  {
    name: "Игорь и Аня",
    date: "22 августа 2026",
    text: "Ваш вечер был как кадр из фильма. Спасибо, что позвали нас внутрь.",
    initial: "И",
  },
  {
    name: "Елена В.",
    date: "23 августа 2026",
    text: "Никогда не забуду, как вы смотрели друг на друга у алтаря. Это и есть всё.",
    initial: "Е",
  },
  {
    name: "Дмитрий П.",
    date: "25 августа 2026",
    text: "Пусть каждое утро будет таким же светлым, как утро этой свадьбы.",
    initial: "Д",
  },
];

/* -------------------------------- component ------------------------------- */

function WeddingMagazine() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans">
      <TopBar />
      <Hero />
      <Marquee />
      <Story />
      <WeddingDay />
      <FeaturedSpread />
      <Video />
      <Wishes />
      <Guests />
      <ThankYou />
      <Footer />
    </main>
  );
}

/* --------------------------------- TopBar --------------------------------- */

function TopBar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-4 flex items-center justify-between">
        <a href="#top" className="display text-xl tracking-[0.3em]">
          A&nbsp;·&nbsp;D
        </a>

        <nav className="hidden lg:flex items-center gap-9 text-[11px] uppercase tracking-[0.28em] text-foreground/80">
          {navItems.map((i) => (
            <a key={i.id} href={`#${i.id}`} className="editorial-link">
              {i.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#guests"
            className="hidden sm:inline-flex items-center gap-2 border border-foreground/80 px-4 py-2 text-[10px] uppercase tracking-[0.28em] hover:bg-foreground hover:text-background transition-colors duration-500"
          >
            Скачать все фото
          </a>
          <button
            aria-label="Меню"
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
          >
            <span
              className={`block h-px w-5 bg-foreground transition-transform duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-foreground transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* mobile nav */}
      <div
        className={`lg:hidden overflow-hidden border-t border-border/60 transition-[max-height,opacity] duration-700 ease-out ${
          open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-5 py-8 flex flex-col gap-5">
          {navItems.map((i, idx) => (
            <a
              key={i.id}
              href={`#${i.id}`}
              onClick={() => setOpen(false)}
              className="display text-3xl tracking-tight"
            >
              <span className="eyebrow mr-3 align-middle">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {i.label}
            </a>
          ))}
          <a
            href="#guests"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center gap-2 border border-foreground/80 px-4 py-3 text-[10px] uppercase tracking-[0.28em] w-fit"
          >
            Скачать все фото
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------------------------------- Hero ---------------------------------- */

function Hero() {
  return (
    <section id="top" className="relative pt-[88px]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-6 pb-2">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.32em] text-bronze">
          <span>Vol. I — Issue 01</span>
          <span className="hidden sm:inline">A Private Edition</span>
          <span>2026</span>
        </div>
        <div className="hairline mt-4" />
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 pt-8 md:pt-12 grid md:grid-cols-12 gap-8 md:gap-12">
        {/* Headline */}
        <div className="md:col-span-6 md:pt-8 order-2 md:order-1">
          <Reveal>
            <p className="eyebrow mb-6">20 августа · 2026</p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="display text-[15vw] sm:text-[10vw] md:text-[7.4vw] leading-[0.92]">
              Наш день.
              <br />
              <em className="not-italic">Наша</em>
              <br />
              <span className="italic font-light">история</span>
              <span className="text-gold">.</span>
            </h1>
          </Reveal>

          <Reveal delay={260}>
            <div className="mt-10 max-w-md">
              <p className="text-base leading-relaxed text-foreground/75">
                Спасибо, что были с нами в этот незабываемый день и разделили
                наше счастье. Эта страница — наш способ сохранить его
                полностью.
              </p>
            </div>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#video"
                className="group inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-bronze transition-colors duration-500"
              >
                <span className="w-2 h-2 rounded-full bg-background group-hover:scale-150 transition-transform duration-500" />
                Смотреть тизер
              </a>
              <a
                href="#story"
                className="editorial-link text-[11px] uppercase tracking-[0.3em] text-foreground/80"
              >
                Читать историю →
              </a>
            </div>
          </Reveal>
        </div>

        {/* Image */}
        <div className="md:col-span-6 order-1 md:order-2 relative">
          <Reveal>
            <figure className="relative overflow-hidden">
              <img
                src={hero}
                alt="A & D — день свадьбы"
                width={1280}
                height={1600}
                className="w-full h-[68vh] md:h-[82vh] object-cover anim-ken"
              />
              <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-background mix-blend-difference text-[10px] uppercase tracking-[0.3em]">
                <span>Pl. 01 — Portrait</span>
                <span>A &amp; D</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={420}>
            <div className="hidden md:flex absolute -left-6 top-10 -rotate-90 origin-top-left items-center gap-3 text-[10px] uppercase tracking-[0.4em] text-bronze">
              <span className="w-10 h-px bg-bronze" />
              The Wedding Edition
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 md:px-10 mt-10">
        <div className="hairline" />
        <div className="flex items-center justify-between py-4 text-[10px] uppercase tracking-[0.32em] text-foreground/60">
          <span>Anna &amp; Daniel</span>
          <span className="hidden md:inline">Photographed by The Studio</span>
          <span>↓ Scroll</span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Marquee --------------------------------- */

function Marquee() {
  const items = [
    "Любовь",
    "Свет",
    "Молчание",
    "Танец",
    "Шампанское",
    "Поле",
    "Слёзы",
    "Смех",
    "Кольца",
    "Навсегда",
  ];
  return (
    <section aria-hidden className="overflow-hidden border-y border-border/60 py-6 bg-card/40">
      <div className="flex gap-12 whitespace-nowrap animate-[marquee_44s_linear_infinite]">
        {[...items, ...items, ...items].map((w, i) => (
          <span
            key={i}
            className="display text-3xl md:text-5xl italic text-foreground/70"
          >
            {w}
            <span className="mx-8 text-gold not-italic">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-33.333%)} }`}</style>
    </section>
  );
}

/* --------------------------------- Story ---------------------------------- */

function Story() {
  return (
    <section id="story" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-16 md:mb-24">
          <div className="md:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6">Глава I</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display text-6xl md:text-[8vw] leading-[0.9]">
                Наша
                <br />
                <span className="italic">история</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={200}>
              <p className="text-foreground/70 leading-relaxed">
                Пять остановок, одна траектория. Каждая глава — небольшой
                фрагмент того, как мы оказались здесь, под одной фамилией.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="flex flex-col gap-20 md:gap-32">
          {storyTimeline.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={m.year}
                className="grid md:grid-cols-12 gap-8 md:gap-14 items-center"
              >
                <Reveal
                  delay={80}
                  className={`md:col-span-6 ${right ? "md:order-2" : ""}`}
                >
                  <figure className="relative overflow-hidden bg-secondary">
                    <img
                      src={m.image}
                      alt={m.title}
                      loading="lazy"
                      className="w-full aspect-[4/5] object-cover anim-ken"
                    />
                    <figcaption className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.3em] text-background mix-blend-difference">
                      Кадр {m.glyph} · {m.year}
                    </figcaption>
                  </figure>
                </Reveal>

                <div
                  className={`md:col-span-5 ${
                    right
                      ? "md:order-1 md:col-start-1 md:text-right md:pr-6"
                      : "md:col-start-8 md:pl-6"
                  }`}
                >
                  <Reveal delay={i * 80}>
                    <p className="eyebrow mb-4">
                      <span className="text-foreground/40 mr-3">{m.glyph}</span>
                      {m.year}
                    </p>
                    <h3 className="display text-4xl md:text-6xl mb-5 leading-[0.95]">
                      {m.title}
                    </h3>
                    <div
                      className={`gold-line w-16 mb-6 ${right ? "md:ml-auto" : ""}`}
                    />
                    <p className="text-foreground/75 leading-relaxed max-w-md md:inline-block">
                      {m.text}
                    </p>
                  </Reveal>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------- WeddingDay ------------------------------- */

function WeddingDay() {
  const [active, setActive] = useState(stages[0].id);
  const stage = stages.find((s) => s.id === active)!;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + stage.images.length) % stage.images.length
    );
  const showNext = () =>
    setLightboxIndex((i) =>
      i === null ? i : (i + 1) % stage.images.length
    );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, stage.id]);

  const downloadStage = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const zip = new JSZip();
      await Promise.all(
        stage.images.map(async (img, i) => {
          const res = await fetch(img.src);
          const blob = await res.blob();
          const ext = (blob.type.split("/")[1] || "jpg").split("+")[0];
          zip.file(
            `${stage.number}-${stage.id}-${String(i + 1).padStart(2, "0")}.${ext}`,
            blob
          );
        })
      );
      const out = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(out);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${stage.number}-${stage.title}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section id="day" className="py-24 md:py-36 bg-card/50 relative">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex items-end justify-between mb-10 md:mb-14 gap-6 flex-wrap">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">Глава II</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display text-6xl md:text-[8vw] leading-[0.9]">
                День
                <br />
                <span className="italic">свадьбы</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="max-w-xs text-sm text-foreground/70 leading-relaxed">
              Шесть актов одного вечера. Перелистывайте между сценами — каждая
              часть рассказана языком фотографии.
            </p>
          </Reveal>
        </div>

        {/* stage nav */}
        <div className="relative -mx-5 md:mx-0 px-5 md:px-0 mb-12">
          <div className="flex gap-2 md:gap-3 overflow-x-auto pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {stages.map((s) => {
              const on = s.id === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`shrink-0 px-5 py-3 border text-[10px] uppercase tracking-[0.28em] transition-all duration-500 ${
                    on
                      ? "bg-foreground text-background border-foreground"
                      : "border-border text-foreground/70 hover:border-foreground"
                  }`}
                >
                  <span className="mr-2 opacity-60">{s.number}</span>
                  {s.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* stage header */}
        <div key={stage.id} className="grid md:grid-cols-12 gap-6 md:gap-10 mb-10 anim-fade-up">
          <div className="md:col-span-2">
            <div className="display text-7xl md:text-8xl text-gold leading-none">
              {stage.number}
            </div>
          </div>
          <div className="md:col-span-6">
            <h3 className="display text-4xl md:text-6xl leading-[0.95] mb-3">
              {stage.title}
            </h3>
            <p className="eyebrow">{stage.time}</p>
          </div>
          <div className="md:col-span-4 flex flex-col justify-end">
            <p className="text-foreground/75 leading-relaxed">
              {stage.description}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <p className="eyebrow">{stage.count}</p>
              <button
                onClick={downloadStage}
                disabled={downloading}
                className="inline-flex items-center gap-2 border border-foreground/80 px-5 py-3 text-[10px] uppercase tracking-[0.28em] hover:bg-foreground hover:text-background transition-colors duration-500 disabled:opacity-60"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v13m0 0l-5-5m5 5l5-5M5 21h14" />
                </svg>
                {downloading ? "Готовим архив…" : "Скачать фото"}
              </button>
            </div>
          </div>
        </div>

        {/* gallery */}
        <div
          key={"gal-" + stage.id}
          className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-5 anim-fade"
        >
          {stage.images.map((img, i) => {
            const span = img.wide
              ? "col-span-2 md:col-span-4 aspect-[16/10]"
              : img.tall
                ? "col-span-1 md:col-span-2 row-span-2 aspect-[3/4]"
                : "col-span-1 md:col-span-2 aspect-square";
            return (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`group relative overflow-hidden bg-secondary ${span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1800ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-500" />
                <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.3em] text-background opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-difference">
                  {String(i + 1).padStart(2, "0")} / {stage.images.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4 anim-fade"
          onClick={closeLightbox}
        >
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-foreground/80 pointer-events-none">
            <span>
              {stage.number} · {stage.title}
            </span>
            <span>
              {String(lightboxIndex + 1).padStart(2, "0")} / {String(stage.images.length).padStart(2, "0")}
            </span>
          </div>

          <button
            aria-label="Закрыть"
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-foreground border border-border bg-background/70 z-10"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
          >
            ✕
          </button>

          <button
            aria-label="Предыдущее фото"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-foreground border border-border bg-background/70 hover:bg-foreground hover:text-background transition-colors"
          >
            ‹
          </button>
          <button
            aria-label="Следующее фото"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-foreground border border-border bg-background/70 hover:bg-foreground hover:text-background transition-colors"
          >
            ›
          </button>

          <img
            key={lightboxIndex}
            src={stage.images[lightboxIndex].src}
            alt={stage.images[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] max-w-[88vw] object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] anim-fade"
          />

          <p className="absolute bottom-6 left-0 right-0 text-center text-[10px] uppercase tracking-[0.3em] text-foreground/60">
            Esc — закрыть · ← / → — листать
          </p>
        </div>
      )}
    </section>
  );
}

/* ----------------------------- Featured spread ---------------------------- */

function FeaturedSpread() {
  return (
    <section id="photo" className="py-32 md:py-56">
      <div className="mx-auto max-w-[1500px] px-5 md:px-12">
        {/* Magazine masthead */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 mb-20 md:mb-32">
          <div className="md:col-span-5 md:col-start-2">
            <Reveal>
              <p className="eyebrow mb-8">Editorial · Pause</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display text-5xl md:text-[6.5vw] leading-[0.95]">
                Тишина
                <br />
                <span className="italic font-extralight">между</span>
                <br />
                кадрами<span className="text-gold">.</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-10">
            <Reveal delay={200}>
              <p className="font-serif italic text-xl md:text-2xl leading-[1.5] text-foreground/75">
                Между официальными снимками всегда есть взгляд,
                которого никто не заказывал.
              </p>
              <div className="gold-line mt-10 w-16" />
            </Reveal>
          </div>
        </div>

        {/* Broken-grid editorial spread */}
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          <Reveal className="col-span-12 md:col-span-7">
            <figure className="relative">
              <img
                src={silent1}
                alt="Тихий момент"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover"
              />
              <figcaption className="eyebrow mt-4">Pl. 02 — Pause</figcaption>
            </figure>
          </Reveal>

          <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-12 md:gap-24 md:pt-32">
            <Reveal delay={150}>
              <img
                src={silent2}
                alt="Деталь"
                loading="lazy"
                className="w-full aspect-[3/4] object-cover"
              />
            </Reveal>
            <Reveal delay={250}>
              <p className="font-serif italic text-2xl md:text-3xl leading-snug text-foreground/85">
                «Не позируй, просто будь.»
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 md:gap-8 mt-12 md:mt-32">
          <Reveal delay={80} className="col-span-12 md:col-span-5 md:col-start-2 md:pt-40">
            <img
              src={silent3}
              alt="Свет"
              loading="lazy"
              className="w-full aspect-[3/4] object-cover"
            />
          </Reveal>
          <Reveal delay={180} className="col-span-12 md:col-span-6">
            <img
              src={silent4}
              alt="Эмоция"
              loading="lazy"
              className="w-full aspect-[5/4] object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Video --------------------------------- */

function Video() {
  const [playing, setPlaying] = useState(false);
  return (
    <section id="video" className="py-24 md:py-36 bg-card/50">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="text-center mb-12">
          <Reveal>
            <p className="eyebrow mb-6">Глава III</p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="display text-5xl md:text-8xl leading-[0.95]">
              Наш
              <span className="italic"> свадебный </span>
              фильм
            </h2>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative group overflow-hidden shadow-[0_40px_80px_-40px_rgba(42,42,42,0.35)]">
            <img
              src={ceremony1}
              alt="Кадр свадебного фильма"
              loading="lazy"
              className="w-full aspect-[16/10] md:aspect-[21/9] object-cover transition-transform duration-[2400ms] ease-out group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-foreground/10 to-foreground/30" />
            <div className="absolute inset-0 ring-1 ring-inset ring-background/10" />

            <button
              onClick={() => setPlaying((p) => !p)}
              aria-label="Смотреть фильм"
              className="absolute inset-0 flex items-center justify-center"
            >
              <span className="relative w-20 h-20 md:w-28 md:h-28 rounded-full border border-background/80 bg-background/10 backdrop-blur-md flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                <span className="absolute inset-0 rounded-full border border-background/40 animate-ping" />
                <svg width="22" height="26" viewBox="0 0 22 26" className="fill-background ml-1">
                  <path d="M0 0L22 13L0 26V0Z" />
                </svg>
              </span>
            </button>

            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-background text-[10px] uppercase tracking-[0.3em]">
              <span>04:32 · The Film</span>
              <span>A &amp; D · 2026</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-bronze transition-colors duration-500"
          >
            {playing ? "Пауза" : "Смотреть фильм"}
          </button>
          <span className="eyebrow">Снято на 35mm · Color graded</span>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Wishes --------------------------------- */

function Wishes() {
  return (
    <section id="wishes" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-6 mb-14 items-end">
          <div className="md:col-span-7">
            <Reveal><p className="eyebrow mb-6">Глава IV</p></Reveal>
            <Reveal delay={100}>
              <h2 className="display text-5xl md:text-[7vw] leading-[0.9]">
                Пожелания
                <br />
                <span className="italic">гостей</span>
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={200}>
              <p className="text-foreground/70 leading-relaxed">
                Те самые слова, которые мы хотим перечитывать снова. Спасибо
                каждому, кто оставил здесь след.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          {wishes.map((w, i) => {
            const layouts = [
              "md:col-span-7 md:col-start-1 md:-rotate-[0.6deg] md:mt-0",
              "md:col-span-5 md:col-start-8 md:rotate-[0.9deg] md:mt-20",
              "md:col-span-5 md:col-start-2 md:rotate-[0.4deg] md:-mt-6",
              "md:col-span-6 md:col-start-7 md:-rotate-[0.7deg] md:mt-10",
            ];
            const tones = [
              "bg-[#FBF6EE]",
              "bg-[#F4ECDF]",
              "bg-[#F8F2E8]",
              "bg-[#F1E8D8]",
            ];
            return (
              <Reveal key={w.name} delay={i * 110} className={layouts[i % layouts.length]}>
                <article
                  className={`relative ${tones[i % tones.length]} p-8 md:p-12 transition-transform duration-700 ease-out hover:rotate-0 hover:-translate-y-1 shadow-[0_30px_60px_-40px_rgba(60,40,20,0.25)]`}
                  style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 30px 60px -40px rgba(60,40,20,0.25)" }}
                >
                  <div className="absolute -top-3 left-8 w-16 h-3 bg-foreground/10 rotate-[-2deg]" aria-hidden />
                  <div className="text-5xl md:text-6xl font-serif text-gold leading-none mb-3 -ml-1">“</div>
                  <p className="font-serif italic text-xl md:text-2xl leading-[1.45] text-foreground/85">
                    {w.text}
                  </p>
                  <div className="mt-8 flex items-baseline justify-between gap-6 border-t border-foreground/10 pt-4">
                    <span className="font-serif text-lg md:text-xl">— {w.name}</span>
                    <span className="eyebrow">{w.date}</span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={200}>
          <div className="mt-14 flex justify-center">
            <button className="inline-flex items-center gap-3 border border-foreground px-7 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-colors duration-500">
              + Оставить пожелание
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Guests --------------------------------- */

function Guests() {
  return (
    <section id="guests" className="py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-5 md:px-10">
        <Reveal>
          <div className="border border-border bg-card/60 p-8 md:p-14 grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-2 flex md:justify-center">
              <span className="w-14 h-14 rounded-full border border-bronze flex items-center justify-center text-bronze">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <path d="M12 3v13m0 0l-5-5m5 5l5-5M5 21h14" />
                </svg>
              </span>
            </div>
            <div className="md:col-span-6">
              <p className="eyebrow mb-3">Для гостей</p>
              <h3 className="display text-3xl md:text-4xl mb-3">
                Все фото в высоком качестве
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                Здесь вы можете скачать все фотографии с нашего дня одним
                архивом.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col items-start md:items-end gap-3">
              <button className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-bronze transition-colors duration-500">
                Скачать архив (4.2 GB)
              </button>
              <span className="eyebrow">Доступно 30 дней</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- ThankYou ------------------------------- */

function ThankYou() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <img
        src={thankYou}
        alt="Финальный кадр свадебного дня"
        className="absolute inset-0 w-full h-full object-cover anim-ken"
      />
      {/* warm cinematic veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/60" />
      <div className="absolute inset-0 grain pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-between py-14 md:py-20 px-6 text-background text-center">
        <Reveal>
          <p className="eyebrow text-background/80" style={{ color: "rgba(255,250,240,0.7)" }}>
            Finale · Pl. 30
          </p>
        </Reveal>

        <div className="flex flex-col items-center gap-10 max-w-3xl">
          <Reveal delay={150}>
            <span className="block w-12 h-px bg-background/60 mx-auto" />
          </Reveal>
          <Reveal delay={200}>
            <h2 className="display text-5xl sm:text-6xl md:text-[7.5vw] leading-[0.95] text-background">
              Спасибо,
              <br />
              <span className="italic font-extralight">что были с нами</span>
            </h2>
          </Reveal>
          <Reveal delay={350}>
            <p className="font-serif italic text-lg md:text-2xl text-background/85 max-w-xl leading-relaxed">
              За каждый взгляд, объятие и тихое слово —
              этот день останется с нами навсегда.
            </p>
          </Reveal>
          <Reveal delay={500}>
            <span className="block w-12 h-px bg-background/60 mx-auto" />
          </Reveal>
        </div>

        <Reveal delay={600}>
          <p className="display italic text-2xl md:text-3xl tracking-[0.2em] text-background/90">
            — A &amp; D —
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Footer --------------------------------- */

function Footer() {
  const Icon = ({ d }: { d: string }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="display text-lg tracking-[0.3em]">A · D</div>

        <div className="flex items-center gap-6 text-foreground/70">
          <a href="#" aria-label="Instagram" className="hover:text-foreground transition-colors">
            <Icon d="M3 7.5A4.5 4.5 0 0 1 7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9zM12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5-.5h.01" />
          </a>
          <a href="#" aria-label="Telegram" className="hover:text-foreground transition-colors">
            <Icon d="M22 3L2 11l6 2 2 6 4-4 6 5 2-17z" />
          </a>
          <a href="#" aria-label="WhatsApp" className="hover:text-foreground transition-colors">
            <Icon d="M3 21l1.6-4.6A8.5 8.5 0 1 1 21 12.5 8.5 8.5 0 0 1 8.6 19.4L3 21zM8 10c.5 2 2 3.5 4 4l1.5-1.5L16 14c-.5 1.5-2 2-3.5 1.8C9.5 15.3 7 12.5 6.5 9.5 6.3 8 6.8 6.5 8.3 6L10 8.5 8 10z" />
          </a>
        </div>

        <div className="eyebrow">Сделано с любовью</div>
      </div>
    </footer>
  );
}