# Exemplos para testar no Postman/Insomnia

Base URL: http://localhost:3000

## 1. Criar categoria

POST /categorias
Content-Type: application/json

```json
{
  "nome": "Massas",
  "descricao": "Receitas de massas e macarrão."
}
```

Guarde o `id` retornado.

## 2. Listar categorias

GET /categorias

## 3. Buscar categoria por ID

GET /categorias/ID_DA_CATEGORIA

## 4. Atualizar categoria

PUT /categorias/ID_DA_CATEGORIA
Content-Type: application/json

```json
{
  "nome": "Massas Italianas",
  "descricao": "Receitas de massas inspiradas na culinária italiana."
}
```

## 5. Criar receita

POST /receitas
Content-Type: application/json

```json
{
  "nome": "Macarrão ao molho de tomate",
  "descricao": "Macarrão simples e rápido.",
  "ingredientes": "500g de macarrão, 2 tomates, 1 cebola, alho e sal.",
  "modo_preparo": "Cozinhe o macarrão. Prepare o molho e misture tudo.",
  "tempo_preparo": 30,
  "categoria_id": "ID_DA_CATEGORIA"
}
```

## 6. Listar receitas

GET /receitas

## 7. Buscar receita por ID

GET /receitas/ID_DA_RECEITA

## 8. Atualizar receita

PUT /receitas/ID_DA_RECEITA
Content-Type: application/json

```json
{
  "nome": "Macarrão ao molho de tomate especial",
  "descricao": "Receita simples com molho caseiro.",
  "ingredientes": "500g de macarrão, tomates, cebola, alho, sal e azeite.",
  "modo_preparo": "Cozinhe o macarrão, faça o molho e misture.",
  "tempo_preparo": 35,
  "categoria_id": "ID_DA_CATEGORIA"
}
```

## 9. Excluir receita

DELETE /receitas/ID_DA_RECEITA

## 10. Excluir categoria

DELETE /categorias/ID_DA_CATEGORIA

Uma categoria que possui receitas não será excluída. A API retorna HTTP 409 para preservar a integridade do relacionamento.
