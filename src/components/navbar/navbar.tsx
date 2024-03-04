import Links from './links/links';
import styles from './navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
    return (

        // 01. Navbar Component
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <a href="/ ">
                        <Image src="/assets/gocapje-logo-white.svg" alt='gocapje-logo'
                        width={120}
                        height={36}
                        />
                    </a>
                </div>
                <div className={styles.menu}><Links/>
                </div>
            </div>
        </nav>
    )
}

export default Navbar