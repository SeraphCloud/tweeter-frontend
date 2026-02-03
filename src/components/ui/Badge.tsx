import styled, { css } from 'styled-components';

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error';
type BadgeSize = 'sm' | 'md';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
}

const sizeStyles = {
  sm: css`
    padding: 2px ${({ theme }) => theme.space[2]};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  `,
  md: css`
    padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
};

const variantStyles = {
  default: css`
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.textSecondary};
  `,
  primary: css`
    background-color: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
  `,
  success: css`
    background-color: ${({ theme }) => theme.colors.successLight};
    color: ${({ theme }) => theme.colors.success};
  `,
  warning: css`
    background-color: ${({ theme }) => theme.colors.warningLight};
    color: ${({ theme }) => theme.colors.warning};
  `,
  error: css`
    background-color: ${({ theme }) => theme.colors.errorLight};
    color: ${({ theme }) => theme.colors.error};
  `,
};

const StyledBadge = styled.span.withConfig({
  shouldForwardProp: (prop) => !['variant', 'size'].includes(prop),
})<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.full};
  white-space: nowrap;

  ${({ size = 'md' }) => sizeStyles[size]}
  ${({ variant = 'default' }) => variantStyles[variant]}
`;

export function Badge({ children, variant = 'default', size = 'md', ...props }: BadgeProps) {
  return (
    <StyledBadge variant={variant} size={size} {...props}>
      {children}
    </StyledBadge>
  );
}
