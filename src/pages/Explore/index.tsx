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

export default function Explore() {
  // Buscar todos os posts (recomendados)
  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useGetFeedQuery(undefined);

  const [createPostApi] = useCreatePostMutation();
  const [likePostApi] = useLikePostMutation();
  const [dislikePostApi] = useDislikePostMutation();

  // Get current user profile for Composer
  const { data: currentUser } = useGetMyProfileQuery();

  const handleCreatePost = async (content: string) => {
    try {
      await createPostApi({ content }).unwrap();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  const handleLikeToggle = async (postId: number) => {
    const post = posts?.find((p) => p.id === postId);
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
  };

  const handleCommentClick = (postId: number) => {
    // Navegar para a página de detalhes do post
    window.location.href = `/post/${postId}`;
  };

  return (
    <Container>
      <Header>
        <Title>Explorar</Title>
      </Header>

      <Composer
        avatarUrl={currentUser?.avatar}
        displayName={currentUser?.display_name || currentUser?.username}
        onSubmit={handleCreatePost}
        isLoading={false}
      />

      {isLoading && (
        <LoadingContainer>
          <Loader size="lg" />
        </LoadingContainer>
      )}

      {error && (
        <ErrorMessage>
          Erro ao carregar os posts.{' '}
          <button onClick={() => void refetch()}>Tentar novamente</button>
        </ErrorMessage>
      )}

      {!isLoading && !error && posts && posts.length === 0 && (
        <EmptyState>
          Nenhum post encontrado. Seja o primeiro a publicar!
        </EmptyState>
      )}

      <PostsContainer>
        {posts?.map((post) => (
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
