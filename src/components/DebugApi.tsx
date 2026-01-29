import { useState } from "react";
import { FaBug } from "react-icons/fa";

type DebugResult = {
	name: string;
	url: string;
	method: string;
	status: number;
	statusText: string;
	success: boolean;
	data: unknown;
	hasToken: boolean;
};

export default function DebugApi() {
	const [debugResults, setDebugResults] = useState<DebugResult[]>([]);
	const [isTesting, setIsTesting] = useState(false);

	const testEndpoint = async (name: string, url: string, method = "GET") => {
		try {
			const token = localStorage.getItem("access_token");
			const headers: Record<string, string> = {
				"Content-Type": "application/json",
			};

			if (token) {
				headers.Authorization = `Bearer ${token}`;
			}

			const response = await fetch(url, {
				method,
				headers,
			});

			const data = await response.json().catch(() => null);

			return {
				name,
				url,
				method,
				status: response.status,
				statusText: response.statusText,
				success: response.ok,
				data,
				hasToken: !!token,
			};
		} catch (error) {
			return {
				name,
				url,
				method,
				status: 0,
				statusText: "Network Error",
				success: false,
				data: error,
				hasToken: !!localStorage.getItem("access_token"),
			};
		}
	};

	const runDebugTests = async () => {
		setIsTesting(true);
		setDebugResults([]);

		const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
		const tests = [
			{
				name: "Test Current User Profile",
				url: `${baseUrl}/api/profiles/me/`,
				method: "GET",
			},
			{
				name: "Test Following List (Profile 1)",
				url: `${baseUrl}/api/profiles/1/following/`,
				method: "GET",
			},
			{
				name: "Test Followers List (Profile 1)",
				url: `${baseUrl}/api/profiles/1/followers/`,
				method: "GET",
			},
			{
				name: "Test All Profiles",
				url: `${baseUrl}/api/profiles/`,
				method: "GET",
			},
			{
				name: "Test Auth Token Refresh",
				url: `${baseUrl}/api/auth/token/refresh/`,
				method: "POST",
				body: { refresh: localStorage.getItem("refresh_token") },
			},
			{
				name: "Test Follow User (Profile 1)",
				url: `${baseUrl}/api/profiles/1/follow/`,
				method: "POST",
			},
		];

		for (const test of tests) {
			const result = await testEndpoint(test.name, test.url, test.method);
			setDebugResults((prev) => [...prev, result]);
		}

		setIsTesting(false);
	};

	const clearResults = () => {
		setDebugResults([]);
	};

	return (
		<div className="fixed bottom-4 left-4 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-2xl max-w-md z-50">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center space-x-2">
					<FaBug className="text-red-500" />
					<h3 className="text-white font-semibold">Debug API</h3>
				</div>
				<div className="flex space-x-2">
					<button
						type="button"
						onClick={runDebugTests}
						disabled={isTesting}
						className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 text-sm"
					>
						{isTesting ? "Testando..." : "Testar API"}
					</button>
					<button
						type="button"
						onClick={clearResults}
						className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
					>
						Limpar
					</button>
				</div>
			</div>

			<div className="space-y-2 max-h-64 overflow-y-auto">
				{debugResults.map((result) => (
					<div
						key={`${result.name}-${result.url}`}
						className={`p-2 rounded text-xs ${
							result.success
								? "bg-green-900/20 border border-green-800"
								: "bg-red-900/20 border border-red-800"
						}`}
					>
						<div className="flex justify-between items-start">
							<span className="font-medium text-white">{result.name}</span>
							<span
								className={`px-1 rounded text-xs ${
									result.success ? "bg-green-800" : "bg-red-800"
								}`}
							>
								{result.status}
							</span>
						</div>
						<div className="text-gray-400 mt-1">
							{result.url.replace(
								import.meta.env.VITE_API_URL || "http://localhost:8000",
								"",
							)}
						</div>
						{result.data && (
							<div className="mt-2 text-xs text-gray-300 overflow-hidden">
								<pre className="whitespace-pre-wrap max-h-16 overflow-y-auto">
									{
										(() => {
											if (typeof result.data === "string") {
												return result.data;
											}
											if (
												typeof result.data === "object" &&
												result.data !== null
											) {
												return JSON.stringify(result.data, null, 2);
											}
											return String(result.data as unknown);
										})() as string
									}
								</pre>
							</div>
						)}
					</div>
				))}
			</div>

			{debugResults.length === 0 && (
				<div className="text-gray-500 text-sm text-center py-2">
					Clique em "Testar API" para iniciar o diagnóstico
				</div>
			)}
		</div>
	);
}
