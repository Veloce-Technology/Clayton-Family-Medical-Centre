"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./AboutUs.module.css";

const ABOUT_CONTENT = {
  badge: "About Us",
  heading: "Caring for Clayton, One Family at a Time",
  shortDescription:
    "We are a family medical clinic owned and operated by specialist general practitioners, dedicated to serving the community. Our team addresses all aspects of your health, from preventive treatments to long-term well-being.",
  fullDescription:
    "At Clayton Family Medical Centre, we take the time to listen to your concerns and offer a wide range of services to thoroughly address your health needs. We believe in giving you the time and attention you deserve, so you can feel confident in your healthcare decisions.",
  stats: [
    { value: "20+", label: "Years Experience" },
    { value: "10k+", label: "Happy Patients" },
    { value: "25", label: "Specialists" },
  ],
  image:
    "https://res.cloudinary.com/dwjdykbck/image/upload/v1774175341/indian-doctor-receives-patient-tells-him-about-results-tests-medicine-health_ahewrw.jpg",
};

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={`${styles.aboutSection} ${isVisible ? styles.visible : ""}`}
    >
      <div className={`container ${styles.grid}`}>
        {/* Left: Content */}
        <div className={styles.content}>
          <span className={styles.badge}>{ABOUT_CONTENT.badge}</span>
          <h2 className={styles.title}>{ABOUT_CONTENT.heading}</h2>
          <p className={styles.description}>{ABOUT_CONTENT.shortDescription}</p>
          <p className={styles.descriptionSecond}>{ABOUT_CONTENT.fullDescription}</p>

          <div className={styles.statsContainer}>
            {ABOUT_CONTENT.stats.map((stat, i) => (
              <div key={i} className={styles.statBox}>
                <h3 className={styles.statValue}>{stat.value}</h3>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            ))}
          </div>

          <Link href="/about" className={styles.learnMoreBtn}>
            Learn More About Us
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* Right: Image */}
        <div className={styles.imageBlock}>
          <div className={styles.imageBadge}>
            <span className={styles.imageBadgeIcon}>🏥</span>
            <div>
              <p className={styles.imageBadgeTitle}>Est. 2004</p>
              <p className={styles.imageBadgeSub}>Trusted Family Clinic</p>
            </div>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ABOUT_CONTENT.image}
            alt="Doctor consulting with patient at Clayton Family Medical Centre"
            className={styles.photo}
          />
          <div className={styles.imageAccent} />
        </div>
      </div>
    </section>
  );
}
