import { api } from "./client";

export async function follow(profileId: number) {
	return api<{ detail: string }>(`/api/profiles/${profileId}/follow/`, {
		method: "POST",
	});
}

export async function unfollow(profileId: number) {
	return api<{ detail: string }>(`/api/profiles/${profileId}/unfollow/`, {
		method: "POST",
	});
}
