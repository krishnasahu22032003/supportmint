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

const featuresStyles = `
.features-glow {
  position: absolute;
  top: -120px;
  left: 50%;
  width: 1000px;
  height: 560px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgb(15 139 108 / 0.07), transparent 70%);
  pointer-events: none;
  z-index: -1;
}
  .feature-card h3{
    transition: color .4s var(--ease-smooth);
}
    .feature-card p{
    transition: color .4s var(--ease-smooth);
}

.feature-card:hover h3{
    color: var(--color-primary);
}

.feature-card {
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

.feature-card::before {
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

.feature-card:hover {
  transform: translateY(-10px);
  border-color: var(--color-primary-border);
  box-shadow: var(--glow-mint-md);
  background:
linear-gradient(
180deg,
white,
#fcfffd
);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon-tile {
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

.feature-card:hover .feature-icon-tile {
  background: linear-gradient(155deg, var(--color-primary), var(--color-primary-hover));
  color: #ffffff;
  transform: rotate(-6deg) scale(1.08);
  box-shadow: var(--glow-mint-sm);
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

export function Features() {
    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: featuresStyles }} />
            <section
                id="features"
                className="relative mx-auto max-w-[1180px] overflow-hidden px-6 py-24 sm:py-28"
            >
                <div className="features-glow" aria-hidden="true" />

                <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
                    <motion.span
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeUp}
                        custom={0}
                        className="relative z-10 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-[0.8125rem] font-medium text-[var(--color-ink-secondary)] shadow-[var(--shadow-sm)]"
                    >
                        <Sparkles size={13} className="text-[var(--color-primary)]" />
                        Why teams switch to SupportMint
                    </motion.span>

                    <motion.h2
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeUp}
                        custom={0.15}
                        className="relative z-10 mt-6 font-[var(--font-display)] text-[clamp(2rem,4vw,3.75rem)] font-medium leading-[1.2] tracking-[-0.02em] text-[var(--color-ink)]"
                    >
                        Everything support needs,
                        <br />
                        <span className="italic text-[var(--color-primary)]">nothing</span>{" "}
                        it doesn&apos;t
                    </motion.h2>

                    <motion.p
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={fadeUp}
                        custom={0.3}
                        className="relative z-10 mt-5 text-[1.0625rem] leading-relaxed text-[var(--color-ink-tertiary)]"
                    >
                        One AI layer that resolves the routine, escalates the rest, and
                        gets sharper with every conversation.
                    </motion.p>
                </div>

                <div className="relative z-10 mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURES.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={feature.title}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-60px" }}
                                variants={fadeUp}
                                custom={0.2 + index * 0.18}
                                transition={{
                                    duration: 0.45,
                                    ease: easeOut,
                                }}
                                className="feature-card"
                            >
                                <div className="feature-icon-tile">
                                    <Icon size={21} strokeWidth={2} />
                                </div>

                                <h3 className="mt-6 text-[1.0625rem] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
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
        </>
    );
}

export default Features;