"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES_DATA } from "@/constants";
import styles from "./Services.module.css";

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  // No auto-selected card — only hovered card gets the active style
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  // The track page: scroll one card at a time
  const [scrollPos, setScrollPos] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-trigger animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const CARD_WIDTH = 212; // card min-width + gap

  const scrollTo = (dir: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const newPos = dir === "next"
      ? Math.min(scrollPos + CARD_WIDTH, maxScroll)
      : Math.max(scrollPos - CARD_WIDTH, 0);
    track.scrollTo({ left: newPos, behavior: "smooth" });
    setScrollPos(newPos);
  };

  const canPrev = scrollPos > 0;
  const canNext = (() => {
    const track = trackRef.current;
    if (!track) return true;
    return scrollPos < track.scrollWidth - track.clientWidth - 4;
  })();

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`${styles.servicesSection} ${isVisible ? styles.visible : ""}`}
    >
      <div className={styles.splitLayout}>
        {/* Left Side: Doctor Image */}
        <div className={styles.leftColumn}>
          <div
            className={styles.doctorImage}
            style={{ backgroundImage: "url('https://res.cloudinary.com/dwjdykbck/image/upload/v1774175334/young-handsome-physician-medical-robe-with-stethoscope_abjksz.jpg')" }}
          />
        </div>

        {/* Right Side: Content */}
        <div className={styles.rightColumn}>
          <div className={styles.headerArea}>
            <div className={styles.headerText}>
              <span className={styles.badge}>What We Offer</span>
              <h2 className={styles.title}>Our Services</h2>
              <p className={styles.subtitle}>Comprehensive healthcare services for every stage of life</p>
            </div>
            <button className={styles.viewAllBtn}>
              View All Services
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>

          {/* Cards Carousel */}
          <div className={styles.carouselWrapper}>
            <div className={styles.carouselTrack} ref={trackRef}>
              {SERVICES_DATA.map((service, index) => (
                <div
                  key={service.id}
                  className={`${styles.serviceCard} ${hoveredIdx === index ? styles.activeCard : ""}`}
                  onMouseEnter={() => setHoveredIdx(index)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  <div className={styles.cardIconWrap}>
                    <span className={styles.cardIcon}>{service.icon}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{service.title}</h3>
                  <p className={styles.cardDesc}>{service.description}</p>
                  <span className={styles.cardArrow}>→</span>
                </div>
              ))}
            </div>

            {/* Prev / Next nav */}
            <div className={styles.carouselNav}>
              <button
                className={`${styles.navBtn} ${!canPrev ? styles.navBtnDisabled : ""}`}
                onClick={() => scrollTo("prev")}
                aria-label="Previous"
                disabled={!canPrev}
              >
                ←
              </button>
              <button
                className={`${styles.navBtn} ${!canNext ? styles.navBtnDisabled : ""}`}
                onClick={() => scrollTo("next")}
                aria-label="Next"
                disabled={!canNext}
              >
                →
              </button>
            </div>
          </div>

          {/* Promo Banner */}
          <div className={styles.promoBanner}>
            <div className={styles.bannerContent}>
              <p className={styles.clinicName}>⚕ Clayton Family Medical Centre</p>
              <h3 className={styles.bannerTitle}>
                Modern Healthcare<br />
                <span className={styles.bannerTitleHighlight}>Right Here in Clayton</span>
              </h3>
              <p className={styles.bannerSubtitle}>by Experienced Specialists</p>
            </div>
            <div className={styles.bannerImageOverlay} />
          </div>
        </div>
      </div>
    </section>
  );
}
