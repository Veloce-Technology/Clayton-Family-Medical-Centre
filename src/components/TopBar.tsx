"use client";

import { SITE_CONFIG } from "@/constants";
import styles from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={styles.topBar}>
      <div className={`container ${styles.topBarContainer}`}>
        <div className={styles.infoGroup}>
          <span className={styles.infoItem}>
            <strong>Call Us:</strong> {SITE_CONFIG.contact.phone}
          </span>
          <span className={styles.infoItem}>
            <strong>Email:</strong> {SITE_CONFIG.contact.email}
          </span>
        </div>
        <div className={styles.infoGroup}>
          <span className={styles.infoItem}>
            📍 {SITE_CONFIG.contact.address}
          </span>
        </div>
      </div>
    </div>
  );
}
