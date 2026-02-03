import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { useLoginMutation } from '../../features/auth/authApi';
import { getErrorMessage } from '../../utils/errorHandling';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const LoginForm = styled.form`
  background-color: #fff;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: #657786;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e1e8ed;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #1da1f2;
  }
`;

const ErrorMessage = styled.p`
  color: #e0245e;
  font-size: 0.875rem;
  margin-top: 1rem;
  text-align: center;
`;

const RegisterLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  font-size: 0.875rem;
`;

const StyledLink = styled.a`
  color: #1da1f2;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const authError = useAppSelector((state) => state.auth.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ username, password }).unwrap();
      navigate('/');
    } catch {
      // Error is handled by the error display below
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Login</Title>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsernameState(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPasswordState(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </FormGroup>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#1da1f2',
            color: 'white',
            border: 'none',
            borderRadius: '24px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        {(error || authError) && (
          <ErrorMessage>
            {getErrorMessage(error) || authError || 'Login failed. Please try again.'}
          </ErrorMessage>
        )}
        <RegisterLink>
          Don't have an account?{' '}
          <StyledLink as={Link} to="/register">Register</StyledLink>
        </RegisterLink>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
