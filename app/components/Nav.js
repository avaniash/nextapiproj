'use client'

import styles from "@/app/styles/navbar.module.css"
import Link from "next/link";
import {useState} from "react";

const Nav = () => {
    const [openMenu, setOpenMenu] = useState(false);
    return (
        <>
            <nav className={styles.navbar}>
                <div className={openMenu ? `${styles.active}` : "" }>
                    <ul className={styles.navbarList}>
                        <li className={styles.navbarItem}>
                            <Link className={styles.navbarLink} href="/"
                                  onClick={() => setOpenMenu(false)}
                            >Home</Link>
                        </li>
                        <li className={styles.navbarItem}>
                            <Link className={styles.navbarLink} href="/about"
                                  onClick={() => setOpenMenu(false)}
                            >About</Link>
                        </li>
                        <li className={styles.navbarItem}>
                            <Link className={styles.navbarLink}
                                  onClick={() => setOpenMenu(false)}
                                  href="/movie">Movie</Link>
                        </li>
                        <li className={styles.navbarItem}>
                            <Link className={styles.navbarLink}
                                  onClick={() => setOpenMenu(false)}
                                  href="/contact">Contact</Link>
                        </li>
                    </ul>                    
                </div>
            </nav>
        </>
    );
};

export default Nav;