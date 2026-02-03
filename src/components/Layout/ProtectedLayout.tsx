import ProtectedRoute from '../ProtectedRoute';
import Layout from './Layout';

export default function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  );
}
