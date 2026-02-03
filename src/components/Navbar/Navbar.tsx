import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';
import { Button } from '../ui/Button';
import { IconButton } from '../ui/IconButton';
import * as S from './styles';

// Icons
const TweetIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z" />
  </svg>
);

const LogoutIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 3.31 2.69 6 6 6s6-2.69 6-6v-4h2v4c0 4.42-3.58 8-8 8s-8-3.58-8-8V7.55L1.432 9.48.068 8.02 4.5 3.88zM13 3c0-1.1.9-2 2-2s2 .9 2 2v8c0 1.1-.9 2-2 2s-2-.9-2-2V3z" />
  </svg>
);

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <S.NavbarContainer>
      <S.NavbarContent>
        <S.Logo as={Link} to="/">
          <TweetIcon />
          Tweeter
        </S.Logo>
        <S.NavLinks>
          <S.NavLink as={Link} to="/">Feed</S.NavLink>
          <S.NavLink as={Link} to="/me">Meu Perfil</S.NavLink>
          <Button size="sm" variant="primary">
            Tweetar
          </Button>
          <IconButton
            variant="ghost"
            size="md"
            onClick={handleLogout}
            aria-label="Sair"
          >
            <LogoutIcon />
          </IconButton>
        </S.NavLinks>
      </S.NavbarContent>
    </S.NavbarContainer>
  );
};

export default Navbar;
