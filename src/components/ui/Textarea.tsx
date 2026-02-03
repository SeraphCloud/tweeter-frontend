import styled from 'styled-components';
import { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  maxLength?: number;
}

const TextareaContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

const StyledTextarea = styled.textarea.withConfig({
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError?: boolean }>`
  width: 100%;
  min-height: 100px;
  padding: ${({ theme }) => `${theme.space[3]} ${theme.space[4]}`};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.sans};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.error : theme.colors.borderDark)};
  border-radius: ${({ theme }) => theme.radii.md};
  resize: vertical;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:hover {
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, hasError }) =>
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: ${({ theme, hasError }) =>
      hasError ? `0 0 0 3px ${theme.colors.errorLight}` : theme.shadows.focus};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundSecondary};
    color: ${({ theme }) => theme.colors.textMuted};
    cursor: not-allowed;
    resize: none;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

const HelperText = styled.span<{ isError?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, isError }) => (isError ? theme.colors.error : theme.colors.textSecondary)};
`;

const CharCount = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'isNearLimit',
})<{ isNearLimit?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme, isNearLimit }) =>
    isNearLimit ? theme.colors.error : theme.colors.textMuted};
  font-weight: ${({ theme, isNearLimit }) =>
    isNearLimit ? theme.fontWeights.medium : theme.fontWeights.normal};
`;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, fullWidth = false, maxLength, value, ...props }, ref) => {
    const charCount = typeof value === 'string' ? value.length : 0;
    const isNearLimit = maxLength ? charCount >= maxLength * 0.9 : false;

    return (
      <TextareaContainer fullWidth={fullWidth}>
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <StyledTextarea
          ref={ref}
          hasError={!!error}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        <BottomRow>
          {(error || helperText) && (
            <HelperText isError={!!error}>{error || helperText}</HelperText>
          )}
          {maxLength && (
            <CharCount isNearLimit={isNearLimit}>
              {charCount}/{maxLength}
            </CharCount>
          )}
        </BottomRow>
      </TextareaContainer>
    );
  }
);

Textarea.displayName = 'Textarea';
