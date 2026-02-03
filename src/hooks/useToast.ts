import { useState, useCallback } from 'react';

export interface ToastData {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

interface UseToastReturn {
  toasts: ToastData[];
  showToast: (message: string, variant?: 'success' | 'error' | 'warning' | 'info', duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export function useToast(): UseToastReturn {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (
      message: string,
      variant: 'success' | 'error' | 'warning' | 'info' = 'info',
      duration = 5000
    ) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
      const newToast: ToastData = { id, message, variant, duration };
      setToasts((prev) => [...prev, newToast]);
    },
    []
  );

  const showSuccess = useCallback(
    (message: string, duration = 5000) => {
      showToast(message, 'success', duration);
    },
    [showToast]
  );

  const showError = useCallback(
    (message: string, duration = 5000) => {
      showToast(message, 'error', duration);
    },
    [showToast]
  );

  const showWarning = useCallback(
    (message: string, duration = 5000) => {
      showToast(message, 'warning', duration);
    },
    [showToast]
  );

  const showInfo = useCallback(
    (message: string, duration = 5000) => {
      showToast(message, 'info', duration);
    },
    [showToast]
  );

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return {
    toasts,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
    clearToasts,
  };
}
