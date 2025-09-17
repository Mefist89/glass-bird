import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';
import { Facebook, MessageCircle, Globe } from 'lucide-react';

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
        {/* Social Media Icons */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', transition: 'color 0.2s ease' }}>
            <Facebook size={24} />
          </a>
          <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', transition: 'color 0.2s ease' }}>
            <MessageCircle size={24} />
          </a>
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', transition: 'color 0.2s ease' }}>
            <Globe size={24} />
          </a>
        </div>

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