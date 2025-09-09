import React, { useState } from 'react';
import styles from './Menu.module.css';

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
    { id: 'home', label: 'Главная', href: '#home' },
    { id: 'about', label: 'О нас', href: '#about' },
    { id: 'services', label: 'Услуги', href: '#services' },
    { id: 'portfolio', label: 'Портфолио', href: '#portfolio' },
    { id: 'contact', label: 'Контакты', href: '#contact' },
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
          <a href="#" className={styles.logo}>
            Logo
          </a>

          {/* Desktop Menu */}
          <div className={styles['desktop-menu']}>
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`${styles['menu-item']} ${activeItem === item.id ? styles.active : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleItemClick(item.id);
                }}
              >
                {item.label}
              </a>
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
            <a
              key={item.id}
              href={item.href}
              className={`${styles['mobile-menu-item']} ${activeItem === item.id ? styles.active : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Demo Content */}
      <div className={styles['demo-content']}>
        <div className={styles['demo-card']}>
          <h2 className={styles['demo-title']}>
            Активная страница: {menuItems.find(item => item.id === activeItem)?.label}
          </h2>
          <p className={styles['demo-text']}>
            Нажмите на любой пункт меню, чтобы увидеть изменения. Меню адаптивное и работает на мобильных устройствах.
          </p>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;