import styles from './footer.module.css';

export default function Footer(){
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerLeft}>RAY</div>
                <div className={styles.footerRight}>Created by © andriraymond.site</div>
            </div>
        </footer>
    );
}