"use client";

import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import Link from "next/link";
import { Sparkles, MessageSquareQuote, Tag, ArrowRight } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features", icon: Sparkles },
  { label: "Testimonials", href: "#testimonials", icon: MessageSquareQuote },
  { label: "About", href: "#about", icon: Tag },
];

const headerStyles = `
.header {
  position: sticky;
  top: 0;
  z-index: 40;
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  background: rgba(251, 251, 250, 0.78);
  border-bottom: 1px solid var(--color-border-subtle);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.header.scrolled {
  background: rgba(251, 251, 250, 0.92);
  border-bottom-color: var(--color-border);
  box-shadow: 0 4px 20px -4px rgb(20 23 26 / 0.05);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9rem 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  text-decoration: none;
  user-select: none;
  flex-shrink: 0;
}

.header-logo-mark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  background: var(--color-primary);
  box-shadow: 0 1px 2px rgb(15 139 108 / 0.2), inset 0 1px 0 rgb(255 255 255 / 0.16);
  transition: box-shadow 0.2s ease;
  flex-shrink: 0;
}

.header-logo:hover .header-logo-mark {
  box-shadow: var(--glow-mint-sm);
}

.header-logo-text {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--color-ink);
  letter-spacing: -0.01em;
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4375rem;
  padding: .45rem .8rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-ink-tertiary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  white-space: nowrap;
  transition: color 0.15s ease;
}

.nav-link-icon {
  color: var(--color-ink-muted);
  transition: color 0.15s ease;
  flex-shrink: 0;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: 1px;
  left: 0.9375rem;
  right: 0.9375rem;
  height: 1.5px;
  background: var(--color-primary);
  border-radius: var(--radius-full);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.nav-link:hover {
  color: var(--color-ink);
}

.nav-link:hover .nav-link-icon {
  color: var(--color-primary);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.header-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.mobile-menu-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  flex-direction: column;
  gap: 4.5px;
  background: none;
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  flex-shrink: 0;
}

.mobile-menu-toggle:hover {
  background: var(--color-base-alt);
}

.toggle-line {
  width: 18px;
  height: 1.5px;
  background: var(--color-ink-secondary);
  border-radius: var(--radius-full);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}

.mobile-menu-toggle.active .toggle-line:nth-child(1) {
  transform: translateY(3px) rotate(45deg);
}

.mobile-menu-toggle.active .toggle-line:nth-child(2) {
  opacity: 0;
}

.mobile-menu-toggle.active .toggle-line:nth-child(3) {
  transform: translateY(-3px) rotate(-45deg);
}

.mobile-menu {
  position: fixed;
  top: 68px;
  left: 0;
  right: 0;
  z-index: 50;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 0.75rem 1.25rem 1.25rem;
  display: none;
  flex-direction: column;
  gap: 0.25rem;
  box-shadow: var(--shadow-lg);
  animation: slide-down 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-menu.active {
  display: flex;
}

@keyframes slide-down {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.8125rem 0.875rem;
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-ink-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.mobile-nav-link:hover {
  background: var(--color-base-alt);
  color: var(--color-ink);
}

.mobile-nav-link-icon {
  color: var(--color-ink-muted);
  flex-shrink: 0;
}

.mobile-menu-divider {
  height: 1px;
  background: var(--color-border-subtle);
  margin: 0.5rem 0.875rem;
}

.mobile-menu-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.25rem 0.875rem 0;
}

.desktop-only {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

@media (max-width: 860px) {
  .header-nav {
    display: none;
  }
}

@media (max-width: 640px) {
  .header-content {
    padding: 0.875rem 1rem;
  }

  .header-brand {
    gap: 1rem;
  }

  .desktop-only {
    display: none;
  }

  .mobile-menu-toggle {
    display: flex;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-link::after,
  .toggle-line,
  .mobile-menu {
    transition: none !important;
    animation: none !important;
  }
}
`;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: headerStyles }} />
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-content">
          <div className="header-brand">
            <Link href="/" className="header-logo" onClick={closeMobileMenu}>
              <span className="header-logo-mark" aria-hidden="true">
                <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4.5C2 3.119 3.119 2 4.5 2h7C12.881 2 14 3.119 14 4.5v4c0 1.381-1.119 2.5-2.5 2.5H8.8L5.6 13.6V11H4.5C3.119 11 2 9.881 2 8.5v-4Z"
                    fill="white"
                  />
                  <circle cx="5.5" cy="6.5" r="0.9" fill="var(--color-primary)" />
                  <circle cx="8" cy="6.5" r="0.9" fill="var(--color-primary)" />
                  <circle cx="10.5" cy="6.5" r="0.9" fill="var(--color-primary)" />
                </svg>
              </span>
              <span className="header-logo-text">SupportMint</span>
            </Link>

          
          </div>

          <div className="header-actions">
              <nav className="header-nav">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <a key={link.href} href={link.href} className="nav-link">
                    <Icon size={14} className="nav-link-icon" />
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="desktop-only">
              <Button variant="primary" size="md" rightIcon={<ArrowRight size={17} />}>
                Get Started
              </Button>
            </div>

            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="toggle-line" />
              <span className="toggle-line" />
              <span className="toggle-line" />
            </button>
          </div>
        </div>

        <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={closeMobileMenu}
              >
                <Icon size={16} className="mobile-nav-link-icon" />
                {link.label}
              </a>
            );
          })}
          <div className="mobile-menu-divider" />
          <div className="mobile-menu-actions">
            <Button
              variant="primary"
              size="md"
              fullWidth
              rightIcon={<ArrowRight size={16} />}
              onClick={closeMobileMenu}
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;