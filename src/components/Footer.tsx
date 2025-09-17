import React from 'react';
import styles from './Footer.module.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  href: string;
}

const Footer: React.FC = () => {
  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About Us', href: '/about' },
    { id: 'contact', label: 'Contact', href: '/contact' },
    { id: 'login', label: 'Login', href: '/login' },
    { id: 'register', label: 'Register', href: '/register' },
    { id: 'tests', label: 'Tests', href: '/tests' },
  ];

  return (
    <footer className={styles['nav-container']} style={{ marginTop: 'auto' }}>
      <div className={styles['nav-content']}>
        <Link to="/" className={styles.logo} style={{ display: 'inline-flex', alignItems: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: '75px', marginRight: '2px', verticalAlign: 'middle' }} />
          Glass Bird
        </Link>

        {/* Desktop Menu */}
        <div className={styles['desktop-menu']}>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={styles['menu-item']}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button - скрыт в футере */}
        <div className={styles['mobile-menu-button']} style={{ visibility: 'hidden' }}>
          <div className={styles['hamburger-line']}></div>
          <div className={styles['hamburger-line']}></div>
          <div className={styles['hamburger-line']}></div>
        </div>
      </div>
      
      {/* Copyright and Legal Information */}
      <div style={{
        textAlign: 'center',
        padding: '20px',
        borderTop: '1px solid #e5e7eb',
        fontSize: '14px',
        color: '#6b7280'
      }}>
        <p>&copy; {new Date().getFullYear()} Glass Bird. All rights reserved.</p>
        <p>Terms of Service | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;