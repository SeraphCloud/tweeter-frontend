import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TweetForm from "../components/TweetForm";
import TweetCard from "../components/TweetCard";
import api from "../api/axios";
import type { Tweet } from "../types";
import SuggestedUsers from "../components/SuggestedUsers";

export default function Feed() {
	const [tweets, setTweets] = useState<Tweet[]>([]);
	const [loading, setLoading] = useState(false);

	const fetchTweets = async () => {
		try {
			const { data } = await api.get("/tweets/");
			setTweets(data);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTweets();
	}, []);

	const updateTweet = (updatedTweet: Tweet) => {
		setTweets((prev) =>
			prev.map((t) => (t.id === updatedTweet.id ? updatedTweet : t)),
		);
	};

	const removeTweet = (tweetId: number) => {
		setTweets((prev) => prev.filter((t) => t.id !== tweetId));
	};

	return (
		<div className="min-h-screen bg-black">
			<Navbar />
			<div className="max-w-6xl mx-auto px-4 flex gap-8 mt-4">
				{/* Coluna vazia esquerda — só para balancear */}
				<div className="w-72 shrink-0 hidden lg:block" />

				{/* Coluna central — feed */}
				<div className="flex-1 min-w-0 border-x border-zinc-800">
					<TweetForm onTweetCreated={fetchTweets} />
					{loading ? (
						<p className="text-zinc-500 text-center mt-10">
							Carregando tweets...
						</p>
					) : tweets.length === 0 ? (
						<p className="text-zinc-500 text-center mt-10">
							Nenhum tweet ainda. Siga alguém ou poste algo!
						</p>
					) : (
						tweets.map((tweet) => (
							<TweetCard
								key={tweet.id}
								tweet={tweet}
								onUpdate={updateTweet}
								onDelete={removeTweet}
							/>
						))
					)}
				</div>

				{/* Coluna direita — sugestões */}
				<div className="w-72 shrink-0 hidden lg:block">
					<SuggestedUsers />
				</div>
			</div>
		</div>
	);
}
