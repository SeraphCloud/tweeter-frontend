import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import * as S from './styles';

// Icons
const HomeIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M5.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C15.318 13.65 13.838 13 12 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C7.627 11.85 9.68 11 12 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zM12 4c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2zM8 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
  </svg>
);

const ExploreIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 3.31 2.69 6 6 6s6-2.69 6-6v-4h2v4c0 4.42-3.58 8-8 8s-8-3.58-8-8V7.55L1.432 9.48.068 8.02 4.5 3.88zM13 3c0-1.1.9-2 2-2s2 .9 2 2v8c0 1.1-.9 2-2 2s-2-.9-2-2V3z" />
  </svg>
);

export function MobileNav() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <S.MobileNavContainer>
      <S.MobileNavItem as={Link} to="/" $active={isActive('/')}>
        <HomeIcon />
        Feed
      </S.MobileNavItem>
      <S.MobileNavItem as={Link} to="/explore" $active={isActive('/explore')}>
        <ExploreIcon />
        Explorar
      </S.MobileNavItem>
      <S.MobileNavItem as={Link} to="/me" $active={isActive('/me')}>
        <UserIcon />
        Perfil
      </S.MobileNavItem>
      <S.LogoutButton onClick={handleLogout}>
        <LogoutIcon />
        Sair
      </S.LogoutButton>
    </S.MobileNavContainer>
  );
}
