import styled, { css } from 'styled-components';
import { Loader } from './Loader';

type IconButtonVariant = 'primary' | 'secondary' | 'ghost';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isLoading?: boolean;
  'aria-label': string;
}

const sizeStyles = {
  sm: css`
    width: 32px;
    height: 32px;
    border-radius: ${({ theme }) => theme.radii.md};
  `,
  md: css`
    width: 40px;
    height: 40px;
    border-radius: ${({ theme }) => theme.radii.lg};
  `,
  lg: css`
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.radii.xl};
  `,
};

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.borderDark};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.backgroundHover};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.backgroundHover};
      color: ${({ theme }) => theme.colors.text};
    }
  `,
};

const StyledIconButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size'].includes(prop),
})<IconButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  ${({ size = 'md' }) => sizeStyles[size]}
  ${({ variant = 'ghost' }) => variantStyles[variant]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  svg {
    width: 50%;
    height: 50%;
  }
`;

export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: IconButtonProps) {
  return (
    <StyledIconButton
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader size={size === 'sm' ? 'xs' : size === 'lg' ? 'md' : 'sm'} /> : children}
    </StyledIconButton>
  );
}
