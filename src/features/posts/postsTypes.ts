export interface Post {
  id: number;
  author: number;
  author_username: string;
  author_display_name: string;
  author_avatar: string | null;
  content: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
}

export interface CreatePostRequest {
  content: string;
}

export interface UpdatePostRequest {
  content: string;
}
