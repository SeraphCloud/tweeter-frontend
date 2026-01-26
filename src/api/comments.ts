import { api } from "./client";

export type Comment = {
	id: number;
	user: number;
	post: number;
	text: string;
	created_at: string;
};

export async function listComments(postId: number): Promise<Comment[]> {
	return api<Comment[]>(`/api/comments/?post=${postId}`);
}

export async function createComment(
	postId: number,
	text: string,
): Promise<Comment> {
	return api<Comment>("/api/comments/", {
		method: "POST",
		body: JSON.stringify({ post: postId, text }),
	});
}
