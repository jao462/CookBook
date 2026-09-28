import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import {
  atualizarCategoria,
  buscarCategoriaPorId,
  buscarCategorias,
  criarCategoria,
  excluirCategoria
} from '../models/categoriaModel';

function idValido(id: string): boolean {
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuid.test(id);
}

function validarDados(body: any): string | null {
  if (!body.nome || typeof body.nome !== 'string' || body.nome.trim().length < 2) {
    return 'O campo nome é obrigatório e deve possuir pelo menos 2 caracteres.';
  }
  if (body.descricao !== undefined && typeof body.descricao !== 'string') {
    return 'O campo descricao deve ser um texto.';
  }
  return null;
}

export async function criar(req: Request, res: Response) {
  try {
    const erro = validarDados(req.body);
    if (erro) return res.status(400).json({ erro });

    const dados = {
      id: randomUUID(),
      nome: req.body.nome.trim(),
      descricao: req.body.descricao?.trim() || null
    };

    const { data, error } = await criarCategoria(dados);
    if (error) return res.status(500).json({ erro: 'Erro ao criar categoria.', detalhe: error.message });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

export async function listar(req: Request, res: Response) {
  try {
    const { data, error } = await buscarCategorias();
    if (error) return res.status(500).json({ erro: 'Erro ao buscar categorias.', detalhe: error.message });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

export async function buscarPorId(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido. Informe um UUID válido.' });

    const { data, error } = await buscarCategoriaPorId(id);
    if (error) return res.status(500).json({ erro: 'Erro ao buscar categoria.', detalhe: error.message });
    if (!data) return res.status(404).json({ erro: 'Categoria não encontrada.' });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

export async function atualizar(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido. Informe um UUID válido.' });

    const erro = validarDados(req.body);
    if (erro) return res.status(400).json({ erro });

    const dados = {
      nome: req.body.nome.trim(),
      descricao: req.body.descricao?.trim() || null
    };

    const { data, error } = await atualizarCategoria(id, dados);
    if (error) return res.status(500).json({ erro: 'Erro ao atualizar categoria.', detalhe: error.message });
    if (!data) return res.status(404).json({ erro: 'Categoria não encontrada.' });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

export async function excluir(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido. Informe um UUID válido.' });

    const { data, error } = await excluirCategoria(id);
    if (error) {
      if (error.code === '23503') {
        return res.status(409).json({ erro: 'Não é possível excluir esta categoria porque existem receitas relacionadas a ela.' });
      }
      return res.status(500).json({ erro: 'Erro ao excluir categoria.', detalhe: error.message });
    }
    if (!data) return res.status(404).json({ erro: 'Categoria não encontrada.' });

    return res.status(200).json({ mensagem: 'Categoria excluída com sucesso.', categoria: data });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}
