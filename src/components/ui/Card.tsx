import styled from 'styled-components';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  clickable?: boolean;
}



const StyledCard = styled.div<CardProps>`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ padding = 'md', theme }) => {
    switch (padding) {
      case 'none':
        return '0';
      case 'sm':
        return theme.space[4];
      case 'lg':
        return theme.space[8];
      default:
        return theme.space[6];
    }
  }};
  box-shadow: ${({ shadow = 'none', theme }) => theme.shadows[shadow]};
  transition: all 0.2s ease;

  ${({ hover, theme }) =>
    hover &&
    `
    &:hover {
      box-shadow: ${theme.shadows.md};
      transform: translateY(-2px);
    }
  `}

  ${({ clickable }) =>
    clickable &&
    `
    cursor: pointer;
  `}
`;

export function Card({ children, ...props }: CardProps) {
  return <StyledCard {...props}>{children}</StyledCard>;
}
