import { Link } from 'react-router-dom';
import type { Post } from '../../features/posts/postsTypes';
import { Avatar } from '../ui/Avatar';
import { formatRelativeTime } from '../../utils/date';
import * as S from './styles';

interface PostCardProps {
  post: Post;
  onLikeToggle?: (postId: number) => void;
  onCommentClick?: (postId: number) => void;
}

// SVG Icons
const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth={filled ? '0' : '2'}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export function PostCard({
  post,
  onLikeToggle,
  onCommentClick,
}: PostCardProps) {
  const handleLikeClick = () => {
    if (onLikeToggle) {
      onLikeToggle(post.id);
    }
  };

  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick(post.id);
    }
  };

  const relativeTime = formatRelativeTime(post.created_at);

  // Get display name with fallbacks
  const displayName = post.author_display_name || post.author_username || `User ${post.author}`;

  // Get username with fallback
  const username = post.author_username || `user${post.author}`;

  return (
    <S.PostCardContainer>
      <S.AvatarWrapper>
        <Link to={`/profile/${post.author}`}>
          <Avatar
            src={post.author_avatar}
            name={displayName}
            size="md"
          />
        </Link>
      </S.AvatarWrapper>

      <S.PostCardContentWrapper>
        <S.Header>
          <S.DisplayName as={Link} to={`/profile/${username}`}>
            {displayName}
          </S.DisplayName>
          <S.Username>@{username}</S.Username>
          <S.Separator>·</S.Separator>
          <S.TimeLink as={Link} to={`/post/${post.id}`} title={new Date(post.created_at).toLocaleString('pt-BR')}>
            {relativeTime}
          </S.TimeLink>
        </S.Header>

        <S.Content>{post.content}</S.Content>

        <S.Actions>
          <S.ActionButton
            variant="comment"
            onClick={handleCommentClick}
            as={onCommentClick ? 'button' : Link}
            to={onCommentClick ? undefined : `/post/${post.id}`}
          >
            <CommentIcon />
            <S.ActionCount>{post.comments_count}</S.ActionCount>
          </S.ActionButton>

          <S.ActionButton
            variant="like"
            active={post.is_liked ? true : undefined}
            onClick={handleLikeClick}
          >
            <HeartIcon filled={post.is_liked} />
            <S.ActionCount>{post.likes_count}</S.ActionCount>
          </S.ActionButton>
        </S.Actions>
      </S.PostCardContentWrapper>
    </S.PostCardContainer>
  );
}
