import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { Toast } from './ui/Toast';
import { useToast, type ToastData } from '../hooks/useToast';

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

const ToastContainerStyled = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  animation: ${slideIn} 0.3s ease-out;
`;

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return createPortal(
    <ToastContainerStyled>
      {toasts.map((toast: ToastData) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          variant={toast.variant}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </ToastContainerStyled>,
    document.body
  );
}

export default ToastContainer;
