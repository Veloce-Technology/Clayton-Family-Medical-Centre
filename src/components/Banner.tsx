import { BANNER_DATA } from "@/constants";
import styles from "./Banner.module.css";
import Link from "next/link";

export default function Banner() {
  return (
    <section className={styles.bannerSection}>
      <div className={`container ${styles.bannerContainer}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>{BANNER_DATA.title}</h2>
          <p className={styles.subtitle}>{BANNER_DATA.subtitle}</p>
        </div>
        <div className={styles.action}>
          <Link href="#contact" className={styles.button}>
            {BANNER_DATA.buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
