-- Banco de dados do projeto CookBook
-- Execute este script no SQL Editor do Supabase.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

CREATE TABLE IF NOT EXISTS receitas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    ingredientes TEXT NOT NULL,
    modo_preparo TEXT NOT NULL,
    tempo_preparo INTEGER NOT NULL CHECK (tempo_preparo > 0),
    categoria_id UUID NOT NULL,
    CONSTRAINT fk_receita_categoria
        FOREIGN KEY (categoria_id)
        REFERENCES categorias(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- Dados iniciais para testar a API.
INSERT INTO categorias (nome, descricao)
SELECT 'Massas', 'Receitas de massas e macarrão.'
WHERE NOT EXISTS (SELECT 1 FROM categorias WHERE nome = 'Massas');

INSERT INTO categorias (nome, descricao)
SELECT 'Sobremesas', 'Receitas doces e sobremesas.'
WHERE NOT EXISTS (SELECT 1 FROM categorias WHERE nome = 'Sobremesas');

-- Depois de criar as categorias, você pode criar receitas pela API.
