import React, { useState } from 'react';
import styles from './Menu.module.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationMenuProps {
}

const NavigationMenu: React.FC<NavigationMenuProps> = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'about', label: 'About Us', href: '/about' },
    { id: 'services', label: 'Contact', href: '/contact' },
    { id: 'portfolio', label: 'Login', href: '/login' },
    { id: 'contact', label: 'Register', href: '/register' },
    { id: 'tests', label: 'Tests', href: '/tests' },
  ];

  const handleItemClick = (itemId: string): void => {
    setActiveItem(itemId);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className={styles['nav-container']}>
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
                className={`${styles['menu-item']} ${activeItem === item.id ? styles.active : ''}`}
                onClick={() => handleItemClick(item.id)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles['mobile-menu-button']}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <div className={styles['hamburger-line']}></div>
            <div className={styles['hamburger-line']}></div>
            <div className={styles['hamburger-line']}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles['mobile-menu']} ${isMobileMenuOpen ? styles.open : ''}`}>
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={`${styles['mobile-menu-item']} ${activeItem === item.id ? styles.active : ''}`}
              onClick={() => handleItemClick(item.id)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavigationMenu;