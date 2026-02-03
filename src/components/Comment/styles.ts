import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

export const StyledTextarea = styled.textarea.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError?: boolean }>`
  width: 100%;
  min-height: 60px;
  padding: ${({ theme }) => theme.space[2]};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.sans};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.borderDark)};
  border-radius: ${({ theme }) => theme.radii.md};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: ${({ theme, hasError }) =>
      hasError ? `0 0 0 3px ${theme.colors.errorLight}` : theme.shadows.focus};
  }
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.space[1]};
`;

export const CharCounter = styled.span.withConfig({
  shouldForwardProp: (prop) => !['isNearLimit', 'isOverLimit'].includes(prop),
})<{ isNearLimit?: boolean; isOverLimit?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, isNearLimit, isOverLimit }) => {
    if (isOverLimit) return theme.colors.error;
    if (isNearLimit) return theme.colors.warning;
    return theme.colors.textMuted;
  }};
  font-weight: ${({ theme, isNearLimit }) =>
    isNearLimit ? theme.fontWeights.medium : theme.fontWeights.normal};
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
`;

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
`;

export const ContentWrapperItem = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

export const DisplayName = styled.a.withConfig({
  shouldForwardProp: (prop) => prop === 'to',
})`
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

export const Username = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

export const Separator = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const Time = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

export const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.space[6]};
`;

export const ErrorMessageList = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  color: ${({ theme }) => theme.colors.error};
  text-align: center;
`;

export const EmptyStateList = styled.div`
  padding: ${({ theme }) => theme.space[6]};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const CommentsCount = styled.div`
  padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const CommentsContainer = styled.div`
  padding: 0 ${({ theme }) => theme.space[4]};
`;
