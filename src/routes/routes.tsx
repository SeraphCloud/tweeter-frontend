import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import ProtectedLayout from '../components/Layout/ProtectedLayout';
import Feed from '../pages/Feed';
import Explore from '../pages/Explore';
import Profile from '../pages/Profile';
import Post from '../pages/Post';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Feed />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'post/:id',
        element: <Post />,
      },
      {
        path: 'profile/:id',
        element: <Profile />,
      },
      {
        path: 'me',
        element: <Profile />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
