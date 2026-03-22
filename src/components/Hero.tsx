"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import { HERO_SLIDES } from "@/constants";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000); // 6 seconds for a slower, more professional reading pace
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`section-100vh ${styles.heroSection}`}>
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`${styles.slide} ${
              isActive ? styles.activeSlide : styles.inactiveSlide
            }`}
          >
            {/* Background Image with Zoom Effect */}
            <div 
              className={`${styles.slideBackground} ${isActive ? styles.zoomIn : ''}`}
              style={{ backgroundImage: slide.image }}
            >
              <div className={styles.overlay} />
            </div>

            {/* Content Container */}
            <div className={`container ${styles.heroContainer}`}>
              {/* Force re-render of content animation by wrapping inside condition or relying on CSS state */}
              <div className={`${styles.content} ${isActive ? styles.animateContent : ''}`}>
                <h1 className={styles.title}>{slide.title}</h1>
                <p className={styles.subtitle}>{slide.subtitle}</p>
                <div className={styles.buttonGroup}>
                  <Link href="#services" className={styles.primaryButton}>
                    Explore Services
                  </Link>
                  <Link href="#contact" className={styles.secondaryButton}>
                    Book Appointment
                  </Link>
                </div>
              </div>

              {/* Only show floating cards on the first slide smoothly, or keep them static on top if preferred. 
                  Given the request for professional alignment, let's keep the focus on the images and text for the carousel. 
                  We'll remove the placeholder bulky cards since we have real images now. */}
            </div>
          </div>
        );
      })}
      
      {/* Carousel Controls */}
      <div className={styles.carouselIndicators}>
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentSlide ? styles.activeIndicator : ""
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Floating Booking Widget */}
      <div className={`container ${styles.widgetContainer}`}>
        <div className={styles.bookingWidget}>
          <div className={styles.widgetTextLeft}>
            <h3 className={styles.widgetHeading}>Book Appointment</h3>
            <p className={styles.widgetSub}>long established fact that</p>
          </div>
          <div className={styles.widgetTextCenter}>
            <h3 className={styles.widgetHeading}>Quick Health Checkup</h3>
            <p className={styles.widgetSub}>Contrary to popular belief</p>
          </div>
          <div className={styles.widgetAction}>
            <button className={styles.widgetSelectBtn}>
              Book Appointment
              <span className={styles.chevron}>&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
