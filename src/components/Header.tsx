"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG, NAVIGATION_LINKS } from "@/constants";
import styles from "./Header.module.css";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAVIGATION_LINKS
      .map((link) => link.href.replace("/#", "").replace("/", ""))
      .filter(Boolean);

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const matched = NAVIGATION_LINKS.find(
              (l) => l.href === `/#${id}` || (id === "" && l.href === "/")
            );
            if (matched) setActiveSection(matched.label);
          }
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Home detection: when near top
    const handleScrollForHome = () => {
      if (window.scrollY < 100) setActiveSection("Home");
    };
    window.addEventListener("scroll", handleScrollForHome, { passive: true });

    return () => {
      observers.forEach((obs) => obs.disconnect());
      window.removeEventListener("scroll", handleScrollForHome);
    };
  }, []);

  return (
    <header className={styles.headerContainer}>
      {/* Top Banner Area */}
      <div className={styles.topInfoArea}>
        <div className={`container ${styles.topInfoContainer}`}>
          <Link href="/" className={styles.logo}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE_CONFIG.logo} alt={SITE_CONFIG.name} className={styles.logoImage} />
          </Link>
          
          <div className={styles.flexRight}>
            <div className={styles.contactGroup}>
              <div className={styles.contactItem}>
                <svg className={styles.svgIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span className={styles.contactText}>{SITE_CONFIG.contact.address}</span>
              </div>
              <a href={`mailto:${SITE_CONFIG.contact.email}`} className={styles.contactLink}>
                <svg className={styles.svgIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                <span className={styles.contactText}>{SITE_CONFIG.contact.email}</span>
              </a>
              <a href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, '')}`} className={styles.contactLink}>
                <svg className={styles.svgIcon} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <span className={styles.contactText}>{SITE_CONFIG.contact.phone}</span>
              </a>
            </div>
            <button className={styles.bookNowBtn}>BOOK NOW</button>
            <button
              className={styles.mobileMenuButton}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Navbar */}
      <div className={`${styles.navWrapper} ${isScrolled ? styles.stickyNav : ""}`}>
        <div className="container">
          <nav className={styles.navFloatingCard}>
            <ul className={styles.navLinks}>
              {NAVIGATION_LINKS.map((link, index) => {
                const isActive = activeSection === link.label;
                return (
                  <li key={link.label} className={styles.navItem}>
                    <Link 
                      href={link.href} 
                      className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                    >
                      {link.label}
                    </Link>
                    {index < NAVIGATION_LINKS.length - 1 && (
                      <span className={styles.navSeparator}>|</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      <div className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.mobileNavOpen : ""}`}>
        {NAVIGATION_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`${styles.mobileNavLink} ${activeSection === link.label ? styles.activeMobileLink : ""}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
