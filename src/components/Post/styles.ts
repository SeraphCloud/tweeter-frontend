import styled from 'styled-components';

// Composer styles
export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  padding: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`;

export const StyledTextarea = styled.textarea.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError?: boolean }>`
  width: 100%;
  min-height: 80px;
  padding: ${({ theme }) => theme.space[3]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-family: ${({ theme }) => theme.fonts.sans};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text};
  background-color: transparent;
  border: none;
  border-bottom: 2px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.error : 'transparent')};
  resize: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-bottom-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
  }
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ theme }) => theme.space[2]};
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
  margin-right: ${({ theme }) => theme.space[3]};
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[3]};
`;

// PostCard styles
export const PostCardContainer = styled.article`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  padding: ${({ theme }) => theme.space[4]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  }
`;

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
`;

export const PostCardContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  margin-bottom: ${({ theme }) => theme.space[1]};
`;

export const DisplayName = styled.a`
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

export const TimeLink = styled.a`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
`;

export const Content = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 ${({ theme }) => theme.space[3]} 0;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[6]};
  margin-top: ${({ theme }) => theme.space[2]};
`;

export const ActionButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['active', 'variant'].includes(prop),
})<{ active?: boolean; variant: 'like' | 'comment' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[1]};
  background: none;
  border: none;
  padding: ${({ theme }) => theme.space[1]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, active, variant }) => {
    if (variant === 'like' && active) return theme.colors.error;
    return theme.colors.textSecondary;
  }};
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: ${({ theme }) => theme.radii.full};

  &:hover {
    color: ${({ theme, variant }) =>
      variant === 'like' ? theme.colors.error : theme.colors.primary};
    background-color: ${({ theme, variant }) =>
      variant === 'like'
        ? theme.colors.errorLight
        : theme.colors.primaryLight};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ActionCount = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;
