import { Link } from 'react-router-dom';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { useGetMyProfileQuery, useGetFollowersQuery, useGetFollowingQuery } from '../../features/profiles/profilesApi';
import * as S from './styles';

export function RightRail() {
  const { data: profile } = useGetMyProfileQuery();
  
  // Ensure profileId is a number or 0 for the query
  const profileId = profile?.id || 0;
  const { data: followers } = useGetFollowersQuery(profileId, { skip: !profile?.id });
  const { data: following } = useGetFollowingQuery(profileId, { skip: !profile?.id });

  // Default values while loading
  const userName = profile?.display_name || profile?.username || 'Usuário';
  const userHandle = `@${profile?.username || 'usuario'}`;
  const userAvatar = profile?.avatar;
  const followersCount = followers?.length || 0;
  const followingCount = following?.length || 0;

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
        <Avatar src={userAvatar} name={userName} size="lg" />
        <S.ProfileName as={Link} to="/me">{userName}</S.ProfileName>
        <S.ProfileHandle>{userHandle}</S.ProfileHandle>
        <Badge variant="primary" size="sm">
          Pro
        </Badge>
        <S.ProfileStats>
          <S.StatItem as={Link} to="/me/following">
            <S.StatValue>{followingCount}</S.StatValue>
            <S.StatLabel>Seguindo</S.StatLabel>
          </S.StatItem>
          <S.StatItem as={Link} to="/me/followers">
            <S.StatValue>{followersCount}</S.StatValue>
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
