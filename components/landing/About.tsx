"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircle, Timer, Globe, ShieldCheck } from "lucide-react";

interface Stat {
  icon: typeof MessageCircle;
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { icon: MessageCircle, value: "12M+", label: "Conversations resolved" },
  { icon: Timer, value: "<2s", label: "Median first response" },
  { icon: Globe, value: "47", label: "Languages supported" },
  { icon: ShieldCheck, value: "99.98%", label: "Uptime, every quarter" },
];

const aboutStyles = `
.about-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1000px;
  height: 640px;
  transform: translate(-50%, -50%);
  background: radial-gradient(ellipse at center, rgb(15 139 108 / 0.07), transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.about-panel {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-2xl);
  padding: 1.875rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition:
    transform .45s var(--ease-smooth),
    box-shadow .45s var(--ease-smooth),
    border-color .45s var(--ease-smooth),
    background-color .45s var(--ease-smooth);
}

.about-panel::before {
  content: "";
  position: absolute;
  top: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 2px;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  transform: scaleX(0);
  transform-origin: center;
  transition: transform .7s cubic-bezier(.22,1,.36,1);
}

.about-panel:hover {
  transform: translateY(-10px);
  border-color: var(--color-primary-border);
  box-shadow: var(--glow-mint-md);
  background: linear-gradient(180deg, white, #fcfffd);
}

.about-panel:hover::before {
  transform: scaleX(1);
}

.about-stat {
  position: relative;
  padding: 1.375rem 1.25rem;
  border-radius: var(--radius-lg);
  background: var(--color-base-alt);
  transition: background-color .45s var(--ease-smooth), transform .45s var(--ease-smooth);
}

.about-stat:hover {
  background: var(--color-primary-subtle);
  transform: translateY(-3px);
}

.about-stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  border-radius: var(--radius-md);
  background: linear-gradient(155deg, var(--color-primary-subtle), var(--color-primary-tint));
  color: var(--color-primary);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.6);
  transition:
    transform .45s var(--ease-smooth),
    background .45s var(--ease-smooth),
    color .45s var(--ease-smooth),
    box-shadow .45s var(--ease-smooth);
}

.about-stat:hover .about-stat-icon {
  background: linear-gradient(155deg, var(--color-primary), var(--color-primary-hover));
  color: #ffffff;
  transform: rotate(-6deg) scale(1.08);
  box-shadow: var(--glow-mint-sm);
}

.about-stat-value {
  transition: color .4s var(--ease-smooth);
}

.about-stat:hover .about-stat-value {
  color: var(--color-primary);
}

.about-quote-mark {
  position: absolute;
  top: -0.5rem;
  left: -0.25rem;
  font-family: var(--font-display);
  font-size: 3.5rem;
  color: var(--color-primary-tint);
  line-height: 1;
  user-select: none;
}
`;

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.96,
  },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.1,
      delay,
      ease: easeOut,
    },
  }),
};

export function About() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: aboutStyles }} />
      <section
        id="about"
        className="relative mx-auto max-w-[1180px] px-6 py-24 sm:py-28"
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="about-glow" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-[640px] flex-col items-center text-center">
          <motion.span
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[0.8125rem] font-medium text-[var(--color-ink-secondary)] shadow-[var(--shadow-sm)]"
          >
            <Sparkles size={13} className="text-[var(--color-primary)]" />
            Why we built SupportMint
          </motion.span>

          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.15}
            className="mt-6 font-[var(--font-display)] text-[clamp(2rem,4vw,3.75rem)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)]"
          >
            Support shouldn&apos;t feel like{" "}
            <span className="italic text-[var(--color-primary)]">waiting</span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.3}
            className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-ink-tertiary)]"
          >
            One AI layer that resolves the routine, escalates the rest, and
            gets sharper with every conversation.
          </motion.p>
        </div>

        <div className="relative z-10 mt-16 grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
      <motion.div
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: "-80px" }}
  variants={fadeUp}
  custom={0.2}
  className="flex flex-col gap-6"
>
  <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-sm)]">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary-tint)] text-sm font-semibold text-[var(--color-primary)]">
        J
      </div>
      <div>
        <div className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
          Jamie Reeves
        </div>
        <div className="text-[0.8125rem] text-[var(--color-ink-muted)]">
          Head of CX, Fable Commerce
        </div>
      </div>
    </div>
    <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--color-ink-tertiary)]">
      We went from a 6-hour average reply time to under 90 seconds.
      Our team now only touches the conversations that actually need them.
    </p>
    <div className="mt-4 flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z"
            fill="var(--color-primary)"
          />
        </svg>
      ))}
    </div>
  </div>

  <p className="text-[1.0625rem] leading-relaxed text-[var(--color-ink-tertiary)]">
    We started SupportMint after watching too many good companies lose
    customers to slow tickets and tired templates. So we built an AI
    layer that actually understands your product, answers like a
    teammate would, and only hands off what genuinely needs a human.
  </p>

  <div className="flex items-center gap-3 border-t border-[var(--color-border-subtle)] pt-6">
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-semibold text-white">
      M
    </span>
    <div className="text-left">
      <div className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
        Built by a small, obsessive team
      </div>
      <div className="text-[0.8125rem] text-[var(--color-ink-muted)]">
        Shipping support tooling since day one
      </div>
    </div>
  </div>
</motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            custom={0.35}
          >
            <div className="about-panel">
              <span className="about-quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <p className="relative z-10 text-[1.0625rem] leading-relaxed text-[var(--color-ink-secondary)]">
                SupportMint cut our response time from hours to seconds,
                without losing the tone our customers expect from us.
              </p>
              <div className="mt-4 text-[0.8125rem] font-medium text-[var(--color-ink-muted)]">
                Head of Support, mid-market retail brand
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                {STATS.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true, margin: "-60px" }}
                      variants={fadeUp}
                      custom={0.45 + index * 0.18}
                      className="about-stat"
                    >
                      <div className="about-stat-icon">
                        <Icon size={21} strokeWidth={2} />
                      </div>
                      <div className="about-stat-value mt-6 font-[var(--font-display)] text-[1.5rem] font-medium tracking-[-0.02em] text-[var(--color-ink)]">
                        {stat.value}
                      </div>
                      <div className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--color-ink-tertiary)]">
                        {stat.label}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default About;