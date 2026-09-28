import { supabase } from '../database/supabase';

export interface CategoriaInput {
  nome: string;
  descricao?: string;
}

export async function criarCategoria(dados: CategoriaInput) {
  return await supabase
    .from('categorias')
    .insert([dados])
    .select()
    .single();
}

export async function buscarCategorias() {
  return await supabase
    .from('categorias')
    .select('*')
    .order('nome');
}

export async function buscarCategoriaPorId(id: string) {
  return await supabase
    .from('categorias')
    .select('*')
    .eq('id', id)
    .maybeSingle();
}

export async function atualizarCategoria(id: string, dados: CategoriaInput) {
  return await supabase
    .from('categorias')
    .update(dados)
    .eq('id', id)
    .select()
    .maybeSingle();
}

export async function excluirCategoria(id: string) {
  return await supabase
    .from('categorias')
    .delete()
    .eq('id', id)
    .select()
    .maybeSingle();
}
