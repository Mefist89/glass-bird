import React from 'react';
import styles from './HomePage.module.css';
import logo from '../assets/logo.png';
import python from '../assets/python.png';
import network from '../assets/network.png';
import sql from '../assets/sql.png';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.header}>
        <img src={logo} alt="Glass Bird Logo" className={styles.logo} />
        <h1>Welcome to Glass Bird!</h1>
        <p className={styles.subtitle}>Your gateway to mastering technical skills</p>
      </div>
      
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <img src={python} alt="Python" />
          </div>
          <h3>Python</h3>
          <p>Prepare for your Python exam with our comprehensive practice tests.</p>
          <button className={styles.cardButton}>Learn More</button>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <img src={network} alt="Network" />
          </div>
          <h3>Network</h3>
          <p>Master networking concepts with our targeted exam preparation materials.</p>
          <button className={styles.cardButton}>Learn More</button>
        </div>
        
        <div className={styles.card}>
          <div className={styles.cardIcon}>
            <img src={sql} alt="SQL" />
          </div>
          <h3>SQL</h3>
          <p>Ace your SQL exam with our focused practice questions and tutorials.</p>
          <button className={styles.cardButton}>Learn More</button>
        </div>
      </div>
      
      <div className={styles.features}>
        <div className={styles.feature}>
          <h3>Comprehensive Practice Tests</h3>
          <p>Access hundreds of practice questions tailored to your exam objectives.</p>
        </div>
        <div className={styles.feature}>
          <h3>Personalized Learning</h3>
          <p>Get customized study plans based on your progress and weak areas.</p>
        </div>
        <div className={styles.feature}>
          <h3>Expert Support</h3>
          <p>Connect with industry experts and get your questions answered.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;