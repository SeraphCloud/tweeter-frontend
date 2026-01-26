const API_URL = import.meta.env.VITE_API_URL as string;

export async function api<T>(
	endpoint: string,
	options: RequestInit = {},
): Promise<T> {
	const token = localStorage.getItem("access_token");

	const res = await fetch(`${API_URL}${endpoint}`, {
		...options,
		headers: {
			...(options.body ? { "Content-Type": "application/json" } : {}),
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...(options.headers ?? {}),
		},
	});

	// tenta ler json (algumas respostas podem vir vazias)
	const text = await res.text();
	const data = text ? (JSON.parse(text) as unknown) : null;

	if (!res.ok) {
		throw data ?? { message: "Request failed", status: res.status };
	}

	return data as T;
}
