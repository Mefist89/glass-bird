import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import logo from '../assets/logo.png';
import { Link, useLocation } from 'react-router-dom';

interface MenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  submenu?: MenuItem[];
}

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const location = useLocation();
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  
  // Mock user data for profile section
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: logo // Using logo as placeholder
 };

  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home', href: '/' },
    { 
      id: 'course', 
      label: 'Courses', 
      submenu: [
        { id: 'python', label: 'Python', href: '/python' },
        { id: 'network', label: 'Network', href: '/network' },
        { id: 'sql', label: 'SQL', href: '/sql' }
      ] 
    },
    { id: 'tests', label: 'Tests', href: '/tests' },
    { id: 'contact', label: 'Contact', href: '/contact' },
    { id: 'about', label: 'About', href: '/about' },
  ];

  const toggleSubmenu = (id: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Sidebar Header */}
      <div className={styles.sidebarHeader}>
        {!collapsed && (
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Logo" className={styles.logoImage} />
            <span className={styles.logoText}>Glass Bird</span>
          </Link>
        )}
        <button className={styles.toggleButton} onClick={onToggle}>
          {collapsed ? '»' : '«'}
        </button>
      </div>

      {/* User Profile Section */}
      <div className={styles.userProfile}>
        {!collapsed && (
          <>
            <img src={user.avatar} alt="User" className={styles.userAvatar} />
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user.name}</div>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
          </>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className={styles.nav}>
        <ul className={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.id} className={styles.menuItem}>
              {item.submenu ? (
                <div
                  className={styles.menuLink}
                  onClick={() => toggleSubmenu(item.id)}
                >
                  <span className={styles.menuText}>{item.label}</span>
                  <span className={styles.arrow}>
                    {openSubmenus[item.id] ? '▲' : '▼'}
                  </span>
                </div>
              ) : (
                <Link
                  to={item.href || '#'}
                  className={`${styles.menuLink} ${isActive(item.href) ? styles.active : ''}`}
                >
                  <span className={styles.menuText}>{item.label}</span>
                </Link>
              )}
              
              {/* Submenu */}
              {item.submenu && openSubmenus[item.id] && !collapsed && (
                <ul className={styles.submenu}>
                  {item.submenu.map((subItem) => (
                    <li key={subItem.id} className={styles.submenuItem}>
                      <Link
                        to={subItem.href || '#'}
                        className={`${styles.submenuLink} ${isActive(subItem.href) ? styles.active : ''}`}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;