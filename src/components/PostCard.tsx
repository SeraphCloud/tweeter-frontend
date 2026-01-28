import { useState } from "react";
import type { Post } from "../api/posts";
import * as postsApi from "../api/posts";
import type { Profile } from "../api/profiles";
import CommentSection from "./CommentSection";

function formatDate(iso: string) {
	return new Date(iso).toLocaleString();
}

export default function PostCard({
	post,
	profile,
	onReload,
}: {
	post: Post;
	profile?: Profile;
	onReload?: (postId: number) => void;
}) {
	const [openComments, setOpenComments] = useState(false);

	async function handleToggleLike() {
		try {
			if (post.is_liked) {
				await postsApi.dislikePost(post.id);
			} else {
				await postsApi.likePost(post.id);
			}
			onReload?.();
		} catch {
			return alert("Erro ao curtir post");
		}
	}

	return (
		<div className="bg-card border border-border rounded-2xl p-4 hover:bg-white/5 hover:text-black transition">
			<div className="flex items-start gap-3">
				<div className="h-10 w-10 rounded-full bg-neutral-200 shrink-0" />

				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2 flex-wrap">
						<span className="font-semibold">
							{profile?.display_name ||
								profile?.username ||
								`User #${post.author}`}
						</span>
						<span className="text-xs text-muted">
							@{profile?.username || `id_${post.author}`}
						</span>
						<span className="text-xs text-neutral-400">
							• {formatDate(post.created_at)}
						</span>
					</div>

					<p className="text-sm mt-2 whitespace-pre-wrap">{post.content}</p>

					<div className="flex gap-6 mt-3 text-sm text-neutral-600">
						<button
							type="button"
							onClick={handleToggleLike}
							className={`transition ${
								post.is_liked
									? "text-red-600 cursor-pointer hover:text-neutral-900"
									: "text-neutral-600 cursor-pointer hover:text-neutral-900"
							}`}
						>
							❤️ {post.likes_count}
						</button>

						<button
							type="button"
							className="hover:text-neutral-900 transition cursor-pointer"
							onClick={() => setOpenComments((v) => !v)}
						>
							💬 {post.comments_count}
						</button>
						{openComments && (
							<CommentSection
								postId={post.id}
								onCommentCreated={() => onReload?.(post.id)}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
