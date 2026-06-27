"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Globe2,
  Palette,
  BarChart3,
  UserCheck,
  Languages,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: Sparkles,
    title: "Instant AI resolution",
    description:
      "Most questions get answered the moment they're asked, with no queue and no waiting on a human to come online.",
  },
  {
    icon: Globe2,
    title: "Always on, everywhere",
    description:
      "Live chat, email, and social messages all land in one inbox, answered around the clock without extra staffing.",
  },
  {
    icon: Palette,
    title: "Sounds like your brand",
    description:
      "Train SupportMint on your tone, policies, and product details so every reply feels like it came from your team.",
  },
  {
    icon: BarChart3,
    title: "Insight into every chat",
    description:
      "See what customers actually ask, where the AI struggles, and what's driving repeat contact, all in one dashboard.",
  },
  {
    icon: UserCheck,
    title: "Seamless human handoff",
    description:
      "Complex or sensitive conversations route to your team automatically, with full context carried over instantly.",
  },
  {
    icon: Languages,
    title: "Fluent in 47 languages",
    description:
      "Customers get support in their own language by default, with no translation setup required on your end.",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeOut },
  }),
};

export function Features() {
  return (
    <section
      id="features"
      className="relative mx-auto max-w-[1180px] px-6 py-24 sm:py-28"
    >
      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <motion.span
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-1.5 text-[0.8125rem] font-medium text-[var(--color-ink-secondary)] shadow-[var(--shadow-xs)]"
        >
          <Sparkles size={13} className="text-[var(--color-primary)]" />
          Why teams switch to SupportMint
        </motion.span>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0.1}
          className="mt-6 font-[var(--font-display)] text-[clamp(2rem,4vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)]"
        >
          Everything support needs,
          <br />
          nothing it doesn't
        </motion.h2>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0.2}
          className="mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-ink-tertiary)]"
        >
          One AI layer that resolves the routine, escalates the rest, and
          gets sharper with every conversation.
        </motion.p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={fadeUp}
              custom={0.1 + index * 0.08}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-surface)] p-7 shadow-[var(--shadow-xs)] transition-[box-shadow,border-color] duration-300 ease-out hover:border-[var(--color-primary-border)] hover:shadow-[var(--glow-mint-sm)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-primary-subtle)] text-[var(--color-primary)] transition-colors duration-300 ease-out group-hover:bg-[var(--color-primary)] group-hover:text-white">
                <Icon size={20} strokeWidth={2} />
              </div>

              <h3 className="mt-5 text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
                {feature.title}
              </h3>

              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-[var(--color-ink-tertiary)]">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Features;