import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import { FaHouse, FaEarthAmericas, FaCircleUser } from "react-icons/fa6";

export default function LeftAside() {
	const { logout, userId } = useAuth();

	return (
		<div className="fixed left-0 top-0 h-full w-64 bg-dark border-r border-gray-800">
			<aside className="flex flex-col h-full">
				<div className="hover:bg-blue-900 hover:transition-all p-4 m-2 rounded-2xl text-center flex items-center gap-2">
					<FaHouse />
					<Link to="/feed">Home</Link>
				</div>
				<div className="hover:bg-blue-900 hover:transition-all p-4 m-2 rounded-2xl text-center flex items-center gap-2">
					<FaEarthAmericas />
					<Link to="/for-you">Explore</Link>
				</div>
				<div className="hover:bg-blue-900 hover:transition-all p-4 m-2 rounded-2xl text-center flex items-center gap-2">
					<FaCircleUser />
					<Link to={`/profile/${userId}`}>Perfil</Link>
				</div>
				<button
					type="button"
					onClick={logout}
					className="hover:bg-blue-900 hover:transition-all p-4 m-2 rounded-2xl text-center"
				>
					Sair
				</button>
			</aside>
		</div>
	);
}
