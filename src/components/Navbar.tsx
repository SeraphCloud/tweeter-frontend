import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../components/Logo";

export default function Navbar() {
	const { user, logout } = useAuth();

	return (
		<nav className="border-b border-zinc-800 px-4 py-3 flex items-center justify-between sticky top-0 bg-black z-10">
			<Link to="/" className="flex items-center">
				<Logo className="w-16 h-16 text-white" />
			</Link>

			<div className="flex items-center gap-4">
				<Link
					to="/"
					className="text-zinc-400 hover:text-white transition text-sm"
				>
					Feed
				</Link>
				<Link
					to="/profile"
					className="text-zinc-400 hover:text-white transition text-sm"
				>
					Perfil
				</Link>
				<span className="text-zinc-500 text-sm">@{user?.username}</span>
				<button
					type="button"
					onClick={logout}
					className="text-sm text-zinc-500 hover:text-red-500 transition"
				>
					Sair
				</button>
			</div>
		</nav>
	);
}
