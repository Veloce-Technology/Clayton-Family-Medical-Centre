"use client";

import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/constants";
import styles from "./Contact.module.css";

const CONTACT_ITEMS = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Our Location",
    value: SITE_CONFIG.contact.address,
    link: "https://maps.google.com/?q=273A+Clayton+Rd+Clayton+VIC+3168",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: "Phone",
    value: SITE_CONFIG.contact.phone,
    link: `tel:${SITE_CONFIG.contact.phone.replace(/[^0-9+]/g, "")}`,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: "Email",
    value: SITE_CONFIG.contact.email,
    link: `mailto:${SITE_CONFIG.contact.email}`,
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: "Opening Hours",
    value: "Mon–Fri: 8am – 6pm · Sat: 9am – 1pm",
    link: null,
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${styles.contactSection} ${isVisible ? styles.visible : ""}`}
    >
      {/* Background decoration */}
      <div className={styles.bgDecor} />

      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Get in Touch</span>
          <h2 className={styles.title}>Contact Us</h2>
          <p className={styles.subtitle}>
            We&apos;re here to help. Reach out for appointments, enquiries, or anything else.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Left: Info + Map */}
          <div className={styles.infoCol}>
            {/* Contact cards */}
            <div className={styles.contactCards}>
              {CONTACT_ITEMS.map((item, i) => (
                <div key={i} className={styles.contactCard} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <span className={styles.contactIcon}>{item.icon}</span>
                  <div className={styles.contactCardBody}>
                    <p className={styles.contactLabel}>{item.label}</p>
                    {item.link ? (
                      <a href={item.link} className={styles.contactValue} target={item.link.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                        {item.value}
                      </a>
                    ) : (
                      <p className={styles.contactValue}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className={styles.mapWrap}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.264!2d145.118!3d-37.923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6699b1a0f7e87%3A0x1c010c5b6b3e5b3c!2s273A%20Clayton%20Rd%2C%20Clayton%20VIC%203168!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
                className={styles.map}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="Clayton Family Medical Centre location"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className={styles.formCol}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send us a Message</h3>
              <p className={styles.formSubtitle}>We&apos;ll get back to you within one business day.</p>

              {sent ? (
                <div className={styles.successMsg}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <p>Thank you! Your message has been sent. We&apos;ll be in touch soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Full Name *</label>
                      <input
                        className={styles.input}
                        type="text"
                        placeholder="John Smith"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className={styles.fieldGroup}>
                      <label className={styles.label}>Phone Number</label>
                      <input
                        className={styles.input}
                        type="tel"
                        placeholder="(03) 9000 0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Email Address *</label>
                    <input
                      className={styles.input}
                      type="email"
                      placeholder="john@email.com"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.label}>Message *</label>
                    <textarea
                      className={`${styles.input} ${styles.textarea}`}
                      placeholder="How can we help you?"
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    Send Message
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
