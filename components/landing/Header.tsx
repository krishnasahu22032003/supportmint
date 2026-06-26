"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/Button";

const LogoMark = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="28" height="28" rx="8" fill="#2563EB" />
    <path d="M8 18C8 18 10 10 14 10C17 10 17 14 14 14C11 14 12 18 16 18C18.5 18 20 16.5 20 14" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="20" cy="10" r="1.5" fill="white" />
  </svg>
);

const ChevronDown = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BotIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="5" width="12" height="9" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
    <path d="M8 2V5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="8" cy="1.5" r="1" fill="currentColor" />
    <circle cx="5.5" cy="9" r="1" fill="currentColor" />
    <circle cx="10.5" cy="9" r="1" fill="currentColor" />
    <path d="M6 11.5C6 11.5 6.8 12.5 8 12.5C9.2 12.5 10 11.5 10 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const ZapIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M9 2L3 9H8L7 14L13 7H8L9 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L3 4V8C3 11.3 5.2 13.6 8 14C10.8 13.6 13 11.3 13 8V4L8 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 8L7 9.5L10.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="9" width="3" height="5" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <rect x="6.5" y="5" width="3" height="9" rx="1" stroke="currentColor" strokeWidth="1.4" />
    <rect x="11" y="2" width="3" height="12" rx="1" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 2L9.5 6H14L10.5 8.5L11.8 13L8 10.5L4.2 13L5.5 8.5L2 6H6.5L8 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 3H9C9.55228 3 10 3.44772 10 4V13H3V3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M10 4H13V13H10" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M5 6H8M5 8.5H8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);

interface NavItem {
  label: string;
  href?: string;
  children?: {
    label: string;
    description: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

const navItems: NavItem[] = [
  {
    label: "Features",
    children: [
      { label: "AI Chat Agent", description: "Resolve 80% of tickets automatically", href: "#", icon: <BotIcon /> },
      { label: "Instant Responses", description: "Sub-second latency, zero wait time", href: "#", icon: <ZapIcon /> },
      { label: "Enterprise Security", description: "SOC 2 compliant, end-to-end encrypted", href: "#", icon: <ShieldIcon /> },
      { label: "Analytics", description: "Deep insights into every conversation", href: "#", icon: <BarChartIcon /> },
    ],
  },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  {
    label: "Resources",
    children: [
      { label: "Documentation", description: "Full API reference & guides", href: "#", icon: <BookIcon /> },
      { label: "Case Studies", description: "How teams scaled with SupportMint", href: "#", icon: <StarIcon /> },
    ],
  },
];

const headerStyles = `
  .header-nav-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-ink-secondary);
    text-decoration: none;
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    letter-spacing: -0.01em;
    transition: color 0.15s ease, background 0.15s ease;
    white-space: nowrap;
  }
  .header-nav-link:hover { color: var(--color-ink); background: var(--color-base-alt); }
  .header-nav-link:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
  .header-nav-link.active-nav { color: var(--color-ink); }

  .dropdown-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 10px 12px;
    border-radius: 10px;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.13s ease;
    outline: none;
  }
  .dropdown-item:hover { background: var(--color-base-alt); }
  .dropdown-item:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
  .dropdown-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--color-primary-subtle);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: background 0.13s ease, transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  .dropdown-item:hover .dropdown-icon { background: var(--color-primary-tint); transform: scale(1.08); }

  .mobile-menu-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 13px 0;
    font-family: var(--font-display);
    font-size: 1.05rem;
    font-weight: 500;
    color: var(--color-ink-secondary);
    text-decoration: none;
    border: none;
    border-bottom: 1px solid var(--color-border-subtle);
    outline: none;
    width: 100%;
    text-align: left;
    background: transparent;
    cursor: pointer;
    transition: color 0.13s ease;
    letter-spacing: -0.01em;
  }
  .mobile-menu-link:focus-visible { outline: 2px solid var(--color-primary); }

  .mobile-submenu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-ink-secondary);
    text-decoration: none;
    cursor: pointer;
    transition: background 0.13s ease, color 0.13s ease;
    outline: none;
  }
  .mobile-submenu-item:hover { background: var(--color-base-alt); color: var(--color-ink); }
  .mobile-submenu-icon {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: var(--color-primary-subtle);
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .desktop-nav { display: flex; }
  .desktop-cta { display: flex; }
  .mobile-menu-toggle { display: none; }

  @media (max-width: 768px) {
    .desktop-nav { display: none !important; }
    .desktop-cta { display: none !important; }
    .mobile-menu-toggle { display: flex !important; }
  }
`;

const dropdownVariants = {
  hidden: { opacity: 0, y: -6, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const} },
  exit: { opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.13, ease: [0.4, 0, 1, 1] as const} },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto", transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as const} },
};

const mobileItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.22, ease: [0.22, 1, 0.36, 1] as const},
  }),
};

function NavDropdown({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 80);
  };

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  if (!item.children) {
    return <a href={item.href ?? "#"} className="header-nav-link">{item.label}</a>;
  }

  return (
    <div style={{ position: "relative" }} onMouseEnter={openMenu} onMouseLeave={closeMenu}>
      <button
        className={`header-nav-link ${open ? "active-nav" : ""}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(v => !v)}
      >
        {item.label}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-flex", color: "var(--color-ink-muted)" }}
        >
          <ChevronDown />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "8px",
              boxShadow: "0 20px 40px -8px rgb(0 0 0 / 0.12), 0 8px 16px -4px rgb(0 0 0 / 0.06), 0 0 0 1px rgb(0 0 0 / 0.02)",
              minWidth: "260px",
              zIndex: 100,
            }}
          >
            <div style={{ position: "absolute", top: "-6px", left: "50%", transform: "translateX(-50%)", width: "12px", height: "6px", overflow: "hidden" }}>
              <div style={{ width: "10px", height: "10px", background: "var(--color-surface)", border: "1px solid var(--color-border)", transform: "rotate(45deg)", position: "absolute", top: "3px", left: "1px", borderRadius: "2px 0 0 0" }} />
            </div>

            {item.children.map((child, i) => (
              <motion.a
                key={child.label}
                href={child.href}
                className="dropdown-item"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="dropdown-icon">{child.icon}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "0.875rem", fontWeight: 600, color: "var(--color-ink)", letterSpacing: "-0.01em", marginBottom: "2px" }}>
                    {child.label}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--color-ink-tertiary)", lineHeight: 1.4, fontFamily: "var(--font-body)" }}>
                    {child.description}
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <motion.line
        x1="3" y1="7" x2="19" y2="7"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { y1: 11, y2: 11, rotate: 45, x1: 4, x2: 18 } : { y1: 7, y2: 7, rotate: 0, x1: 3, x2: 19 }}
        style={{ transformOrigin: "11px 11px" }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.line
        x1="3" y1="11" x2="19" y2="11"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
        style={{ transformOrigin: "11px 11px" }}
        transition={{ duration: 0.18 }}
      />
      <motion.line
        x1="3" y1="15" x2="19" y2="15"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { y1: 11, y2: 11, rotate: -45, x1: 4, x2: 18 } : { y1: 15, y2: 15, rotate: 0, x1: 3, x2: 19 }}
        style={{ transformOrigin: "11px 11px" }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={mobileMenuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ overflow: "hidden", background: "var(--color-surface)", borderTop: "1px solid var(--color-border-subtle)" }}
        >
          <div style={{ padding: "8px 20px 24px" }}>
            {navItems.map((item, i) => (
              <motion.div key={item.label} custom={i} variants={mobileItemVariants} initial="hidden" animate="visible">
                {item.children ? (
                  <div>
                    <button
                      className="mobile-menu-link"
                      onClick={() => setExpandedItem(expandedItem === item.label ? null : item.label)}
                      style={{ color: expandedItem === item.label ? "var(--color-ink)" : "var(--color-ink-secondary)" }}
                    >
                      {item.label}
                      <motion.span
                        animate={{ rotate: expandedItem === item.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ display: "inline-flex", color: "var(--color-ink-muted)" }}
                      >
                        <ChevronDown />
                      </motion.span>
                    </button>
                    <AnimatePresence>
                      {expandedItem === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden", paddingBottom: "8px" }}
                        >
                          {item.children.map((child, ci) => (
                            <motion.a
                              key={child.label}
                              href={child.href}
                              className="mobile-submenu-item"
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: ci * 0.04 }}
                              onClick={onClose}
                            >
                              <div className="mobile-submenu-icon">{child.icon}</div>
                              {child.label}
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a href={item.href ?? "#"} className="mobile-menu-link" onClick={onClose}>
                    {item.label}
                  </a>
                )}
              </motion.div>
            ))}

            <motion.div
              custom={navItems.length}
              variants={mobileItemVariants}
              initial="hidden"
              animate="visible"
              style={{ display: "flex", flexDirection: "column", gap: "10px", paddingTop: "20px" }}
            >
              <Button variant="secondary" size="md" fullWidth>Sign in</Button>
              <Button variant="primary" size="md" fullWidth rightIcon={<ArrowRight />}>Start free trial</Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const headerShadow = useTransform(scrollY, [0, 40], [
    "0 0 0 0 rgb(0 0 0 / 0)",
    "0 4px 24px -4px rgb(0 0 0 / 0.08), 0 1px 4px -1px rgb(0 0 0 / 0.04)",
  ]);
  const headerBg = useTransform(scrollY, [0, 20], ["rgb(250 250 249 / 0)", "rgb(255 255 255 / 0.96)"]);
  const headerBorder = useTransform(scrollY, [0, 20], ["rgb(228 228 226 / 0)", "rgb(228 228 226 / 1)"]);
  const springShadow = useSpring(headerShadow, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 8));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: headerStyles }} />

      <motion.header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 50,
          backdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px) saturate(1.8)" : "none",
          backgroundColor: headerBg as any,
          borderBottom: "1px solid",
          borderColor: headerBorder as any,
          boxShadow: springShadow as any,
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "9px", textDecoration: "none", flexShrink: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            <LogoMark />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--color-ink)", letterSpacing: "-0.025em", lineHeight: 1 }}>
              Support<span style={{ color: "var(--color-primary)" }}>Mint</span>
            </span>
          </motion.a>

          <motion.nav
            className="desktop-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{ alignItems: "center", gap: "2px" }}
            aria-label="Main navigation"
          >
            {navItems.map(item => <NavDropdown key={item.label} item={item} />)}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <div className="desktop-cta" style={{ alignItems: "center", gap: "8px" }}>
              <Button variant="ghost" size="sm">Sign in</Button>
              <Button variant="primary" size="sm" rightIcon={<ArrowRight />}>Start free trial</Button>
            </div>

            <motion.button
              className="mobile-menu-toggle"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{ background: "transparent", border: "none", cursor: "pointer", padding: "6px", borderRadius: "8px", color: "var(--color-ink-secondary)", alignItems: "center", justifyContent: "center", outline: "none" }}
              whileHover={{ background: "var(--color-base-alt)" }}
              whileTap={{ scale: 0.93 }}
            >
              <HamburgerIcon open={mobileOpen} />
            </motion.button>
          </motion.div>
        </div>

        <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      </motion.header>
    </>
  );
}

export default Header;