# 🧩 CRUD de usuários com Mongoose

> CRUD completo de usuários com **Express + Mongoose + MongoDB** e front-end **Next.js** com telas de cadastro, atualização e listagem.

![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)

## O que tem aqui

- **`back-end/`**: API com `models/usuario.js` (campos `nome`, `email` único, `senha`, com *timestamps*).
- **`front-end/`**: Next.js com as páginas `cadastrar`, `atualizar` e `banco`, e um fundo com gradiente (`shederGradient.jsx`).

## Rotas (porta 3001)

| Método | Rota | Função |
|---|---|---|
| `POST` | `/usuarios` | cria |
| `GET` | `/usuarios` | lista |
| `GET` | `/usuarios/:email` | busca por e-mail |
| `PATCH` | `/usuarios/:id` | atualiza |
| `DELETE` | `/usuarios/:id` | remove |

## Como rodar

```bash
git clone https://github.com/joseaugustodearaujoaraujo1-lgtm/Crud1-noSql.git
cd Crud1-noSql/back-end
npm install
# crie .env com MONGODB_URL=<sua conexão>
node server.js

# em outro terminal
cd ../front-end
npm install
npm run dev
```

## Observações

- Projeto de estudo: a senha ainda não passa por hash e as rotas não têm autenticação.
