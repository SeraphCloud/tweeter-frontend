# Tweeter - Clone do Twitter

## 📝 Descrição

Tweeter é um clone funcional do Twitter, desenvolvido como projeto final do curso de desenvolvimento web. A aplicação permite que usuários compartilhem pensamentos, sigam outras pessoas, interajam com postagens e gerenciem seus perfis.

## 🚀 Funcionalidades

- ✅ Sistema de autenticação e criação de conta
- ✅ Configuração de perfil (foto, nome, senha)
- ✅ Sistema de seguir e deixar de seguir
- ✅ Feed de notícias (posts de seguidos)
- ✅ Página de exploração (posts recomendados)
- ✅ Interações nas postagens (curtidas e comentários)
- ✅ Gestão de perfil (editar foto, nome e senha)

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca JavaScript para construir interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server
- **Redux Toolkit Query** - Gerenciamento de estado e chamadas de API
- **React Router v7** - Roteamento da aplicação
- **Styled Components** - CSS-in-JS para estilização

### Backend
- **Python** - Linguagem de programação
- **Django REST Framework** - Framework web para API REST
- **SQLite** - Banco de dados

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn instalado
- Conta no GitHub (para deploy)

## 🔧 Instalação e Execução

### 1. Clonar o repositório

```bash
git clone https://github.com/SEU-USERNAME/tweeter-frontend.git
cd tweeter-frontend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Criar um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=https://tweeter-backend-tex8.onrender.com
```

### 4. Executar em modo de desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### 5. Build para produção

```bash
npm run build
```

Os arquivos buildados estarão na pasta `dist/`

## 🚀 Deploy

### Deploy no Vercel

1. Fazer push do código para GitHub
2. Acessar [vercel.com](https://vercel.com)
3. Clicar em "Add New Project"
4. Importar o repositório do GitHub
5. Configurar as variáveis de ambiente:
   - `VITE_API_URL`: `https://tweeter-backend-tex8.onrender.com`
6. Clicar em "Deploy"

### Deploy no Netlify

1. Fazer push do código para GitHub
2. Acessar [netlify.com](https://netlify.com)
3. Clicar em "Add new site" > "Import an existing project"
4. Importar o repositório do GitHub
5. Configurar as variáveis de ambiente
6. Clicar em "Deploy site"

## 📱 Acesso Online

**Frontend:** [LINK DO DEPLOY] (após fazer deploy)
**Backend:** https://tweeter-backend-tex8.onrender.com

## 📂 Estrutura do Projeto

```
tweeter-frontend/
├── src/
│   ├── app/              # Configuração do Redux
│   ├── components/        # Componentes reutilizáveis
│   ├── features/         # Slices e APIs do Redux
│   ├── hooks/            # Hooks customizados
│   ├── pages/            # Páginas da aplicação
│   ├── routes/           # Rotas da aplicação
│   ├── styles/           # Estilos globais e tema
│   ├── types/            # Definições de tipos TypeScript
│   └── utils/           # Funções utilitárias
├── public/              # Arquivos estáticos
├── docs/                # Documentação
├── plans/              # Planos de melhoria
├── .env                # Variáveis de ambiente (não commitado)
├── .env.example        # Exemplo de variáveis de ambiente
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🧪 Testes Manuais

### Teste de Autenticação
1. Acessar a aplicação
2. Clicar em "Registrar"
3. Preencher formulário de registro
4. Fazer login com as credenciais criadas
5. Verificar se o usuário está autenticado

### Teste de Criação de Post
1. Acessar a página inicial
2. Escrever um post
3. Clicar em "Tweetar"
4. Verificar se o post aparece no feed

### Teste de Curtidas
1. Encontrar um post no feed
2. Clicar no botão de curtir
3. Verificar se a contagem de curtidas aumentou
4. Clicar novamente para descurtir
5. Verificar se a contagem diminuiu

### Teste de Comentários
1. Clicar em um post para ver detalhes
2. Escrever um comentário
3. Clicar em "Responder"
4. Verificar se o comentário aparece

### Teste de Seguir Usuários
1. Acessar a página de exploração
2. Encontrar um perfil
3. Clicar em "Seguir"
4. Verificar se o usuário foi adicionado à lista de seguidos
5. Verificar se os posts desse usuário aparecem no feed

### Teste de Edição de Perfil
1. Acessar a página de perfil (/me)
2. Clicar em "Alterar foto de perfil"
3. Selecionar uma imagem
4. Clicar em "Salvar alterações"
5. Verificar se a foto foi atualizada
6. Alterar o nome de exibição
7. Clicar em "Salvar alterações"
8. Verificar se o nome foi atualizado
9. Alterar a senha
10. Clicar em "Salvar alterações"
11. Verificar se a senha foi atualizada

## 📝 Requisitos do Curso Atendidos

- ✅ Sistema de autenticação e criação de conta
- ✅ Configuração de perfil (foto, nome, senha)
- ✅ Sistema de seguir e feed de notícias
- ✅ Interações nas postagens (curtidas e comentários)
- ✅ Deploy e entrega final (após fazer deploy do frontend)

## 👤 Autor

**Nome:** [Seu Nome]
**Curso:** [Nome do Curso]
**Instituição:** [Nome da Instituição]

## 📄 Licença

Este projeto foi desenvolvido como parte de um curso acadêmico.
