const rawBase = import.meta.env.VITE_API_URL as string;
const API_BASE = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;

function buildUrl(endpoint: string) {
	const path = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
	return `${API_BASE}${path}`;
}

async function refreshAccessToken(): Promise<string | null> {
	const refresh = localStorage.getItem("refresh_token");
	if (!refresh) return null;

	const res = await fetch(buildUrl("/api/auth/token/refresh/"), {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ refresh }),
	});

	if (!res.ok) return null;

	const data = (await res.json()) as { access: string };
	localStorage.setItem("access_token", data.access);
	return data.access;
}

export async function api<T>(
	endpoint: string,
	options: RequestInit = {},
	retried = false,
): Promise<T> {
	const token = localStorage.getItem("access_token");

	const res = await fetch(buildUrl(endpoint), {
		...options,
		headers: {
			...(options.body ? { "Content-Type": "application/json" } : {}),
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(options.headers ?? {}),
		},
	});

	// se expirou, tenta refresh 1 vez e repete
	if (res.status === 401 && !retried) {
		const newAccess = await refreshAccessToken();

		if (newAccess) {
			return api<T>(endpoint, options, true);
		}

		// refresh falhou -> limpa tokens (força login)
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
	}

	const contentType = res.headers.get("content-type") ?? "";
	const isJson = contentType.includes("application/json");
	const body = isJson ? await res.json().catch(() => null) : await res.text();

	if (!res.ok) {
		if (isJson && body && typeof body === "object") throw body;
		throw {
			status: res.status,
			message: typeof body === "string" ? body : "Request failed",
		};
	}

	return body as T;
}
