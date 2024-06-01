# ⚙️ Lumi Backend

<br />

_Eu queria fazer mais se possivel, porem com o meu tempo disponivel esse foi o meu limite_ 🫠

<br />

## 🧵 How to

### Rodando a aplicação na sua maquina

📝 Clone o repositorio para a sua maquina com [Git](https://git-scm.com/)

```
# Comando para clonar
git clone https://github.com/d-kja/lumi-backend-challenge.git

# Comando para entrar no repositorio
cd lumi-backend-challenge
```

<br />

😓 Baixando as dependencias do projeto com [Bun](https://bun.sh). 

_O motivo da escolha? Uma unica palavra, **simplicidade**. Caso eu fosse utilizar NPM seria necessario baixar algo que nem FNM ou NVM para simplificar o processo._

```
bun install --frozen-lockfile
```

<br />

📦 Criando uma instancia do banco de dados com [Docker](https://www.docker.com/products/docker-desktop/)

```
cp .docker/.env.example .docker/.env && docker compose -f .docker/docker-compose.yaml up -d
```

<br />

📄 Migrando os schemas para o banco e gerando a tipagem do Prisma

```
cp .env.example .env && bunx prisma migrate dev
```

<br />

🏃‍♀️ Rodando o projeto do backend

```
bun --env-file=.env dev
```

<br />

Pronto, com isso basta apenas rodar o projeto do Front-end! 

<br />

## 🎨 Stack

```
- Frameworks/packages
  | - Node.js
  | - Typescript
  | - TSX
  | - Fastify
  | - Prisma ORM
  \ - Zod

- Linting
  | - Biome.js (formatting / linting)
  \ - TSC (type checking) 

- Testing
  | - Vitest (unit & integration)
  \ - Supertest (integration & E2E)

- CI
  | - Lefthook (parecido com Husky)
  \ - Github Actions
```
