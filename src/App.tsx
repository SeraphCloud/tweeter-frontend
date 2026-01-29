import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import HomeRedirect from "./HomeRedirect";
import Feed from "./pages/Feed";
import ForYou from "./pages/ForYou";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

export default function App() {
	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route
				path="/for-you"
				element={<ProtectedRoute>{<ForYou />}</ProtectedRoute>}
			/>
			<Route path="/" element={<HomeRedirect />} />
			<Route
				path="/feed"
				element={<ProtectedRoute>{<Feed />}</ProtectedRoute>}
			/>
			<Route
				path="/profile/:id"
				element={<ProtectedRoute>{<Profile />}</ProtectedRoute>}
			/>
		</Routes>
	);
}
