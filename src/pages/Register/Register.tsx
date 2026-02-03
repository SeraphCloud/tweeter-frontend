import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { useRegisterMutation } from '../../features/auth/authApi';
import { getErrorMessage } from '../../utils/errorHandling';

const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space[6]};
`;

const RegisterForm = styled.form`
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[8]};
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.space[8]};
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.space[1]};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.space[4]};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.space[4]};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.textSecondary};
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.space[4]};
  text-align: center;
`;

const SuccessMessage = styled.p`
  color: ${({ theme }) => theme.colors.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-top: ${({ theme }) => theme.space[4]};
  text-align: center;
`;

const LoginLink = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.space[6]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  &:hover {
    text-decoration: underline;
  }
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [register, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    try {
      await register({ username, email, password }).unwrap();
      setRegisterSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch {
      // Error is handled by the mutation
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Create Account</Title>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
            required
            minLength={3}
            maxLength={150}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email (optional)</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email (optional)"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            minLength={8}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
          />
        </FormGroup>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating account...' : 'Register'}
        </Button>
        {(error || passwordError) && (
          <ErrorMessage>
            {passwordError || getErrorMessage(error)}
          </ErrorMessage>
        )}
        {registerSuccess && (
          <SuccessMessage>
            Account created successfully! Redirecting to login...
          </SuccessMessage>
        )}
        <LoginLink>
          Already have an account?{' '}
          <StyledLink to="/login">Login</StyledLink>
        </LoginLink>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;
