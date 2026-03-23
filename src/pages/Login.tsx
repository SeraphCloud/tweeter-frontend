import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Logo from "../components/Logo";

export default function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await login(username, password);
			navigate("/");
		} catch {
			setError("Usuário ou senha inválidos");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-black flex items-center justify-center">
			<div className="w-full max-w-md p-8">
				{/* Logo */}
				<div className="text-center mb-8">
					<Logo className="w-40 h-40 mx-auto text-white" />
					<p className="text-gray-400 mt-2">Entre na sua conta</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						placeholder="Usuário"
						value={username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setUsername(e.target.value)
						}
						className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500"
					/>
					<input
						type="password"
						placeholder="Senha"
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
						className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500"
					/>

					{/* Mensagem de erro */}
					{error && <p className="text-red-500 text-sm">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition"
					>
						{loading ? "Entrando..." : "Entrar"}
					</button>
				</form>

				<p className="text-gray-500 text-center mt-6">
					Não tem conta?{" "}
					<Link to="/register" className="text-sky-500 hover:underline">
						Cadastre-se
					</Link>
				</p>
			</div>
		</div>
	);
}
