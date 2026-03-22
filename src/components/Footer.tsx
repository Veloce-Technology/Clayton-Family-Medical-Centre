"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE_CONFIG, NAVIGATION_LINKS, SERVICES_DATA } from "@/constants";
import styles from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className={styles.footer}>
      {/* Top wave accent */}
      <div className={styles.waveTop} />

      <div className={styles.footerInner}>
        <div className="container">
          <div className={styles.footerGrid}>
            {/* Brand column */}
            <div className={styles.brandCol}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={SITE_CONFIG.logo} alt={SITE_CONFIG.name} className={styles.logoImage} />
              <p className={styles.brandDesc}>
                A family medical clinic owned and operated by specialist GPs, dedicated to serving the Clayton community with compassionate, personalised care.
              </p>
              <div className={styles.contactBlocks}>
                <a href={`tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`} className={styles.contactBlock}>
                  <span className={styles.contactIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </span>
                  <span>{SITE_CONFIG.contact.phone}</span>
                </a>
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className={styles.contactBlock}>
                  <span className={styles.contactIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <span>{SITE_CONFIG.contact.email}</span>
                </a>
                <div className={styles.contactBlock}>
                  <span className={styles.contactIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </span>
                  <span>{SITE_CONFIG.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Quick Links</h3>
              <ul className={styles.linkList}>
                {NAVIGATION_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={styles.navLink}>
                      <span className={styles.linkArrow}>›</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Services</h3>
              <ul className={styles.linkList}>
                {SERVICES_DATA.map((s) => (
                  <li key={s.id}>
                    <Link href={`/#services`} className={styles.navLink}>
                      <span className={styles.linkArrow}>›</span>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className={styles.col}>
              <h3 className={styles.colTitle}>Stay Updated</h3>
              <p className={styles.newsletterPrompt}>
                Get the latest health tips and clinic news delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className={styles.form}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className={styles.input}
                />
                <button type="submit" className={styles.submitBtn}>
                  {subscribed ? "✓ Subscribed!" : "Subscribe"}
                </button>
              </form>

              {/* Socials */}
              <div className={styles.socials}>
                <a href={SITE_CONFIG.socials.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href={SITE_CONFIG.socials.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href={SITE_CONFIG.socials.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="Twitter / X">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <span className={styles.bottomDivider}>·</span>
            <Link href="/terms" className={styles.bottomLink}>Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
