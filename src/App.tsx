import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";

function PrivateRoute({ children }: { children: React.ReactNode }) {
	const { user, loading } = useAuth();

	if (loading)
		return (
			<div className="flex justify-center mt-20 text-gray-400">
				Carregando...
			</div>
		);
	return user ? <>{children}</> : <Navigate to="/login" />;
}

function AppRoutes() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route
				path="/"
				element={
					<PrivateRoute>
						<Feed />
					</PrivateRoute>
				}
			/>
			<Route path="/profile" element={<Profile />} />
		</Routes>
	);
}

export default function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<AppRoutes />
			</BrowserRouter>
		</AuthProvider>
	);
}
