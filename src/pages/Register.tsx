import { Link, useNavigate } from "react-router-dom";
import { register as registerApi } from "../api/auth";
import { useState } from "react";

export default function Register() {
	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		setLoading(true);
		console.log("SUBMIT register");

		try {
			await registerApi(username, email, password);
			navigate("/login");
		} catch (err: any) {
			const msg =
				err?.detail ??
				err?.username?.[0] ??
				err?.email?.[0] ??
				err?.password?.[0] ??
				"Não foi possível criar sua conta";
			setError(msg);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-neutral-50">
			<form
				onSubmit={handleSubmit}
				className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm border border-neutral-200"
			>
				<h1 className="text-2xl font-semibold text-center mb-1">Criar conta</h1>
				<p className="text-sm text-neutral-500 text-center mb-6">
					Entre para o Tweeter
				</p>

				{error && (
					<p className="text-red-600 text-sm mb-4 text-center">{error}</p>
				)}

				<label htmlFor="username" className="text-sm font-medium">
					Username
				</label>
				<input
					className="w-full mt-1 mb-3 px-3 py-2 border rounded-lg"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					name="username"
					required
				/>

				<label htmlFor="email" className="text-sm font-medium">
					email
				</label>
				<input
					className="w-full mt-1 mb-3 px-3 py-2 border rounded-lg"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					name="email"
					type="email"
					required
				/>

				<label htmlFor="password" className="text-sm font-medium">
					password
				</label>
				<input
					className="w-full mt-1 mb-3 px-3 py-2 border rounded-lg"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					type="password"
					required
				/>

				<button
					className="w-full rounded-lg py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
					disabled={loading}
					type="submit"
				>
					{loading ? "Criando..." : "Cadastrar"}
				</button>

				<p className="text-sm text-center mt-4 text-neutral-600">
					Já tem conta?{" "}
					<Link className="text-blue-700 hover:underline" to="/login">
						Entrar
					</Link>
				</p>
			</form>
		</div>
	);
}
