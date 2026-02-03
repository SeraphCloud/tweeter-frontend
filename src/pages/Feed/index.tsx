import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Composer } from '../../components/Post/Composer';
import { PostCard } from '../../components/Post/PostCard';
import { Loader } from '../../components/ui/Loader';
import { USE_MOCKS } from '../../utils/env';
import type { Post } from '../../features/posts/postsTypes';
import {
  useGetFeedQuery,
  useCreatePostMutation,
  useLikePostMutation,
  useDislikePostMutation,
} from '../../features/posts/postsApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { mockDelay } from '../../mocks';
import { addPost, updatePost } from '../../features/mocks/mocksSlice';
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
  const dispatch = useAppDispatch();

  // Redux state for mock mode
  const mockPosts = useAppSelector((state) => state.mocks.posts);

  // State for mock mode
  const [mockLoading, setMockLoading] = useState(USE_MOCKS);
  const [mockCreating, setMockCreating] = useState(false);

  // RTK Query hooks (used when USE_MOCKS=false)
  const {
    data: apiPosts,
    isLoading: apiLoading,
    error: apiError,
    refetch,
  } = useGetFeedQuery(undefined, {
    skip: USE_MOCKS,
  });

  const [createPostApi] = useCreatePostMutation();
  const [likePostApi] = useLikePostMutation();
  const [dislikePostApi] = useDislikePostMutation();

  // Load mock posts on mount
  useEffect(() => {
    if (!USE_MOCKS) return;

    let cancelled = false;

    const loadPosts = async () => {
      await mockDelay();
      if (!cancelled) {
        setMockLoading(false);
      }
    };

    void loadPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleCreatePost = useCallback(
    async (content: string) => {
      if (USE_MOCKS) {
        setMockCreating(true);
        await mockDelay();

        const newPost: Post = {
          id: Date.now(),
          author: 1, // Mock current user id
          author_username: 'victor',
          author_display_name: 'Victor Silva',
          author_avatar: 'https://i.pravatar.cc/150?u=victor',
          content,
          created_at: new Date().toISOString(),
          likes_count: 0,
          comments_count: 0,
          is_liked: false,
        };

        dispatch(addPost(newPost));
        setMockCreating(false);
      } else {
        try {
          await createPostApi({ content }).unwrap();
        } catch (error) {
          console.error('Failed to create post:', error);
        }
      }
    },
    [createPostApi, dispatch]
  );

  const handleLikeToggle = useCallback(
    async (postId: number) => {
      if (USE_MOCKS) {
        const post = mockPosts.find((p) => p.id === postId);
        if (!post) return;

        const updatedPost: Post = {
          ...post,
          is_liked: !post.is_liked,
          likes_count: post.is_liked
            ? Math.max(0, post.likes_count - 1)
            : post.likes_count + 1,
        };

        dispatch(updatePost(updatedPost));
      } else {
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
      }
    },
    [apiPosts, likePostApi, dislikePostApi, mockPosts, dispatch]
  );

  const handleCommentClick = useCallback(
    (postId: number) => {
      navigate(`/post/${postId}`);
    },
    [navigate]
  );

  // Determine which data to use
  const posts = USE_MOCKS ? mockPosts : apiPosts ?? [];
  const isLoading = USE_MOCKS ? mockLoading : apiLoading;
  const error = USE_MOCKS ? null : apiError;

  return (
    <Container>
      <Header>
        <Title>Página Inicial</Title>
      </Header>

      <Composer
        onSubmit={handleCreatePost}
        isLoading={USE_MOCKS ? mockCreating : false}
      />

      {isLoading && (
        <LoadingContainer>
          <Loader size="lg" />
        </LoadingContainer>
      )}

      {error && (
        <ErrorMessage>
          Erro ao carregar o feed.{' '}
          <button onClick={() => void refetch()}>Tentar novamente</button>
        </ErrorMessage>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <EmptyState>
          Nenhum post encontrado. Seja o primeiro a publicar!
        </EmptyState>
      )}

      <PostsContainer>
        {posts.map((post) => (
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
