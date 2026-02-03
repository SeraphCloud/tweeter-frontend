import { useState, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import * as S from './styles';

const MAX_LENGTH = 500;

interface CommentFormProps {
  avatarUrl?: string | null;
  displayName?: string;
  onSubmit: (text: string) => void | Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
}

export function CommentForm({
  avatarUrl,
  displayName,
  onSubmit,
  isLoading = false,
  placeholder = 'Escreva um comentário...',
}: CommentFormProps) {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const charCount = text.length;
  const isOverLimit = charCount > MAX_LENGTH;
  const isNearLimit = charCount >= MAX_LENGTH * 0.9 && !isOverLimit;
  const isEmpty = charCount === 0;
  const isDisabled = isLoading || isEmpty || isOverLimit;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newText = e.target.value;
      setText(newText);

      if (error) {
        setError(null);
      }
    },
    [error]
  );

  const handleSubmit = useCallback(async () => {
    if (isEmpty) {
      setError('O comentário não pode estar vazio');
      return;
    }

    if (isOverLimit) {
      setError(`O comentário não pode ter mais de ${MAX_LENGTH} caracteres`);
      return;
    }

    setError(null);
    await onSubmit(text.trim());
    setText('');
  }, [text, isEmpty, isOverLimit, onSubmit]);

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
      <Avatar src={avatarUrl} name={displayName} size="sm" />
      <S.ContentWrapper>
        <S.StyledTextarea
          placeholder={placeholder}
          value={text}
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
            size="sm"
          >
            Responder
          </Button>
        </S.BottomRow>
      </S.ContentWrapper>
    </S.Container>
  );
}
