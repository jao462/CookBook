import { supabase } from '../database/supabase';

export interface ReceitaInput {
  nome: string;
  descricao: string;
  ingredientes: string;
  modo_preparo: string;
  tempo_preparo: number;
  categoria_id: string;
}

export async function criarReceita(dados: ReceitaInput) {
  return await supabase
    .from('receitas')
    .insert([dados])
    .select('*, categorias(*)')
    .single();
}

export async function buscarReceitas() {
  return await supabase
    .from('receitas')
    .select('*, categorias(*)')
    .order('nome');
}

export async function buscarReceitaPorId(id: string) {
  return await supabase
    .from('receitas')
    .select('*, categorias(*)')
    .eq('id', id)
    .maybeSingle();
}

export async function atualizarReceita(id: string, dados: ReceitaInput) {
  return await supabase
    .from('receitas')
    .update(dados)
    .eq('id', id)
    .select('*, categorias(*)')
    .maybeSingle();
}

export async function excluirReceita(id: string) {
  return await supabase
    .from('receitas')
    .delete()
    .eq('id', id)
    .select()
    .maybeSingle();
}
