import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[6]};
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const NavbarContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.a`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};

  svg {
    width: 32px;
    height: 32px;
    fill: currentColor;
  }
`;

export const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  align-items: center;
`;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: color 0.2s ease;
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
  border-radius: ${({ theme }) => theme.radii.md};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;
