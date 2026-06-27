"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function FooterBar() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: easeOut }}
        className="mx-auto flex max-w-[1180px] flex-col items-center justify-center gap-2 px-6 py-5 text-center text-[0.8125rem] text-[var(--color-ink-muted)] sm:flex-row"
      >
        <span>© {new Date().getFullYear()} SupportMint</span>

        <span className="hidden opacity-40 sm:block">•</span>

        <span className="flex items-center gap-1.5">
          Made with
          <motion.span
            animate={{ scale: [1, 1.18, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex"
          >
            <Heart size={13} className="fill-red-500 text-red-500" />
          </motion.span>
          by Krishna
        </span>
      </motion.div>
    </footer>
  );
}

export default FooterBar;