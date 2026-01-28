import { useState } from "react";
import * as authApi from "../api/auth";
import { AuthContext } from "./authContext";

function getUserIdFromAccessToken(token: string): number | null {
	try {
		const payload = token.split(".")[1];
		const json = JSON.parse(atob(payload));
		const id = json.user_id ?? json.userId ?? json.sub;
		const n = Number(id);
		return Number.isFinite(n) ? n : null;
	} catch {
		return null;
	}
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [userId, setUserId] = useState<number | null>(() => {
		const saved = localStorage.getItem("user_id");
		return saved ? Number(saved) : null;
	});

	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		Boolean(localStorage.getItem("access_token")),
	);

	async function login(username: string, password: string): Promise<void> {
		const data = await authApi.login(username, password);
		localStorage.setItem("access_token", data.access);
		localStorage.setItem("refresh_token", data.refresh);
		const id = getUserIdFromAccessToken(data.access);
		setUserId(id);
		if (id !== null) localStorage.setItem("user_id", String(id));
		setIsAuthenticated(true);
	}

	function logout(): void {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		localStorage.removeItem("user_id");
		setUserId(null);
		setIsAuthenticated(false);
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
