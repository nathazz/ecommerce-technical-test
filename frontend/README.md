# E-commerce Frontend

React frontend for the e-commerce challenge.

## Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- TanStack Query
- React Hook Form
- Zod
- React Router

## Architecture

- Axios is responsible for HTTP requests.
- TanStack Query manages server state and cache.
- React Hook Form manages form state.
- Zod validates user form input.
- The backend owns the signed `httpOnly` `cartId` cookie.
- React never reads or creates the cart cookie.
- Axios uses `withCredentials: true`.

## API

Default backend:

```text
http://localhost:3001/api
```

Create `.env`:

```env
VITE_API_URL=http://localhost:3001/api
```

The backend must allow credentials:

```ts
app.enableCors({
  origin: 'http://localhost:5173',
  credentials: true,
});
```

## Install

```bash
npm install
```

## Run

```bash
npm run dev
```

## Build

```bash
npm run build
```
