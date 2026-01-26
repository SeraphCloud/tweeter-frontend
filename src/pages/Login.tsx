import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			await login(username, password);
			navigate("/");
		} catch (err: any) {
			setError(err?.detail ?? "Usuário ou senha inválidos");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
			<div className="w-full max-w-sm">
				<div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6">
					<div className="text-center mb-6">
						<div className="text-2xl font-semibold">Tweeter</div>
						<div className="text-sm text-neutral-500 mt-1">
							Entre para ver seu feed
						</div>
					</div>

					{error && (
						<p className="text-sm text-red-600 text-center mb-4">{error}</p>
					)}

					<form onSubmit={handleSubmit} className="space-y-3">
						<div>
							<label htmlFor="username" className="text-sm font-medium">
								Username
							</label>
							<input
								name="username"
								className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								required
							/>
						</div>

						<div>
							<label htmlFor="password" className="text-sm font-medium">
								Senha
							</label>
							<input
								name="password"
								type="password"
								className="w-full mt-1 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full rounded-lg py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
						>
							{loading ? "Entrando..." : "Entrar"}
						</button>
					</form>

					<p className="text-sm text-center text-neutral-600 mt-4">
						Não tem conta?{" "}
						<Link to="/register" className="text-blue-700 hover:underline">
							Cadastre-se
						</Link>
					</p>
				</div>

				<p className="text-xs text-neutral-500 text-center mt-4">
					Ao continuar, você concorda com os termos e políticas.
				</p>
			</div>
		</div>
	);
}
