import styled, { keyframes } from 'styled-components';

type LoaderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LoaderProps {
  size?: LoaderSize;
  color?: string;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const sizeMap = {
  xs: '12px',
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

const borderWidthMap = {
  xs: '2px',
  sm: '2px',
  md: '3px',
  lg: '4px',
  xl: '5px',
};

const LoaderContainer = styled.div<LoaderProps>`
  width: ${({ size = 'md' }) => sizeMap[size]};
  height: ${({ size = 'md' }) => sizeMap[size]};
  border: ${({ size = 'md' }) => borderWidthMap[size]} solid
    ${({ theme, color }) => color || theme.colors.borderDark};
  border-top-color: ${({ theme, color }) => color || theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.full};
  animation: ${spin} 0.8s linear infinite;
`;

export function Loader({ size = 'md', color }: LoaderProps) {
  return <LoaderContainer size={size} color={color} aria-label="Loading" />;
}
