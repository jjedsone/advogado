// Tipos para o sistema de gerenciamento de atividades do advogado

export interface AtividadeJuridica {
  id: string;
  nome: string;
  descricao: string;
  categoria: string;
  icone?: string;
}

export interface ConfiguracaoAdvogado {
  nome: string;
  oab: string;
  email: string;
  telefone: string;
  endereco: string;
  atividadesSelecionadas: string[]; // IDs das atividades selecionadas
}

