"use client";

import { useEffect, useRef, useState } from "react";
import { DOCTORS_DATA } from "@/constants";
import styles from "./Doctors.module.css";

type Doctor = (typeof DOCTORS_DATA)[number];

// Triple the list so we can loop seamlessly: real items are in the middle third
const LOOPED = [...DOCTORS_DATA, ...DOCTORS_DATA, ...DOCTORS_DATA];
const CARD_TOTAL_WIDTH = 360; // card width (340) + gap (20)
const OFFSET = DOCTORS_DATA.length * CARD_TOTAL_WIDTH; // jump point for seamless loop

export default function Doctors() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(OFFSET); // start at middle set
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  const [handlePos, setHandlePos] = useState(0);

  // Scroll-trigger animation
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

  // Sync handle position
  useEffect(() => {
    const updateHandle = () => {
      if (!trackRef.current) return;
      const currentScroll = trackRef.current.scrollLeft;
      const p = ((currentScroll - OFFSET) / OFFSET) * 100;
      setHandlePos(Math.max(0, Math.min(100, p)));
    };
    const interval = setInterval(updateHandle, 50);
    return () => clearInterval(interval);
  }, []);

  // Initialise scroll position to middle set
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft = OFFSET;
  }, []);

  // Auto-scroll loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = () => {
      if (isDragging || isPaused) return; 

      posRef.current += 0.5;

      if (posRef.current >= OFFSET * 2) {
        posRef.current = OFFSET;
        track.scrollLeft = OFFSET;
        return;
      }
      track.scrollLeft = posRef.current;
    };

    animRef.current = setInterval(step, 16);
    return () => { if (animRef.current) clearInterval(animRef.current); };
  }, [isDragging, isPaused]);

  // Manual Drag Handlers
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0);
    scrollLeftStart.current = trackRef.current?.scrollLeft || 0;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; 
    let newScrollLeft = scrollLeftStart.current - walk;

    if (newScrollLeft >= OFFSET * 2) {
      newScrollLeft -= OFFSET;
      scrollLeftStart.current -= OFFSET;
    } else if (newScrollLeft <= OFFSET) {
      newScrollLeft += OFFSET;
      scrollLeftStart.current += OFFSET;
    }

    trackRef.current.scrollLeft = newScrollLeft;
    posRef.current = newScrollLeft;
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setSelectedDoctor(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Prevent body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = selectedDoctor ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedDoctor]);

  return (
    <>
      <section
        id="team"
        ref={sectionRef}
        className={`${styles.doctorsSection} ${isVisible ? styles.visible : ""}`}
      >
        <div className="container">
          <div className={styles.header}>
            <span className={styles.badge}>Our Team</span>
            <h2 className={styles.title}>Meet Our Specialists</h2>
            <p className={styles.subtitle}>
              Dedicated professionals committed to your long-term health and well-being.
            </p>
          </div>
        </div>

        <div className={styles.carouselContainer}>
          <div
            className={`${styles.infiniteTrackWrap} ${isDragging ? styles.dragging : ""}`}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={() => { setIsDragging(false); setIsPaused(false); }}
            onMouseEnter={() => setIsPaused(true)}
          >
            <div className={styles.infiniteTrack} ref={trackRef}>
              {LOOPED.map((doctor, index) => (
                <div
                  key={index}
                  className={styles.doctorCard}
                >
                  <div className={styles.photoWrap}>
                    <img src={doctor.photo} alt={doctor.name} className={styles.photo} />
                    <div className={styles.photoOverlay} />
                    <span className={styles.specialtyTag}>{doctor.specialty}</span>
                  </div>

                  <div className={styles.info}>
                    <div className={styles.nameRow}>
                      <div>
                        <h3 className={styles.name}>{doctor.name}</h3>
                        <p className={styles.titleBadge}>{doctor.title}</p>
                      </div>
                    </div>
                    <p className={styles.shortBio}>{doctor.shortBio}</p>
                    <div className={styles.interests}>
                      {doctor.interests.slice(0, 3).map((interest) => (
                        <span key={interest} className={styles.interestTag}>{interest}</span>
                      ))}
                    </div>
                    <div className={styles.languageRow}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      <span>{doctor.languages.join(", ")}</span>
                    </div>
                    <div className={styles.actions}>
                      <button
                        className={styles.viewProfileBtn}
                        onClick={(e) => { e.stopPropagation(); setSelectedDoctor(doctor); }}
                      >
                        View Profile
                      </button>
                      <button className={styles.bookBtn} onClick={(e) => e.stopPropagation()}>Book Appointment</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.trackControl}>
            <button 
              className={styles.navBtn} 
              onClick={() => {
                if (trackRef.current) {
                  const newPos = posRef.current - CARD_TOTAL_WIDTH;
                  trackRef.current.scrollTo({ left: newPos, behavior: "smooth" });
                  posRef.current = newPos;
                }
              }}
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button 
              className={styles.navBtn} 
              onClick={() => {
                if (trackRef.current) {
                  const newPos = posRef.current + CARD_TOTAL_WIDTH;
                  trackRef.current.scrollTo({ left: newPos, behavior: "smooth" });
                  posRef.current = newPos;
                }
              }}
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div className="container">
          <div className={styles.handleTrack}>
            <div 
              className={styles.handleThumb} 
              style={{ left: `${handlePos}%` }}
            />
          </div>
        </div>
      </section>

      {selectedDoctor && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedDoctor(null); }}
        >
          <div className={styles.modal}>
            <button className={styles.modalClose} onClick={() => setSelectedDoctor(null)} aria-label="Close">✕</button>
            <div className={styles.modalInner}>
              <div className={styles.modalLeft}>
                <img src={selectedDoctor.photo} alt={selectedDoctor.name} className={styles.modalPhoto} />
                <div className={styles.modalQuickInfo}>
                  <p className={styles.modalSpecialty}>{selectedDoctor.specialty}</p>
                  <p className={styles.modalTitle}>{selectedDoctor.title}</p>
                  <div className={styles.modalSection}>
                    <h4 className={styles.modalSectionTitle}>Clinical Interests</h4>
                    <div className={styles.modalTags}>
                      {selectedDoctor.interests.map((i) => (
                        <span key={i} className={styles.modalTag}>{i}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.modalSection}>
                    <h4 className={styles.modalSectionTitle}>Languages</h4>
                    <p className={styles.modalLang}>{selectedDoctor.languages.join(" · ")}</p>
                  </div>
                </div>
                <button className={styles.modalBookBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  Book Appointment
                </button>
              </div>
              <div className={styles.modalRight}>
                <h2 className={styles.modalName}>{selectedDoctor.name}</h2>
                <div className={styles.divider} />
                <div className={styles.bioParagraphs}>
                  {selectedDoctor.fullBio.map((para, i) => (
                    <p key={i} className={styles.bioParagraph}>{para}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
