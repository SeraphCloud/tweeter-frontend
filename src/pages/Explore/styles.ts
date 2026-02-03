import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const Header = styled.header`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e1e8ed;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
`;

export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
`;

export const ErrorMessage = styled.div`
  background-color: #fee2e2;
  color: #dc2626;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;

  button {
    background: none;
    border: none;
    color: #dc2626;
    text-decoration: underline;
    cursor: pointer;
    font-weight: 600;
    margin-left: 8px;

    &:hover {
      color: #b91c1c;
    }
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
`;
