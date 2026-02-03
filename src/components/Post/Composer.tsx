import { useState, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import * as S from './styles';

const MAX_LENGTH = 280;

interface ComposerProps {
  avatarUrl?: string | null;
  displayName?: string;
  onSubmit: (content: string) => void | Promise<void>;
  isLoading?: boolean;
}

export function Composer({
  avatarUrl,
  displayName,
  onSubmit,
  isLoading = false,
}: ComposerProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const charCount = content.length;
  const isOverLimit = charCount > MAX_LENGTH;
  const isNearLimit = charCount >= MAX_LENGTH * 0.9 && !isOverLimit;
  const isEmpty = charCount === 0;
  const isDisabled = isLoading || isEmpty || isOverLimit;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = e.target.value;
      setContent(newContent);

      // Clear error when user types
      if (error) {
        setError(null);
      }
    },
    [error]
  );

  const handleSubmit = useCallback(async () => {
    // Validações
    if (isEmpty) {
      setError('O post não pode estar vazio');
      return;
    }

    if (isOverLimit) {
      setError(`O post não pode ter mais de ${MAX_LENGTH} caracteres`);
      return;
    }

    setError(null);
    await onSubmit(content.trim());
    setContent('');
  }, [content, isEmpty, isOverLimit, onSubmit]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        void handleSubmit();
      }
    },
    [handleSubmit]
  );

  return (
    <S.Container>
      <Avatar src={avatarUrl} name={displayName} size="md" />
      <S.ContentWrapper>
        <S.StyledTextarea
          placeholder="O que está acontecendo?"
          value={content}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          hasError={!!error || isOverLimit}
          disabled={isLoading}
        />
        <S.BottomRow>
          <S.ActionsWrapper>
            {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
            <S.CharCounter isNearLimit={isNearLimit} isOverLimit={isOverLimit}>
              {charCount}/{MAX_LENGTH}
            </S.CharCounter>
          </S.ActionsWrapper>
          <Button
            onClick={() => void handleSubmit()}
            disabled={isDisabled}
            isLoading={isLoading}
            size="md"
          >
            Publicar
          </Button>
        </S.BottomRow>
      </S.ContentWrapper>
    </S.Container>
  );
}
