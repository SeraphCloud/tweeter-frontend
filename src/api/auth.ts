const API_URL = import.meta.env.VITE_API_URL as string;

type LoginResponse = { access: string; refresh: string };

export async function register(
	username: string,
	email: string,
	password: string,
) {
	const res = await fetch(`${API_URL}/api/register/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, email, password }),
	});

	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw data;
	return data;
}

export async function login(username: string, password: string) {
	const res = await fetch(`${API_URL}/api/auth/token/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ username, password }),
	});

	const data = await res.json().catch(() => ({}));
	if (!res.ok) throw data;
	return data as LoginResponse;
}
