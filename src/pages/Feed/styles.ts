import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.space[4]};
  z-index: 10;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.8);
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space[8]};
`;

export const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.space[8]};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
