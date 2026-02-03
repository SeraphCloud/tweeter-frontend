import styled from 'styled-components';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  thickness?: 'thin' | 'medium' | 'thick';
  color?: 'default' | 'light' | 'primary';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const thicknessMap = {
  thin: '1px',
  medium: '2px',
  thick: '4px',
};

const StyledDivider = styled.div<DividerProps>`
  ${({ orientation = 'horizontal' }) =>
    orientation === 'horizontal'
      ? `
    width: 100%;
    height: ${({ thickness }: { thickness: 'thin' | 'medium' | 'thick' }) => thicknessMap[thickness]};
  `
      : `
    height: 100%;
    width: ${({ thickness }: { thickness: 'thin' | 'medium' | 'thick' }) => thicknessMap[thickness]};
  `}

  background-color: ${({ theme, color = 'default' }) => {
    switch (color) {
      case 'light':
        return theme.colors.border;
      case 'primary':
        return theme.colors.primary;
      default:
        return theme.colors.borderDark;
    }
  }};

  margin: ${({ orientation = 'horizontal', spacing = 'md', theme }) => {
    if (spacing === 'none') return '0';

    const spaceValue = {
      sm: theme.space[4],
      md: theme.space[6],
      lg: theme.space[8],
    }[spacing];

    return orientation === 'horizontal'
      ? `${spaceValue} 0`
      : `0 ${spaceValue}`;
  }};
`;

export function Divider({
  orientation = 'horizontal',
  thickness = 'thin',
  color = 'default',
  spacing = 'md',
}: DividerProps) {
  return (
    <StyledDivider
      orientation={orientation}
      thickness={thickness}
      color={color}
      spacing={spacing}
      role="separator"
      aria-orientation={orientation}
    />
  );
}
