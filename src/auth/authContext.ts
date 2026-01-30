import { createContext } from "react";

export type AuthContextType = {
	isAuthenticated: boolean;
	userId: number | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
	followingIds: number[];
	addFollowing: (id: number) => void;
	removeFollowing: (id: number) => void;
	refreshUserProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);
