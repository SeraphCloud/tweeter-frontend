import { useEffect, useState } from "react";
import * as commentsApi from "../api/comments";
import * as profilesApi from "../api/profiles";

export default function CommentSection({
	postId,
	onCommentCreated,
}: {
	postId: number;
	onCommentCreated?: () => void;
}) {
	const [users, setUsers] = useState<Record<number, profilesApi.Profile>>({});
	const [comments, setComments] = useState<commentsApi.Comment[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [text, setText] = useState("");
	const [sending, setSending] = useState(false);

	async function load() {
		setLoading(true);
		setError(null);
		try {
			const data = await commentsApi.listComments(postId);
			setComments(data);
			const userIds = Array.from(new Set(data.map((c) => c.user)));
			const missing = userIds.filter((id) => !users[id]);

			if (missing.length) {
				const fetched = await Promise.all(
					missing.map((id) => profilesApi.getProfile(id)),
				);
				setUsers((prev) => {
					const next = { ...prev };
					for (const u of fetched) next[u.id] = u;
					return next;
				});
			}
		} catch {
			setError("Não foi possível carregar comentários.");
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		load();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [postId]);

	async function submit() {
		const value = text.trim();
		if (!value) return;

		setSending(true);
		setError(null);
		try {
			const created = await commentsApi.createComment(postId, value);
			setComments((prev) => [created, ...prev]);
			setText("");
			console.log("comment created -> calling onCommentCreated");
			onCommentCreated?.();
		} catch {
			setError("Não foi possível enviar comentário.");
		} finally {
			setSending(false);
		}
	}

	return (
		<div className="mt-4 border-t border-neutral-200 pt-3">
			<div className="flex gap-2">
				<input
					className="flex-1 px-3 py-2 border rounded-lg text-sm"
					placeholder="Escreva um comentário..."
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<button
					type="button"
					onClick={submit}
					disabled={sending || !text.trim()}
					className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm disabled:opacity-50"
				>
					{sending ? "Enviando..." : "Enviar"}
				</button>
			</div>

			{error && <p className="text-xs text-red-600 mt-2">{error}</p>}
			{loading && (
				<p className="text-sm text-neutral-500 mt-3">Carregando...</p>
			)}

			{!loading && comments.length === 0 && (
				<p className="text-sm text-neutral-500 mt-3">
					Nenhum comentário ainda.
				</p>
			)}

			<ul className="mt-3 space-y-3">
				{comments.map((c) => (
					<li key={c.id} className="text-sm">
						<div className="text-xs text-neutral-500">
							@{users[c.user]?.username ?? `User #${c.user}`}
						</div>
						<div className="mt-1">{c.text}</div>
					</li>
				))}
			</ul>
		</div>
	);
}
