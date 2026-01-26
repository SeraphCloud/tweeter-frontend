import { useState } from "react";
import * as authApi from "../api/auth";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		Boolean(localStorage.getItem("access_token")),
	);

	async function login(username: string, password: string): Promise<void> {
		const data = await authApi.login(username, password);
		localStorage.setItem("access_token", data.access);
		localStorage.setItem("refresh_token", data.refresh);
		setIsAuthenticated(true);
	}

	function logout(): void {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		setIsAuthenticated(false);
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
