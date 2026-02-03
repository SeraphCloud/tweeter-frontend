export interface Profile {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
  following_ids: number[];
}

export const mockProfiles: Profile[] = [
  {
    id: 1,
    username: 'victor',
    display_name: 'Victor Silva',
    avatar: 'https://i.pravatar.cc/150?u=victor',
    following_ids: [2, 3, 4, 5],
  },
  {
    id: 2,
    username: 'ana',
    display_name: 'Ana Paula Costa',
    avatar: 'https://i.pravatar.cc/150?u=ana',
    following_ids: [1, 3, 6, 7],
  },
  {
    id: 3,
    username: 'carlos',
    display_name: 'Carlos Eduardo',
    avatar: 'https://i.pravatar.cc/150?u=carlos',
    following_ids: [1, 2, 8],
  },
  {
    id: 4,
    username: 'maria',
    display_name: 'Maria Fernanda',
    avatar: 'https://i.pravatar.cc/150?u=maria',
    following_ids: [1, 5, 9],
  },
  {
    id: 5,
    username: 'joao',
    display_name: 'João Pedro',
    avatar: 'https://i.pravatar.cc/150?u=joao',
    following_ids: [4, 6, 10],
  },
  {
    id: 6,
    username: 'laura',
    display_name: 'Laura Beatriz',
    avatar: 'https://i.pravatar.cc/150?u=laura',
    following_ids: [2, 5, 7, 8],
  },
  {
    id: 7,
    username: 'pedro',
    display_name: 'Pedro Henrique',
    avatar: 'https://i.pravatar.cc/150?u=pedro',
    following_ids: [2, 6, 9],
  },
  {
    id: 8,
    username: 'julia',
    display_name: 'Júlia Almeida',
    avatar: 'https://i.pravatar.cc/150?u=julia',
    following_ids: [3, 6, 10],
  },
  {
    id: 9,
    username: 'gabriel',
    display_name: 'Gabriel Martins',
    avatar: 'https://i.pravatar.cc/150?u=gabriel',
    following_ids: [4, 7, 8],
  },
  {
    id: 10,
    username: 'sofia',
    display_name: 'Sofia Ribeiro',
    avatar: 'https://i.pravatar.cc/150?u=sofia',
    following_ids: [5, 8, 9],
  },
  {
    id: 11,
    username: 'lucas',
    display_name: 'Lucas Oliveira',
    avatar: 'https://i.pravatar.cc/150?u=lucas',
    following_ids: [1, 10],
  },
  {
    id: 12,
    username: 'isabela',
    display_name: 'Isabela Santos',
    avatar: 'https://i.pravatar.cc/150?u=isabela',
    following_ids: [2, 4],
  },
];
