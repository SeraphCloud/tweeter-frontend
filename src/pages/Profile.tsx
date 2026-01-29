import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import * as postsApi from "../api/posts";
import * as profilesApi from "../api/profiles";
import * as followApi from "../api/follow";
import Layout from "../components/LeftAside";

export default function Profile() {
	const { id } = useParams();
	const profileId = useMemo(() => Number(id), [id]);

	const [profile, setProfile] = useState<profilesApi.Profile | null>(null);
	const [posts, setPosts] = useState<postsApi.Post[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [isFollowing, setIsFollowing] = useState<boolean>(false);
	const [followLoading, setFollowLoading] = useState<boolean>(false);
	const [followError, setFollowError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			if (!Number.isFinite(profileId)) {
				setError("ID de perfil inválido.");
				setLoading(false);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const p = await profilesApi.getProfile(profileId);
				setProfile(p);

				const maybeIsFollowing = (p as unknown as { is_following?: boolean })
					.is_following;
				if (typeof maybeIsFollowing === "boolean") {
					setIsFollowing(maybeIsFollowing);
				}

				const all = await postsApi.listAll();
				setPosts(all.filter((post) => post.author === profileId));
			} catch {
				setError("Não foi possívei carregar o perfil.");
			} finally {
				setLoading(false);
			}
		}

		load();
	}, [profileId]);

	async function toggleFollow() {
		if (!Number.isFinite(profileId)) return;

		setFollowLoading(true);
		setFollowError(null);

		const next = !isFollowing;
		setIsFollowing(next);

		try {
			if (next) {
				await followApi.follow(profileId);
			} else {
				await followApi.unfollow(profileId);
			}
		} catch {
			setIsFollowing(!next);
			setFollowError("Não foi possível atualizar o follow.");
		} finally {
			setFollowLoading(false);
		}
	}

	if (loading) {
		return <div className="p-5 text-sm text-neutral-500">Carregando...</div>;
	}

	if (error) {
		return <div className="p-6 text-sm text-red-500">{error}</div>;
	}

	if (!profile) return null;

	return (
		<Layout>
			<div className="min-h-screen bg-neutral-50">
				<div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
					<div className="bg-white border border-neutral-200 rounded-2xl p-4">
						<div className="flex items-center gap-3">
							<div className="h-14 w-14 rounded-full bg-neutral-200" />
							<div className="min-w-0">
								<div className="font-semibold">
									{profile.display_name || profile.username}
								</div>
								<div className="text-sm text-neutral-500">
									@{profile.username}
								</div>
							</div>
						</div>

						{/* Botão Follow vem no próximo passo */}
						<div className="mt-4 flex gap-2">
							<button
								type="button"
								className="px-4 py-2 rounded-lg border border-neutral-300 text-sm hover:bg-neutral-50"
								onClick={toggleFollow}
								disabled={followLoading}
							>
								{followLoading
									? "Aguarde..."
									: isFollowing
										? "Deixar de seguir"
										: "Seguir"}
							</button>
							{followError && (
								<p className="text-xs text-red-600">{followError}</p>
							)}
						</div>
					</div>

					<div className="space-y-3">
						<h2 className="text-sm font-semibold text-neutral-700">Posts</h2>
						{posts.length === 0 ? (
							<p className="text-sm text-neutral-500">
								Esse usuário ainda não postou.
							</p>
						) : (
							<ul className="space-y-3">
								{posts.map((p) => (
									<li key={p.id} className="bg-white border rounded-2xl p-4">
										<div className="text-xs text-neutral-400">
											{new Date(p.created_at).toLocaleString()}
										</div>
										<div className="mt-2 text-sm whitespace-pre-wrap">
											{p.content}
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}
