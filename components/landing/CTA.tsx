"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

const ctaStyles = `
.cta-wrap {
  position: relative;
  margin: 0 auto;
  max-width: 1180px;
  padding: 0 1.5rem 6rem;
}

.cta-glow-wrap {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.cta-glow {
  position: absolute;
  top: -100px;
  left: 50%;
  width: 900px;
  height: 500px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgb(15 139 108 / 0.05), transparent 68%);
}

.cta-card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-2xl);
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  padding: 4rem 2rem 3.75rem;
  text-align: center;
  isolation: isolate;
}

.cta-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 1.5rem;
  right: 1.5rem;
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  opacity: 0.6;
}

.cta-orb-1 {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  width: 360px;
  height: 360px;
  top: -160px;
  left: -100px;
  background: rgb(15 139 108 / 0.05);
  filter: blur(72px);
}

.cta-orb-2 {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  width: 280px;
  height: 280px;
  bottom: -120px;
  right: -60px;
  background: rgb(15 139 108 / 0.04);
  filter: blur(64px);
}

.cta-grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgb(15 139 108 / 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgb(15 139 108 / 0.03) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at center, black 10%, transparent 68%);
  pointer-events: none;
}

.cta-noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E");
  pointer-events: none;
}

.cta-trust-item {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.8125rem;
  color: var(--color-ink-muted);
}

.cta-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-border), transparent);
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

const TRUST_ITEMS = [
  "Free 14-day trial",
  "No credit card required",
  "Cancel anytime",
];

export function CTA() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ctaStyles }} />

      <section id="cta" className="cta-wrap">
        <div className="cta-glow-wrap" aria-hidden>
          <div className="cta-glow" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
        >
          <div className="cta-card">
            <div className="cta-noise" aria-hidden />
            <div className="cta-grid-lines" aria-hidden />
            <div className="cta-orb-1" aria-hidden />
            <div className="cta-orb-2" aria-hidden />

            <div className="relative z-10 mx-auto flex max-w-[560px] flex-col items-center">

              <motion.h2
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0.14}
                className="font-[var(--font-display)] text-[clamp(2rem,4vw,3.75rem)] font-medium leading-[1.15] tracking-[-0.025em] text-[var(--color-ink)]"
              >
                Your customers deserve
                answers{" "}
                <span className="italic text-[var(--color-primary)]">
                  right now
                </span>
              </motion.h2>

              <motion.p
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0.26}
                className="mt-5 max-w-[420px] text-[1.0625rem] leading-relaxed text-[var(--color-ink-tertiary)]"
              >
                Set up in an afternoon. Sounds like your team from day one.
                Response times under two seconds — guaranteed.
              </motion.p>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0.38}
                className="mt-8"
              >
                <Button
                  variant="primary"
                  size="xl"
                  rightIcon={<ArrowRight size={18} strokeWidth={2.2} />}
                >
                  Start your free trial
                </Button>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={0.5}
                className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
              >
                {TRUST_ITEMS.map((item) => (
                  <span key={item} className="cta-trust-item">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle
                        cx="7" cy="7" r="6.5"
                        stroke="var(--color-primary)"
                        strokeOpacity=".35"
                      />
                      <path
                        d="M4.5 7l1.8 1.8L9.5 5"
                        stroke="var(--color-primary)"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </span>
                ))}
              </motion.div>

            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={0.6}
          className="mt-14 cta-divider"
        />
      </section>
    </>
  );
}

export default CTA;