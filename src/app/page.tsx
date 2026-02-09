"use client";

import { useState, useEffect, useRef } from "react";

/* ─── Intersection Observer hook for scroll animations ─── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Animated counter ─── */
function AnimatedCounter({
  target,
  duration = 2000,
}: {
  target: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);
  return <span ref={ref}>{count.toLocaleString()}</span>;
}

/* ─── Typewriter text effect ─── */
function TypewriterText({ texts, className = "" }: { texts: string[]; className?: string }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index];
    const speed = isDeleting ? 40 : 70;

    if (!isDeleting && displayed === current) {
      const pause = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.substring(0, displayed.length - 1)
          : current.substring(0, displayed.length + 1)
      );
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, index, texts]);

  return (
    <span className={className}>
      {displayed}
      <span className="animate-blink text-gold">|</span>
    </span>
  );
}

/* ─── Live activity ticker item ─── */
function ActivityTicker() {
  const activities = [
    { user: "Maya", action: "logged her PM ritual", detail: "7 steps · Glass Skin Night", time: "2m ago" },
    { user: "Alex", action: "cloned a routine", detail: "Minimal Morning Glow", time: "4m ago" },
    { user: "Priya", action: "hit a 60-day streak", detail: "Unlocked Pride sin", time: "7m ago" },
    { user: "Jordan", action: "shared their routine", detail: "12 products · Obsessed level", time: "9m ago" },
    { user: "Sana", action: "added a new product", detail: "Drunk Elephant Protini", time: "11m ago" },
    { user: "Kai", action: "logged their AM ritual", detail: "5 steps · SPF included", time: "14m ago" },
    { user: "Nina", action: "reached Devoted level", detail: "47-day streak", time: "16m ago" },
    { user: "Riya", action: "saved 3 routines", detail: "Exploring new PM rituals", time: "18m ago" },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="animate-ticker flex gap-6">
        {[...activities, ...activities].map((a, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-3 rounded-full border border-white/[0.06] bg-near-black/80 px-4 py-2"
          >
            <div className="h-2 w-2 shrink-0 rounded-full bg-sage animate-pulse" />
            <p className="whitespace-nowrap text-xs text-warm-cream/50">
              <span className="font-semibold text-warm-cream/70">{a.user}</span>{" "}
              {a.action}{" "}
              <span className="text-gold/60">· {a.detail}</span>
            </p>
            <span className="text-[10px] text-warm-cream/20">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Routine data ─── */
const routines = [
  {
    name: "The Glass Skin PM",
    user: "Maya",
    avatar: "M",
    avatarColor: "bg-blush",
    time: "PM",
    streak: 47,
    level: "Devoted",
    steps: [
      { product: "Banila Co Clean It Zero", brand: "Banila Co", freq: "Daily", done: true },
      { product: "La Roche-Posay Toleriane Cleanser", brand: "La Roche-Posay", freq: "Daily", done: true },
      { product: "COSRX Snail Mucin Essence", brand: "COSRX", freq: "Daily", done: true },
      { product: "The Ordinary Niacinamide 10%", brand: "The Ordinary", freq: "Daily", done: true },
      { product: "Laneige Water Sleeping Mask", brand: "Laneige", freq: "Tue/Thu/Sat", done: false },
    ],
  },
  {
    name: "Minimal Morning Glow",
    user: "Alex",
    avatar: "A",
    avatarColor: "bg-sage",
    time: "AM",
    streak: 23,
    level: "Committed",
    steps: [
      { product: "CeraVe Foaming Cleanser", brand: "CeraVe", freq: "Daily", done: true },
      { product: "Paula's Choice 2% BHA", brand: "Paula's Choice", freq: "Tue/Thu/Sat", done: true },
      { product: "The Ordinary Hyaluronic Acid", brand: "The Ordinary", freq: "Daily", done: false },
      { product: "CeraVe Daily Moisturizer", brand: "CeraVe", freq: "Daily", done: false },
      { product: "Supergoop Unseen SPF 40", brand: "Supergoop", freq: "Daily", done: false },
    ],
  },
  {
    name: "The Retinol Night",
    user: "Priya",
    avatar: "P",
    avatarColor: "bg-gold",
    time: "PM",
    streak: 62,
    level: "Obsessed",
    steps: [
      { product: "DHC Deep Cleansing Oil", brand: "DHC", freq: "Daily", done: true },
      { product: "Krave Matcha Hemp Cleanser", brand: "Krave Beauty", freq: "Daily", done: true },
      { product: "Good Molecules Discoloration Serum", brand: "Good Molecules", freq: "Daily", done: true },
      { product: "Tretinoin 0.05%", brand: "Prescription", freq: "Mon/Wed/Fri", done: true },
      { product: "CeraVe PM Moisturizer", brand: "CeraVe", freq: "Daily", done: true },
      { product: "Aquaphor Healing Ointment", brand: "Aquaphor", freq: "Daily", done: false },
    ],
  },
];

const features = [
  {
    icon: "sparkles",
    title: "Daily walkthrough",
    description: "Check off each step, morning and night. Your routine becomes a ritual.",
  },
  {
    icon: "flame",
    title: "Streak tracking",
    description: "Build consistency and watch your streak grow. 30 days? That's devotion.",
  },
  {
    icon: "users",
    title: "Community feed",
    description: "Share routines, discover products, and see what actually works for real people.",
  },
  {
    icon: "copy",
    title: "Clone routines",
    description: "Love someone's routine? Clone it, customize it, make it yours in one tap.",
  },
  {
    icon: "shield",
    title: "Ingredient conflicts",
    description: "Retinol + AHA in the same night? We'll catch it before your skin does.",
  },
  {
    icon: "chart",
    title: "Weekly Sin Report",
    description: "Your week in ritual — consistency, streaks, and your sin level, delivered every Sunday.",
  },
];

const sins = [
  { icon: "mirror", name: "Vanity", desc: "30+ days of progress photos" },
  { icon: "bottle", name: "Gluttony", desc: "10+ products in one routine" },
  { icon: "coin", name: "Greed", desc: "Routine costs over $15/day" },
  { icon: "heart", name: "Lust", desc: "Saved 20+ routines" },
  { icon: "eye", name: "Envy", desc: "Cloned 5+ routines" },
  { icon: "flame", name: "Pride", desc: "60-day streak achieved" },
  { icon: "moon", name: "Sloth", desc: "Skipped PM 3+ times" },
];

/* ─── Icon component (inline SVGs) ─── */
function FeatureIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    sparkles: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
        <path d="M18 14l.67 2.33L21 17l-2.33.67L18 20l-.67-2.33L15 17l2.33-.67L18 14z" />
      </svg>
    ),
    flame: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4-4 8-7.5 8-12 0-3-1.5-5.5-4-7-1 2-2 3-4 3s-3-1-4-3c-2.5 1.5-4 4-4 7 0 4.5 4 8 8 12z" />
      </svg>
    ),
    users: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    copy: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
    shield: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    chart: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  };
  return <span className="text-gold">{iconMap[name]}</span>;
}

/* ─── Sin icon component (inline SVGs) ─── */
function SinIcon({ name }: { name: string }) {
  const iconMap: Record<string, React.ReactNode> = {
    mirror: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="5" />
        <line x1="12" y1="14" x2="12" y2="22" />
        <line x1="9" y1="22" x2="15" y2="22" />
      </svg>
    ),
    bottle: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="10" width="10" height="12" rx="2" />
        <path d="M9 10V6h6v4" />
        <rect x="10" y="3" width="4" height="3" rx="1" />
        <line x1="10" y1="15" x2="14" y2="15" />
      </svg>
    ),
    coin: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M14.5 9.5c-.5-1-1.5-1.5-2.5-1.5-1.7 0-3 1-3 2.5s1.3 2 3 2.5c1.7.5 3 1 3 2.5 0 1.5-1.3 2.5-3 2.5-1 0-2-.5-2.5-1.5" />
        <line x1="12" y1="6" x2="12" y2="8" />
        <line x1="12" y1="16" x2="12" y2="18" />
      </svg>
    ),
    heart: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    eye: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    flame: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c4-4 8-7.5 8-12 0-3-1.5-5.5-4-7-1 2-2 3-4 3s-3-1-4-3c-2.5 1.5-4 4-4 7 0 4.5 4 8 8 12z" />
      </svg>
    ),
    moon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
  };
  return <span className="text-gold">{iconMap[name]}</span>;
}

/* ─── Phone Mockup component ─── */
function PhoneMockup({
  routine,
  className = "",
}: {
  routine: (typeof routines)[0];
  className?: string;
}) {
  return (
    <div
      className={`w-[300px] min-w-[300px] shrink-0 rounded-[32px] border border-white/[0.08] bg-near-black p-6 ${className}`}
    >
      {/* Status bar */}
      <div className="mb-3 flex items-center justify-between text-[10px] text-warm-cream/40">
        <span>9:41</span>
        <span>{routine.time === "AM" ? "☀️ AM" : "🌙 PM"}</span>
      </div>

      {/* Header */}
      <div className="mb-4 text-center">
        <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-gold-muted">
          {routine.time === "AM" ? "Morning" : "Evening"}
        </p>
        <h4 className="font-[family-name:var(--font-playfair)] text-lg italic text-warm-cream">
          {routine.name}
        </h4>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {routine.steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 border-b border-white/[0.04] py-2"
          >
            <div
              className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
                step.done
                  ? "bg-sage text-obsidian"
                  : "border border-warm-cream/15"
              }`}
            >
              {step.done && "✓"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] text-warm-cream/70">
                {step.product}
              </p>
            </div>
            <span
              className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[8px] font-semibold ${
                step.freq === "Daily"
                  ? "bg-gold/15 text-gold"
                  : "bg-blush/20 text-blush"
              }`}
            >
              {step.freq}
            </span>
          </div>
        ))}
      </div>

      {/* Streak */}
      <div className="mt-4 text-center">
        <span className="text-[10px] font-semibold tracking-[0.12em] text-gold">
          🔥 STREAK: {routine.streak} DAYS
        </span>
      </div>

      {/* User */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold text-obsidian ${routine.avatarColor}`}
        >
          {routine.avatar}
        </div>
        <span className="text-[9px] text-warm-cream/40">
          {routine.user} · Sin Level: {routine.level}
        </span>
      </div>
    </div>
  );
}

/* ─── Social Proof Feed Card ─── */
function FeedCard({
  user,
  avatar,
  avatarColor,
  content,
  likes,
  comments,
  timeAgo,
}: {
  user: string;
  avatar: string;
  avatarColor: string;
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-near-black p-5">
      <div className="mb-3 flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-obsidian ${avatarColor}`}
        >
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-warm-cream">@{user}</p>
          <p className="text-[10px] text-warm-cream/30">{timeAgo}</p>
        </div>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-warm-cream/65">
        {content}
      </p>
      <div className="flex gap-4 text-[11px] text-warm-cream/30">
        <span>♡ {likes}</span>
        <span>💬 {comments}</span>
        <span>📎 Save</span>
      </div>
    </div>
  );
}

/* ─── Animated phone demo for hero ─── */
const heroSteps = [
  { product: "Banila Co Clean It Zero", freq: "Daily", img: "/products/BANILLACOCLEAN.WEBP" },
  { product: "La Roche-Posay Cleanser", freq: "Daily", img: "/products/LaRochePosayCleanser.JPG" },
  { product: "COSRX Snail Mucin Essence", freq: "Daily", img: "/products/COSRXSnailEsssence.WEBP" },
  { product: "The Ordinary Niacinamide", freq: "Daily", img: "/products/OrdinaryNiacimindeSerum.WEBP" },
  { product: "Laneige Sleeping Mask", freq: "Tue/Thu/Sat", img: "/products/Laniegelipsleepingmask.WEBP" },
];

type DemoPhase = "checking" | "celebration" | "share" | "feed" | "resetting";

function AnimatedPhoneDemo() {
  const [phase, setPhase] = useState<DemoPhase>("checking");
  const [stepIndex, setStepIndex] = useState(-1);
  const [checked, setChecked] = useState<boolean[]>(new Array(heroSteps.length).fill(false));
  const [animatingStep, setAnimatingStep] = useState(-1);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "checking") {
      const nextStep = stepIndex + 1;
      if (nextStep < heroSteps.length) {
        timer = setTimeout(() => {
          setAnimatingStep(nextStep);
          setChecked((prev) => {
            const next = [...prev];
            next[nextStep] = true;
            return next;
          });
          setStepIndex(nextStep);
        }, nextStep === 0 ? 1200 : 800);
      } else {
        timer = setTimeout(() => setPhase("celebration"), 600);
      }
    } else if (phase === "celebration") {
      timer = setTimeout(() => setPhase("share"), 2200);
    } else if (phase === "share") {
      timer = setTimeout(() => setPhase("feed"), 3000);
    } else if (phase === "feed") {
      timer = setTimeout(() => setPhase("resetting"), 4000);
    } else if (phase === "resetting") {
      timer = setTimeout(() => {
        setPhase("checking");
        setStepIndex(-1);
        setChecked(new Array(heroSteps.length).fill(false));
        setAnimatingStep(-1);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [phase, stepIndex]);

  return (
    <div className="relative w-[300px] md:w-[330px] lg:w-[340px]">
      {/* Ambient glow behind phone */}
      <div className="pointer-events-none absolute -inset-10 rounded-full bg-gold/[0.07] blur-[80px]" />

      {/* Phone frame — iPhone 14 Pro proportions */}
      <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] rounded-[3.5rem] p-[3px] shadow-2xl">
        {/* Screen */}
        <div
          className="relative bg-near-black rounded-[3.2rem] overflow-hidden"
          style={{ aspectRatio: "9 / 19.5" }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-obsidian rounded-full z-10" />

          {/* Screen content — positioned below dynamic island */}
          <div className="absolute inset-0 top-14 px-5 pb-8 flex flex-col">
            {/* ── Phase: Checking steps ── */}
            {(phase === "checking" || phase === "resetting") && (
              <div className={`flex flex-col flex-1 ${phase === "resetting" ? "opacity-40 transition-opacity duration-300" : ""}`}>
                {/* Status bar */}
                <div className="mb-2 flex items-center justify-between text-[10px] text-warm-cream/40">
                  <span>9:41</span>
                  <span>🌙 PM</span>
                </div>

                {/* Header */}
                <div className="mb-3 text-center">
                  <p className="text-[10px] font-medium tracking-[0.15em] uppercase text-gold-muted">
                    Evening
                  </p>
                  <h4 className="font-[family-name:var(--font-playfair)] text-lg italic text-warm-cream">
                    The Glass Skin PM
                  </h4>
                </div>

                {/* Steps */}
                <div className="flex-1">
                  {heroSteps.map((step, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 border-b border-white/[0.04] py-2.5"
                    >
                      {/* Animated checkbox — product image → checkmark */}
                      <div className="relative">
                        <div
                          className={`flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-[9px] font-bold transition-all duration-300 overflow-hidden ${
                            checked[i]
                              ? "bg-sage text-obsidian"
                              : "border border-warm-cream/10"
                          }`}
                        >
                          {checked[i] ? (
                            <span className={animatingStep === i ? "animate-check-fill" : ""}>
                              ✓
                            </span>
                          ) : (
                            <img
                              src={step.img}
                              alt={step.product}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        {animatingStep === i && (
                          <div className="absolute inset-0 rounded-full bg-sage/40 animate-pulse-ring" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-[11px] transition-all duration-300 ${
                            checked[i] ? "text-warm-cream/40 line-through" : "text-warm-cream/70"
                          }`}
                        >
                          {step.product}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded-sm px-1.5 py-0.5 text-[8px] font-semibold ${
                          step.freq === "Daily"
                            ? "bg-gold/15 text-gold"
                            : "bg-blush/20 text-blush"
                        }`}
                      >
                        {step.freq}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Streak */}
                <div className="mt-4 text-center">
                  <span className="text-[10px] font-semibold tracking-[0.12em] text-gold">
                    🔥 STREAK: 47 DAYS
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-sage transition-all duration-500 ease-out"
                    style={{
                      width: `${((stepIndex + 1) / heroSteps.length) * 100}%`,
                    }}
                  />
                </div>
                <p className="mt-2 text-center text-[9px] text-warm-cream/25">
                  {Math.max(0, stepIndex + 1)}/{heroSteps.length} steps
                </p>

                {/* User info */}
                <div className="mt-3 flex items-center justify-center gap-2">
                  <div className="h-5 w-5 shrink-0 overflow-hidden rounded-full">
                    <img src="/models/simsi2.PNG" alt="Simi" className="h-full w-full object-cover" />
                  </div>
                  <span className="text-[9px] text-warm-cream/40">
                    Simi · Sin Level: Devoted
                  </span>
                </div>
              </div>
            )}

            {/* ── Phase: Celebration — sharable routine card ── */}
            {phase === "celebration" && (
              <div className="animate-crossfade-in flex flex-1 flex-col items-center justify-center px-1">
                {/* Sharable routine card */}
                <div className="animate-scale-in w-full rounded-2xl border border-white/[0.06] bg-gradient-to-br from-charcoal to-near-black p-4 shadow-lg">
                  {/* Card header */}
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full">
                        <img src="/models/simsi2.PNG" alt="Simi" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-warm-cream">Simi</p>
                        <p className="text-[8px] text-warm-cream/30">@simiskin</p>
                      </div>
                    </div>
                    <div className="rounded-full bg-gold/15 px-2.5 py-1">
                      <p className="text-[8px] font-semibold text-gold">Devoted</p>
                    </div>
                  </div>

                  {/* Routine title */}
                  <div className="mb-2.5 text-center">
                    <p className="text-[8px] tracking-[0.15em] uppercase text-gold-muted">Evening Ritual</p>
                    <h4 className="font-[family-name:var(--font-playfair)] text-sm italic text-warm-cream">
                      The Glass Skin PM
                    </h4>
                  </div>

                  {/* Product list on card */}
                  <div className="mb-3 space-y-1">
                    {heroSteps.map((step, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-2.5 py-1.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full overflow-hidden">
                          <img src={step.img} alt={step.product} className="h-full w-full object-cover" />
                        </div>
                        <span className="flex-1 truncate text-[9px] text-warm-cream/60">{step.product}</span>
                        <span className={`text-[7px] font-semibold ${step.freq === "Daily" ? "text-gold/60" : "text-blush/60"}`}>
                          {step.freq}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Card footer — streak + stats */}
                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px]">🔥</span>
                      <span className="text-[9px] font-semibold text-sage">48 days</span>
                    </div>
                    <span className="text-[9px] text-warm-cream/30">5/5 complete</span>
                    <span className="text-[8px] font-medium tracking-wider text-gold-muted">sinfulyurs</span>
                  </div>
                </div>

                {/* Share button */}
                <div className="animate-fade-in stagger-3 mt-4">
                  <span className="inline-block rounded-full bg-gold px-7 py-2.5 text-[12px] font-semibold text-obsidian animate-pulse-gold">
                    Share Your Ritual
                  </span>
                </div>
              </div>
            )}

            {/* ── Phase: Share sheet over routine card ── */}
            {phase === "share" && (
              <div className="relative flex flex-1 flex-col">
                {/* Dimmed routine card behind */}
                <div className="flex flex-1 flex-col items-center justify-center px-1 opacity-25">
                  <div className="w-full rounded-2xl border border-white/[0.06] bg-gradient-to-br from-charcoal to-near-black p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="h-7 w-7 shrink-0 overflow-hidden rounded-full">
                        <img src="/models/simsi2.PNG" alt="Simi" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold text-warm-cream">Simi</p>
                        <p className="text-[8px] text-warm-cream/30">@simiskin</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <h4 className="font-[family-name:var(--font-playfair)] text-sm italic text-warm-cream">The Glass Skin PM</h4>
                    </div>
                    <div className="mt-2 space-y-1">
                      {heroSteps.slice(0, 3).map((step, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.03] px-2.5 py-1.5">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full overflow-hidden">
                            <img src={step.img} alt={step.product} className="h-full w-full object-cover" />
                          </div>
                          <span className="text-[9px] text-warm-cream/60">{step.product}</span>
                        </div>
                      ))}
                      <p className="text-center text-[8px] text-warm-cream/20">+2 more</p>
                    </div>
                  </div>
                </div>

                {/* Share sheet overlay */}
                <div className="absolute inset-x-0 bottom-0 animate-slide-up">
                  <div className="rounded-t-[20px] border-t border-white/[0.08] bg-charcoal/95 backdrop-blur-md p-5 pb-6">
                    <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-warm-cream/20" />

                    <p className="mb-4 text-center text-xs font-semibold text-warm-cream/60">
                      Share your ritual
                    </p>

                    <div className="mb-4 grid grid-cols-4 gap-3">
                      {[
                        { name: "Instagram", src: "/icons/icons8-instagram-logo-48.svg", invert: false },
                        { name: "Stories", src: "/icons/icons8-instagram-logo-48.svg", invert: false },
                        { name: "Messages", src: "/icons/icons8-imessage-48.svg", invert: false },
                        { name: "TikTok", src: "/icons/icons8-tiktok-50.svg", invert: true },
                      ].map((app) => (
                        <div key={app.name} className="flex flex-col items-center gap-1.5">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-near-black shadow-lg overflow-hidden">
                            <img
                              src={app.src}
                              alt={app.name}
                              className="h-10 w-10"
                              style={app.invert ? { filter: "brightness(0) invert(1)" } : undefined}
                            />
                          </div>
                          <span className="text-[8px] text-warm-cream/40">
                            {app.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-1.5">
                      {["Copy Link", "Save Image"].map((opt) => (
                        <div
                          key={opt}
                          className="flex items-center gap-2.5 rounded-xl bg-near-black/60 px-3.5 py-2.5"
                        >
                          <span className="text-sm">
                            {opt === "Copy Link" ? "🔗" : "💾"}
                          </span>
                          <span className="text-[11px] text-warm-cream/50">
                            {opt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── Phase: Social feed ── */}
            {phase === "feed" && (
              <div className="animate-crossfade-in flex flex-1 flex-col">
                {/* Feed header */}
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="font-[family-name:var(--font-playfair)] text-base italic text-warm-cream">
                    Feed
                  </h4>
                  <div className="flex gap-2">
                    <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[8px] font-semibold text-gold">Following</span>
                    <span className="rounded-full bg-white/[0.04] px-2.5 py-1 text-[8px] text-warm-cream/30">Discover</span>
                  </div>
                </div>

                {/* Feed post 1 — Shared routine (Simi's post appearing in feed) */}
                <div className="animate-fade-in mb-2.5 rounded-xl border border-white/[0.05] bg-charcoal/40 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full">
                      <img src="/models/simsi.jpeg" alt="Simi" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold text-warm-cream">Simi</p>
                      <p className="text-[7px] text-warm-cream/25">just now</p>
                    </div>
                    <span className="rounded bg-sage/15 px-1.5 py-0.5 text-[7px] font-semibold text-sage">48 day streak</span>
                  </div>
                  <p className="mb-2 text-[10px] text-warm-cream/60">Completed my Glass Skin PM ritual tonight ✨</p>
                  {/* Mini routine preview */}
                  <div className="mb-2 flex gap-1.5">
                    {heroSteps.slice(0, 4).map((step, i) => (
                      <div key={i} className="h-7 w-7 shrink-0 overflow-hidden rounded-full border border-white/[0.06]">
                        <img src={step.img} alt={step.product} className="h-full w-full object-cover" />
                      </div>
                    ))}
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/[0.04] text-[8px] text-warm-cream/30">+1</div>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] text-warm-cream/30">
                    <span>♡ 24</span>
                    <span>💬 3</span>
                    <span className="ml-auto text-[8px] text-gold/50">Clone routine</span>
                  </div>
                </div>

                {/* Feed post 2 — Product review/rating */}
                <div className="animate-fade-in stagger-2 mb-2.5 rounded-xl border border-white/[0.05] bg-charcoal/40 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/30 text-[8px] font-bold text-obsidian">J</div>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold text-warm-cream">Jess</p>
                      <p className="text-[7px] text-warm-cream/25">2h ago</p>
                    </div>
                  </div>
                  <p className="mb-1.5 text-[10px] text-warm-cream/60">
                    Finally found my holy grail serum
                  </p>
                  {/* Tagged product with rating */}
                  <div className="mb-2 flex items-center gap-2 rounded-lg bg-white/[0.03] px-2.5 py-2">
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-lg border border-white/[0.06]">
                      <img src="/products/OrdinaryNiacimindeSerum.WEBP" alt="Niacinamide" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-[9px] font-medium text-warm-cream/70">The Ordinary Niacinamide</p>
                      <div className="flex items-center gap-1">
                        <span className="text-[9px] text-gold">★★★★★</span>
                        <span className="text-[7px] text-warm-cream/25">5.0</span>
                      </div>
                    </div>
                    <span className="shrink-0 rounded bg-gold/10 px-1.5 py-0.5 text-[7px] font-semibold text-gold">Tagged</span>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] text-warm-cream/30">
                    <span>♡ 89</span>
                    <span>💬 12</span>
                    <span>📎 Save</span>
                  </div>
                </div>

                {/* Feed post 3 — Quick shared routine card (peek) */}
                <div className="animate-fade-in stagger-3 rounded-xl border border-white/[0.05] bg-charcoal/40 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-sage/40 text-[8px] font-bold text-obsidian">R</div>
                    <div className="flex-1">
                      <p className="text-[10px] font-semibold text-warm-cream">Riya</p>
                      <p className="text-[7px] text-warm-cream/25">5h ago</p>
                    </div>
                    <span className="rounded bg-blush/15 px-1.5 py-0.5 text-[7px] font-semibold text-blush">Sinful</span>
                  </div>
                  <p className="text-[10px] text-warm-cream/60">My 12-step AM routine is unhinged and I love it 💀</p>
                  <div className="mt-1.5 flex items-center gap-3 text-[9px] text-warm-cream/30">
                    <span>♡ 142</span>
                    <span>💬 31</span>
                    <span className="ml-auto text-[8px] text-gold/50">Clone routine</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/* MAIN PAGE                                                   */
/* ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const heroRef = useInView();
  const problemRef = useInView(0.2);
  const ritualRef = useInView();
  const routinesRef = useInView();
  const featuresRef = useInView();
  const socialRef = useInView();
  const sinsRef = useInView();
  const ctaRef = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* ─── NAV ─── */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/[0.04] bg-obsidian/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          <a
            href="#"
            className="font-[family-name:var(--font-playfair)] text-xl italic text-warm-cream"
          >
            sinfuly<span className="text-gold">urs</span>
          </a>
          <a
            href="#waitlist"
            className="rounded-full bg-gold px-5 py-2 text-xs font-semibold text-obsidian transition-all hover:bg-gold-light"
          >
            Join waitlist
          </a>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* HERO — Split layout: text left, animated phone right       */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 pt-20 pb-12">
        {/* Ambient gradients */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[15%] h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[120px]" />
          <div className="absolute bottom-[20%] right-[15%] h-[400px] w-[400px] rounded-full bg-blush/[0.04] blur-[100px]" />
        </div>

        <div
          ref={heroRef.ref}
          className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1fr_auto] md:gap-16"
        >
          {/* Left column — text content */}
          <div className="order-1 text-center md:text-left">
            <p
              className={`mb-4 text-xs font-medium tracking-[0.3em] uppercase text-gold-muted ${
                isMounted ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Where your beauty routine lives
            </p>

            <h1
              className={`mb-6 font-[family-name:var(--font-playfair)] text-[clamp(2.2rem,6vw,4.5rem)] font-normal leading-[1.08] italic ${
                isMounted ? "animate-fade-up stagger-1" : "opacity-0"
              }`}
            >
              Log it.{" "}
              <span className="text-gold">Share it.</span>
              <br />
              <span className="text-warm-cream/40">Own it.</span>
            </h1>

            <p
              className={`mb-5 max-w-lg text-base font-light leading-relaxed text-warm-cream/50 md:text-lg ${
                isMounted ? "animate-fade-up stagger-2" : "opacity-0"
              }`}
            >
              The place where skincare people log their rituals, share what they
              actually use, and discover routines from real people — not
              influencers.
            </p>

            {/* Typewriter */}
            <div
              className={`mb-8 h-8 ${
                isMounted ? "animate-fade-up stagger-2" : "opacity-0"
              }`}
            >
              <p className="text-sm text-warm-cream/30">
                Right now, someone is{" "}
                {isMounted && (
                  <TypewriterText
                    texts={[
                      "logging their 7-step PM ritual",
                      "sharing a retinol routine that actually works",
                      "cloning a routine they found at 2am",
                      "hitting a 60-day streak",
                      "adding a new holy grail product",
                      "discovering their next obsession",
                    ]}
                    className="text-warm-cream/60"
                  />
                )}
              </p>
            </div>

            {/* Email signup */}
            <form
              onSubmit={handleSubmit}
              className={`flex max-w-md flex-col gap-3 sm:flex-row ${
                isMounted ? "animate-fade-up stagger-3" : "opacity-0"
              } mx-auto md:mx-0`}
            >
              {!submitted ? (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="w-full min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-charcoal px-5 py-3.5 text-sm text-warm-cream placeholder:text-warm-cream/30 outline-none transition-all focus:border-gold/50 sm:min-w-[240px]"
                  />
                  <button
                    type="submit"
                    className="animate-pulse-gold shrink-0 whitespace-nowrap rounded-xl bg-gold px-8 py-3.5 text-sm font-semibold text-obsidian transition-all hover:bg-gold-light"
                  >
                    Get early access
                  </button>
                </>
              ) : (
                <div className="animate-fade-up w-full rounded-xl border border-sage/30 bg-sage/10 px-6 py-4 text-center">
                  <p className="text-sm font-medium text-sage">
                    You&apos;re in. We&apos;ll be in touch.
                  </p>
                </div>
              )}
            </form>

            <p
              className={`mt-4 text-[11px] text-warm-cream/25 ${
                isMounted ? "animate-fade-up stagger-4" : "opacity-0"
              } md:text-left text-center`}
            >
              iOS app launching soon · Free to use · No algorithm, no ads
            </p>
          </div>

          {/* Right column — animated phone demo */}
          <div
            className={`order-2 flex justify-center ${
              isMounted ? "animate-fade-up stagger-2" : "opacity-0"
            }`}
          >
            <AnimatedPhoneDemo />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-warm-cream/20"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* LIVE ACTIVITY — FOMO ticker                                */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.04] bg-near-black/50 py-4 overflow-hidden">
        <ActivityTicker />
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* THE PROBLEM — Emotional pain point                         */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div ref={problemRef.ref} className="mx-auto max-w-3xl px-5">
          <div
            className={`text-center ${
              problemRef.inView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <p className="mb-8 text-xs font-semibold tracking-[0.3em] uppercase text-warm-cream/20">
              Sound familiar?
            </p>
            <h2 className="mb-8 font-[family-name:var(--font-playfair)] text-[clamp(1.5rem,5vw,3rem)] leading-[1.3] italic text-warm-cream/80">
              You have a skincare routine you&apos;ve spent{" "}
              <span className="text-gold">months perfecting</span>. You switch
              products, try new things, build habits. But{" "}
              <span className="text-blush">nobody sees it</span>. It lives in
              your bathroom, in your head, in a Notes app screenshot you sent a
              friend once.
            </h2>
            <div className="mx-auto mb-10 h-px w-16 bg-gold/30" />
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-warm-cream/35">
              Meanwhile, everyone on Reddit is asking &quot;what&apos;s your routine?&quot;
              and you&apos;re writing the same comment for the fifth time. Your
              shelf is a museum. Where&apos;s the guest book?
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* THE ANSWER — Quick identity statement                      */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.04] bg-dark-warm py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
            Introducing sinfulyurs
          </p>
          <h2 className="mb-6 font-[family-name:var(--font-playfair)] text-[clamp(2rem,5vw,3.5rem)] italic leading-tight">
            Letterboxd, but for{" "}
            <span className="text-gold">beauty</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-warm-cream/45">
            Log every step of your AM and PM routines. Share them with a
            community that gets it. Discover what real people use — not what
            they&apos;re paid to recommend. Clone routines you love. Build your
            beauty identity in one place.
          </p>

          {/* Three pillars */}
          <div className="mx-auto mt-14 grid max-w-3xl gap-8 md:grid-cols-3">
            {[
              {
                num: "01",
                title: "Log your ritual",
                desc: "Every product, every step, AM and PM. Your routine deserves to be documented.",
              },
              {
                num: "02",
                title: "Share your shelf",
                desc: "Your products build our database. Every routine shared makes the community smarter.",
              },
              {
                num: "03",
                title: "Discover what works",
                desc: "Browse routines from real people. Find your next holy grail. Clone it in one tap.",
              },
            ].map((pillar) => (
              <div key={pillar.num} className="text-left">
                <p className="mb-2 font-[family-name:var(--font-playfair)] text-3xl italic text-gold/40">
                  {pillar.num}
                </p>
                <h3 className="mb-2 text-sm font-semibold tracking-wide uppercase text-warm-cream">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed text-warm-cream/35">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* THE RITUAL — Interactive app experience                    */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div ref={ritualRef.ref} className="mx-auto max-w-6xl px-5">
          <div className="mb-6 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              Inside the app
            </p>
            <h2
              className={`font-[family-name:var(--font-playfair)] text-3xl italic md:text-5xl ${
                ritualRef.inView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              This is what your{" "}
              <span className="text-gold">ritual</span> looks like
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-warm-cream/40">
              Every morning and every night. Check off each step. Watch your
              streak grow. Feel the satisfaction of a routine{" "}
              <span className="italic text-warm-cream/60">completed</span>.
            </p>
          </div>

          {/* Simulated check-off animation text */}
          <div
            className={`mb-12 text-center ${
              ritualRef.inView ? "animate-fade-up stagger-1" : "opacity-0"
            }`}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/20 bg-sage/5 px-4 py-2">
              <div className="h-2 w-2 rounded-full bg-sage animate-pulse" />
              <span className="text-xs text-sage">
                Priya just completed her PM ritual — 62 day streak
              </span>
            </div>
          </div>

          {/* Scrollable phone mockups */}
          <div
            ref={routinesRef.ref}
            className="scrollbar-hide -mx-5 flex gap-8 overflow-x-auto px-5 pb-4 md:justify-center md:overflow-x-visible"
          >
            {routines.map((r, i) => (
              <PhoneMockup
                key={i}
                routine={r}
                className={`${
                  routinesRef.inView
                    ? `animate-fade-up stagger-${i + 2}`
                    : "opacity-0"
                } ${i === 1 ? "animate-float" : ""}`}
              />
            ))}
          </div>

          {/* Beneath mockups — emotional nudge */}
          <p
            className={`mt-10 text-center text-sm italic text-warm-cream/25 ${
              routinesRef.inView ? "animate-fade-up stagger-5" : "opacity-0"
            }`}
          >
            &quot;It&apos;s not about being perfect. It&apos;s about showing up.&quot;
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* SOCIAL PROOF — Stats bar                                   */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.04] bg-near-black/50 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-5 text-center md:gap-16">
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-3xl italic text-gold">
              <AnimatedCounter target={2847} />+
            </p>
            <p className="mt-1 text-xs tracking-[0.1em] uppercase text-warm-cream/30">
              On the waitlist
            </p>
          </div>
          <div className="hidden h-8 w-px bg-white/[0.06] md:block" />
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-3xl italic text-gold">
              <AnimatedCounter target={14200} />+
            </p>
            <p className="mt-1 text-xs tracking-[0.1em] uppercase text-warm-cream/30">
              Routines logged
            </p>
          </div>
          <div className="hidden h-8 w-px bg-white/[0.06] md:block" />
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-3xl italic text-gold">
              <AnimatedCounter target={4300} />+
            </p>
            <p className="mt-1 text-xs tracking-[0.1em] uppercase text-warm-cream/30">
              Products added
            </p>
          </div>
          <div className="hidden h-8 w-px bg-white/[0.06] md:block" />
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-3xl italic text-gold">
              93%
            </p>
            <p className="mt-1 text-xs tracking-[0.1em] uppercase text-warm-cream/30">
              Said &quot;finally&quot;
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* COMMUNITY — The social platform                            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div ref={socialRef.ref} className="mx-auto max-w-5xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              The community
            </p>
            <h2
              className={`font-[family-name:var(--font-playfair)] text-3xl italic md:text-5xl ${
                socialRef.inView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Your shelf has a{" "}
              <span className="text-gold">story</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-warm-cream/40">
              Every product you add builds a community database. Every routine
              you share helps someone else find what works. This isn&apos;t content
              creation — it&apos;s just being honest about what you use.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <FeedCard
              user="mayaskin"
              avatar="M"
              avatarColor="bg-blush"
              content="Finally found a retinol that doesn't make me peel like a snake. Added tretinoin 0.025% to my PM routine and my skin has never been this smooth. 62 days in. 🔥"
              likes={234}
              comments={47}
              timeAgo="2h ago"
            />
            <FeedCard
              user="alexglow"
              avatar="A"
              avatarColor="bg-sage"
              content="Cloned @priya's double cleanse routine and I'm never going back. The Banila Co + La Roche-Posay combo is chef's kiss. Day 12 and my pores are visibly smaller."
              likes={189}
              comments={31}
              timeAgo="5h ago"
            />
            <FeedCard
              user="skincarejunkie"
              avatar="S"
              avatarColor="bg-gold"
              content="My weekly Sin Report says I'm 'Devoted' now. 13/14 routines completed. $4.20/day in products. My bathroom shelf has its own zip code and I regret nothing."
              likes={412}
              comments={88}
              timeAgo="8h ago"
            />
          </div>

          {/* Community-built database callout */}
          <div
            className={`mt-10 rounded-2xl border border-gold/10 bg-gold/[0.03] p-8 text-center ${
              socialRef.inView ? "animate-fade-up stagger-4" : "opacity-0"
            }`}
          >
            <p className="mb-2 font-[family-name:var(--font-playfair)] text-xl italic text-warm-cream/80">
              Every routine shared makes us all smarter.
            </p>
            <p className="text-sm text-warm-cream/35">
              You add your products. We build the database. The community
              discovers what actually works — for skin types like theirs, from
              people like them.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FEATURES GRID                                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.04] bg-near-black/30 py-20 md:py-28">
        <div ref={featuresRef.ref} className="mx-auto max-w-5xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              Built for ritual
            </p>
            <h2
              className={`font-[family-name:var(--font-playfair)] text-3xl italic md:text-5xl ${
                featuresRef.inView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Everything your routine{" "}
              <span className="text-gold">deserves</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group rounded-2xl border border-white/[0.04] bg-near-black/60 p-7 transition-all hover:border-gold/20 hover:bg-near-black ${
                  featuresRef.inView
                    ? `animate-fade-up stagger-${i + 1}`
                    : "opacity-0"
                }`}
              >
                <div className="mb-3">
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 className="mb-1.5 text-base font-semibold text-warm-cream">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-warm-cream/40">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* THE SIN SYSTEM                                             */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32">
        <div ref={sinsRef.ref} className="mx-auto max-w-5xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              The sin system
            </p>
            <h2
              className={`font-[family-name:var(--font-playfair)] text-3xl italic md:text-5xl ${
                sinsRef.inView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Seven <span className="text-gold">deadly sins</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-warm-cream/40">
              Your beauty behavior mapped to the seven sins. Build your sin
              level from Casual to Sinful. Wear your obsession like a badge of
              honor.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {sins.map((sin, i) => (
              <div
                key={i}
                className={`rounded-2xl border border-white/[0.04] bg-white/[0.02] p-4 text-center transition-all hover:border-gold/20 ${
                  sinsRef.inView
                    ? `animate-fade-up stagger-${Math.min(i + 1, 6)}`
                    : "opacity-0"
                }`}
              >
                <div className="mb-2 flex items-center justify-center">
                  <SinIcon name={sin.icon} />
                </div>
                <p className="font-[family-name:var(--font-playfair)] text-sm italic text-gold">
                  {sin.name}
                </p>
                <p className="mt-1 text-[10px] leading-snug text-warm-cream/35">
                  {sin.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Sin levels */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {["Casual", "Committed", "Devoted", "Obsessed", "Sinful"].map(
              (level, i) => (
                <span
                  key={level}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium ${
                    i === 0
                      ? "bg-gold-muted/10 text-gold-muted"
                      : i < 3
                      ? "bg-gold/10 text-gold"
                      : "bg-gold/20 text-gold"
                  } ${i === 4 ? "ring-1 ring-gold/40" : ""}`}
                >
                  {level}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* WEEKLY SIN REPORT PREVIEW                                  */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="border-y border-white/[0.04] bg-dark-warm py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Report mockup */}
            <div className="mx-auto w-full max-w-xs">
              <div className="rounded-[28px] border border-white/[0.08] bg-gradient-to-b from-near-black to-dark-warm p-6">
                <div className="mb-4 text-center">
                  <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-gold">
                    Weekly Sin Report
                  </p>
                  <p className="mt-1 font-[family-name:var(--font-playfair)] text-sm italic text-warm-cream/50">
                    This week in ritual
                  </p>
                </div>
                <div className="mb-4 text-center">
                  <p className="font-[family-name:var(--font-playfair)] text-5xl italic text-gold">
                    13/14
                  </p>
                  <p className="mt-1 text-[10px] text-warm-cream/30">
                    routines completed
                  </p>
                </div>
                <div className="mb-4 flex justify-around">
                  {[
                    { val: "23", label: "day streak" },
                    { val: "93%", label: "consistency" },
                    { val: "$4.20", label: "per day" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-[family-name:var(--font-playfair)] text-lg italic text-warm-cream">
                        {s.val}
                      </p>
                      <p className="text-[8px] text-warm-cream/30">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-gold/[0.08] p-3 text-center">
                  <p className="text-[9px] tracking-[0.12em] uppercase text-gold-muted">
                    Sin Level
                  </p>
                  <p className="font-[family-name:var(--font-playfair)] text-xl italic text-gold">
                    Devoted
                  </p>
                </div>
                <div className="mt-4 text-center">
                  <span className="inline-block rounded-full bg-gold px-5 py-2 text-[11px] font-semibold text-obsidian">
                    Share Your Report
                  </span>
                </div>
              </div>
            </div>

            {/* Report description */}
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
                Every Sunday
              </p>
              <h2 className="mb-4 font-[family-name:var(--font-playfair)] text-3xl italic md:text-4xl">
                Your week in <span className="text-gold">ritual</span>
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-warm-cream/50">
                Every Sunday, get a beautifully designed report of your week —
                consistency score, streak progress, cost-per-day, and your
                current sin level. Share it on Instagram Stories or keep it
                private. Your choice.
              </p>
              <div className="space-y-3">
                {[
                  "Consistency tracking with real data",
                  "Shareable cards for Instagram & TikTok",
                  "Sin level progression over time",
                  "Cost-per-day analysis of your routine",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage text-[9px] font-bold text-obsidian">
                      ✓
                    </div>
                    <p className="text-sm text-warm-cream/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* TESTIMONIALS — Emotional proof                             */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              From our waitlist
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic md:text-5xl">
              They said{" "}
              <span className="text-gold">&quot;finally&quot;</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "I've been waiting for something like this. Every skincare app feels like a doctor's office. This feels like it was made for people who actually love beauty.",
                name: "Sarah K.",
                detail: "12-step routine · Obsessed",
              },
              {
                quote:
                  "The Letterboxd for beauty comparison sold me immediately. I want to log my routines the same way I log films. And the dark mode aesthetic? Perfect.",
                name: "James L.",
                detail: "6-step routine · Committed",
              },
              {
                quote:
                  "Finally an app that doesn't shame me for having 9 products in my PM routine. The sin system is hilarious and exactly the kind of energy I want.",
                name: "Priya M.",
                detail: "9-step routine · Devoted",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-6"
              >
                <p className="mb-4 font-[family-name:var(--font-playfair)] text-[15px] italic leading-relaxed text-warm-cream/70">
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-6 rounded-full bg-gold/40" />
                  <p className="text-xs font-semibold text-warm-cream">
                    {t.name}
                  </p>
                  <p className="text-[10px] text-warm-cream/30">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════ */}
      {/* FINAL CTA — Urgency + emotion                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      <section
        id="waitlist"
        className="relative border-t border-white/[0.04] py-24 md:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[150px]" />
        </div>

        <div
          ref={ctaRef.ref}
          className="relative z-10 mx-auto max-w-2xl px-5 text-center"
        >
          {/* Urgency line */}
          <div
            className={`mb-8 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.05] px-4 py-1.5 ${
              ctaRef.inView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            <div className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-xs text-gold/80">
              <AnimatedCounter target={2847} /> people ahead of you
            </span>
          </div>

          <h2
            className={`mb-4 font-[family-name:var(--font-playfair)] text-4xl italic md:text-6xl ${
              ctaRef.inView ? "animate-fade-up stagger-1" : "opacity-0"
            }`}
          >
            Your routine is{" "}
            <span className="text-gold">worth remembering.</span>
          </h2>
          <p
            className={`mx-auto mb-8 max-w-md text-sm text-warm-cream/40 ${
              ctaRef.inView ? "animate-fade-up stagger-2" : "opacity-0"
            }`}
          >
            Every ritual you&apos;ve built. Every product you swear by. Every
            step you never skip. It all deserves a home.
          </p>

          <form
            onSubmit={handleSubmit}
            className={`mx-auto flex max-w-md flex-col gap-3 sm:flex-row ${
              ctaRef.inView ? "animate-fade-up stagger-3" : "opacity-0"
            }`}
          >
            {!submitted ? (
              <>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  className="w-full min-w-0 flex-1 rounded-xl border border-white/[0.08] bg-charcoal px-5 py-3.5 text-sm text-warm-cream placeholder:text-warm-cream/30 outline-none transition-all focus:border-gold/50 sm:min-w-[240px]"
                />
                <button
                  type="submit"
                  className="animate-pulse-gold shrink-0 whitespace-nowrap rounded-xl bg-gold px-8 py-3.5 text-sm font-semibold text-obsidian transition-all hover:bg-gold-light"
                >
                  Get early access
                </button>
              </>
            ) : (
              <div className="animate-fade-up w-full rounded-xl border border-sage/30 bg-sage/10 px-6 py-4 text-center">
                <p className="text-sm font-medium text-sage">
                  You&apos;re on the list. Your routine awaits.
                </p>
              </div>
            )}
          </form>

          <p className="mt-6 text-[11px] text-warm-cream/20">
            Free to use. No credit card required. iOS launching 2026.
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.04] py-10">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="font-[family-name:var(--font-playfair)] text-2xl italic text-warm-cream">
                sinfuly<span className="text-gold">urs</span>
              </p>
              <p className="mt-1 text-xs text-warm-cream/25">
                Your routine. Sinfully yours.
              </p>
            </div>
            <div className="flex gap-8 text-xs text-warm-cream/30">
              <a href="#" className="transition-colors hover:text-gold">
                Instagram
              </a>
              <a href="#" className="transition-colors hover:text-gold">
                TikTok
              </a>
              <a href="#" className="transition-colors hover:text-gold">
                Twitter
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-white/[0.04] pt-6 text-center text-[10px] text-warm-cream/15">
            &copy; 2026 sinfulyurs. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
