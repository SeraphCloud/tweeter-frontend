import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Composer } from '../../components/Post/Composer';
import { PostCard } from '../../components/Post/PostCard';
import { Loader } from '../../components/ui/Loader';
import {
  useGetFeedQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} from '../../features/posts/postsApi';
import { useGetMyProfileQuery } from '../../features/profiles/profilesApi';
import {
  Container,
  Header,
  Title,
  PostsContainer,
  LoadingContainer,
  ErrorMessage,
  EmptyState,
} from './styles';

export default function Feed() {
  const navigate = useNavigate();

  // RTK Query hooks
  const {
    data: apiPosts,
    isLoading: apiLoading,
    error: apiError,
    refetch,
  } = useGetFeedQuery(undefined);

  const [createPostApi] = useCreatePostMutation();
  const [likePostApi] = useLikePostMutation();
  const [dislikePostApi] = useDislikePostMutation();

  // Get current user profile for Composer
  const { data: currentUser } = useGetMyProfileQuery();

  const handleCreatePost = useCallback(
    async (content: string) => {
      try {
        await createPostApi({ content }).unwrap();
      } catch (error) {
        console.error('Failed to create post:', error);
      }
    },
    [createPostApi]
  );

  const handleLikeToggle = useCallback(
    async (postId: number) => {
      const post = apiPosts?.find((p) => p.id === postId);
      if (!post) return;

      try {
        if (post.is_liked) {
          await dislikePostApi(postId).unwrap();
        } else {
          await likePostApi(postId).unwrap();
        }
      } catch (error) {
        console.error('Failed to toggle like:', error);
      }
    },
    [apiPosts, likePostApi, dislikePostApi]
  );

  const handleCommentClick = useCallback(
    (postId: number) => {
      navigate(`/post/${postId}`);
    },
    [navigate]
  );

  return (
    <Container>
      <Header>
        <Title>Página Inicial</Title>
      </Header>

      <Composer
        avatarUrl={currentUser?.avatar}
        displayName={currentUser?.display_name || currentUser?.username}
        onSubmit={handleCreatePost}
        isLoading={false}
      />

      {apiLoading && (
        <LoadingContainer>
          <Loader size="lg" />
        </LoadingContainer>
      )}

      {apiError && (
        <ErrorMessage>
          Erro ao carregar o feed.{' '}
          <button onClick={() => void refetch()}>Tentar novamente</button>
        </ErrorMessage>
      )}

      {!apiLoading && !apiError && (!apiPosts || apiPosts.length === 0) && (
        <EmptyState>
          Nenhum post encontrado. Seja o primeiro a publicar!
        </EmptyState>
      )}

      <PostsContainer>
        {apiPosts?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLikeToggle={handleLikeToggle}
            onCommentClick={handleCommentClick}
          />
        ))}
      </PostsContainer>
    </Container>
  );
}
