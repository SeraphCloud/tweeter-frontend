<div align="center">

![Logo](./src/assets/logo.svg)

# Tweeter Frontend

**Uma rede social moderna construída com React, TypeScript e Tailwind CSS**

[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.2-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

## 📋 Índice

- [Sobre](#-sobre)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

## 📖 Sobre

O **Tweeter** é uma aplicação frontend de rede social inspirada no Twitter/X, desenvolvida com as tecnologias mais modernas do ecossistema React. O projeto oferece uma interface limpa e responsiva para publicação e visualização de tweets, com sistema de autenticação completo.

## ✨ Funcionalidades

### 🔐 Autenticação
- [x] Cadastro de novos usuários
- [x] Login com credenciais
- [x] Gerenciamento de sessão
- [x] Logout seguro

### 📱 Feed Principal
- [x] Visualização de tweets em tempo real
- [x] Interface responsiva e moderna
- [x] Navegação intuitiva

### 📝 Publicações
- [x] Criar novos tweets
- [x] Validação de formulários
- [x] Interface de publicação intuitiva

### 👤 Perfil do Usuário
- [x] Página de perfil personalizada
- [x] Visualização de informações do usuário
- [x] Gerenciamento de conta

## 🛠 Tecnologias

### Frontend
- **React 19.2** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.9** - Supertipo do JavaScript com tipagem estática
- **Vite 8.0** - Build tool moderna e rápida
- **React Router 7.13** - Roteamento para aplicações React
- **Tailwind CSS 4.2** - Framework CSS utilitário
- **Axios 1.13** - Cliente HTTP para requisições API

### Desenvolvimento
- **ESLint** - Linting de código JavaScript/TypeScript
- **Biome** - Linter e formatter rápido para JavaScript
- **Vite Plugin React** - Plugin React para Vite

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18.x ou superior)
- **npm** (geralmente vem com o Node.js) ou **yarn**/**pnpm**

Verifique as versões instaladas:

```bash
node --version
npm --version
```

## 🚀 Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/SeraphCloud/tweeter-frontend.git
cd tweeter-frontend
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_URL=http://localhost:8000/api
```

## 💻 Como Usar

### Modo de Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

O aplicativo estará disponível em [http://localhost:5173](http://localhost:5173)

### Build para Produção

Crie uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos de build estarão na pasta `dist`.

### Preview do Build

Para visualizar o build de produção localmente:

```bash
npm run preview
```

### Linting

Para verificar o código com ESLint:

```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
tweeter-frontend/
├── public/              # Arquivos estáticos
├── src/
│   ├── api/            # Configuração da API (Axios)
│   ├── assets/         # Imagens e recursos estáticos
│   ├── components/     # Componentes React reutilizáveis
│   │   ├── Logo.tsx
│   │   ├── Navbar.tsx
│   │   ├── TweetCard.tsx
│   │   └── TweetForm.tsx
│   ├── context/        # Contextos React (gerenciamento de estado)
│   │   └── AuthContext.tsx
│   ├── pages/          # Páginas da aplicação
│   │   ├── Feed.tsx
│   │   ├── Login.tsx
│   │   ├── Profile.tsx
│   │   └── Register.tsx
│   ├── types/          # Definições de tipos TypeScript
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Ponto de entrada
│   └── index.css       # Estilos globais
├── .gitignore          # Arquivos ignorados pelo Git
├── biome.json          # Configuração do Biome
├── eslint.config.js    # Configuração do ESLint
├── package.json        # Dependências e scripts
├── tsconfig.json       # Configuração do TypeScript
├── vite.config.ts      # Configuração do Vite
└── README.md           # Este arquivo
```

## 🎨 Componentes Principais

### **Logo**
Componente SVG reutilizável com suporte a cores dinâmicas via `currentColor`.

### **Navbar**
Barra de navegação fixa com links para as principais seções e menu do usuário.

### **TweetCard**
Card para exibição individual de tweets com informações do autor.

### **TweetForm**
Formulário para criação de novos tweets com validação.

### **AuthContext**
Contexto React para gerenciamento global de autenticação e estado do usuário.

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estas etapas:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Faça commit de suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes de Desenvolvimento

- Use TypeScript para todos os novos arquivos
- Siga o padrão de nomes existente no projeto
- Adicione testes para novas funcionalidades
- Mantenha o código limpo e bem comentado
- Siga as convenções do ESLint e Biome

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**SeraphCloud**

- GitHub: [@SeraphCloud](https://github.com/SeraphCloud)
- Repositório: [https://github.com/SeraphCloud/tweeter-frontend](https://github.com/SeraphCloud/tweeter-frontend)

## 🙏 Agradecimentos

- À comunidade React pelo excelente ecossistema
- À equipe do Vite pela ferramenta de build incrível
- À equipe do Tailwind CSS pelo framework CSS utilitário

---

<div align="center">
  <sub>Feito com ❤️ e TypeScript</sub>
</div>
