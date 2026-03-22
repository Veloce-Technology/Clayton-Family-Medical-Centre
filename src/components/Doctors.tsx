"use client";

import { useEffect, useRef, useState } from "react";
import { DOCTORS_DATA } from "@/constants";
import styles from "./Doctors.module.css";

type Doctor = (typeof DOCTORS_DATA)[number];

export default function Doctors() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

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
          {/* Header */}
          <div className={styles.header}>
            <span className={styles.badge}>Our Team</span>
            <h2 className={styles.title}>Meet Our Specialists</h2>
            <p className={styles.subtitle}>
              Dedicated professionals committed to your long-term health and well-being.
            </p>
          </div>

          {/* Cards Grid */}
          <div className={styles.grid}>
            {DOCTORS_DATA.map((doctor, index) => (
              <div
                key={index}
                className={styles.doctorCard}
                style={{ transitionDelay: `${index * 0.12}s` }}
              >
                {/* Photo */}
                <div className={styles.photoWrap}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className={styles.photo}
                  />
                  <div className={styles.photoOverlay} />
                  <span className={styles.specialtyTag}>{doctor.specialty}</span>
                </div>

                {/* Info */}
                <div className={styles.info}>
                  <div className={styles.nameRow}>
                    <div>
                      <h3 className={styles.name}>{doctor.name}</h3>
                      <p className={styles.titleBadge}>{doctor.title}</p>
                    </div>
                  </div>

                  <p className={styles.shortBio}>{doctor.shortBio}</p>

                  {/* Interests */}
                  <div className={styles.interests}>
                    {doctor.interests.slice(0, 3).map((interest) => (
                      <span key={interest} className={styles.interestTag}>{interest}</span>
                    ))}
                  </div>

                  {/* Languages */}
                  <div className={styles.languageRow}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <span>{doctor.languages.join(", ")}</span>
                  </div>

                  {/* Actions */}
                  <div className={styles.actions}>
                    <button
                      className={styles.viewProfileBtn}
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      View Profile
                    </button>
                    <button className={styles.bookBtn}>
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => { if (e.target === e.currentTarget) setSelectedDoctor(null); }}
        >
          <div className={styles.modal}>
            {/* Close Button */}
            <button
              className={styles.modalClose}
              onClick={() => setSelectedDoctor(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className={styles.modalInner}>
              {/* Left: Photo + Quick Info */}
              <div className={styles.modalLeft}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedDoctor.photo}
                  alt={selectedDoctor.name}
                  className={styles.modalPhoto}
                />
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

              {/* Right: Bio */}
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
