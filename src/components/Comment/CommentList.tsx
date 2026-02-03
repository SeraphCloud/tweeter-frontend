import type { Comment } from '../../mocks/mockComments';
import type { Profile } from '../../mocks/mockProfiles';
import { CommentItem } from './CommentItem';
import { Loader } from '../ui/Loader';
import * as S from './styles';

interface CommentListProps {
  comments: Comment[];
  getAuthor: (userId: number) => Profile | undefined;
  isLoading?: boolean;
  error?: string | null;
}

export function CommentList({
  comments,
  getAuthor,
  isLoading = false,
  error = null,
}: CommentListProps) {
  if (isLoading) {
    return (
      <S.LoadingContainer>
        <Loader size="md" />
      </S.LoadingContainer>
    );
  }

  if (error) {
    return (
      <S.ErrorMessageList>
        Erro ao carregar comentários. Tente novamente mais tarde.
      </S.ErrorMessageList>
    );
  }

  return (
    <S.Container>
      <S.CommentsCount>
        {comments.length === 0
          ? 'Nenhum comentário'
          : comments.length === 1
            ? '1 comentário'
            : `${comments.length} comentários`}
      </S.CommentsCount>

      <S.CommentsContainer>
        {comments.length === 0 ? (
          <S.EmptyStateList>
            Seja o primeiro a comentar neste post!
          </S.EmptyStateList>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              author={getAuthor(comment.user)}
            />
          ))
        )}
      </S.CommentsContainer>
    </S.Container>
  );
}
