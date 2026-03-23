import api from "../api/axios";
import type { User } from "../types";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
	updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("access_token");

		if (token) {
			api
				.get("/users/profile/")
				.then(({ data }) => setUser(data))
				.catch(() => localStorage.clear())
				.finally(() => setLoading(false));
		} else {
			setLoading(false);
		}
	}, []);

	const login = async (username: string, password: string) => {
		const { data } = await api.post("/users/login/", { username, password });

		localStorage.setItem("access_token", data.access);
		localStorage.setItem("refresh_token", data.refresh);

		const profile = await api.get("/users/profile/", {
			headers: { Authorization: `Bearer ${data.access}` },
		});
		setUser(profile.data);
	};

	const logout = () => {
		localStorage.clear();
		setUser(null);
	};

	const updateUser = (data: Partial<User>) => {
		setUser((prev) => (prev ? ({ ...prev, ...data } as User) : null));
	};

	return (
		<AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
