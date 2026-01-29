import { useState, useEffect, useCallback } from "react";
import { FaSearch, FaUserPlus, FaUserCheck } from "react-icons/fa";
import * as profilesApi from "../api/profiles";
import * as followApi from "../api/follow";
import { useAuth } from "../auth/useAuth";

export default function RightSidebar() {
	const [searchQuery, setSearchQuery] = useState("");
	const [suggestions, setSuggestions] = useState<profilesApi.Profile[]>([]);
	const [following, setFollowing] = useState<Set<number>>(new Set());
	const [loading, setLoading] = useState(false);
	const { userId } = useAuth();

	const loadSuggestions = useCallback(async () => {
		setLoading(true);
		try {
			const allProfiles = await profilesApi.getAllProfiles();
			// Filter out current user's profile if needed
			setSuggestions(allProfiles);
		} catch (error) {
			console.error("Failed to load suggestions:", error);
			// Fallback to mock data if API fails
			const mockSuggestions: profilesApi.Profile[] = [
				{
					id: 1,
					username: "tech_guru",
					display_name: "Tech Guru",
					avatar: null,
				},
				{
					id: 2,
					username: "design_master",
					display_name: "Design Master",
					avatar: null,
				},
				{
					id: 3,
					username: "code_ninja",
					display_name: "Code Ninja",
					avatar: null,
				},
				{
					id: 4,
					username: "travel_bug",
					display_name: "Travel Bug",
					avatar: null,
				},
				{
					id: 5,
					username: "foodie_lover",
					display_name: "Foodie Lover",
					avatar: null,
				},
			];
			setSuggestions(mockSuggestions);
		} finally {
			setLoading(false);
		}
	}, []);

	const loadFollowingStatus = useCallback(async () => {
		try {
			const followingList = await followApi.getFollowing();
			const followingIds = new Set(followingList.map((user) => user.id));
			setFollowing(followingIds);
		} catch (error) {
			console.error("Failed to load following status:", error);
		}
	}, []);

	// Load suggestions and following status on component mount
	useEffect(() => {
		if (userId) {
			loadSuggestions();
			loadFollowingStatus();
		}
	}, [userId, loadSuggestions, loadFollowingStatus]);

	const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = e.target.value;
		setSearchQuery(query);

		if (query.trim() === "") {
			loadSuggestions();
		} else {
			try {
				const searchResults = await profilesApi.searchProfiles(query);
				setSuggestions(searchResults);
			} catch (error) {
				console.error("Search failed:", error);
				// If search fails, show empty results or fallback
				setSuggestions([]);
			}
		}
	};

	const handleFollow = async (profileId: number) => {
		try {
			await followApi.follow(profileId);
			setFollowing((prev) => new Set([...prev, profileId]));
		} catch (error) {
			console.error("Failed to follow user:", error);
		}
	};

	const handleUnfollow = async (profileId: number) => {
		try {
			await followApi.unfollow(profileId);
			setFollowing((prev) => {
				const newSet = new Set(prev);
				newSet.delete(profileId);
				return newSet;
			});
		} catch (error) {
			console.error("Failed to unfollow user:", error);
		}
	};

	return (
		<div className="fixed right-0 top-0 h-full w-80 bg-dark border-l border-gray-800 p-4">
			<div className="space-y-6">
				{/* Search Bar */}
				<div className="relative">
					<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<FaSearch className="h-5 w-5 text-gray-400" />
					</div>
					<input
						type="text"
						placeholder="Buscar usuários..."
						value={searchQuery}
						onChange={handleSearch}
						className="block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				{/* Suggestions Section */}
				<div>
					<h3 className="text-lg font-semibold text-white mb-4">
						Sugestões para seguir
					</h3>
					<div className="space-y-3">
						{suggestions.map((suggestion) => (
							<div
								key={suggestion.id}
								className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
							>
								<div className="flex items-center space-x-3">
									<div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
										{suggestion.display_name?.charAt(0) ||
											suggestion.username.charAt(0)}
									</div>
									<div>
										<div className="font-medium text-white">
											{suggestion.display_name || suggestion.username}
										</div>
										<div className="text-sm text-gray-400">
											@{suggestion.username}
										</div>
										<div className="text-xs text-gray-500 mt-1">
											Usuário sugerido
										</div>
									</div>
								</div>
								{following.has(suggestion.id) ? (
									<button
										type="button"
										onClick={() => handleUnfollow(suggestion.id)}
										className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm transition-colors"
									>
										<FaUserCheck className="h-4 w-4" />
										<span>Seguindo</span>
									</button>
								) : (
									<button
										type="button"
										onClick={() => handleFollow(suggestion.id)}
										className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-full text-sm transition-colors"
									>
										<FaUserPlus className="h-4 w-4" />
										<span>Seguir</span>
									</button>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
