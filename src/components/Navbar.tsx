import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Navbar() {
	const { logout, userId } = useAuth();

	return (
		<div className="border-b border-border bg-dark">
			<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				<Link to="/feed" className="font-semibold">
					Tweeter
				</Link>

				<nav className="flex items-center gap-4 text-sm">
					<NavLink
						to="/feed"
						className={({ isActive }) =>
							isActive ? "font-semibold" : "text-muted hover:text-white"
						}
					>
						Feed
					</NavLink>

					<NavLink
						to="/for-you"
						className={({ isActive }) =>
							isActive ? "font-semibold" : "text-muted hover:text-white"
						}
					>
						For You
					</NavLink>

					{userId && (
						<NavLink
							to={`/profile/${userId}`}
							className={({ isActive }) =>
								isActive ? "font-semibold" : "text-muted hover:text-white"
							}
						>
							Meu perfil
						</NavLink>
					)}

					<button
						type="button"
						onClick={logout}
						className="text-muted hover:text-white cursor-pointer"
					>
						Sair
					</button>
				</nav>
			</div>
		</div>
	);
}
 