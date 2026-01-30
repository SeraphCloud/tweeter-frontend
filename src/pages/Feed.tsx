import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as postsApi from "../api/posts";
import * as profilesApi from "../api/profiles";
import Composer from "../components/Composer";
import PostCard from "../components/PostCard";
import LeftAside from "../components/LeftAside";
import RightSidebar from "../components/RightSidebar";

function getErrorMessage(err: unknown): string {
	if (typeof err === "string") return err;
	if (err && typeof err === "object") {
		const e = err as Record<string, unknown>;
		const { detail } = e;
		if (typeof detail === "string") return detail;
	}
	return "Não foi possível carregar o feed.";
}

export default function Feed() {
	const [posts, setPosts] = useState<postsApi.Post[]>([]);
	const [profiles, setProfiles] = useState<Record<number, profilesApi.Profile>>(
		{},
	);

	const profilesRef = useRef<Record<number, profilesApi.Profile>>({});
	useEffect(() => {
		profilesRef.current = profiles;
	}, [profiles]);

	const [loading, setLoading] = useState(true);
	const [posting, setPosting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const load = useCallback(async () => {
		setLoading(true);
		setError(null);
		console.log("feed load() called");

		try {
			const data = await postsApi.getFeed();
			setPosts(data);

			const authorIds = Array.from(new Set(data.map((p) => p.author)));
			const missing = authorIds.filter((id) => !profiles[id]);

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
		} catch (err: unknown) {
			setError(getErrorMessage(err));
		} finally {
			setLoading(false);
		}
	}, [profiles]);

	useEffect(() => {
		load();
	}, [load]);

	async function onPost(content: string) {
		setPosting(true);
		try {
			const created = await postsApi.createPost(content);
			setPosts((prev) => [created, ...prev]);

			if (!profiles[created.author]) {
				const prof = await profilesApi.getProfile(created.author);
				setProfiles((prev) => ({ ...prev, [prof.id]: prof }));
			}
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

	const view = useMemo(() => {
		return posts.map((p) => ({ post: p, profile: profiles[p.author] }));
	}, [posts, profiles]);

	return (
		<div className="min-h-screen bg-dark">
			<LeftAside />
			<RightSidebar />
			<div className="ml-64 mr-80">
				<div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
					<div className="flex items-center justify-between">
						<h1 className="text-xl font-semibold">Seu Feed</h1>
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
						<p className="text-sm text-neutral-500">
							Seu feed está vazio. Siga pessoas para ver postagens.
						</p>
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
		</div>
	);
}
