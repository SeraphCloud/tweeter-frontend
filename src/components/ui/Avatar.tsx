import styled from 'styled-components';

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
}

const sizeMap = {
  xs: '24px',
  sm: '32px',
  md: '48px',
  lg: '64px',
  xl: '96px',
};

const fontSizeMap = {
  xs: '10px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '36px',
};

const AvatarContainer = styled.div<{ size: AvatarSize }>`
  width: ${({ size }) => sizeMap[size]};
  height: ${({ size }) => sizeMap[size]};
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.border};
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Initials = styled.span<{ size: AvatarSize }>`
  font-size: ${({ size }) => fontSizeMap[size]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
`;

function getInitials(name?: string): string {
  if (!name) return '?';

  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
}

export function Avatar({ src, alt, name, size = 'md' }: AvatarProps) {
  const hasImage = src && src.trim() !== '';

  return (
    <AvatarContainer size={size}>
      {hasImage ? (
        <AvatarImage src={src} alt={alt || name || 'Avatar'} />
      ) : (
        <Initials size={size}>{getInitials(name)}</Initials>
      )}
    </AvatarContainer>
  );
}
