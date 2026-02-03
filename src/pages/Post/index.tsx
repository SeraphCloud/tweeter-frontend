import { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostCard } from '../../components/Post/PostCard';
import { CommentList } from '../../components/Comment/CommentList';
import { CommentForm } from '../../components/Comment/CommentForm';
import { Loader } from '../../components/ui/Loader';
import {
  useGetPostQuery,
  useLikePostMutation,
  useDislikePostMutation,
} from '../../features/posts/postsApi';
import {
  useGetCommentsByPostQuery,
  useCreateCommentMutation,
} from '../../features/comments/commentsApi';
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

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const postId = Number(id);

  // RTK Query hooks
  const {
    data: apiPost,
    isLoading: apiPostLoading,
    error: apiPostError,
  } = useGetPostQuery(postId, {
    skip: !postId,
  });

  const {
    data: apiComments,
    isLoading: apiCommentsLoading,
    error: apiCommentsError,
    refetch: refetchComments,
  } = useGetCommentsByPostQuery(postId, {
    skip: !postId,
  });

  const [likePostApi] = useLikePostMutation();
  const [dislikePostApi] = useDislikePostMutation();
  const [createCommentApi] = useCreateCommentMutation();

  const handleLikeToggle = useCallback(async () => {
    if (!postId || !apiPost) return;

    try {
      if (apiPost.is_liked) {
        await dislikePostApi(postId).unwrap();
      } else {
        await likePostApi(postId).unwrap();
      }
    } catch (error) {
      console.error('Failed to toggle like:', error);
    }
  }, [postId, apiPost, likePostApi, dislikePostApi]);

  const handleCommentSubmit = useCallback(
    async (text: string) => {
      if (!postId) return;

      try {
        await createCommentApi({ post: postId, text }).unwrap();
        void refetchComments();
      } catch (error) {
        console.error('Failed to create comment:', error);
      }
    },
    [postId, createCommentApi, refetchComments]
  );

  const handleBack = () => {
    navigate(-1);
  };

  const isLoading = apiPostLoading || apiCommentsLoading;
  const error = apiPostError || apiCommentsError;
  const post = apiPost ?? null;
  const comments = apiComments ?? [];

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
        isLoading={false}
        placeholder="Tweete sua resposta"
      />

      <CommentList
        comments={comments}
        getAuthor={() => undefined}
        isLoading={false}
        error={null}
      />
    </Container>
  );
}
