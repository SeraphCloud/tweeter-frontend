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
