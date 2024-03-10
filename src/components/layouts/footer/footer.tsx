"use client";
import styles from "./footer.module.css";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const specificPathNames = ["/register", "/login"];

  return specificPathNames.includes(pathname) ? (
    <></>
  ) : (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerLeft}>RAY</div>
        <div className={styles.footerRight}>Created by © andriraymond.site</div>
      </div>
    </footer>
  );
}
