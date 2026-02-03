import type React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space[4]};
  z-index: 10;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  padding: ${({ theme }) => theme.space[2]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space[8]};
`;

export const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

export const NotFoundMessage = styled.div`
  padding: ${({ theme }) => theme.space[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Back arrow icon
export const BackIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);
