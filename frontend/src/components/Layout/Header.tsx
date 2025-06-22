import React from 'react';
import styles from './Header.module.css';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ 
  title = 'Natural Events Tracker', 
  subtitle = 'Real-time monitoring of global natural phenomena' 
}) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  );
};

export default Header;