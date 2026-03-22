"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES_DATA } from "@/constants";
import styles from "./Services.module.css";

const SLIDE_INTERVAL = 3500;

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
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

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % SERVICES_DATA.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, []);

  // Scroll carousel track to active card
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[activeIdx] as HTMLElement;
    if (card) {
      const offset = card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
      track.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [activeIdx]);

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
                  className={`${styles.serviceCard} ${index === activeIdx ? styles.activeCard : ""}`}
                  onClick={() => setActiveIdx(index)}
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

            {/* Dots */}
            <div className={styles.carouselDots}>
              {SERVICES_DATA.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === activeIdx ? styles.dotActive : ""}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Go to service ${i + 1}`}
                />
              ))}
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
