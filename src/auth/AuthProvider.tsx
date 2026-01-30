import { useCallback, useEffect, useState } from "react";
import * as authApi from "../api/auth";
import * as profilesApi from "../api/profiles";
import { AuthContext } from "./authContext";

function getUserIdFromAccessToken(token: string): number | null {
    try {
        const payload = token.split(".")[1];
        const json = JSON.parse(atob(payload));
        const id = json.user_id ?? json.userId ?? json.sub;
        const n = Number(id);
        return Number.isFinite(n) ? n : null;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState<number | null>(() => {
        const saved = localStorage.getItem("user_id");
        return saved ? Number(saved) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        Boolean(localStorage.getItem("access_token")),
    );

    const [followingIds, setFollowingIds] = useState<number[]>([]);

    const refreshUserProfile = useCallback(async () => {
        try {
            const profile = await profilesApi.getCurrentUserProfile();
            setFollowingIds(profile.following_ids || []);
        } catch (error) {
            console.error('Erro ao carregar perfil de usuário:', error);
        }
    }, []);

    async function login(username: string, password: string): Promise<void> {
        const data = await authApi.login(username, password);
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        
        const id = getUserIdFromAccessToken(data.access);
        setUserId(id);
        if (id !== null) localStorage.setItem("user_id", String(id));
        
        setIsAuthenticated(true);
        
        await refreshUserProfile();
    }

    function logout(): void {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_id");
        setUserId(null);
        setIsAuthenticated(false);
        setFollowingIds([]);
    }

    const addFollowing = (id: number) => {
        setFollowingIds((prev) => [...prev, id]);
    };

    const removeFollowing = (id: number) => {
        setFollowingIds((prev) => prev.filter((fid) => fid !== id));
    };

    useEffect(() => {
        if (isAuthenticated) {
          profilesApi
					.getCurrentUserProfile()
					.then((profile) => {
						setFollowingIds(profile.following_ids || [])
					})
					.catch((error) => {
						console.error('Erro ao carregar perfil de usuário', error)
					})
        } else {
					setFollowingIds([])
				}
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ 
            isAuthenticated, 
            userId, 
            login, 
            logout, 
            followingIds, 
            addFollowing, 
            refreshUserProfile, 
            removeFollowing 
        }}>
            {children}
        </AuthContext.Provider>
    );
}