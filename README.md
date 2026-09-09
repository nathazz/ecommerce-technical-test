# E-commerce

Aplicação full stack de e-commerce desenvolvida com **NestJS**, **PostgreSQL**, **TypeORM**, **React** e **TanStack Query**.

A aplicação permite visualizar produtos, consultar detalhes, adicionar produtos ao carrinho, alterar ou remover itens, informar opcionalmente uma data de reserva e finalizar a compra.

## Tecnologias

### Backend

- NestJS
- TypeScript
- TypeORM
- PostgreSQL
- class-validator
- class-transformer
- Cookies HTTP-only para identificação do carrinho

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod
- Tailwind CSS

## Funcionalidades

- Listagem de produtos
- Detalhes do produto
- Exibição de estoque
- Adição de produtos ao carrinho
- Atualização da quantidade dos itens
- Remoção de itens
- Limpeza do carrinho
- Data de reserva opcional
- Validação de estoque
- Finalização da compra
- Criação do pedido
- Transação durante o checkout
- Controle de concorrência no estoque
- Página de confirmação da compra
- Contador de itens no carrinho
- Exibição dos erros retornados pela API
- Interface responsiva

## Pré-requisitos

- Node.js 18+
- Docker
- Docker Compose
  > O PostgreSQL não precisa estar instalado localmente, pois o projeto possui um `docker-compose.yml` para executar o banco de dados.

## Como rodar localmente

### 1. Instale as dependências

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd frontend
npm install
```

### 2. Configure as variáveis de ambiente

Backend:

```bash
cp .env.example .env
```
env (example)
```env (
PORT=8080
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
COOKIE_SECRET=troque-este-valor-por-um-segredo-forte
# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=ecommerce_db
```

Com o Docker Compose padrão, a conexão com o banco pode ser:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/ecommerce_db
```

### 3. Suba o banco de dados

O projeto utiliza PostgreSQL 16 através do Docker Compose.

```bash
docker compose up -d
```

O banco será executado em `localhost:5432`, com as seguintes configurações:

| Configuração | Valor          |
| ------------ | -------------- |
| Host         | `localhost`    |
| Port         | `5432`         |
| User         | `postgres`     |
| Password     | `postgres`     |
| Database     | `ecommerce_db` |

Para verificar o container:

```bash
docker compose ps
```

Para parar o banco:

```bash
docker compose down
```

> Os dados do PostgreSQL são persistidos através do volume `ecommerce_pg_data`. Portanto, parar o container não remove os dados do banco.

### 4. Popule o banco com produtos de exemplo

No diretório `backend`:

```bash
npm run seed
```

frontend:

```bash
cp .env.example .env
```

```env (example)
VITE_API_URL=http://localhost:8080/api
```

### 5. Inicie a aplicação

Backend:

```bash
npm run start:dev
```

Frontend:

```bash
npm run dev
```

A API estará disponível em: `http://localhost:8080/api`

O frontend estará disponível em: `http://localhost:5173`

> As tabelas são criadas automaticamente (`synchronize: true`). Não é necessário executar migrations manualmente para este desafio.

## Cookie do carrinho

O carrinho é identificado através de um cookie HTTP-only chamado `cartId`.

O fluxo funciona da seguinte maneira:

1. O usuário realiza uma requisição relacionada ao carrinho.
2. O backend verifica se existe um `cartId`.
3. Caso não exista, um novo identificador de carrinho é criado.
4. O backend envia o `cartId` através de um cookie HTTP-only.
5. Nas próximas requisições, o navegador envia automaticamente esse cookie.
6. O backend utiliza o identificador para recuperar o carrinho correto.
   O frontend não precisa acessar ou manipular diretamente o cookie.

As requisições do frontend são realizadas com credenciais habilitadas para permitir o envio do cookie:

```ts
withCredentials: true;
```

O cookie é configurado como HTTP-only, evitando que seja acessado diretamente por JavaScript no navegador.

## Endpoints

| Método | Rota                          | Descrição                         |
| ------ | ----------------------------- | --------------------------------- |
| GET    | `/api/produtos`               | Lista todos os produtos           |
| GET    | `/api/produtos/:id`           | Retorna os detalhes de um produto |
| GET    | `/api/carrinho`               | Retorna o carrinho atual          |
| POST   | `/api/carrinho/itens`         | Adiciona um produto ao carrinho   |
| PATCH  | `/api/carrinho/itens/:itemId` | Atualiza a quantidade de um item  |
| DELETE | `/api/carrinho/itens/:itemId` | Remove um item específico         |
| DELETE | `/api/carrinho`               | Limpa todos os itens do carrinho  |
| POST   | `/api/finalizar-compra`       | Finaliza a compra e cria o pedido |

> As rotas de carrinho e checkout utilizam o cookie `cartId` para identificar o carrinho do visitante.

## Data de reserva

A data de reserva é opcional e pode ser informada ao adicionar um produto ao carrinho.

Exemplo:

```json
{
  "productId": "product-id",
  "quantity": 2,
  "reservationDate": "2026-09-20"
}
```

A data é armazenada junto ao item do carrinho e posteriormente transferida para o item do pedido durante o checkout.

## Checkout

Durante a finalização da compra:

1. O carrinho é validado.
2. O estoque dos produtos é verificado.
3. Os produtos são bloqueados durante a operação para evitar problemas de concorrência.
4. O estoque é atualizado.
5. Os itens do pedido são criados.
6. O valor total do pedido é calculado.
7. A operação é executada dentro de uma transação.
8. O carrinho é limpo após a finalização.
9. A API retorna os dados do pedido para a página de confirmação.

## Frontend

O frontend utiliza **TanStack Query** para gerenciamento do estado do servidor.

A comunicação com a API é feita através do **Axios**.

A estrutura separa:

- Requisições HTTP em `service/request`
- Queries e mutations em `service/queries`
- Tipos compartilhados em `types`
- Componentes reutilizáveis em `components`
- Páginas em `pages`
  O estado do carrinho é atualizado através do cache do TanStack Query, evitando requisições desnecessárias e mantendo o contador do carrinho sincronizado com a interface.

## Scripts disponíveis

| Script               | Descrição                              |
| -------------------- | -------------------------------------- |
| `npm run start:dev`  | Sobe a API em modo watch               |
| `npm run build`      | Compila o projeto para `dist/`         |
| `npm run start:prod` | Executa a versão compilada             |
| `npm run seed`       | Popula o banco com produtos de exemplo |
