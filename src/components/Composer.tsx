import { useState } from "react";

export default function Composer({
	onPost,
	loading,
}: {
	onPost: (content: string) => Promise<void>;
	loading: boolean;
}) {
	const [content, setContent] = useState("");

	async function submit() {
		const text = content.trim();
		if (!text) return;
		await onPost(text);
		setContent("");
	}

	return (
		<div className="bg-card border border-border rounded-2xl p-4">
			<textarea
				className="w-full bg-transparent resize-none outline-none text-sm text-white placeholder:text-muted focus:ring-0"
				rows={3}
				placeholder="O que está acontecendo?"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				maxLength={280}
			/>
			<div className="flex items-center justify-between mt-3">
				<span className="text-xs text-neutral-500">{content.length}/280</span>
				<button
					type="button"
					onClick={submit}
					disabled={loading || !content.trim()}
					className="cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium disabled:opacity-50 hover:bg-blue-700"
				>
					{loading ? "Postando..." : "Postar"}
				</button>
			</div>
		</div>
	);
}
