import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  error: Error | string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className={styles.container}>
      <div className={styles.icon}>⚠️</div>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>{errorMessage}</p>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;