"use client"
import { useState } from "react";
import Link from "next/link";
import styles from "./links.module.css";
import NavLink from "./navLink/navLinks";


const links = [
    {
        title: "Home",
        path:"/",
    },
    {
        title: "About",
        path:"/about",
    },
    {
        title: "Contact",
        path:"/contact",
    },
    {
        title: "Blog",
        path:"/blog",
    },
];

const Links = ({}) => {
    
    const [open, setOpen] = useState(false)

    // TEMPORARY
    const session = false
    const isAdmin = false

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {links.map ((link=>(
                    // <Link href={link.path} key={link.title} >{link.title}</Link>
                    <NavLink item={link} key={link.title}/>
                    ))) }{
                        session ? (
                        <>
                        { isAdmin && <NavLink item={{title: "Admin", path: "/admin"}} />}
                        <button type="button" className={styles.logout}>Logout</button>
                        </>
                        ) : (
                        <NavLink item={{title: "Login", path: "/login"}} />
                        )}
            </div>
            <button className={styles.menuButton} onClick={() => setOpen((prev) => !prev)}>Menu</button>
            {
                open && (
                <div className={styles.mobileLinks}>
                {/* <div className="hamburger-inner"> */}
                    {links.map((link) => (
                        <NavLink item={link} key={link.title}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Links