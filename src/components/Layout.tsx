import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-dark">
			<Navbar />

			<main className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-12 gap-6">
				{/* Sidebar esquerda */}
				<aside className="hidden md:block md:col-span-3">
					<div className="sticky top-20 space-y-4">
						<div className="bg-white border rounded-xl p-4 text-sm text-neutral-600">
							Sidebar esquerda
						</div>
					</div>
				</aside>

				{/* Conteúdo principal */}
				<section className="col-span-12 md:col-span-6">{children}</section>

				{/* Sidebar direita */}
				<aside className="hidden md:block md:col-span-3">
					<div className="sticky top-20 space-y-4">
						<div className="bg-white border rounded-xl p-4 text-sm text-neutral-600">
							Sidebar direita
						</div>
					</div>
				</aside>
			</main>
		</div>
	);
}
