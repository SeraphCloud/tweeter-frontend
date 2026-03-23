import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TweetForm from "../components/TweetForm";
import TweetCard from "../components/TweetCard";
import api from "../api/axios";
import type { Tweet } from "../types";

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
			<div className="max-w-xl mx-auto">
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
		</div>
	);
}
