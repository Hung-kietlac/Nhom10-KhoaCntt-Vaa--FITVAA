import React from 'react';
import styles from '../Css/Navbar.module.css';
import { Link } from 'react-router-dom';
import HeroSection from './HeroSection';

function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.logo}>Nhom10</div>
            <HeroSection />
            <div>
                <Link to="/Dangnhap" className={styles.authButtons}>Đăng Xuất</Link>
            </div>
        </div>
    );
}

export default Navbar;