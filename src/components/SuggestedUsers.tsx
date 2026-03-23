import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

interface UserProfile {
	id: number;
	username: string;
	foto_perfil: string | null;
	followers_count: number;
	following_count: number;
}

export default function SuggestedUsers() {
	const { user } = useAuth();
	const [suggested, setSuggested] = useState<UserProfile[]>([]);

	const fetchSuggested = async () => {
		try {
			const { data } = await api.get("/users/suggested/");
			setSuggested(data);
		} catch {
			// silencia erros
		}
	};

	useEffect(() => {
		fetchSuggested();
	}, []);

	const handleFollow = async (targetId: number) => {
		await api.post(`/users/${targetId}/follow/`);
		// Remove da lista após seguir
		setSuggested((prev) => prev.filter((u) => u.id !== targetId));
	};

	if (suggested.length === 0) return null;

	return (
		<div className="border border-zinc-800 rounded-2xl p-4 sticky top-20">
			<h3 className="text-white font-bold mb-4">Quem seguir</h3>
			<div className="space-y-4">
				{suggested.map((u) => (
					<div key={u.id} className="flex items-center justify-between gap-2">
						<div className="flex items-center gap-3 min-w-0">
							{/* Avatar */}
							<div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
								{u.foto_perfil ? (
									<img
										src={u.foto_perfil}
										alt={u.username}
										className="w-full h-full object-cover"
									/>
								) : (
									<div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold shrink-0">
										{u.username[0].toUpperCase()}
									</div>
								)}
							</div>
							<div className="min-w-0">
								<p className="text-white font-bold text-sm truncate">
									@{u.username}
								</p>
								<p className="text-zinc-500 text-xs">
									{u.followers_count} seguidores
								</p>
							</div>
						</div>
						{u.id !== user?.id && (
							<button
								type="button"
								onClick={() => handleFollow(u.id)}
								className="bg-white text-black text-sm font-bold px-4 py-1.5 rounded-full hover:bg-zinc-200 transition shrink-0"
							>
								Seguir
							</button>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
