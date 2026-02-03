import { Link } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import * as S from './styles';

export function RightRail() {
  // Mock data - in real app would come from auth state
  const user = {
    name: 'Victor Silva',
    handle: '@victor',
    avatar: null,
    following: 42,
    followers: 128,
  };

  const trending = [
    { category: 'Tecnologia', topic: '#React', posts: '12.5K posts' },
    { category: 'Esportes', topic: 'Olimpíadas 2026', posts: '45.2K posts' },
    { category: 'Entretenimento', topic: 'Novo filme Marvel', posts: '8.1K posts' },
    { category: 'Política', topic: 'Eleições', posts: '23.7K posts' },
  ];

  return (
    <S.RightRailContainer>
      <S.ProfileCard>
        <S.ProfileCover />
        <Avatar name={user.name} size="lg" />
        <S.ProfileName as={Link} to="/me">{user.name}</S.ProfileName>
        <S.ProfileHandle>{user.handle}</S.ProfileHandle>
        <Badge variant="primary" size="sm">
          Pro
        </Badge>
        <S.ProfileStats>
          <S.StatItem as={Link} to="/me/following">
            <S.StatValue>{user.following}</S.StatValue>
            <S.StatLabel>Seguindo</S.StatLabel>
          </S.StatItem>
          <S.StatItem as={Link} to="/me/followers">
            <S.StatValue>{user.followers}</S.StatValue>
            <S.StatLabel>Seguidores</S.StatLabel>
          </S.StatItem>
        </S.ProfileStats>
      </S.ProfileCard>

      <S.TrendingCard>
        <S.TrendingHeader>
          <S.TrendingTitle>Tendências para você</S.TrendingTitle>
        </S.TrendingHeader>
        {trending.map((item, index) => (
          <S.TrendingItem key={index}>
            <S.TrendingCategory>{item.category}</S.TrendingCategory>
            <S.TrendingTopic>{item.topic}</S.TrendingTopic>
            <S.TrendingPosts>{item.posts}</S.TrendingPosts>
          </S.TrendingItem>
        ))}
      </S.TrendingCard>

      <S.TipsCard>
        <S.TipsTitle>Dicas do Tweeter</S.TipsTitle>
        <S.TipsList>
          <S.TipItem>Use hashtags para aumentar o alcance dos seus posts</S.TipItem>
          <S.TipItem>Interaja com outros usuários para ganhar mais visibilidade</S.TipItem>
          <S.TipItem>Poste conteúdo regularmente para manter seus seguidores engajados</S.TipItem>
        </S.TipsList>
      </S.TipsCard>
    </S.RightRailContainer>
  );
}
