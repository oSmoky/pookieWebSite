import { Fragment, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  AudioLines,
  CalendarDays,
  ChevronDown,
  Heart,
  LockKeyhole,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";
import ImageWithFallback from "./components/ImageWithFallback.jsx";
import MemoryPhysics from "./components/MemoryPhysics.jsx";
import { useCounter } from "./hooks/useCounter.js";
import { useScrollAudio } from "./hooks/useScrollAudio.js";
import {
  chapters,
  colorJars,
  coupons,
  letterParagraphs,
  photos,
  relationshipStart,
  tracks,
  wrappedStats,
} from "./data/siteData.js";

const copy = {
  ru: {
    langLabel: "Язык",
    openingAria: "Открытка для Ангелины",
    openingEyebrow: "private birthday letter",
    openingTitle: "Для Ангелины",
    openingText:
      "Я оставил здесь кусочек своего сердца: музыку, воспоминания, нежность и моменты, которые хочется хранить рядом с тобой.",
    openingButton: "Открыть письмо",
    previewFor: "for Angelina",
    previewReady: "open when you are ready",
    nav: { colors: "Цвета", time: "Время", chapters: "Главы", gallery: "Фото", letter: "Письмо" },
    musicAria: "Музыка",
    nowPlaying: "now playing",
    heroEyebrow: "Birthday edition · 2026",
    heroLead:
      "Маленький снежный фильм про нас: любимые треки, фотографии, моменты, которые хочется пересматривать, и я, который очень сильно тебя любит.",
    heroTags: ["greenish brown eyes", "06.10.2025", "playlist walks"],
    heroNote: "my favorite person",
    colorsEyebrow: "Aura palette",
    colorsTitle: "Цвета, которыми я тебя чувствую",
    colorsLead:
      "Шесть маленьких баночек с тем, как Ангелина у меня ассоциируется: любовь, смех, взгляд, шалости и то спокойствие, которое появляется рядом с ней.",
    timeEyebrow: "Track 02",
    timeTitle: "Мы вместе уже",
    timeNote: "С 6 октября 2025 года, примерно с 19:30.",
    timeUnits: ["дней", "часов", "минут", "секунд"],
    statsEyebrow: "Top moments",
    statsTitle: "Итоги нашего года",
    chaptersEyebrow: "Scene selection",
    chaptersTitle: "Наши главы",
    galleryEyebrow: "Memory wall",
    galleryTitle: "Фотки, где мы живые",
    selectedMemory: "selected memory",
    close: "Закрыть",
    letterEyebrow: "Track 05",
    letterTitle: "Письмо тебе",
    finaleEyebrow: "one hidden thing",
    finaleTitle: "Тут почти конец",
    finaleText:
      "Последний экран выглядит спокойно, но в нем спрятан маленький подарок. Его лучше открыть только в самом конце.",
    unlock: "разблокировать",
    birthdayEyebrow: "special unlock",
    birthdayTitle: "HAPPY BIRTHDAY",
    birthdaySubtitle: "MY BELOVED POOKIE",
    birthdayText: "Я люблю тебя, Ангелина. Очень-очень.",
    planeText: "(i looovee uuuuuu)",
  },
  en: {
    langLabel: "Language",
    openingAria: "A card for Angelina",
    openingEyebrow: "private birthday letter",
    openingTitle: "For Angelina",
    openingText:
      "I left a piece of my heart here: music, memories, softness, and moments I want to keep close to you.",
    openingButton: "Open the letter",
    previewFor: "for Angelina",
    previewReady: "open when you are ready",
    nav: { colors: "Colors", time: "Time", chapters: "Chapters", gallery: "Photos", letter: "Letter" },
    musicAria: "Music",
    nowPlaying: "now playing",
    heroEyebrow: "Birthday edition · 2026",
    heroLead:
      "A tiny snowy movie about us: favorite tracks, photos, moments I want to replay, and me loving you very, very much.",
    heroTags: ["greenish brown eyes", "10.06.2025", "playlist walks"],
    heroNote: "my favorite person",
    colorsEyebrow: "Aura palette",
    colorsTitle: "The colors I feel you in",
    colorsLead:
      "Six tiny jars for the way Angelina feels to me: love, laughter, her look, our playful chaos, and the calm that appears when she is close.",
    timeEyebrow: "Track 02",
    timeTitle: "We have been together for",
    timeNote: "Since October 6, 2025, around 7:30 PM.",
    timeUnits: ["days", "hours", "minutes", "seconds"],
    statsEyebrow: "Top moments",
    statsTitle: "Our year wrapped",
    chaptersEyebrow: "Scene selection",
    chaptersTitle: "Our chapters",
    galleryEyebrow: "Memory wall",
    galleryTitle: "Photos where we are alive",
    selectedMemory: "selected memory",
    close: "Close",
    letterEyebrow: "Track 05",
    letterTitle: "A letter to you",
    finaleEyebrow: "one hidden thing",
    finaleTitle: "Almost the end",
    finaleText:
      "This last screen looks calm, but there is a little gift hidden inside. It is better to open it at the very end.",
    unlock: "unlock",
    birthdayEyebrow: "special unlock",
    birthdayTitle: "HAPPY BIRTHDAY",
    birthdaySubtitle: "MY BELOVED POOKIE",
    birthdayText: "I love you, Angelina. So, so much.",
    planeText: "I loooooovee uuuuuu <3 <3 <3",
  },
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function byLang(value, lang) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  return value[lang] ?? value.ru ?? value.en ?? "";
}

function localizeItems(items, lang) {
  return items.map((item) => {
    const next = { ...item };

    ["kicker", "title", "text", "label", "detail", "caption", "name", "description"].forEach((key) => {
      if (key in next) next[key] = byLang(next[key], lang);
    });

    return next;
  });
}

function OpeningCard({ onOpen, lang, onLanguageChange, t }) {
  return (
    <section className="opening-card" aria-label={t.openingAria}>
      <div className="opening-snow" aria-hidden="true">
        {Array.from({ length: 26 }, (_, index) => (
          <span key={index} style={{ "--i": index, "--left": `${(index * 37) % 100}%` }} />
        ))}
      </div>

      <div className="language-choice" aria-label={t.langLabel}>
        {["ru", "en"].map((option) => (
          <button
            className={option === lang ? "is-active" : ""}
            type="button"
            onClick={() => onLanguageChange(option)}
            key={option}
          >
            {option.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="envelope-scene">
        <div className="envelope-shadow" />
        <div className="envelope">
          <div className="envelope-back" />
          <div className="letter-preview">
            <ImageWithFallback
              src="./photos/main cover.jpg"
              alt="Angelina"
              className="letter-preview-photo"
              fallbackLabel="Angelina"
              loading="eager"
            />
            <p>{t.previewFor}</p>
            <strong>{t.previewReady}</strong>
          </div>
          <div className="envelope-front" />
          <div className="envelope-flap" />
        </div>
      </div>

      <div className="opening-copy">
        <p className="eyebrow">{t.openingEyebrow}</p>
        <h1>{t.openingTitle}</h1>
        <p>{t.openingText}</p>
        <button className="primary-button" type="button" onClick={onOpen}>
          <Sparkles size={19} />
          {t.openingButton}
        </button>
      </div>
    </section>
  );
}

function Header({ activeTrack, onSoundClick, isMuted, isUnlocked, t }) {
  const track = tracks[activeTrack] ?? tracks[0];

  return (
    <header className="site-header">
      <a className="brand" href="#intro" aria-label="Angelina Wrapped">
        <span className="brand-orbit">
          <Heart size={14} fill="currentColor" />
        </span>
        <span>Angelina Wrapped</span>
      </a>

      <nav className="nav-links" aria-label="Sections">
        <a href="#colors">{t.nav.colors}</a>
        <a href="#time">{t.nav.time}</a>
        <a href="#chapters">{t.nav.chapters}</a>
        <a href="#gallery">{t.nav.gallery}</a>
        <a href="#letter">{t.nav.letter}</a>
      </nav>

      <button className="sound-pill" type="button" onClick={onSoundClick}>
        {isUnlocked && !isMuted ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
        <span>{track.artist}</span>
      </button>
    </header>
  );
}

function SoundDock({ audioNote, onSoundClick, isMuted, isUnlocked, t }) {
  return createPortal(
    <aside className="sound-dock" aria-live="polite">
      <button className="icon-button" type="button" onClick={onSoundClick} aria-label={t.musicAria}>
        {isUnlocked && !isMuted ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
      </button>
      <div>
        <span>{t.nowPlaying}</span>
        <strong>{audioNote}</strong>
      </div>
      <AudioLines className="sound-wave" size={28} aria-hidden="true" />
    </aside>,
    document.body,
  );
}

function Hero({ t }) {
  return (
    <section className="scene hero-scene" id="intro" data-scene data-track="0">
      <MemoryPhysics />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="snow-layer" aria-hidden="true">
        {Array.from({ length: 42 }, (_, index) => (
          <span key={index} style={{ "--i": index, "--left": `${(index * 29) % 100}%` }} />
        ))}
      </div>

      <div className="hero-copy reveal">
        <p className="eyebrow">{t.heroEyebrow}</p>
        <h1 className="hero-name">
          <span className="angel-accent">Ангел</span>ина
        </h1>
        <p className="hero-lead">{t.heroLead}</p>
        <div className="hero-tags" aria-label="Details">
          {t.heroTags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <a className="scroll-cue" href="#colors" aria-label="Next">
          <ChevronDown size={23} />
        </a>
      </div>

      <div className="hero-portrait reveal delay-1">
        <div className="portrait-frame">
          <ImageWithFallback
            src="./photos/main cover.jpg"
            alt="Angelina"
            className="portrait-image"
            fallbackLabel="Angelina"
            loading="eager"
          />
          <div className="portrait-glow" />
        </div>
        <div className="portrait-note">
          <span>01</span>
          <strong>{t.heroNote}</strong>
        </div>
      </div>
    </section>
  );
}

function ColorJarsScene({ jars, t }) {
  return (
    <section className="scene color-jars-scene" id="colors" data-scene data-track="1">
      <div className="scene-heading reveal">
        <p className="eyebrow">{t.colorsEyebrow}</p>
        <h2>{t.colorsTitle}</h2>
        <p>{t.colorsLead}</p>
      </div>

      <div className="jars-lab">
        {jars.map((jar, index) => (
          <article
            className={`aura-jar-card reveal ${jar.shimmer ? "is-shimmer" : ""}`}
            style={{
              "--delay": `${index * 80}ms`,
              "--jar-a": jar.colors[0],
              "--jar-b": jar.colors[1],
              "--jar-c": jar.colors[2],
              "--jar-glow": jar.glow,
            }}
            key={jar.name}
          >
            <div className="jar-stage" aria-hidden="true">
              <div className="jar-glow" />
              <div className="glass-jar">
                <div className="jar-lid" />
                <div className="jar-neck" />
                <div className="jar-body">
                  <div className="jar-liquid" />
                  <div className="jar-sparkle" />
                  <div className="firefly-field">
                    {Array.from({ length: jar.fireflies }, (_, flyIndex) => (
                      <span
                        key={flyIndex}
                        style={{
                          "--fly": flyIndex,
                          "--fly-left": `${14 + ((flyIndex * 23 + index * 11) % 72)}%`,
                          "--fly-top": `${15 + ((flyIndex * 17 + index * 9) % 66)}%`,
                          "--fly-delay": `${(flyIndex % 7) * -0.42}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="jar-copy">
              <span>{pad(index + 1)}</span>
              <h3>{jar.name}</h3>
              <p>{jar.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TimeScene({ lang, t }) {
  const counter = useCounter(relationshipStart);
  const formatter = useMemo(
    () => new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "en-US"),
    [lang],
  );
  const values = [formatter.format(counter.days), pad(counter.hours), pad(counter.minutes), pad(counter.seconds)];

  return (
    <section className="scene time-scene" id="time" data-scene data-track="1">
      <div className="scene-heading reveal">
        <p className="eyebrow">{t.timeEyebrow}</p>
        <h2>{t.timeTitle}</h2>
        <p>{t.timeNote}</p>
      </div>

      <div className="time-grid">
        {t.timeUnits.map((label, index) => (
          <article className="time-card reveal" style={{ "--delay": `${index * 80}ms` }} key={label}>
            <strong>{values[index]}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function WrappedStats({ stats, t }) {
  return (
    <section className="scene stats-scene" data-scene data-track="2">
      <div className="scene-heading reveal">
        <p className="eyebrow">{t.statsEyebrow}</p>
        <h2>{t.statsTitle}</h2>
      </div>

      <div className="wrapped-grid">
        {stats.map((item, index) => (
          <article
            className={`wrapped-card reveal ${item.featured ? "is-featured" : ""} ${
              item.value === "24/7" ? "is-love-mode" : ""
            }`}
            style={{ "--delay": `${index * 90}ms` }}
            key={item.label}
          >
            <strong>{item.value}</strong>
            <span>{item.label}</span>
            <p>{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ChaptersScene({ items, t }) {
  return (
    <section className="scene chapters-scene" id="chapters" data-scene data-track="3">
      <div className="scene-heading reveal">
        <p className="eyebrow">{t.chaptersEyebrow}</p>
        <h2>{t.chaptersTitle}</h2>
      </div>

      <div className="chapter-stage">
        {items.map((chapter, index) => (
          <article
            className={`chapter-card reveal chapter-${index + 1}`}
            style={{ "--delay": `${index * 110}ms` }}
            key={chapter.title}
          >
            <div className="chapter-marker">{pad(index + 1)}</div>
            <div className="chapter-visual" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="chapter-kicker">{chapter.kicker}</span>
            <h3>{chapter.title}</h3>
            <p>{chapter.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function GalleryScene({ items, t }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  function tiltCard(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.setProperty("--tilt-x", `${y}deg`);
    card.style.setProperty("--tilt-y", `${x}deg`);
  }

  function resetTilt(event) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <section className="scene gallery-scene" id="gallery" data-scene data-track="4">
      <div className="scene-heading reveal">
        <p className="eyebrow">{t.galleryEyebrow}</p>
        <h2>{t.galleryTitle}</h2>
      </div>

      <div className="gallery-grid">
        {items.map((photo, index) => (
          <Fragment key={photo.src}>
            <button
              className={`memory-card tone-${photo.tone} shape-${photo.shape ?? "portrait"} reveal`}
              style={{ "--delay": `${(index % 5) * 70}ms` }}
              type="button"
              onClick={() => setSelectedPhoto({ ...photo, index })}
              onPointerMove={tiltCard}
              onPointerLeave={resetTilt}
            >
              <span className="memory-photo-window">
                <ImageWithFallback
                  src={photo.src}
                  alt={photo.title}
                  className="memory-image"
                  fallbackLabel={pad(index + 1)}
                />
                <span className="memory-index">{pad(index + 1)}</span>
              </span>
              <span className="memory-caption">
                <strong>{photo.title}</strong>
                <small>{photo.caption}</small>
              </span>
            </button>

            {selectedPhoto?.src === photo.src && (
              <div className="memory-inline-view" role="dialog" aria-modal="false">
                <button
                  className="modal-close"
                  type="button"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label={t.close}
                >
                  <X size={22} />
                </button>
                <ImageWithFallback
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="modal-image"
                  fallbackLabel={selectedPhoto.title}
                />
                <div>
                  <p className="eyebrow">{t.selectedMemory}</p>
                  <h3>{selectedPhoto.title}</h3>
                  <p>{selectedPhoto.caption}</p>
                </div>
              </div>
            )}
          </Fragment>
        ))}
      </div>

    </section>
  );
}

function LetterScene({ paragraphs, t }) {
  return (
    <section className="scene letter-scene" id="letter" data-scene data-track="5">
      <div className="letter-sticky reveal">
        <p className="eyebrow">{t.letterEyebrow}</p>
        <h2>{t.letterTitle}</h2>
        <div className="letter-seal" aria-hidden="true">
          <Heart size={24} fill="currentColor" />
        </div>
      </div>

      <div className="letter-stack">
        <div className="letter-ribbon" aria-hidden="true" />
        {paragraphs.map((paragraph, index) => (
          <article
            className={`letter-page reveal letter-page-${index + 1}`}
            style={{ "--delay": `${index * 120}ms` }}
            key={paragraph}
          >
            <span>{pad(index + 1)}</span>
            <p>{paragraph}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinaleScene({ items, t }) {
  const [opened, setOpened] = useState(false);

  const confetti = useMemo(
    () =>
      Array.from({ length: 110 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.45}s`,
        drift: `${(Math.random() - 0.5) * 250}px`,
        rotate: `${Math.random() * 780}deg`,
      })),
    [],
  );
  const ribbons = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => ({
        id: index,
        left: `${8 + Math.random() * 84}%`,
        top: `${10 + Math.random() * 78}%`,
        size: `${120 + Math.random() * 230}px`,
        delay: `${index * 0.14}s`,
      })),
    [],
  );
  const fireworks = useMemo(
    () =>
      Array.from({ length: 15 }, (_, index) => ({
        id: index,
        left: `${8 + Math.random() * 84}%`,
        top: `${8 + Math.random() * 58}%`,
        delay: `${index * 0.18}s`,
        color: ["#dfeaff", "#cfc8ff", "#b9d8ff", "#ffffff", "#866df2"][index % 5],
      })),
    [],
  );
  const crystals = useMemo(
    () =>
      Array.from({ length: 70 }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1.8}s`,
        size: `${4 + Math.random() * 8}px`,
      })),
    [],
  );
  const origami = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        top: `${8 + Math.random() * 82}%`,
        delay: `${Math.random() * 5.5}s`,
        duration: `${10 + Math.random() * 6}s`,
        scale: `${0.72 + Math.random() * 0.62}`,
      })),
    [],
  );

  useEffect(() => {
    document.body.classList.toggle("birthday-open", opened);
    return () => document.body.classList.remove("birthday-open");
  }, [opened]);

  const birthdayOverlay =
    opened &&
    createPortal(
      <div className="birthday-overlay" role="dialog" aria-modal="true">
        <div className="birthday-ribbons" aria-hidden="true">
          {ribbons.map((ribbon) => (
            <span
              key={ribbon.id}
              style={{
                "--left": ribbon.left,
                "--top": ribbon.top,
                "--size": ribbon.size,
                "--delay": ribbon.delay,
              }}
            />
          ))}
        </div>

        <div className="firework-field" aria-hidden="true">
          {fireworks.map((firework) => (
            <span
              key={firework.id}
              style={{
                "--left": firework.left,
                "--top": firework.top,
                "--delay": firework.delay,
                "--color": firework.color,
              }}
            />
          ))}
        </div>

        <div className="crystal-field" aria-hidden="true">
          {crystals.map((crystal) => (
            <span
              key={crystal.id}
              style={{
                "--left": crystal.left,
                "--top": crystal.top,
                "--delay": crystal.delay,
                "--size": crystal.size,
              }}
            />
          ))}
        </div>

        <div className="birthday-plane" aria-hidden="true">
          <span className="plane-banner">{t.planeText}</span>
          <span className="paper-plane">
            <span />
            <span />
            <span />
          </span>
        </div>

        <div className="origami-field" aria-hidden="true">
          {origami.map((piece) => (
            <span
              key={piece.id}
              style={{
                "--top": piece.top,
                "--delay": piece.delay,
                "--duration": piece.duration,
                "--scale": piece.scale,
              }}
            />
          ))}
        </div>

        <div className="confetti" aria-hidden="true">
          {confetti.map((piece) => (
            <span
              key={piece.id}
              style={{
                "--left": piece.left,
                "--delay": piece.delay,
                "--drift": piece.drift,
                "--rotate": piece.rotate,
              }}
            />
          ))}
        </div>

        <button
          className="birthday-close"
          type="button"
          onClick={() => setOpened(false)}
          aria-label={t.close}
        >
          <X size={24} />
        </button>

        <div className="birthday-message">
          <p className="eyebrow">{t.birthdayEyebrow}</p>
          <strong>{t.birthdayTitle}</strong>
          <span>{t.birthdaySubtitle}</span>
          <p>{t.birthdayText}</p>
        </div>

        <div className="coupon-grid is-open">
          {items.map((coupon) => (
            <article className="coupon" key={coupon}>
              <CalendarDays size={20} />
              <span>{coupon}</span>
            </article>
          ))}
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <section className="scene finale-scene" id="finale" data-scene data-track="6">
        <div className="finale-panel reveal">
          <p className="eyebrow">{t.finaleEyebrow}</p>
          <h2>{t.finaleTitle}</h2>
          <p>{t.finaleText}</p>

          <button className="secret-button" type="button" onClick={() => setOpened(true)}>
            <LockKeyhole size={20} />
            <span>{t.unlock}</span>
          </button>
        </div>
      </section>
      {birthdayOverlay}
    </>
  );
}

function RevealObserver({ refreshKey }) {
  useEffect(() => {
    const elements = [...document.querySelectorAll(".reveal")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [refreshKey]);

  return null;
}

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [lang, setLang] = useState("ru");
  const t = copy[lang];
  const { activeTrack, audioNote, isMuted, isUnlocked, toggleMute, unlock } = useScrollAudio(tracks);

  const localizedChapters = useMemo(() => localizeItems(chapters, lang), [lang]);
  const localizedColorJars = useMemo(() => localizeItems(colorJars, lang), [lang]);
  const localizedStats = useMemo(() => localizeItems(wrappedStats, lang), [lang]);
  const localizedPhotos = useMemo(() => localizeItems(photos, lang), [lang]);
  const localizedLetter = letterParagraphs[lang] ?? letterParagraphs.ru;
  const localizedCoupons = coupons[lang] ?? coupons.ru;

  useEffect(() => {
    document.body.classList.toggle("intro-locked", !isOpened);
    return () => document.body.classList.remove("intro-locked");
  }, [isOpened]);

  function openExperience() {
    setIsOpened(true);
    unlock();
    window.setTimeout(() => {
      document.querySelector("#intro")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }

  return (
    <div className={`page-shell ${isOpened ? "is-open" : "is-closed"}`}>
      <RevealObserver refreshKey={`${isOpened}-${lang}`} />
      {!isOpened && (
        <OpeningCard
          onOpen={openExperience}
          lang={lang}
          onLanguageChange={setLang}
          t={t}
        />
      )}

      <div className="experience" aria-hidden={!isOpened}>
        <Header
          activeTrack={activeTrack}
          onSoundClick={toggleMute}
          isMuted={isMuted}
          isUnlocked={isUnlocked}
          t={t}
        />
        {isOpened && (
          <SoundDock
            audioNote={audioNote}
            onSoundClick={toggleMute}
            isMuted={isMuted}
            isUnlocked={isUnlocked}
            t={t}
          />
        )}
        <main>
          <Hero t={t} />
          <ColorJarsScene jars={localizedColorJars} t={t} />
          <TimeScene lang={lang} t={t} />
          <WrappedStats stats={localizedStats} t={t} />
          <ChaptersScene items={localizedChapters} t={t} />
          <GalleryScene items={localizedPhotos} t={t} />
          <LetterScene paragraphs={localizedLetter} t={t} />
          <FinaleScene items={localizedCoupons} t={t} />
        </main>
      </div>
    </div>
  );
}
