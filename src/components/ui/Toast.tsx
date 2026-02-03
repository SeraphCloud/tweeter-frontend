import { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastItem = styled.div<{ $variant: 'success' | 'error' | 'warning' | 'info'; $visible: boolean }>`
  pointer-events: auto;
  min-width: 300px;
  max-width: 400px;
  padding: 16px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${slideIn} 0.3s ease-out;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'success':
        return `
          border-left: 4px solid #10b981;
        `;
      case 'error':
        return `
          border-left: 4px solid #ef4444;
        `;
      case 'warning':
        return `
          border-left: 4px solid #f59e0b;
        `;
      case 'info':
        return `
          border-left: 4px solid #3b82f6;
        `;
      default:
        return '';
    }
  }}

  ${({ $visible }) =>
    !$visible &&
    `
    animation: ${slideOut} 0.3s ease-out forwards;
  `}
`;

const IconWrapper = styled.div<{ $variant: 'success' | 'error' | 'warning' | 'info' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  ${({ $variant }) => {
    switch ($variant) {
      case 'success':
        return `
          color: #10b981;
        `;
      case 'error':
        return `
          color: #ef4444;
        `;
      case 'warning':
        return `
          color: #f59e0b;
        `;
      case 'info':
        return `
          color: #3b82f6;
        `;
      default:
        return '';
    }
  }}
`;

const Message = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.4;
  color: #1f2937;
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  transition: color 0.2s;

  &:hover {
    color: #4b5563;
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;

interface ToastProps {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

export function Toast({ id, message, variant, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const icons = {
    success: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
    error: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        <path d="M10 8a1 1 0 011 1v4a1 1 0 11-2 0V9a1 1 0 011-1z" />
        <path d="M10 15a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
    warning: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
    info: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  };

  return (
    <ToastItem $variant={variant} $visible={true}>
      <IconWrapper $variant={variant}>{icons[variant]}</IconWrapper>
      <Message>{message}</Message>
      <CloseButton onClick={() => onClose(id)} aria-label="Fechar notificação">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
        </svg>
      </CloseButton>
    </ToastItem>
  );
}

export default Toast;
