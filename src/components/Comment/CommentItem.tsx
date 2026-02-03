import { Link } from 'react-router-dom';
import type { Comment } from '../../features/comments/commentsTypes';
import type { Profile } from '../../features/profiles/profilesTypes';
import { Avatar } from '../ui/Avatar';
import { formatRelativeTime } from '../../utils/date';
import * as S from './styles';

interface CommentItemProps {
  comment: Comment;
  author?: Profile;
}

export function CommentItem({ comment, author }: CommentItemProps) {
  const relativeTime = formatRelativeTime(comment.created_at);

  return (
    <S.Container>
      <S.AvatarWrapper>
        <Link to={author ? `/profile/${author.id}` : '#'}>
          <Avatar src={author?.avatar} name={author?.display_name} size="sm" />
        </Link>
      </S.AvatarWrapper>

      <S.ContentWrapper>
        <S.Header>
          <Link to={author ? `/profile/${author.id}` : '#'}>
            <S.DisplayName>
              {author?.display_name ?? `User ${comment.user}`}
            </S.DisplayName>
          </Link>
          <S.Username>@{author?.username ?? `user${comment.user}`}</S.Username>
          <S.Separator>·</S.Separator>
          <S.Time title={new Date(comment.created_at).toLocaleString('pt-BR')}>
            {relativeTime}
          </S.Time>
        </S.Header>

        <S.Text>{comment.text}</S.Text>
      </S.ContentWrapper>
    </S.Container>
  );
}
