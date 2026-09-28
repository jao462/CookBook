import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import {
  atualizarReceita,
  buscarReceitaPorId,
  buscarReceitas,
  criarReceita,
  excluirReceita
} from '../models/receitaModel';
import { buscarCategoriaPorId } from '../models/categoriaModel';

function idValido(id: string): boolean {
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuid.test(id);
}

function validarDados(body: any): string | null {
  const camposTexto = ['nome', 'descricao', 'ingredientes', 'modo_preparo'];

  for (const campo of camposTexto) {
    if (!body[campo] || typeof body[campo] !== 'string' || body[campo].trim().length < 2) {
      return `O campo ${campo} é obrigatório e deve possuir pelo menos 2 caracteres.`;
    }
  }

  if (typeof body.tempo_preparo !== 'number' || !Number.isInteger(body.tempo_preparo) || body.tempo_preparo <= 0) {
    return 'O campo tempo_preparo deve ser um número inteiro maior que zero.';
  }

  if (!body.categoria_id || typeof body.categoria_id !== 'string' || !idValido(body.categoria_id)) {
    return 'O campo categoria_id deve conter um UUID válido.';
  }

  return null;
}

export async function criar(req: Request, res: Response) {
  try {
    const erro = validarDados(req.body);
    if (erro) return res.status(400).json({ erro });

    const categoria = await buscarCategoriaPorId(req.body.categoria_id);
    if (categoria.error) {
      return res.status(500).json({ erro: 'Erro ao verificar a categoria.', detalhe: categoria.error.message });
    }
    if (!categoria.data) {
      return res.status(400).json({ erro: 'A categoria informada não existe.' });
    }

    const dados = {
      id: randomUUID(),
      nome: req.body.nome.trim(),
      descricao: req.body.descricao.trim(),
      ingredientes: req.body.ingredientes.trim(),
      modo_preparo: req.body.modo_preparo.trim(),
      tempo_preparo: req.body.tempo_preparo,
      categoria_id: req.body.categoria_id
    };

    const { data, error } = await criarReceita(dados);
    if (error) return res.status(500).json({ erro: 'Erro ao criar receita.', detalhe: error.message });

    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

export async function listar(req: Request, res: Response) {
  try {
    const { data, error } = await buscarReceitas();
    if (error) return res.status(500).json({ erro: 'Erro ao buscar receitas.', detalhe: error.message });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

export async function buscarPorId(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido. Informe um UUID válido.' });

    const { data, error } = await buscarReceitaPorId(id);
    if (error) return res.status(500).json({ erro: 'Erro ao buscar receita.', detalhe: error.message });
    if (!data) return res.status(404).json({ erro: 'Receita não encontrada.' });

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

    const categoria = await buscarCategoriaPorId(req.body.categoria_id);
    if (categoria.error) {
      return res.status(500).json({ erro: 'Erro ao verificar a categoria.', detalhe: categoria.error.message });
    }
    if (!categoria.data) {
      return res.status(400).json({ erro: 'A categoria informada não existe.' });
    }

    const dados = {
      nome: req.body.nome.trim(),
      descricao: req.body.descricao.trim(),
      ingredientes: req.body.ingredientes.trim(),
      modo_preparo: req.body.modo_preparo.trim(),
      tempo_preparo: req.body.tempo_preparo,
      categoria_id: req.body.categoria_id
    };

    const { data, error } = await atualizarReceita(id, dados);
    if (error) return res.status(500).json({ erro: 'Erro ao atualizar receita.', detalhe: error.message });
    if (!data) return res.status(404).json({ erro: 'Receita não encontrada.' });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}

export async function excluir(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (!idValido(id)) return res.status(400).json({ erro: 'ID inválido. Informe um UUID válido.' });

    const { data, error } = await excluirReceita(id);
    if (error) return res.status(500).json({ erro: 'Erro ao excluir receita.', detalhe: error.message });
    if (!data) return res.status(404).json({ erro: 'Receita não encontrada.' });

    return res.status(200).json({ mensagem: 'Receita excluída com sucesso.', receita: data });
  } catch (error) {
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}
