# ServiçoJá — Marketplace de Serviços Locais

Frontend completo em **Vite + React + TypeScript** para uma plataforma de contratação de serviços locais, inspirado em GetNinjas, Uber e iFood.

## Stack

- Vite
- React
- TypeScript
- React Router DOM
- TailwindCSS com dark mode
- Axios
- React Icons
- Framer Motion
- Context API
- JSON Server para fake API

## Funcionalidades

- Home premium com busca, categorias, profissionais, avaliações e CTA
- Página de busca com filtros e paginação visual
- Perfil do profissional com galeria, avaliações, WhatsApp e mapa simulado
- Login/cadastro separado para cliente e profissional
- Dashboard do profissional com pedidos, ganhos, avaliações e upload de imagens
- Dashboard do cliente com histórico e favoritos
- Chat estilo WhatsApp com mensagens simuladas
- Rotas protegidas
- Toasts
- Loading skeleton
- Menu mobile
- Navbar fixa
- Sidebar nos dashboards
- Dark mode persistido no localStorage
- Dados mockados e serviço de API centralizado

## Estrutura

```txt
src/
  assets/
  components/
    common/
    layout/
    professionals/
    dashboard/
    forms/
    chat/
  contexts/
  data/
  hooks/
  layouts/
  pages/
  routes/
  services/
  types/
```

## Instalação

```bash
npm install
```

## Rodar o frontend

```bash
npm run dev
```

Acesse:

```txt
http://localhost:5173
```

## Rodar fake API com JSON Server

```bash
npm run server
```

A API fake ficará em:

```txt
http://localhost:3333
```

## Build de produção

```bash
npm run build
npm run preview
```

## Login simulado

Use qualquer e-mail válido e senha com 4 ou mais caracteres.

Exemplo:

```txt
cliente@email.com
1234
```

Selecione o tipo de conta:

- Cliente
- Profissional

Depois do login, o usuário é enviado ao dashboard correspondente.

## Integração futura com FastAPI

O arquivo `src/services/api.ts` já centraliza o Axios. Para trocar o mock por backend real:

```ts
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 7000
});
```

Crie `.env` com:

```env
VITE_API_URL=http://localhost:8000
```

Sugestão de endpoints FastAPI futuros:

```txt
GET    /professionals
GET    /professionals/{id}
GET    /categories
POST   /auth/login
POST   /auth/register
GET    /orders
POST   /messages
```

## Observações

O projeto usa dados mockados locais em `src/data/mock.ts` para facilitar o desenvolvimento inicial. O arquivo `db.json` está incluído para expansão com JSON Server.
