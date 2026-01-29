import { api } from "./client";

export type Profile = {
	id: number;
	username: string;
	display_name: string | null;
	avatar: string | null;
};

export async function getProfile(id: number): Promise<Profile> {
	return api<Profile>(`/api/profiles/${id}/`);
}

export async function getAllProfiles(): Promise<Profile[]> {
	return api<Profile[]>("/api/profiles/");
}

export async function searchProfiles(query: string): Promise<Profile[]> {
	return api<Profile[]>(`/api/profiles/?username=${encodeURIComponent(query)}`);
}

export async function getCurrentUserProfile(): Promise<Profile> {
	return api<Profile>("/api/profiles/me/");
}
