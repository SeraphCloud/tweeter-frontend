import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

export default function TestUsersCreator() {
	const [creating, setCreating] = useState(false);
	const [message, setMessage] = useState("");

	const testUsers = [
		{
			username: "tech_guru",
			password: "password123",
			display_name: "Tech Guru",
			email: "tech@example.com",
		},
		{
			username: "design_master",
			password: "password123",
			display_name: "Design Master",
			email: "design@example.com",
		},
		{
			username: "code_ninja",
			password: "password123",
			display_name: "Code Ninja",
			email: "code@example.com",
		},
		{
			username: "travel_bug",
			password: "password123",
			display_name: "Travel Bug",
			email: "travel@example.com",
		},
		{
			username: "foodie_lover",
			password: "password123",
			display_name: "Foodie Lover",
			email: "food@example.com",
		},
	];

	const createTestUser = async (userData: {
		username: string;
		password: string;
		display_name: string;
		email: string;
	}) => {
		try {
			// This would need to be implemented in the backend
			// For now, we'll just log the action
			console.log(`Creating user: ${userData.username}`);
			return true;
		} catch (error) {
			console.error(`Failed to create user ${userData.username}:`, error);
			return false;
		}
	};

	const createTestPost = async (username: string, content: string) => {
		try {
			// This would need to be implemented in the backend
			// For now, we'll just log the action
			console.log(`Creating post for ${username}: ${content}`);
			return true;
		} catch (error) {
			console.error(`Failed to create post for ${username}:`, error);
			return false;
		}
	};

	const handleCreateTestUsers = async () => {
		setCreating(true);
		setMessage("Criando usuários de teste...");

		let successCount = 0;

		for (const user of testUsers) {
			const userCreated = await createTestUser(user);
			if (userCreated) {
				successCount++;

				// Create some test posts for each user
				const posts = [
					`Olá, sou ${user.display_name}! Bem-vindos ao meu perfil.`,
					`Compartilhando meus pensamentos sobre ${user.display_name.toLowerCase()}.`,
					`Post de teste para demonstrar o feed do Tweeter.`,
				];

				for (const postContent of posts) {
					await createTestPost(user.username, postContent);
				}
			}
		}

		setMessage(
			`Usuários de teste criados: ${successCount}/${testUsers.length}`,
		);
		setCreating(false);
	};

	return (
		<div className="fixed bottom-4 right-4">
			<button
				type="button"
				onClick={handleCreateTestUsers}
				disabled={creating}
				className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors disabled:opacity-50"
			>
				<FaUserPlus />
				<span>{creating ? "Criando..." : "Criar Usuários de Teste"}</span>
			</button>
			{message && (
				<div className="mt-2 text-sm text-gray-300 text-center">{message}</div>
			)}
		</div>
	);
}
