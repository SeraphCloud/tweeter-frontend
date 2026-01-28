import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

export default function HomeRedirect() {
	const { isAuthenticated } = useAuth();
	return <Navigate to={isAuthenticated ? "/feed" : "/login"} replace />;
}
