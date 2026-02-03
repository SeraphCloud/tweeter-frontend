import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
