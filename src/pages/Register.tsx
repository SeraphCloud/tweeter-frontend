import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import api from "../api/axios";
import Logo from "../components/Logo";

export default function Register() {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [form, setForm] = useState({ username: "", email: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setLoading(true);

		try {
			await api.post("/users/register/", form);
			await login(form.username, form.password);
			navigate("/");
		} catch {
			setError("Erro ao criar conta. Verifique os dados e tente novamente.");
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
					<p className="text-gray-400 mt-2">Crie sua conta</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<input
						type="text"
						name="username"
						placeholder="Usuário"
						value={form.username}
						onChange={handleChange}
						className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500"
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={form.email}
						onChange={handleChange}
						className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500"
					/>
					<input
						type="password"
						name="password"
						placeholder="Senha"
						value={form.password}
						onChange={handleChange}
						className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500"
					/>

					{error && <p className="text-red-500 text-sm">{error}</p>}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition"
					>
						{loading ? "Criando conta..." : "Criar conta"}
					</button>
				</form>

				<p className="text-gray-500 text-center mt-6">
					Já tem conta?{" "}
					<Link to="/login" className="text-sky-500 hover:underline">
						Entrar
					</Link>
				</p>
			</div>
		</div>
	);
}
