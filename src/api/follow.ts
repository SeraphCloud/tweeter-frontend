import { api } from "./client";
import * as profilesApi from "./profiles";

export type FollowUser = {
	id: number;
	username: string;
};

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

export async function getFollowing(): Promise<FollowUser[]> {
	// First get current user's profile to get the ID
	const currentUserProfile = await profilesApi.getCurrentUserProfile();
	return api<FollowUser[]>(`/api/profiles/${currentUserProfile.id}/following/`);
}

export async function getFollowers(): Promise<FollowUser[]> {
	// First get current user's profile to get the ID
	const currentUserProfile = await profilesApi.getCurrentUserProfile();
	return api<FollowUser[]>(`/api/profiles/${currentUserProfile.id}/followers/`);
}

export async function getFollowingByUserId(
	userId: number,
): Promise<FollowUser[]> {
	return api<FollowUser[]>(`/api/profiles/${userId}/following/`);
}

export async function getFollowersByUserId(
	userId: number,
): Promise<FollowUser[]> {
	return api<FollowUser[]>(`/api/profiles/${userId}/followers/`);
}
