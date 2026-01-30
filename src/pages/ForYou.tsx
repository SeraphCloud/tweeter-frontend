import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as postsApi from "../api/posts";
import * as profilesApi from "../api/profiles";
import Composer from "../components/Composer";
import LeftAside from "../components/LeftAside";
import RightSidebar from "../components/RightSidebar";
import PostCard from "../components/PostCard";

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

	function bumpCommentsCount(postId: number) {
		setPosts((prev) =>
			prev.map((p) =>
				p.id === postId ? { ...p, comments_count: p.comments_count + 1 } : p,
			),
		);

		setTimeout(() => {
			load();
		}, 400);
	}

	const view = useMemo(
		() => posts.map((p) => ({ post: p, profile: profiles[p.author] })),
		[posts, profiles],
	);

	return (
		<>
			<LeftAside />
			<RightSidebar />
			<div className="min-h-screen bg-dark">
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
							<PostCard
								key={post.id}
								post={post}
								profile={profile}
								onReload={bumpCommentsCount}
							/>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
