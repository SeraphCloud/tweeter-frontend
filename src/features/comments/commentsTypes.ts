export interface Comment {
  id: number;
  user: number;
  post: number;
  text: string;
  created_at: string;
}

export interface CreateCommentRequest {
  post: number;
  text: string;
}

export interface UpdateCommentRequest {
  text: string;
}
