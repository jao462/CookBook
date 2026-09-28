# CookBook API

API REST de receitas culinárias desenvolvida para projeto acadêmico utilizando Node.js, TypeScript, Express e Supabase/PostgreSQL.

## Tecnologias

- Node.js
- TypeScript
- Express
- Supabase/PostgreSQL
- Git/GitHub

## Entidades

### Categoria
- id (UUID)
- nome
- descricao

### Receita
- id (UUID)
- nome
- descricao
- ingredientes
- modo_preparo
- tempo_preparo
- categoria_id (FK para categorias)

Relacionamento: uma categoria pode possuir várias receitas. Cada receita pertence a uma categoria.

## Instalação

1. Instale o Node.js.
2. Abra a pasta do projeto no VS Code.
3. No terminal, execute:

```bash
npm install
```

4. Crie um projeto no Supabase.
5. Abra o SQL Editor do Supabase e execute o conteúdo do arquivo `database.sql`.
6. Crie um arquivo chamado `.env` na raiz, usando `.env.example` como modelo.
7. Preencha `SUPABASE_URL`, `SUPABASE_KEY` e `PORT`.
8. Execute:

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000`.

## Rotas

### Categorias

- POST `/categorias`
- GET `/categorias`
- GET `/categorias/:id`
- PUT `/categorias/:id`
- DELETE `/categorias/:id`

### Receitas

- POST `/receitas`
- GET `/receitas`
- GET `/receitas/:id`
- PUT `/receitas/:id`
- DELETE `/receitas/:id`

## Exemplo - criar categoria

POST `/categorias`

```json
{
  "nome": "Massas",
  "descricao": "Receitas de massas e macarrão."
}
```

## Exemplo - criar receita

POST `/receitas`

```json
{
  "nome": "Macarrão ao molho de tomate",
  "descricao": "Uma receita simples de macarrão.",
  "ingredientes": "Macarrão, tomate, cebola, alho e sal.",
  "modo_preparo": "Cozinhe o macarrão. Prepare o molho e misture.",
  "tempo_preparo": 30,
  "categoria_id": "UUID_DA_CATEGORIA"
}
```

## Códigos HTTP utilizados

- 200: operação realizada com sucesso
- 201: registro criado
- 400: dados inválidos
- 404: registro não encontrado
- 409: conflito, quando uma categoria possui receitas e não pode ser excluída
- 500: erro interno/erro de banco

## Git

O arquivo `.env` está no `.gitignore` e não deve ser enviado para o GitHub.

Comandos básicos:

```bash
git init
git add .
git commit -m "Projeto inicial da API CookBook"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```
