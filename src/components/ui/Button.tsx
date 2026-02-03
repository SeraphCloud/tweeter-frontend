import styled, { css } from 'styled-components';
import { Loader } from './Loader';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
}



const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => `${theme.space[2]} ${theme.space[3]}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    border-radius: ${({ theme }) => theme.radii.md};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.space[3]} ${theme.space[5]}`};
    font-size: ${({ theme }) => theme.fontSizes.base};
    border-radius: ${({ theme }) => theme.radii.lg};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.space[4]} ${theme.space[6]}`};
    font-size: ${({ theme }) => theme.fontSizes.lg};
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

    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.borderDark};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.backgroundHover};
    }

    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryLight};
    }

    &:active:not(:disabled) {
      transform: translateY(1px);
    }
  `,
};

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size', 'fullWidth'].includes(prop),
})<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  position: relative;

  ${({ size = 'md' }) => sizeStyles[size]}
  ${({ variant = 'primary' }) => variantStyles[variant]}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

const LoadingWrapper = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.span<{ $isLoading?: boolean }>`
  visibility: ${({ $isLoading }) => ($isLoading ? 'hidden' : 'visible')};
`;

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <LoadingWrapper>
          <Loader size="sm" />
        </LoadingWrapper>
      )}
      <ContentWrapper $isLoading={isLoading}>{children}</ContentWrapper>
    </StyledButton>
  );
}
