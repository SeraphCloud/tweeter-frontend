export interface Comment {
	id: number;
	author: number;
	author_username: string;
	text: string;
	created_at: string;
}

export interface Tweet {
	id: number;
	author: number;
	author_username: string;
	author_photo: string | null;
	text: string;
	created_at: string;
	likes_count: number;
	liked_by_me: boolean;
	comments: Comment[];
}

export interface User {
	id: number;
	username: string;
	email: string;
	foto_perfil: string | null;
	followers_count: number;
	following_count: number;
}
