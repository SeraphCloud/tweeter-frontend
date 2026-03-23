import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import Navbar from "../components/Navbar";

interface UserProfile {
	id: number;
	username: string;
	email: string;
	foto_perfil: string | null;
	followers_count: number;
	following_count: number;
}

export default function Profile() {
	const { user, updateUser, logout } = useAuth();
	const [form, setForm] = useState({ username: "", email: "", password: "" });
	const [photo, setPhoto] = useState<File | null>(null);
	const [preview, setPreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
	const [following, setFollowing] = useState<UserProfile[]>([]);
	const [followers, setFollowers] = useState<UserProfile[]>([]);

	// Preenche o formulário com os dados atuais do usuário
	useEffect(() => {
		if (user) {
			setForm({ username: user.username, email: user.email, password: "" });
			if (user.foto_perfil) setPreview(user.foto_perfil);
		}
		fetchFollowData();
	}, [user]);

	const fetchFollowData = async () => {
		if (!user) return;
		try {
			const [followingRes, followersRes] = await Promise.all([
				api.get(`/users/${user.id}/following/`),
				api.get(`/users/${user.id}/followers/`),
			]);
			setFollowing(followingRes.data);
			setFollowers(followersRes.data);
		} catch {
			// silencia erros de carregamento
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPhoto(file);
			// Gera uma URL local para preview antes de fazer upload
			setPreview(URL.createObjectURL(file));
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess(false);
		try {
			// Usa FormData para enviar arquivo junto com os outros campos
			const formData = new FormData();
			if (form.username) formData.append("username", form.username);
			if (form.email) formData.append("email", form.email);
			if (form.password) formData.append("password", form.password);
			if (photo) formData.append("foto_perfil", photo);

			const { data } = await api.patch("/users/profile/", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			// Atualiza o contexto global com os novos dados
			updateUser(data);
			setSuccess(true);
			setForm((prev) => ({ ...prev, password: "" }));
			setPhoto(null);

			if (data.foto_perfil) {
				setPreview(data.foto_perfil);
			}
		} catch {
			setError("Erro ao atualizar perfil. Tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	const handleFollow = async (targetId: number) => {
		await api.post(`/users/${targetId}/follow/`);
		fetchFollowData();
	};

	const handleSearch = async () => {
		if (!searchQuery.trim()) return;
		try {
			// Busca usuários pelo username — vamos adicionar esse endpoint no backend
			const { data } = await api.get(`/users/search/?q=${searchQuery}`);
			setSearchResults(data);
		} catch {
			setSearchResults([]);
		}
	};

	return (
		<div className="min-h-screen bg-black">
			<Navbar />
			<div className="max-w-xl mx-auto p-4 space-y-8">
				{/* Cabeçalho do perfil */}
				<div className="flex items-center gap-4">
					{/* Foto de perfil ou avatar com inicial */}
					<div className="relative">
						{preview ? (
							<img
								src={preview}
								alt="foto de perfil"
								className="w-20 h-20 rounded-full object-cover"
							/>
						) : (
							<div className="w-20 h-20 rounded-full bg-sky-500 flex items-center justify-center text-white text-3xl font-bold">
								{user?.username[0].toUpperCase()}
							</div>
						)}
					</div>

					<div>
						<h2 className="text-white text-xl font-bold">@{user?.username}</h2>
						<div className="flex gap-4 mt-1 text-sm text-zinc-400">
							<span>
								<strong className="text-white">{following.length}</strong>{" "}
								seguindo
							</span>
							<span>
								<strong className="text-white">{followers.length}</strong>{" "}
								seguidores
							</span>
						</div>
					</div>
				</div>

				{/* Formulário de edição */}
				<div className="border border-zinc-800 rounded-2xl p-6">
					<h3 className="text-white font-bold mb-4">Editar perfil</h3>
					<form onSubmit={handleSubmit} className="space-y-4">
						{/* Upload de foto */}
						<div>
							<label
								htmlFor="photo"
								className="text-zinc-400 text-sm block mb-1"
							>
								Foto de perfil
							</label>
							<input
								name="photo"
								type="file"
								accept="image/*"
								onChange={handlePhotoChange}
								className="text-zinc-400 text-sm"
							/>
						</div>

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
							placeholder="Nova senha (opcional)"
							value={form.password}
							onChange={handleChange}
							className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-sky-500"
						/>

						{error && <p className="text-red-500 text-sm">{error}</p>}
						{success && (
							<p className="text-green-500 text-sm">
								Perfil atualizado com sucesso!
							</p>
						)}

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition"
						>
							{loading ? "Salvando..." : "Salvar alterações"}
						</button>
					</form>
				</div>

				{/* Buscar usuários para seguir */}
				<div className="border border-zinc-800 rounded-2xl p-6">
					<h3 className="text-white font-bold mb-4">Buscar usuários</h3>
					<div className="flex gap-2">
						<input
							type="text"
							placeholder="Buscar por username..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							onKeyDown={(e) => e.key === "Enter" && handleSearch()}
							className="flex-1 bg-zinc-900 text-white border border-zinc-700 rounded-xl px-4 py-2 focus:outline-none focus:border-sky-500"
						/>
						<button
							type="button"
							onClick={handleSearch}
							className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 py-2 rounded-xl transition"
						>
							Buscar
						</button>
					</div>

					{/* Resultados da busca */}
					<div className="mt-3 space-y-2">
						{searchResults.map((u) => (
							<div key={u.id} className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold">
										{u.username[0].toUpperCase()}
									</div>
									<span className="text-white text-sm">@{u.username}</span>
								</div>
								{u.id !== user?.id && (
									<button
										type="button"
										onClick={() => handleFollow(u.id)}
										className={`text-sm px-3 py-1 rounded-full font-bold transition ${
											following.some((f) => f.id === u.id)
												? "bg-zinc-700 text-white hover:bg-red-500"
												: "bg-sky-500 text-white hover:bg-sky-600"
										}`}
									>
										{following.some((f) => f.id === u.id)
											? "Seguindo"
											: "Seguir"}
									</button>
								)}
							</div>
						))}
					</div>
				</div>

				{/* Lista de quem você segue */}
				{following.length > 0 && (
					<div className="border border-zinc-800 rounded-2xl p-6">
						<h3 className="text-white font-bold mb-4">Seguindo</h3>
						<div className="space-y-2">
							{following.map((u) => (
								<div key={u.id} className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-sm font-bold">
											{u.username[0].toUpperCase()}
										</div>
										<span className="text-white text-sm">@{u.username}</span>
									</div>
									<button
										type="button"
										onClick={() => handleFollow(u.id)}
										className="text-sm px-3 py-1 rounded-full font-bold bg-zinc-700 text-white hover:bg-red-500 transition"
									>
										Deixar de seguir
									</button>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Botão de logout */}
				<button
					type="button"
					onClick={logout}
					className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 rounded-xl transition"
				>
					Sair da conta
				</button>
			</div>
		</div>
	);
}
