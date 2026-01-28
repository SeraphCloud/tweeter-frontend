# BACKEND REFERENCE - Tweeter API

## 1. Visão Geral do Backend

- **Framework**: Django 6.0.1 com Django REST Framework
- **Autenticação**: JWT (Simple JWT)
- **Banco de dados**: PostgreSQL (produção via dj-database-url) ou SQLite3 (desenvolvimento)
- **CORS**: Configurado com django-cors-headers
- **Deploy**: Preparado para Heroku (Procfile, runtime.txt)
- **Python Version**: 3.12.0

---

## 2. Configuração e Variáveis de Ambiente

### Variáveis Necessárias

```bash
# Obrigatórias
SECRET_KEY=your-secret-key-here

# Opcionais (com valores padrão)
DEBUG=False
DATABASE_URL=postgresql://user:password@host:port/dbname
ALLOWED_HOSTS=localhost 127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000 https://yourdomain.com

# Superuser padrão
SUPERUSER_USERNAME=admin
SUPERUSER_EMAIL=admin@example.com
SUPERUSER_PASSWORD=admin123
```

### Configuração CORS

- **Desenvolvimento** (DEBUG=True): Permite todas as origens
- **Produção** (DEBUG=False): Apenas origens em `CORS_ALLOWED_ORIGINS`

---

## 3. Estrutura da Base de Dados

### 3.1 Accounts App

#### **Profile Model**
```python
{
  "id": Integer (auto-generated),
  "user": OneToOneField(User),
  "display_name": String (max_length=50, optional),
  "avatar": ImageField (upload_to='avatars/', optional)
}
```

#### **Follow Model**
```python
{
  "id": Integer (auto-generated),
  "follower": ForeignKey(User, related_name='following'),
  "following": ForeignKey(User, related_name='followers'),
  "created_at": DateTime (auto_now_add=True)
}
```
- **Constraint**: `unique_follow` (follower + following devem ser únicos)

---

### 3.2 Posts App

#### **Post Model**
```python
{
  "id": Integer (auto-generated),
  "author": ForeignKey(User, related_name='posts'),
  "content": String (max_length=280),
  "created_at": DateTime (auto_now_add=True)
}
```

#### **Like Model**
```python
{
  "id": Integer (auto-generated),
  "user": ForeignKey(User, related_name='likes'),
  "post": ForeignKey(Post, related_name='likes'),
  "created_at": DateTime (auto_now_add=True)
}
```
- **Constraint**: `unique_like` (user + post devem ser únicos)

#### **Comment Model**
```python
{
  "id": Integer (auto-generated),
  "user": ForeignKey(User, related_name='comments'),
  "post": ForeignKey(Post, related_name='comments'),
  "text": String (max_length=500),
  "created_at": DateTime (auto_now_add=True)
}
```

---

## 4. Endpoints da API REST

### 4.1 Autenticação (`/api/auth/`)

#### **Obter Tokens JWT**
```http
POST /api/auth/token/
Content-Type: application/json

Body:
{
  "username": "string",
  "password": "string"
}

Response (200 OK):
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

#### **Renovar Access Token**
```http
POST /api/auth/token/refresh/
Content-Type: application/json

Body:
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}

Response (200 OK):
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### 4.2 Profiles (`/api/profiles/`)

#### **Listar Perfis**
```http
GET /api/profiles/
GET /api/profiles/?username=<username>
Authorization: Optional

Response (200 OK):
[
  {
    "id": 1,
    "username": "john_doe",
    "display_name": "John Doe",
    "avatar": "http://example.com/media/avatars/photo.jpg"
  }
]
```

#### **Detalhe de Perfil**
```http
GET /api/profiles/<id>/
Authorization: Optional

Response (200 OK):
{
  "id": 1,
  "username": "john_doe",
  "display_name": "John Doe",
  "avatar": "http://example.com/media/avatars/photo.jpg"
}
```

#### **Criar Perfil**
```http
POST /api/profiles/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Body:
{
  "display_name": "string",
  "avatar": file (optional)
}

Response (201 Created):
{
  "id": 1,
  "username": "john_doe",
  "display_name": "John Doe",
  "avatar": "http://example.com/media/avatars/photo.jpg"
}
```

#### **Atualizar Perfil**
```http
PATCH /api/profiles/<id>/
PUT /api/profiles/<id>/
Authorization: Bearer <access_token>
Permission: IsOwner
Content-Type: multipart/form-data

Body:
{
  "display_name": "string" (optional),
  "avatar": file (optional)
}

Response (200 OK):
{
  "id": 1,
  "username": "john_doe",
  "display_name": "Updated Name",
  "avatar": "http://example.com/media/avatars/new_photo.jpg"
}
```

#### **Deletar Perfil**
```http
DELETE /api/profiles/<id>/
Authorization: Bearer <access_token>
Permission: IsOwner

Response (204 No Content)
```

#### **Meu Perfil (GET)**
```http
GET /api/profiles/me/
Authorization: Bearer <access_token>

Response (200 OK):
{
  "id": 1,
  "username": "john_doe",
  "display_name": "John Doe",
  "avatar": "http://example.com/media/avatars/photo.jpg"
}
```

#### **Atualizar Meu Perfil**
```http
PATCH /api/profiles/me/
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

Body:
{
  "display_name": "string" (optional),
  "avatar": file (optional)
}

Response (200 OK):
{
  "id": 1,
  "username": "john_doe",
  "display_name": "Updated Name",
  "avatar": "http://example.com/media/avatars/new_photo.jpg"
}
```

#### **Seguir Usuário**
```http
POST /api/profiles/<id>/follow/
Authorization: Bearer <access_token>

Response (201 Created):
{
  "detail": "Agora você está seguindo."
}

Error (400 Bad Request):
{
  "detail": "Não é possível seguir a si mesmo."
}
```

#### **Deixar de Seguir**
```http
POST /api/profiles/<id>/unfollow/
Authorization: Bearer <access_token>

Response (200 OK):
{
  "detail": "Deixou de seguir."
}

Error (400 Bad Request):
{
  "detail": "Você não segue esse usuário."
}
```

#### **Lista de Seguidores**
```http
GET /api/profiles/<id>/followers/
Authorization: Optional

Response (200 OK):
[
  {"username": "user1"},
  {"username": "user2"}
]
```

#### **Lista de Seguindo**
```http
GET /api/profiles/<id>/following/
Authorization: Optional

Response (200 OK):
[
  {"username": "user3"},
  {"username": "user4"}
]
```

---

### 4.3 Posts (`/api/posts/`)

#### **Listar Posts**
```http
GET /api/posts/
Authorization: Optional

Response (200 OK):
[
  {
    "id": 1,
    "author": 2,
    "content": "Hello world!",
    "created_at": "2026-01-23T22:30:00Z",
    "likes_count": 5,
    "comments_count": 3
  }
]
```
- Posts ordenados por `-created_at` (mais recentes primeiro)

#### **Criar Post**
```http
POST /api/posts/
Authorization: Bearer <access_token>
Content-Type: application/json

Body:
{
  "content": "string (max 280 chars)"
}

Response (201 Created):
{
  "id": 1,
  "author": 2,
  "content": "Hello world!",
  "created_at": "2026-01-23T22:30:00Z",
  "likes_count": 0,
  "comments_count": 0
}
```

#### **Detalhe de Post**
```http
GET /api/posts/<id>/
Authorization: Optional

Response (200 OK):
{
  "id": 1,
  "author": 2,
  "content": "Hello world!",
  "created_at": "2026-01-23T22:30:00Z",
  "likes_count": 5,
  "comments_count": 3
}
```

#### **Atualizar Post**
```http
PATCH /api/posts/<id>/
PUT /api/posts/<id>/
Authorization: Bearer <access_token>
Permission: IsAuthor
Content-Type: application/json

Body:
{
  "content": "string (max 280 chars)"
}

Response (200 OK):
{
  "id": 1,
  "author": 2,
  "content": "Updated content!",
  "created_at": "2026-01-23T22:30:00Z",
  "likes_count": 5,
  "comments_count": 3
}
```

#### **Deletar Post**
```http
DELETE /api/posts/<id>/
Authorization: Bearer <access_token>
Permission: IsAuthor

Response (204 No Content)
```

#### **Feed Personalizado**
```http
GET /api/posts/feed/
Authorization: Bearer <access_token>

Response (200 OK):
[
  {
    "id": 1,
    "author": 2,
    "content": "Post from someone I follow",
    "created_at": "2026-01-23T22:30:00Z",
    "likes_count": 5,
    "comments_count": 3
  }
]
```
- Retorna apenas posts de usuários que o user autenticado segue

#### **Curtir Post**
```http
POST /api/posts/<id>/like/
Authorization: Bearer <access_token>

Response (201 Created):
{
  "detail": "Liked"
}

Response (200 OK) se já curtiu:
{
  "detail": "Already Liked"
}
```

#### **Descurtir Post**
```http
POST /api/posts/<id>/dislike/
Authorization: Bearer <access_token>

Response (200 OK):
{
  "detail": "Disliked"
}

Error (400 Bad Request):
{
  "detail": "Not liked yet"
}
```

---

### 4.4 Comments (`/api/comments/`)

#### **Listar Comentários**
```http
GET /api/comments/
GET /api/comments/?post=<post_id>
Authorization: Optional

Response (200 OK):
[
  {
    "id": 1,
    "user": 2,
    "post": 1,
    "text": "Great post!",
    "created_at": "2026-01-23T22:35:00Z"
  }
]
```

#### **Criar Comentário**
```http
POST /api/comments/
Authorization: Bearer <access_token>
Content-Type: application/json

Body:
{
  "post": 1,
  "text": "string (max 500 chars)"
}

Response (201 Created):
{
  "id": 1,
  "user": 2,
  "post": 1,
  "text": "Great post!",
  "created_at": "2026-01-23T22:35:00Z"
}
```

#### **Detalhe de Comentário**
```http
GET /api/comments/<id>/
Authorization: Optional

Response (200 OK):
{
  "id": 1,
  "user": 2,
  "post": 1,
  "text": "Great post!",
  "created_at": "2026-01-23T22:35:00Z"
}
```

#### **Atualizar Comentário**
```http
PATCH /api/comments/<id>/
PUT /api/comments/<id>/
Authorization: Bearer <access_token>
Permission: IsAuthor
Content-Type: application/json

Body:
{
  "text": "string (max 500 chars)"
}

Response (200 OK):
{
  "id": 1,
  "user": 2,
  "post": 1,
  "text": "Updated comment!",
  "created_at": "2026-01-23T22:35:00Z"
}
```

#### **Deletar Comentário**
```http
DELETE /api/comments/<id>/
Authorization: Bearer <access_token>
Permission: IsAuthor

Response (204 No Content)
```

---

## 5. Autenticação JWT - Fluxo Completo

### Fluxo de Login

1. **Obter Tokens**
   ```javascript
   const response = await fetch('http://localhost:8000/api/auth/token/', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({username: 'user', password: 'pass'})
   });
   const {access, refresh} = await response.json();
   ```

2. **Armazenar Tokens**
   ```javascript
   localStorage.setItem('access_token', access);
   localStorage.setItem('refresh_token', refresh);
   ```

3. **Usar Access Token**
   ```javascript
   const accessToken = localStorage.getItem('access_token');
   const response = await fetch('http://localhost:8000/api/posts/', {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${accessToken}`
     }
   });
   ```

4. **Renovar Token Expirado**
   ```javascript
   const refreshToken = localStorage.getItem('refresh_token');
   const response = await fetch('http://localhost:8000/api/auth/token/refresh/', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({refresh: refreshToken})
   });
   const {access} = await response.json();
   localStorage.setItem('access_token', access);
   ```

5. **Logout**
   ```javascript
   localStorage.removeItem('access_token');
   localStorage.removeItem('refresh_token');
   ```

---

## 6. Permissões e Regras de Negócio

### Permissões Implementadas

- **`IsAuthenticatedOrReadOnly`**: 
  - GET/LIST: Público
  - POST/PUT/PATCH/DELETE: Requer autenticação

- **`IsOwnerOrReadOnly`**: 
  - GET: Público
  - PUT/PATCH/DELETE: Apenas o proprietário do recurso

### Regras de Negócio

1. **Follow**:
   - Não pode seguir a si mesmo
   - Única relação follower/following (constraint `unique_follow`)

2. **Like**:
   - Único like por usuário por post (constraint `unique_like`)
   - Pode descurtir apenas se já curtiu

3. **Post**:
   - Máximo 280 caracteres no `content`
   - Autor definido automaticamente pelo user autenticado

4. **Comment**:
   - Máximo 500 caracteres no `text`
   - User definido automaticamente pelo user autenticado

5. **Profile**:
   - Criado automaticamente via signal quando User é criado
   - `display_name` opcional (fallback para username)
   - Avatar opcional

---

## 7. Exemplos de Requisições com JavaScript Fetch

### Autenticação e Login

```javascript
// Login
async function login(username, password) {
  const response = await fetch('http://localhost:8000/api/auth/token/', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password})
  });

  if (!response.ok) throw new Error('Login failed');

  const {access, refresh} = await response.json();
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
  return {access, refresh};
}
```

### Posts

```javascript
// Criar Post
async function createPost(content) {
  const token = localStorage.getItem('access_token');
  const response = await fetch('http://localhost:8000/api/posts/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({content})
  });

  if (!response.ok) throw new Error('Failed to create post');
  return await response.json();
}

// Listar Posts
async function getPosts() {
  const response = await fetch('http://localhost:8000/api/posts/');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return await response.json();
}

// Curtir Post
async function likePost(postId) {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost:8000/api/posts/${postId}/like/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to like post');
  return await response.json();
}

// Feed Personalizado
async function getFeed() {
  const token = localStorage.getItem('access_token');
  const response = await fetch('http://localhost:8000/api/posts/feed/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch feed');
  return await response.json();
}
```

### Profiles

```javascript
// Obter Meu Perfil
async function getMyProfile() {
  const token = localStorage.getItem('access_token');
  const response = await fetch('http://localhost:8000/api/profiles/me/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to fetch profile');
  return await response.json();
}

// Atualizar Perfil
async function updateProfile(displayName, avatarFile) {
  const token = localStorage.getItem('access_token');
  const formData = new FormData();

  if (displayName) formData.append('display_name', displayName);
  if (avatarFile) formData.append('avatar', avatarFile);

  const response = await fetch('http://localhost:8000/api/profiles/me/', {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) throw new Error('Failed to update profile');
  return await response.json();
}

// Seguir Usuário
async function followUser(profileId) {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`http://localhost:8000/api/profiles/${profileId}/follow/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error('Failed to follow user');
  return await response.json();
}

// Obter Seguidores
async function getFollowers(profileId) {
  const response = await fetch(`http://localhost:8000/api/profiles/${profileId}/followers/`);
  if (!response.ok) throw new Error('Failed to fetch followers');
  return await response.json();
}
```

### Comments

```javascript
// Criar Comentário
async function createComment(postId, text) {
  const token = localStorage.getItem('access_token');
  const response = await fetch('http://localhost:8000/api/comments/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({post: postId, text})
  });

  if (!response.ok) throw new Error('Failed to create comment');
  return await response.json();
}

// Listar Comentários de um Post
async function getComments(postId) {
  const response = await fetch(`http://localhost:8000/api/comments/?post=${postId}`);
  if (!response.ok) throw new Error('Failed to fetch comments');
  return await response.json();
}
```

---

## 8. Estrutura de Respostas de Erro

### Erros de Autenticação

```json
{
  "detail": "Authentication credentials were not provided."
}
```

```json
{
  "detail": "Given token not valid for any token type",
  "code": "token_not_valid",
  "messages": [
    {
      "token_class": "AccessToken",
      "token_type": "access",
      "message": "Token is invalid or expired"
    }
  ]
}
```

### Erros de Validação

```json
{
  "content": ["Este campo é obrigatório."]
}
```

```json
{
  "content": ["Certifique-se de que este campo não tenha mais de 280 caracteres."]
}
```

### Erros de Permissão

```json
{
  "detail": "You do not have permission to perform this action."
}
```

### Erros 404

```json
{
  "detail": "Not found."
}
```

### Erros Personalizados

```json
{
  "detail": "Não é possível seguir a si mesmo."
}
```

```json
{
  "detail": "Você não segue esse usuário."
}
```

---

## 9. Considerações para o Frontend

### Formatação de Dados

- **Datas**: Formato ISO 8601 (ex: `"2026-01-23T22:30:00Z"`)
- **IDs**: Inteiros
- **URLs**: Campos `avatar` retornam URL completa (ex: `http://localhost:8000/media/avatars/photo.jpg`)

### Paginação

- Backend **não implementa paginação**
- Todos os endpoints retornam lista completa de resultados
- Frontend deve implementar paginação client-side se necessário

### Ordenação

- **Posts**: Sempre ordenados por `-created_at` (mais recentes primeiro)
- **Comments**: Ordenados por `id` (ordem de criação)
- **Profiles**: Sem ordenação específica

### Contadores

- `likes_count` e `comments_count` são calculados dinamicamente
- Atualizados automaticamente ao criar/deletar likes/comments

### Imagens

- Upload via `multipart/form-data`
- Campo `avatar` aceita arquivos de imagem
- Tamanho máximo depende da configuração do servidor

---

## 10. Comandos Úteis

### Instalação e Setup

```bash
# Instalar dependências com Poetry
poetry install

# Ou com pip
pip install -r requirements.txt

# Criar migrations
python manage.py makemigrations

# Aplicar migrations
python manage.py migrate

# Criar superuser manualmente
python manage.py createsuperuser

# Inicializar app (migrations + superuser automático)
python init_app.py

# Rodar servidor de desenvolvimento
python manage.py runserver

# Rodar em porta específica
python manage.py runserver 8080

# Acessar admin
# http://localhost:8000/admin/
```

### Deploy (Heroku)

```bash
# Variáveis de ambiente necessárias
heroku config:set SECRET_KEY=your-secret-key
heroku config:set DATABASE_URL=postgres://...
heroku config:set ALLOWED_HOSTS="yourapp.herokuapp.com"
heroku config:set CORS_ALLOWED_ORIGINS="https://yourfrontend.com"

# Deploy
git push heroku main

# Rodar migrations
heroku run python manage.py migrate

# Criar superuser
heroku run python manage.py createsuperuser

# Ou usar script de inicialização
heroku run python init_app.py
```

### Testes

```bash
# Rodar todos os testes
python manage.py test

# Rodar testes de app específico
python manage.py test accounts
python manage.py test posts
```

---

## 11. URLs Completas de Referência

### Base URL
```
Development: http://localhost:8000
Production: https://your-app.herokuapp.com
```

### Endpoints Completos

**Autenticação**
- `POST /api/auth/token/` - Login
- `POST /api/auth/token/refresh/` - Refresh token

**Profiles**
- `GET /api/profiles/` - Listar
- `POST /api/profiles/` - Criar
- `GET /api/profiles/<id>/` - Detalhe
- `PATCH /api/profiles/<id>/` - Atualizar
- `DELETE /api/profiles/<id>/` - Deletar
- `GET /api/profiles/me/` - Meu perfil
- `PATCH /api/profiles/me/` - Atualizar meu perfil
- `POST /api/profiles/<id>/follow/` - Seguir
- `POST /api/profiles/<id>/unfollow/` - Deixar de seguir
- `GET /api/profiles/<id>/followers/` - Seguidores
- `GET /api/profiles/<id>/following/` - Seguindo

**Posts**
- `GET /api/posts/` - Listar
- `POST /api/posts/` - Criar
- `GET /api/posts/<id>/` - Detalhe
- `PATCH /api/posts/<id>/` - Atualizar
- `DELETE /api/posts/<id>/` - Deletar
- `GET /api/posts/feed/` - Feed personalizado
- `POST /api/posts/<id>/like/` - Curtir
- `POST /api/posts/<id>/dislike/` - Descurtir

**Comments**
- `GET /api/comments/` - Listar
- `POST /api/comments/` - Criar
- `GET /api/comments/<id>/` - Detalhe
- `PATCH /api/comments/<id>/` - Atualizar
- `DELETE /api/comments/<id>/` - Deletar

**Admin**
- `GET /admin/` - Django Admin Panel

---

## 12. Tipos TypeScript para Frontend

```typescript
// Types para usar no frontend React/TypeScript

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  username: string;
}

export interface Profile {
  id: number;
  username: string;
  display_name: string;
  avatar: string | null;
}

export interface Post {
  id: number;
  author: number;
  content: string;
  created_at: string; // ISO 8601
  likes_count: number;
  comments_count: number;
}

export interface Comment {
  id: number;
  user: number;
  post: number;
  text: string;
  created_at: string; // ISO 8601
}

export interface Follow {
  id: number;
  follower: number;
  following: number;
  created_at: string; // ISO 8601
}

export interface FollowUser {
  username: string;
}

export interface ApiError {
  detail?: string;
  [field: string]: string[] | string | undefined;
}

// Request Bodies
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface CreatePostRequest {
  content: string;
}

export interface UpdatePostRequest {
  content: string;
}

export interface CreateCommentRequest {
  post: number;
  text: string;
}

export interface UpdateCommentRequest {
  text: string;
}

export interface UpdateProfileRequest {
  display_name?: string;
  avatar?: File;
}
```

---

## 13. Estado de Autenticação no Frontend

### Exemplo com Context API (React)

```typescript
// AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('access_token')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refresh_token')
  );

  const login = async (username: string, password: string) => {
    const response = await fetch('http://localhost:8000/api/auth/token/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({username, password})
    });

    if (!response.ok) throw new Error('Login failed');

    const {access, refresh} = await response.json();
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    setAccessToken(access);
    setRefreshToken(refresh);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAccessToken(null);
    setRefreshToken(null);
  };

  const value = {
    accessToken,
    refreshToken,
    login,
    logout,
    isAuthenticated: !!accessToken
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

---

## 14. Checklist de Integração Frontend

### Setup Inicial
- [ ] Configurar variável de ambiente para `API_BASE_URL`
- [ ] Implementar sistema de autenticação (Context/Redux)
- [ ] Criar interceptor para adicionar token JWT automaticamente
- [ ] Implementar renovação automática de token expirado

### Funcionalidades Essenciais
- [ ] Login/Logout
- [ ] Registro de usuário (se implementado no backend)
- [ ] Visualizar perfil próprio
- [ ] Editar perfil (nome, avatar)
- [ ] Listar posts (timeline geral)
- [ ] Criar post
- [ ] Editar/Deletar próprio post
- [ ] Curtir/Descurtir post
- [ ] Ver comentários de um post
- [ ] Criar comentário
- [ ] Editar/Deletar próprio comentário
- [ ] Seguir/Deixar de seguir usuário
- [ ] Ver seguidores/seguindo de um perfil
- [ ] Feed personalizado (posts de quem segue)

### Tratamento de Erros
- [ ] Erro 401: Redirecionar para login
- [ ] Erro 403: Mostrar mensagem de permissão
- [ ] Erro 404: Página não encontrada
- [ ] Erros de validação: Exibir ao lado dos campos
- [ ] Erros de rede: Mensagem genérica

### UX/UI
- [ ] Loading states durante requisições
- [ ] Feedback visual para ações (curtir, seguir)
- [ ] Atualização otimista (UI updates antes da resposta)
- [ ] Confirmação antes de deletar
- [ ] Preview de avatar antes de upload

---

## Fim da Documentação

**Versão**: 1.0  
**Data**: Janeiro 2026  
**Autor**: Victor (SeraphCloud)  
**Backend Repository**: [https://github.com/SeraphCloud/tweeter-backend](https://github.com/SeraphCloud/tweeter-backend)
