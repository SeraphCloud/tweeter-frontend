import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import type { Tweet } from "../types";

interface TweetCardProps {
	tweet: Tweet;
	onUpdate: (updatedTweet: Tweet) => void;
	onDelete: (tweetId: number) => void;
}

export default function TweetCard({
	tweet,
	onUpdate,
	onDelete,
}: TweetCardProps) {
	const { user } = useAuth();
	const [showComments, setShowComments] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [loadingComment, setLoadingComment] = useState(false);

	const handleLike = async () => {
		const liked = tweet.liked_by_me;
		onUpdate({
			...tweet,
			liked_by_me: !liked,
			likes_count: liked ? tweet.likes_count - 1 : tweet.likes_count + 1,
		});
		await api.post(`/tweets/${tweet.id}/like/`);
	};

	const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!commentText.trim()) return;
		setLoadingComment(true);

		try {
			const { data } = await api.post(`/tweets/${tweet.id}/comment/`, {
				text: commentText,
			});
			onUpdate({
				...tweet,
				comments: [...tweet.comments, data],
			});
			setCommentText("");
		} finally {
			setLoadingComment(false);
		}
	};

	const handleDelete = async () => {
		onDelete(tweet.id);
		await api.delete(`/tweet/${tweet.id}/`);
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "short",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	return (
		<div className="border-b border-zinc-800 p-4 hover:bg-zinc-900 transition">
			<div className="flex gap-3">
				{/* Avatar */}
				<div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
					{tweet.author_photo ? (
						<img
							src={tweet.author_photo}
							alt={tweet.author_username}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
							{tweet.author_username[0].toUpperCase()}
						</div>
					)}
				</div>

				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="text-white font-bold">
							@{tweet.author_username}
						</span>
						<span className="text-zinc-500 text-sm">
							{formatDate(tweet.created_at)}
						</span>
					</div>

					<p className="text-white mt-1">{tweet.text}</p>

					<div className="flex gap-6 mt-3">
						<button
							type="button"
							onClick={handleLike}
							className={`flex items-center gap-1 text-sm transition ${
								tweet.liked_by_me
									? "text-pink-500"
									: "text-zinc-500 hover:text-pink-500"
							}`}
						>
							{tweet.liked_by_me ? "❤️" : "🤍"} {tweet.likes_count}
						</button>

						<button
							type="button"
							onClick={() => setShowComments(!showComments)}
							className="flex items-center gap-1 text-sm text-zinc-500 hover:text-sky-500 transition"
						>
							💬 {tweet.comments.length}
						</button>

						{user?.id === tweet.author && (
							<button
								type="button"
								onClick={handleDelete}
								className="text-sm text-zinc-500 hover:text-red-500 transition ml-auto"
							>
								🗑️
							</button>
						)}
					</div>

					{showComments && (
						<div className="mt-3 space-y-2">
							{tweet.comments.map((comment) => (
								<div key={comment.id} className="flex gap-2 text-sm">
									<span className="text-sky-500 font-bold">
										@{comment.author_username}
									</span>
									<span className="text-zinc-300">{comment.text}</span>
								</div>
							))}

							<form onSubmit={handleComment} className="flex gap-2 mt-2">
								<input
									value={commentText}
									onChange={(e) => setCommentText(e.target.value)}
									placeholder="Escreva um comentário..."
									className="flex-1 bg-zinc-800 text-white rounded-full px-4 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
								/>
								<button
									type="submit"
									disabled={loadingComment || !commentText.trim()}
									className="text-sky-500 font-bold text-sm disabled:opacity-50"
								>
									Enviar
								</button>
							</form>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
