import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostCard } from '../../components/Post/PostCard';
import { CommentList } from '../../components/Comment/CommentList';
import { CommentForm } from '../../components/Comment/CommentForm';
import { Loader } from '../../components/ui/Loader';
import { USE_MOCKS } from '../../utils/env';
import type { Post } from '../../features/posts/postsTypes';
import type { Profile } from '../../mocks/mockProfiles';
import type { Comment } from '../../mocks/mockComments';
import {
  useGetPostQuery,
  useLikePostMutation,
  useDislikePostMutation,
} from '../../features/posts/postsApi';
import {
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
} from '../../features/comments/commentsApi';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getProfileById, mockDelay } from '../../mocks';
import { updatePost, addComment } from '../../features/mocks/mocksSlice';
import {
  Container,
  Header,
  BackButton,
  Title,
  LoadingContainer,
  ErrorMessage,
  NotFoundMessage,
  BackIcon,
} from './styles';

// Helper to get post by id from Redux state
function getPostById(id: number, posts: Post[]): Post | undefined {
  return posts.find((p) => p.id === id);
}

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const postId = Number(id);

  // Redux state for mock mode
  const mockPosts = useAppSelector((state) => state.mocks.posts);
  const mockComments = useAppSelector((state) => state.mocks.comments);

  // State for mock mode
  const [mockLoading, setMockLoading] = useState(USE_MOCKS);
  const [mockCreatingComment, setMockCreatingComment] = useState(false);

  // RTK Query hooks (used when USE_MOCKS=false)
  const {
    data: apiPost,
    isLoading: apiPostLoading,
    error: apiPostError,
  } = useGetPostQuery(postId, {
    skip: USE_MOCKS || !postId,
  });

  const {
    data: apiComments,
    isLoading: apiCommentsLoading,
    error: apiCommentsError,
    refetch: refetchComments,
  } = useGetCommentsByPostQuery(postId, {
    skip: USE_MOCKS || !postId,
  });

  const [likePostApi] = useLikePostMutation();
  const [dislikePostApi] = useDislikePostMutation();
  const [createCommentApi] = useCreateCommentMutation();

  // Load mock data on mount
  useEffect(() => {
    if (!USE_MOCKS || !postId) return;

    let cancelled = false;

    const loadData = async () => {
      await mockDelay();
      if (!cancelled) {
        setMockLoading(false);
      }
    };

    void loadData();

    return () => {
      cancelled = true;
    };
  }, [postId]);

  const getAuthor = useCallback((authorId: number): Profile | undefined => {
    return getProfileById(authorId);
  }, []);

  const handleLikeToggle = useCallback(async () => {
    if (!postId) return;

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
      const post = apiPost;
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
  }, [postId, apiPost, likePostApi, dislikePostApi, mockPosts, dispatch]);

  const handleCommentSubmit = useCallback(
    async (text: string) => {
      if (!postId) return;

      if (USE_MOCKS) {
        setMockCreatingComment(true);
        await mockDelay();

        const newComment: Comment = {
          id: Date.now(),
          user: 1, // Mock current user id
          post: postId,
          text,
          created_at: new Date().toISOString(),
        };

        dispatch(addComment(newComment));

        // Update post comments count
        const post = mockPosts.find((p) => p.id === postId);
        if (post) {
          const updatedPost = {
            ...post,
            comments_count: post.comments_count + 1,
          };
          dispatch(updatePost(updatedPost));
        }

        setMockCreatingComment(false);
      } else {
        try {
          await createCommentApi({ post: postId, text }).unwrap();
          void refetchComments();
        } catch (error) {
          console.error('Failed to create comment:', error);
        }
      }
    },
    [postId, mockPosts, createCommentApi, refetchComments, dispatch]
  );

  const handleBack = () => {
    navigate(-1);
  };

  // Determine which data to use
  const mockPost = USE_MOCKS ? getPostById(postId, mockPosts) ?? null : null;
  const post = USE_MOCKS ? mockPost : apiPost ?? null;
  const mockCommentsList = USE_MOCKS
    ? mockComments.filter((c) => c.post === postId)
    : [];
  const comments = USE_MOCKS ? mockCommentsList : apiComments ?? [];
  const isLoading = USE_MOCKS
    ? mockLoading
    : apiPostLoading || apiCommentsLoading;
  const error = USE_MOCKS ? null : apiPostError || apiCommentsError;

  if (isLoading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <BackIcon />
          </BackButton>
          <Title>Post</Title>
        </Header>
        <LoadingContainer>
          <Loader size="lg" />
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <BackIcon />
          </BackButton>
          <Title>Post</Title>
        </Header>
        <ErrorMessage>
          Erro ao carregar o post.{' '}
          <button onClick={() => window.location.reload()}>
            Tentar novamente
          </button>
        </ErrorMessage>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <Header>
          <BackButton onClick={handleBack}>
            <BackIcon />
          </BackButton>
          <Title>Post</Title>
        </Header>
        <NotFoundMessage>Post não encontrado.</NotFoundMessage>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}>
          <BackIcon />
        </BackButton>
        <Title>Post</Title>
      </Header>

      <PostCard post={post} onLikeToggle={handleLikeToggle} />

      <CommentForm
        onSubmit={handleCommentSubmit}
        isLoading={USE_MOCKS ? mockCreatingComment : false}
        placeholder="Tweete sua resposta"
      />

      <CommentList
        comments={comments}
        getAuthor={getAuthor}
        isLoading={false}
        error={null}
      />
    </Container>
  );
}
