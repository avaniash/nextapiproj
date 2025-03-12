import React from 'react';
import Link from 'next/link';
import styles from "@/app/styles/navbar.module.css";
import Image from 'next/image';
import Nav from "@/app/components/Nav";
const header = () => {
  return (
    <header className={styles.main_header}>
        <div className={styles.nav_head}>
            <Link href="/">
            <Image src="/logo.png" alt="my logo image" width={150} height={40}/>
            </Link>
        </div>
        <Nav />
    </header>
  )
}

export default header;
