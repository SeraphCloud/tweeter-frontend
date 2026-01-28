import { api } from "./client";

export type Post = {
	id: number;
	author: number;
	content: string;
	created_at: string;
	likes_count: number;
	comments_count: number;
	is_liked: boolean;
};

export async function listAll(): Promise<Post[]> {
	return api<Post[]>("/api/posts/");
}

export async function getFeed(): Promise<Post[]> {
	return api<Post[]>("/api/posts/feed/");
}

export async function createPost(content: string): Promise<Post> {
	return api<Post>("/api/posts/", {
		method: "POST",
		body: JSON.stringify({ content }),
	});
}

export async function likePost(postId: number) {
	return api(`/api/posts/${postId}/like/`, { method: "POST" });
}

export async function dislikePost(postId: number) {
	return api(`/api/posts/${postId}/dislike/`, { method: "POST" });
}
