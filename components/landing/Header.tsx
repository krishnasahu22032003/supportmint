"use client";

import React, { useState, useEffect } from "react";
import Button from "../ui/Button";
import Link from "next/link";

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "#docs" },
  { label: "Pricing", href: "#pricing" },
];

const headerStyles = `
  .header {
    position: sticky;
    top: 0;
    z-index: 40;
    backdrop-filter: blur(12px);
    background: rgba(250, 250, 249, 0.75);
    border-bottom: 1px solid var(--color-border);
    transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .header.scrolled {
    background: rgba(250, 250, 249, 0.85);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  }

  .header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem 1.5rem;
    max-width: 1440px;
    margin: 0 auto;
    gap: 2rem;
  }

  /* ── Logo ────────────────────────────────────── */

  .header-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    user-select: none;
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
    flex-shrink: 0;
  }

  .header-logo:hover {
    transform: scale(1.02);
  }

  .header-logo-mark {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    background: linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%);
    font-weight: 700;
    font-size: 1.125rem;
    color: #fff;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.24);
  }

  .header-logo-text {
    font-family: var(--font-display);
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--color-ink);
    letter-spacing: -0.015em;
  }

  /* ── Nav ─────────────────────────────────────── */

  .header-nav {
    display: flex;
    align-items: center;
    gap: 0;
    flex: 1;
    margin-left: 1rem;
  }

  .nav-link {
    padding: 0.5rem 1rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-ink-secondary);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
    position: relative;
    white-space: nowrap;
  }

  .nav-link::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: var(--color-primary);
    transform: translateX(-50%);
    transition: width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    border-radius: var(--radius-full);
  }

  .nav-link:hover {
    color: var(--color-ink);
    background: var(--color-base-alt);
  }

  .nav-link:hover::after {
    width: 24px;
  }

  /* ── Actions ─────────────────────────────────── */

  .header-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-shrink: 0;
  }

  /* ── Mobile Menu Toggle ──────────────────────── */

  .mobile-menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    flex-shrink: 0;
  }

  .toggle-line {
    width: 24px;
    height: 2px;
    background: var(--color-ink);
    border-radius: var(--radius-full);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .mobile-menu-toggle.active .toggle-line:nth-child(1) {
    transform: rotate(45deg) translate(10px, 10px);
  }

  .mobile-menu-toggle.active .toggle-line:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-toggle.active .toggle-line:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
  }

  /* ── Mobile Menu ─────────────────────────────── */

  .mobile-menu {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 1.5rem;
    display: none;
    flex-direction: column;
    gap: 1rem;
    animation: slide-down 0.3s cubic-bezier(0.22, 1, 0.36, 1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  .mobile-menu.active {
    display: flex;
  }

  @keyframes slide-down {
    from {
      opacity: 0;
      transform: translateY(-12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .mobile-nav-link {
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-ink-secondary);
    text-decoration: none;
    border-radius: var(--radius-md);
    transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  }

  .mobile-nav-link:hover {
    background: var(--color-base-alt);
    color: var(--color-ink);
  }

  /* ── Responsive ──────────────────────────────– */

  @media (max-width: 768px) {
    .header-content {
      padding: 0.75rem 1rem;
      gap: 1rem;
    }

    .header-nav {
      display: none;
    }

    .mobile-menu-toggle {
      display: flex;
    }

    .header {
      position: relative;
    }

    .mobile-menu {
      position: fixed;
      top: 56px;
      left: 0;
      right: 0;
      z-index: 50;
    }
  }

  @media (max-width: 480px) {
    .header-content {
      padding: 0.625rem 0.875rem;
    }

    .header-logo-text {
      display: none;
    }

    .header-logo {
      gap: 0;
    }

    .header-actions {
      gap: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .header-logo,
    .nav-link,
    .mobile-menu-toggle .toggle-line,
    .mobile-menu {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
  }
`;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: headerStyles }} />
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-content">
          {/* Logo */}
          <Link href="/" className="header-logo" onClick={closeMobileMenu}>
            <div className="header-logo-mark">E</div>
            <span className="header-logo-text">Emergent</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="header-nav">
            {NAV_LINKS.map(link => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <Button
              variant="ghost"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Sign In
            </Button>
            <Button
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              Get Started
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              className={`mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="toggle-line" />
              <span className="toggle-line" />
              <span className="toggle-line" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-menu ${mobileMenuOpen ? "active" : ""}`}>
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-[var(--color-border)]">
            <Button variant="ghost" size="md" fullWidth>
              Sign In
            </Button>
            <Button variant="primary" size="md" fullWidth>
              Get Started
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;