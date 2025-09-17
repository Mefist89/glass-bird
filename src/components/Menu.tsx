import React, { useState } from 'react';
import styles from './Menu.module.css';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  submenu?: MenuItem[];
}

interface NavigationMenuProps {
}

const NavigationMenu: React.FC<NavigationMenuProps> = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { 
      id: 'course', 
      label: 'Course', 
      submenu: [
        { id: 'python', label: 'Python', href: '/python' },
        { id: 'network', label: 'Network', href: '/network' },
        { id: 'sql', label: 'SQL', href: '/sql' }
      ] 
    },
    { id: 'contact', label: 'Contact', href: '/contact' },
    { id: 'login', label: 'Login', href: '/login' },
    { id: 'register', label: 'Register', href: '/register' },
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
              <div 
                key={item.id} 
                className={styles['menu-item-container']}
                style={{ position: 'relative' }}
              >
                {item.href ? (
                  <Link
                    to={item.href}
                    className={`${styles['menu-item']} ${activeItem === item.id ? styles.active : ''}`}
                    onClick={() => handleItemClick(item.id)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div
                    className={`${styles['menu-item']} ${activeItem === item.id ? styles.active : ''}`}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.label}
                  </div>
                )}
                
                {/* Submenu */}
                {item.submenu && (
                  <div className={styles['submenu']}>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.id}
                        to={subItem.href || '#'}
                        className={styles['submenu-item']}
                        onClick={() => handleItemClick(subItem.id)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
            <div key={item.id}>
              {item.href ? (
                <Link
                  to={item.href}
                  className={`${styles['mobile-menu-item']} ${activeItem === item.id ? styles.active : ''}`}
                  onClick={() => handleItemClick(item.id)}
                >
                  {item.label}
                </Link>
              ) : (
                <div
                  className={`${styles['mobile-menu-item']} ${activeItem === item.id ? styles.active : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  {item.label}
                </div>
              )}
              
              {/* Mobile Submenu */}
              {item.submenu && (
                <div style={{ paddingLeft: '20px' }}>
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.id}
                      to={subItem.href || '#'}
                      className={`${styles['mobile-menu-item']} ${activeItem === subItem.id ? styles.active : ''}`}
                      onClick={() => handleItemClick(subItem.id)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
};

export default NavigationMenu;