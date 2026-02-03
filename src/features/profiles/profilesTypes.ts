export interface Profile {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
  following_ids: number[];
}

export interface Follower {
  username: string;
}

export interface UpdateProfileRequest {
  display_name?: string;
  avatar?: File;
}
