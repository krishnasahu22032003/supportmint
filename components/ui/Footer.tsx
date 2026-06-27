"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function FooterBar() {
  return (
    <footer className="relative border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: easeOut }}
        className="mx-auto flex max-w-[1180px] flex-col items-center justify-between gap-2 px-6 py-5 text-[0.8125rem] text-[var(--color-ink-muted)] sm:flex-row"
      >
        <span className="flex items-center gap-1.5">
          Made with
          <motion.span
            animate={{ scale: [1, 1.22, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <Heart size={13} className="fill-red-500 text-red-500" />
          </motion.span>
          by{" "}
          <span className="font-medium text-[var(--color-ink-secondary)]">
            Krishna
          </span>
        </span>

        <span className="hidden opacity-40 sm:block">•</span>

        <span className="font-[var(--font-display)] font-medium tracking-[-0.01em] text-[var(--color-ink-secondary)]">
          SupportMint
          <span
            className="ml-1 inline-block h-[7px] w-[7px] rounded-full bg-[var(--color-primary)]"
            style={{ boxShadow: "0 0 8px rgb(15 139 108 / 0.6)", verticalAlign: "middle", position: "relative", top: "-1px" }}
          />
        </span>

        <span className="hidden opacity-40 sm:block">•</span>

        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </motion.div>
    </footer>
  );
}

export default FooterBar;