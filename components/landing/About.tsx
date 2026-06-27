"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  MessageCircle,
  Timer,
  Globe,
  ShieldCheck,
  Zap,
  Users,
  type LucideIcon,
} from "lucide-react";

interface StatCard {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
}

interface StoryCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STAT_CARDS: StatCard[] = [
  {
    icon: MessageCircle,
    value: "12M+",
    label: "Conversations resolved",
    description: "Across every channel, around the clock, without adding headcount.",
  },
  {
    icon: Timer,
    value: "<2s",
    label: "Median first response",
    description: "Customers get an answer before they even finish thinking about leaving.",
  },
  {
    icon: Globe,
    value: "47",
    label: "Languages supported",
    description: "Native-language support for every customer, with zero setup on your end.",
  },
  {
    icon: ShieldCheck,
    value: "99.98%",
    label: "Uptime, every quarter",
    description: "Enterprise-grade reliability so your support never goes dark.",
  },
];

const STORY_CARDS: StoryCard[] = [
  {
    icon: Zap,
    title: "Built from frustration",
    description:
      "We watched too many good companies lose customers to slow tickets and tired templates. SupportMint is the tool we wished existed.",
  },
  {
    icon: Users,
    title: "Designed for your team",
    description:
      "The AI handles the routine so your people can focus on the conversations that actually need a human touch.",
  },
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

.about-card {
  position: relative;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.875rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition:
    transform .45s var(--ease-smooth),
    box-shadow .45s var(--ease-smooth),
    border-color .45s var(--ease-smooth),
    background-color .45s var(--ease-smooth);
}

.about-card::before {
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

.about-card:hover {
  transform: translateY(-10px);
  border-color: var(--color-primary-border);
  box-shadow: var(--glow-mint-md);
  background: linear-gradient(180deg, white, #fcfffd);
}

.about-card:hover::before {
  transform: scaleX(1);
}

.about-card h3 {
  transition: color .4s var(--ease-smooth);
}

.about-card:hover h3 {
  color: var(--color-primary);
}

.about-icon-tile {
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

.about-card:hover .about-icon-tile {
  background: linear-gradient(155deg, var(--color-primary), var(--color-primary-hover));
  color: #ffffff;
  transform: rotate(-6deg) scale(1.08);
  box-shadow: var(--glow-mint-sm);
}

.about-stat-value {
  transition: color .4s var(--ease-smooth);
}

.about-card:hover .about-stat-value {
  color: var(--color-primary);
}

.about-quote-card {
  position: relative;
  background: linear-gradient(155deg, var(--color-primary-subtle), var(--color-primary-tint));
  border: 1px solid var(--color-primary-border);
  border-radius: var(--radius-xl);
  padding: 1.875rem;
  overflow: hidden;
  grid-column: span 2;
}

.about-quote-mark {
  position: absolute;
  top: -0.25rem;
  left: 0.75rem;
  font-family: var(--font-display);
  font-size: 5rem;
  color: var(--color-primary);
  opacity: 0.15;
  line-height: 1;
  user-select: none;
}
`;

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.1, delay, ease: easeOut },
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

        <div className="relative z-10 mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STORY_CARDS.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0.2 + index * 0.18}
                className="about-card"
              >
                <div className="about-icon-tile">
                  <Icon size={21} strokeWidth={2} />
                </div>
                <h3 className="mt-6 text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--color-ink-tertiary)]">
                  {card.description}
                </p>
              </motion.div>
            );
          })}

          {STAT_CARDS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                variants={fadeUp}
                custom={0.74 + index * 0.18}
                className="about-card"
              >
                <div className="about-icon-tile">
                  <Icon size={21} strokeWidth={2} />
                </div>
                <div className="about-stat-value mt-6 font-[var(--font-display)] text-[2rem] font-medium tracking-[-0.02em] text-[var(--color-ink)]">
                  {stat.value}
                </div>
                <h3 className="mt-1 text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                  {stat.label}
                </h3>
                <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--color-ink-tertiary)]">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </section>
    </>
  );
}

export default About;