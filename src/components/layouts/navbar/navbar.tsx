"use client";
import Links from "./links/links";
import styles from "./navbar.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const specificPathNames = ["/register", "/login"];

  return (
    // 01. Navbar Component
    specificPathNames.includes(pathname) ? (
      <></>
    ) : (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.brand}>
            <a href='/ '>
              <Image
                src='/assets/gocapje-logo-white.svg'
                alt='gocapje-logo'
                width={120}
                height={36}
              />
            </a>
          </div>
          <div className={styles.menu}>
            <Links />
          </div>
        </div>
      </nav>
    )
  );
};
export default Navbar;
