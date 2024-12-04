import React from 'react';
import SearchBar from './timkiem';
import styles from '../Css/HeroSection.module.css';

function HeroSection() {
    return (
        <div className={styles.heroSection}>
            <SearchBar />
        </div>
    );
}

export default HeroSection;