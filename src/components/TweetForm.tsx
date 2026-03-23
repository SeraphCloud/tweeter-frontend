import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

interface TweetFormProps {
	onTweetCreated: () => void;
}

export default function TweetForm({ onTweetCreated }: TweetFormProps) {
	const { user } = useAuth();
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text.trim()) return;
		setLoading(true);

		try {
			await api.post("/tweets/", { text });
			setText("");
			onTweetCreated();
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="border-b border-zinc-800 p-4 flex gap-3"
		>
			{/* Avatar do usuário */}
			<div className="w-10 h-10 rounded-full shrink-0 overflow-hidden">
				{user?.foto_perfil ? (
					<img
						src={user.foto_perfil}
						alt={user.username}
						className="w-full h-full object-cover"
					/>
				) : (
					<div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
						{user?.username[0].toUpperCase()}
					</div>
				)}
			</div>

			<div className="flex-1">
				<textarea
					value={text}
					onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
						setText(e.target.value)
					}
					placeholder="O que está acontecendo?"
					maxLength={280}
					rows={2}
					className="w-full bg-transparent text-white placeholder-zinc-500 resize-none focus:outline-none text-lg"
				/>
				<div className="flex justify-between items-center mt-2">
					{/* Contador de caracteres */}
					<span className="text-zinc-500 text-sm">{text.length}/280</span>
					<button
						type="submit"
						disabled={loading || !text.trim()}
						className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-full transition"
					>
						{loading ? "Postando..." : "Tweetar"}
					</button>
				</div>
			</div>
		</form>
	);
}
