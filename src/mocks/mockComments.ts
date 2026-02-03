export interface Comment {
  id: number;
  user: number;
  post: number;
  text: string;
  created_at: string;
}

export const mockComments: Comment[] = [
  // Comments for post 1
  {
    id: 1,
    user: 2,
    post: 1,
    text: 'Concordo! Bom dia pra você também! ☀️',
    created_at: '2026-02-01T08:35:00Z',
  },
  {
    id: 2,
    user: 3,
    post: 1,
    text: 'Bom dia! Bora codar! 💪',
    created_at: '2026-02-01T08:40:00Z',
  },
  {
    id: 3,
    user: 4,
    post: 1,
    text: 'React é vida! Bom dia!',
    created_at: '2026-02-01T08:45:00Z',
  },
  // Comments for post 2
  {
    id: 4,
    user: 5,
    post: 2,
    text: 'Vite é incrível mesmo! A velocidade de build é impressionante.',
    created_at: '2026-02-01T07:20:00Z',
  },
  {
    id: 5,
    user: 6,
    post: 2,
    text: 'TypeScript + Vite = combinação perfeita! 🚀',
    created_at: '2026-02-01T07:25:00Z',
  },
  // Comments for post 3
  {
    id: 6,
    user: 7,
    post: 3,
    text: 'Estou acompanhando! Que emoção! 🏆',
    created_at: '2026-01-31T23:00:00Z',
  },
  {
    id: 7,
    user: 8,
    post: 3,
    text: 'O jogo foi épico! Não esperava por esse resultado.',
    created_at: '2026-01-31T23:15:00Z',
  },
  {
    id: 8,
    user: 9,
    post: 3,
    text: 'Brasil na final! Vamos lá! 🇧🇷',
    created_at: '2026-01-31T23:30:00Z',
  },
  // Comments for post 4
  {
    id: 9,
    user: 10,
    post: 4,
    text: 'Totalmente! Testes salvam vidas (e empregos) 😄',
    created_at: '2026-01-31T18:30:00Z',
  },
  {
    id: 10,
    user: 11,
    post: 4,
    text: 'Comecei a usar TDD e minha produtividade aumentou muito.',
    created_at: '2026-01-31T18:45:00Z',
  },
  // Comments for post 5
  {
    id: 11,
    user: 12,
    post: 5,
    text: 'Vou descansar e depois estudar um pouco. Melhor dos dois mundos!',
    created_at: '2026-01-31T14:15:00Z',
  },
  {
    id: 12,
    user: 1,
    post: 5,
    text: 'Descansar é fundamental! Recarregar as energias.',
    created_at: '2026-01-31T14:30:00Z',
  },
  // Comments for post 6
  {
    id: 13,
    user: 2,
    post: 6,
    text: 'Acontece comigo sempre! Código de 6 meses atrás parece de outra pessoa.',
    created_at: '2026-01-30T20:20:00Z',
  },
  {
    id: 14,
    user: 3,
    post: 6,
    text: 'Isso é sinal de evolução! Você está melhorando constantemente.',
    created_at: '2026-01-30T20:30:00Z',
  },
  // Comments for post 7
  {
    id: 15,
    user: 4,
    post: 7,
    text: 'Já li o changelog, muitas melhorias interessantes!',
    created_at: '2026-01-30T16:45:00Z',
  },
  // Comments for post 8
  {
    id: 16,
    user: 5,
    post: 8,
    text: 'Sem café não sou nada! ☕',
    created_at: '2026-01-30T10:15:00Z',
  },
  {
    id: 17,
    user: 6,
    post: 8,
    text: 'Café é o combustível dos devs! 😄',
    created_at: '2026-01-30T10:30:00Z',
  },
  // Comments for post 9
  {
    id: 18,
    user: 7,
    post: 9,
    text: 'IA está revolucionando tudo! Qual framework está usando?',
    created_at: '2026-01-29T20:00:00Z',
  },
  {
    id: 19,
    user: 8,
    post: 9,
    text: 'Também estou estudando IA, vamos trocar ideia!',
    created_at: '2026-01-29T20:15:00Z',
  },
  // Comments for post 10
  {
    id: 20,
    user: 9,
    post: 10,
    text: 'Excelente livro! Leitura obrigatória para todo dev.',
    created_at: '2026-01-29T14:30:00Z',
  },
  {
    id: 21,
    user: 10,
    post: 10,
    text: 'Clean Code mudou minha perspectiva sobre código limpo.',
    created_at: '2026-01-29T14:45:00Z',
  },
  // Comments for post 11
  {
    id: 22,
    user: 11,
    post: 11,
    text: 'WebSockets são muito úteis para apps em tempo real!',
    created_at: '2026-01-29T11:30:00Z',
  },
  // Comments for post 12
  {
    id: 23,
    user: 12,
    post: 12,
    text: 'Regra de ouro: nunca deploy na sexta! 😂',
    created_at: '2026-01-28T17:45:00Z',
  },
  // Comments for post 13
  {
    id: 24,
    user: 1,
    post: 13,
    text: 'Parabéns! Sucesso no novo emprego! 🎉',
    created_at: '2026-01-28T09:15:00Z',
  },
  {
    id: 25,
    user: 2,
    post: 13,
    text: 'Boa sorte! Vai ser incrível!',
    created_at: '2026-01-28T09:30:00Z',
  },
  // Comments for post 14
  {
    id: 26,
    user: 3,
    post: 14,
    text: 'CI/CD é game changer! Automatiza tudo!',
    created_at: '2026-01-27T21:30:00Z',
  },
  // Comments for post 15
  {
    id: 27,
    user: 4,
    post: 15,
    text: 'Boa! Planejamento é essencial para o sucesso do sprint.',
    created_at: '2026-01-27T16:00:00Z',
  },
];
