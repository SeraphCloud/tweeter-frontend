import styled from 'styled-components';

// AppShell styles
export const AppShellContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 275px 1fr 350px;
  gap: ${({ theme }) => theme.space[4]};
  max-width: 1265px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.space[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 88px 1fr 350px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    padding: 0;
    gap: 0;
  }
`;

export const SidebarColumn = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: ${({ theme }) => theme.space[2]} 0;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const MainColumn = styled.main`
  min-height: 100vh;
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  border-right: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    border: none;
    padding-bottom: 80px;
  }
`;

export const RightRailColumn = styled.aside`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: ${({ theme }) => theme.space[4]} 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

// MobileNav styles
export const MobileNavContainer = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space[2]} 0;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const MobileNavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeights.medium : theme.fontWeights.normal};
  transition: color 0.2s ease;

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.textSecondary};
  background: none;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
  }

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }
`;

// RightRail styles
export const RightRailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
`;

export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[4]};
`;

export const ProfileCover = styled.div`
  width: 100%;
  height: 80px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryHover} 100%);
  border-radius: ${({ theme }) => theme.radii.md} ${({ theme }) => theme.radii.md} 0 0;
  margin: -${({ theme }) => theme.space[6]} -${({ theme }) => theme.space[6]} ${({ theme }) => theme.space[4]};
  width: calc(100% + ${({ theme }) => theme.space[6]} * 2);
`;

export const ProfileName = styled.a`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const ProfileHandle = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ProfileStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const StatItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;

  &:hover span:first-child {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StatValue = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const StatLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TipsCard = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[4]};
`;

export const TipsTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.text};
`;

export const TipsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`;

export const TipItem = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  padding-left: ${({ theme }) => theme.space[4]};
  position: relative;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const TrendingCard = styled.div`
  padding: 0;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

export const TrendingHeader = styled.div`
  padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TrendingTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const TrendingItem = styled.div`
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[6]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }
`;

export const TrendingCategory = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const TrendingTopic = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.space[1]} 0;
`;

export const TrendingPosts = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// Sidebar styles
export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: ${({ theme }) => theme.space[2]};
`;

export const Logo = styled.a`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  padding: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[4]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};

  svg {
    width: 32px;
    height: 32px;
    fill: currentColor;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
    span {
      display: none;
    }
  }
`;

export const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  flex: 1;
`;

export const NavItem = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  border-radius: ${({ theme }) => theme.radii.full};
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textSecondary)};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme, $active }) =>
    $active ? theme.fontWeights.bold : theme.fontWeights.normal};
  text-decoration: none;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundHover};
  }

  svg {
    width: 26px;
    height: 26px;
    flex-shrink: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
    span {
      display: none;
    }
  }
`;

export const LogoutSection = styled.div`
  margin-top: auto;
  padding: ${({ theme }) => theme.space[4]};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    justify-content: center;
  }
`;
