import * as S from './styles';

interface FollowButtonProps {
  isFollowing: boolean;
  onToggle: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function FollowButton({
  isFollowing,
  onToggle,
  isLoading = false,
  disabled = false,
}: FollowButtonProps) {
  return (
    <S.StyledButton
      variant={isFollowing ? 'secondary' : 'primary'}
      size="sm"
      onClick={onToggle}
      isLoading={isLoading}
      disabled={disabled}
      isFollowing={isFollowing}
    >
      {isFollowing ? 'Seguindo' : 'Seguir'}
    </S.StyledButton>
  );
}
