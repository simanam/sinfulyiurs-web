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
function AnimatedCounter({ target, duration = 2000 }: { target: number; duration?: number }) {
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

/* ─── Fake routine data ─── */
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
  { emoji: "🪞", name: "Vanity", desc: "30+ days of progress photos" },
  { emoji: "🧴", name: "Gluttony", desc: "10+ products in one routine" },
  { emoji: "💰", name: "Greed", desc: "Routine costs over $15/day" },
  { emoji: "😍", name: "Lust", desc: "Saved 20+ routines" },
  { emoji: "👀", name: "Envy", desc: "Cloned 5+ routines" },
  { emoji: "🔥", name: "Pride", desc: "60-day streak achieved" },
  { emoji: "😴", name: "Sloth", desc: "Skipped PM 3+ times" },
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
          {routine.user} · Sin Level:{routine.level}
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

/* ═══════════════════════════════════════════════════════════ */
/* MAIN PAGE                                                   */
/* ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const heroRef = useInView();
  const featuresRef = useInView();
  const routinesRef = useInView();
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
          <a href="#" className="font-[family-name:var(--font-playfair)] text-xl italic text-warm-cream">
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

      {/* ─── HERO ─── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-14">
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[20%] top-[15%] h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[120px]" />
          <div className="absolute bottom-[20%] right-[15%] h-[400px] w-[400px] rounded-full bg-blush/[0.04] blur-[100px]" />
        </div>

        <div
          ref={heroRef.ref}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <p
            className={`mb-4 text-xs font-medium tracking-[0.3em] uppercase text-gold-muted ${
              isMounted ? "animate-fade-up" : "opacity-0"
            }`}
          >
            Your beauty routine tracker
          </p>
          <h1
            className={`mb-6 font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,8vw,5.5rem)] font-normal leading-[1.05] italic ${
              isMounted ? "animate-fade-up stagger-1" : "opacity-0"
            }`}
          >
            Your routine.{" "}
            <span className="text-gold">Sinfully yours.</span>
          </h1>
          <p
            className={`mx-auto mb-10 max-w-xl text-base font-light leading-relaxed text-warm-cream/50 md:text-lg ${
              isMounted ? "animate-fade-up stagger-2" : "opacity-0"
            }`}
          >
            Track your AM & PM skincare rituals. Discover what actually works.
            Join a community that takes beauty as seriously as you do.
          </p>

          {/* Email signup */}
          <form
            onSubmit={handleSubmit}
            className={`mx-auto flex max-w-md flex-col gap-3 sm:flex-row ${
              isMounted ? "animate-fade-up stagger-3" : "opacity-0"
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
                  You&apos;re in. We&apos;ll be in touch.
                </p>
              </div>
            )}
          </form>

          <p
            className={`mt-4 text-[11px] text-warm-cream/25 ${
              isMounted ? "animate-fade-up stagger-4" : "opacity-0"
            }`}
          >
            iOS app launching soon. Be the first to know.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-warm-cream/20">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ─── SOCIAL PROOF BAR ─── */}
      <section className="border-y border-white/[0.04] bg-near-black/50 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-5 text-center md:gap-16">
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-3xl italic text-gold">
              <AnimatedCounter target={2847} />+
            </p>
            <p className="mt-1 text-xs tracking-[0.1em] uppercase text-warm-cream/30">
              Waitlist signups
            </p>
          </div>
          <div className="hidden h-8 w-px bg-white/[0.06] md:block" />
          <div>
            <p className="font-[family-name:var(--font-playfair)] text-3xl italic text-gold">
              <AnimatedCounter target={14200} />+
            </p>
            <p className="mt-1 text-xs tracking-[0.1em] uppercase text-warm-cream/30">
              Routines planned
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

      {/* ─── APP SHOWCASE — PHONE MOCKUPS ─── */}
      <section className="py-20 md:py-28">
        <div ref={routinesRef.ref} className="mx-auto max-w-6xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              Real routines, real products
            </p>
            <h2
              className={`font-[family-name:var(--font-playfair)] text-3xl italic md:text-5xl ${
                routinesRef.inView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              See what your routine <span className="text-gold">looks like</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-warm-cream/40">
              Step-by-step walkthroughs with real products. Track AM and PM
              separately. Build streaks that prove your devotion.
            </p>
          </div>

          {/* Scrollable phone mockups */}
          <div className="scrollbar-hide -mx-5 flex gap-8 overflow-x-auto px-5 pb-4 md:justify-center md:overflow-x-visible">
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
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section className="border-y border-white/[0.04] bg-near-black/30 py-20 md:py-28">
        <div ref={featuresRef.ref} className="mx-auto max-w-5xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              More than a tracker
            </p>
            <h2
              className={`font-[family-name:var(--font-playfair)] text-3xl italic md:text-5xl ${
                featuresRef.inView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Everything your routine <span className="text-gold">deserves</span>
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

      {/* ─── SOCIAL / COMMUNITY ─── */}
      <section className="py-20 md:py-28">
        <div ref={socialRef.ref} className="mx-auto max-w-5xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              Beauty community
            </p>
            <h2
              className={`font-[family-name:var(--font-playfair)] text-3xl italic md:text-5xl ${
                socialRef.inView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Letterboxd, but for <span className="text-gold">beauty</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-warm-cream/40">
              Share your routine. Discover what works for others. Build a beauty
              identity that&apos;s authentically yours.
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
        </div>
      </section>

      {/* ─── THE SIN SYSTEM ─── */}
      <section className="border-y border-white/[0.04] bg-dark-warm py-20 md:py-28">
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
              level from Casual to Sinful. Wear your obsession like a badge
              of honor.
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
                <div className="mb-2 text-2xl">{sin.emoji}</div>
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

      {/* ─── WEEKLY SIN REPORT PREVIEW ─── */}
      <section className="py-20 md:py-28">
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
                      <p className="text-[8px] text-warm-cream/30">{s.label}</p>
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

      {/* ─── TESTIMONIALS / QUOTES ─── */}
      <section className="border-y border-white/[0.04] bg-near-black/40 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.3em] uppercase text-gold">
              From our waitlist
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl italic md:text-5xl">
              They said <span className="text-gold">&quot;finally&quot;</span>
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

      {/* ─── FINAL CTA ─── */}
      <section id="waitlist" className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.04] blur-[150px]" />
        </div>

        <div
          ref={ctaRef.ref}
          className="relative z-10 mx-auto max-w-2xl px-5 text-center"
        >
          <h2
            className={`mb-4 font-[family-name:var(--font-playfair)] text-4xl italic md:text-6xl ${
              ctaRef.inView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            Your routine <span className="text-gold">starts here.</span>
          </h2>
          <p
            className={`mx-auto mb-8 max-w-md text-sm text-warm-cream/40 ${
              ctaRef.inView ? "animate-fade-up stagger-1" : "opacity-0"
            }`}
          >
            Join thousands of beauty lovers building their perfect routine. Be
            the first to get access when we launch.
          </p>

          <form
            onSubmit={handleSubmit}
            className={`mx-auto flex max-w-md flex-col gap-3 sm:flex-row ${
              ctaRef.inView ? "animate-fade-up stagger-2" : "opacity-0"
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
