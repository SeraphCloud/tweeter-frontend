import type { Post } from '../features/posts/postsTypes';
import type { Comment as CommentType } from '../features/comments/commentsTypes';
import { mockProfiles, type Profile } from './mockProfiles';
import { mockPosts } from './mockPosts';
import { mockComments } from './mockComments';
import { mockDelay } from './mockDelay';

// Re-export mock data and types
export { mockProfiles, type Profile };
export { mockPosts };
export { mockComments, type CommentType as Comment };
export { mockDelay };

/**
 * Get feed posts sorted by created_at desc
 * If userId is provided, returns posts from users that user follows + their own posts
 */
export function getFeedPosts(userId?: number): Post[] {
  let posts = [...mockPosts];

  if (userId) {
    const userProfile = mockProfiles.find((p) => p.id === userId);
    if (userProfile) {
      // Get posts from followed users + own posts
      const relevantUserIds = [...userProfile.following_ids, userId];
      posts = posts.filter((post) => relevantUserIds.includes(post.author));
    }
  }

  return posts.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
}

/**
 * Get a single post by ID
 */
export function getPostById(id: number): Post | undefined {
  return mockPosts.find((p) => p.id === id);
}

/**
 * Toggle like on a post
 */
export function toggleLike(postId: number, _userId: number): Post | undefined {
  const postIndex = mockPosts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return undefined;
  }

  const post = mockPosts[postIndex];
  const updatedPost: Post = {
    ...post,
    is_liked: !post.is_liked,
    likes_count: post.is_liked
      ? Math.max(0, post.likes_count - 1)
      : post.likes_count + 1,
  };

  mockPosts[postIndex] = updatedPost;
  return updatedPost;
}

/**
 * Get profile by ID
 */
export function getProfileById(id: number): Profile | undefined {
  return mockProfiles.find((profile) => profile.id === id);
}

/**
 * Get comments by post ID
 */
export function getCommentsByPostId(postId: number): CommentType[] {
  return mockComments
    .filter((comment: CommentType) => comment.post === postId)
    .sort((a: CommentType, b: CommentType) => {
      return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    });
}

/**
 * Create a new comment
 */
export function createComment(
  userId: number,
  postId: number,
  text: string
): CommentType {
  const newComment: CommentType = {
    id: Date.now(),
    user: userId,
    post: postId,
    text,
    created_at: new Date().toISOString(),
  };

  mockComments.push(newComment);

  // Update post comments count
  const postIndex = mockPosts.findIndex((p) => p.id === postId);
  if (postIndex !== -1) {
    mockPosts[postIndex] = {
      ...mockPosts[postIndex],
      comments_count: mockPosts[postIndex].comments_count + 1,
    };
  }

  return newComment;
}
