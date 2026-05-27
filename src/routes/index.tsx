import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";

import hero from "@/assets/hero.jpg";
import morning from "@/assets/morning.jpg";
import groom from "@/assets/groom.jpg";
import ceremony from "@/assets/ceremony.jpg";
import walk from "@/assets/walk.jpg";
import banquet from "@/assets/banquet.jpg";
import party from "@/assets/party.jpg";
import rings from "@/assets/rings.jpg";
import bouquet from "@/assets/bouquet.jpg";
import bwPortrait from "@/assets/bw-portrait.jpg";
import film from "@/assets/film.jpg";
import finale from "@/assets/finale.jpg";

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
  },
  {
    year: "2020",
    title: "Начало отношений",
    text: "Тихое да, сказанное между строк.",
    glyph: "II",
  },
  {
    year: "2022",
    title: "Путешествия",
    text: "Лиссабон, Прага, Амальфи. Мир — наш альбом.",
    glyph: "III",
  },
  {
    year: "2025",
    title: "Предложение",
    text: "Зимний вечер. Свеча. Кольцо. Слёзы.",
    glyph: "IV",
  },
  {
    year: "2026",
    title: "Наша свадьба",
    text: "День, который мы будем рассказывать всю жизнь.",
    glyph: "V",
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
      { src: morning, alt: "Утро невесты", tall: true },
      { src: bouquet, alt: "Букет невесты" },
      { src: rings, alt: "Обручальные кольца" },
      { src: bwPortrait, alt: "Портрет невесты", tall: true },
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
      { src: groom, alt: "Сборы жениха", tall: true },
      { src: rings, alt: "Кольцо" },
      { src: bwPortrait, alt: "Чёрно-белый момент", tall: true },
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
      { src: ceremony, alt: "Церемония", wide: true },
      { src: bouquet, alt: "Цветы церемонии" },
      { src: morning, alt: "Эмоция момента", tall: true },
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
      { src: walk, alt: "Прогулка", tall: true },
      { src: film, alt: "Закат", wide: true },
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
      { src: banquet, alt: "Банкет", wide: true },
      { src: bouquet, alt: "Цветы стола" },
      { src: rings, alt: "Деталь", tall: true },
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
      { src: party, alt: "Вечеринка", wide: true },
      { src: finale, alt: "Под люстрой", tall: true },
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

        <ol className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border md:left-1/2" />
          {storyTimeline.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <li
                key={m.year}
                className="relative md:grid md:grid-cols-2 md:gap-16 pb-16 md:pb-24 last:pb-0"
              >
                <span className="absolute left-0 md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full border border-bronze bg-background flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                </span>

                <div
                  className={`pl-10 md:pl-0 ${
                    right ? "md:col-start-2 md:pl-16" : "md:text-right md:pr-16"
                  }`}
                >
                  <Reveal delay={i * 80}>
                    <p className="eyebrow mb-3">
                      <span className="text-foreground/40 mr-3">{m.glyph}</span>
                      {m.year}
                    </p>
                    <h3 className="display text-4xl md:text-6xl mb-4">
                      {m.title}
                    </h3>
                    <p className="text-foreground/70 max-w-sm md:inline-block">
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
  const [lightbox, setLightbox] = useState<string | null>(null);

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
            <p className="eyebrow mt-4">{stage.count}</p>
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
                onClick={() => setLightbox(img.src)}
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
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4 anim-fade"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Закрыть"
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-foreground border border-border"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-h-[88vh] max-w-[92vw] object-contain shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)]"
          />
        </div>
      )}
    </section>
  );
}

/* ----------------------------- Featured spread ---------------------------- */

function FeaturedSpread() {
  return (
    <section id="photo" className="py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid md:grid-cols-12 gap-6 md:gap-10">
          <div className="md:col-span-5 md:pt-12">
            <Reveal>
              <p className="eyebrow mb-6">Editorial · Spread</p>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display text-5xl md:text-7xl leading-[0.95] mb-6">
                Тишина
                <br />
                <span className="italic">между кадрами</span>
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="text-foreground/70 leading-relaxed max-w-md">
                Между официальными снимками всегда есть взгляд, которого никто
                не заказывал. Здесь — несколько таких.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="gold-line mt-10 w-24" />
            </Reveal>
          </div>
          <div className="md:col-span-7 grid grid-cols-6 gap-3 md:gap-5">
            <Reveal className="col-span-4 row-span-2">
              <img
                src={bwPortrait}
                alt="Чёрно-белый портрет"
                loading="lazy"
                className="w-full h-full object-cover aspect-[4/5]"
              />
            </Reveal>
            <Reveal delay={120} className="col-span-2">
              <img
                src={rings}
                alt="Кольца"
                loading="lazy"
                className="w-full h-full object-cover aspect-square"
              />
            </Reveal>
            <Reveal delay={200} className="col-span-2">
              <img
                src={bouquet}
                alt="Букет"
                loading="lazy"
                className="w-full h-full object-cover aspect-square"
              />
            </Reveal>
            <Reveal delay={280} className="col-span-6">
              <img
                src={walk}
                alt="Прогулка"
                loading="lazy"
                className="w-full h-full object-cover aspect-[16/9]"
              />
            </Reveal>
          </div>
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
              src={film}
              alt="Кадр свадебного фильма"
              loading="lazy"
              className="w-full aspect-[16/10] md:aspect-[21/9] object-cover transition-transform duration-[2000ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />

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

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {wishes.map((w, i) => (
            <Reveal key={w.name} delay={i * 80}>
              <article className="group h-full border border-border bg-background p-7 md:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-40px_rgba(42,42,42,0.4)]">
                <div className="flex items-center gap-4 mb-6">
                  <span className="w-12 h-12 rounded-full bg-secondary text-secondary-foreground display text-2xl flex items-center justify-center">
                    {w.initial}
                  </span>
                  <div>
                    <div className="font-serif text-xl">{w.name}</div>
                    <div className="eyebrow mt-1">{w.date}</div>
                  </div>
                </div>
                <div className="text-3xl text-gold leading-none mb-2">“</div>
                <p className="font-serif italic text-lg md:text-xl leading-snug text-foreground/85">
                  {w.text}
                </p>
              </article>
            </Reveal>
          ))}
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
    <section className="py-28 md:py-44 bg-card/40 relative overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 text-center">
        <Reveal>
          <p className="eyebrow mb-8">Finale</p>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="display text-[12vw] sm:text-[8vw] md:text-[6.5vw] leading-[0.9]">
            Спасибо,
            <br />
            что были
            <br />
            <span className="italic">с нами</span>
            <span className="text-gold">.</span>
          </h2>
        </Reveal>
        <Reveal delay={250}>
          <p className="mt-10 max-w-xl mx-auto text-foreground/75 leading-relaxed">
            Этот день навсегда останется в нашем сердце. Каждый взгляд, каждое
            объятие — всё благодаря вам.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
          <Reveal>
            <img
              src={finale}
              alt="Финальный кадр"
              loading="lazy"
              className="w-full aspect-[3/4] object-cover"
            />
          </Reveal>
          <Reveal delay={150}>
            <img
              src={walk}
              alt="Прогулка"
              loading="lazy"
              className="w-full aspect-[3/4] object-cover mt-10 md:mt-16"
            />
          </Reveal>
        </div>

        <Reveal delay={300}>
          <p className="display italic text-2xl md:text-3xl mt-16 text-foreground/80">
            — A &amp; D
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