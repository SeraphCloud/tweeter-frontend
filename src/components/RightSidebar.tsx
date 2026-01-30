import { useState, useEffect, useCallback } from "react";
import { FaSearch, FaUserPlus, FaUserCheck } from "react-icons/fa";
import * as profilesApi from "../api/profiles";
import * as followApi from "../api/follow";
import { useAuth } from "../auth/useAuth"; // Hook customizado para acessar o contexto

export default function RightSidebar() {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState<profilesApi.Profile[]>([]);
    const [loading, setLoading] = useState(false);

    // 1. Pegamos os dados do Contexto Global
    const { userId, followingIds, addFollowing, removeFollowing } = useAuth();

    const loadSuggestions = useCallback(async () => {
        setLoading(true);
        try {
            const allProfiles = await profilesApi.getAllProfiles();
            // Filtro opcional: Remover o próprio usuário da lista de sugestões
            const filtered = allProfiles.filter(p => p.id !== userId);
            setSuggestions(filtered);
        } catch (error) {
            console.error("Failed to load suggestions:", error);
            // ... seu mock data permanece aqui ...
        } finally {
            setLoading(false);
        }
    }, [userId]); // Adiciona userId como dependência

    // 2. Removemos a função loadFollowingStatus local!
    // O Contexto já cuidou disso ao montar.

    useEffect(() => {
        if (userId) {
            loadSuggestions();
        }
    }, [userId, loadSuggestions]);

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
                setSuggestions([]);
            }
        }
    };

    const handleFollow = async (profileId: number) => {
        try {
            await followApi.follow(profileId);
            // 3. Atualiza o estado global (botão muda na hora!)
            addFollowing(profileId);
        } catch (error) {
            console.error("Failed to follow user:", error);
        }
    };

    const handleUnfollow = async (profileId: number) => {
        try {
            await followApi.unfollow(profileId);
            // 3. Atualiza o estado global
            removeFollowing(profileId);
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
                        {suggestions.map((suggestion) => {
                            // 4. Lógica simples de verificação usando o array do contexto
                            const isFollowing = followingIds.includes(suggestion.id);

                            return (
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

                                    {/* 5. Botões controlados pela verificação acima */}
                                    {isFollowing ? (
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
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}