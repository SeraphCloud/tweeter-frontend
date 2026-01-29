import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as postsApi from "../api/posts";
import * as profilesApi from "../api/profiles";
import Composer from "../components/Composer";
import Layout from "../components/LeftAside";

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString();
}

export default function ForYou() {
	const [posts, setPosts] = useState<postsApi.Post[]>([]);
	const [profiles, setProfiles] = useState<Record<number, profilesApi.Profile>>(
		{},
	);
	const [loading, setLoading] = useState(false);
	const [posting, setPosting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const profilesRef = useRef(profiles);

	useEffect(() => {
		profilesRef.current = profiles;
	}, [profiles]);

	const load = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const data = await postsApi.listAll();
			setPosts(data);

			const authorIds = Array.from(new Set(data.map((p) => p.author)));
			const missing = authorIds.filter((id) => !profilesRef.current[id]);

			if (missing.length) {
				const fetched = await Promise.all(
					missing.map((id) => profilesApi.getProfile(id)),
				);
				setProfiles((prev) => {
					const next = { ...prev };
					for (const prof of fetched) next[prof.id] = prof;
					return next;
				});
			}
		} catch {
			setError("Não foi possível carregar a For You.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	async function onPost(content: string) {
		setPosting(true);

		try {
			const created = await postsApi.createPost(content);
			setPosts((prev) => [created, ...prev]);
		} finally {
			setPosting(false);
		}
	}

	const view = useMemo(
		() => posts.map((p) => ({ post: p, profile: profiles[p.author] })),
		[posts, profiles],
	);

	return (
		<Layout>
			<div className="min-h-screen bg-neutral-50">
				<div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
					<div className="flex items-center justify-between">
						<h1 className="text-xl font-semibold">For You</h1>
						<button
							type="button"
							onClick={load}
							className="text-sm text-blue-700 hover:underline"
						>
							Recarregar
						</button>
					</div>

					<Composer onPost={onPost} loading={posting} />

					{loading && <p className="text-sm text-neutral-500">Carregando...</p>}
					{error && <p className="text-sm text-red-600">{error}</p>}

					{!loading && !error && posts.length === 0 && (
						<p className="text-sm text-neutral-500">Ainda não há posts.</p>
					)}

					<div className="space-y-4">
						{view.map(({ post, profile }) => (
							<div
								key={post.id}
								className="bg-white border border-neutral-200 rounded-2xl p-4"
							>
								<div className="flex items-start gap-3">
									<div className="h-10 w-10 rounded-full bg-neutral-200 shrink-0" />
									<div className="min-w-0 flex-1">
										<div className="flex items-center gap-2 flex-wrap">
											<span className="font-semibold text-sm">
												{profile?.display_name ||
													profile?.username ||
													`User #${post.author}`}
											</span>
											<span className="text-xs text-neutral-500">
												@{profile?.username || `id_${post.author}`}
											</span>
											<span className="text-xs text-neutral-400">
												• {formatDate(post.created_at)}
											</span>
										</div>

										<p className="text-sm mt-2 whitespace-pre-wrap">
											{post.content}
										</p>

										<div className="flex gap-4 mt-3 text-sm text-neutral-600">
											<span>❤️ {post.likes_count}</span>
											<span>💬 {post.comments_count}</span>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}
