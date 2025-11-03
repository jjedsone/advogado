import type { AtividadeJuridica } from '../types';

// Lista completa de atividades jurídicas disponíveis
export const atividadesJuridicas: AtividadeJuridica[] = [
  // Trabalhista
  {
    id: 'trabalhista',
    nome: 'Direito Trabalhista',
    descricao: 'Consultoria e representação em questões trabalhistas, rescisões, acordos coletivos e CLT',
    categoria: 'Trabalhista',
  },
  {
    id: 'trabalhista-rescisao',
    nome: 'Rescisão Trabalhista',
    descricao: 'Cálculo e negociação de rescisões contratuais',
    categoria: 'Trabalhista',
  },
  {
    id: 'trabalhista-clt',
    nome: 'Direitos CLT',
    descricao: 'Defesa de direitos previstos na Consolidação das Leis do Trabalho',
    categoria: 'Trabalhista',
  },

  // Civil
  {
    id: 'civil',
    nome: 'Direito Civil',
    descricao: 'Contratos, responsabilidade civil, obrigações e direitos patrimoniais',
    categoria: 'Civil',
  },
  {
    id: 'civil-contratos',
    nome: 'Contratos',
    descricao: 'Elaboração e revisão de contratos diversos',
    categoria: 'Civil',
  },
  {
    id: 'civil-familia',
    nome: 'Direito de Família',
    descricao: 'Divórcio, pensão alimentícia, guarda de filhos, inventário',
    categoria: 'Civil',
  },
  {
    id: 'civil-consumidor',
    nome: 'Direito do Consumidor',
    descricao: 'Defesa de direitos do consumidor, práticas abusivas',
    categoria: 'Civil',
  },

  // Criminal
  {
    id: 'criminal',
    nome: 'Direito Criminal',
    descricao: 'Defesa criminal, habeas corpus, recursos penais',
    categoria: 'Criminal',
  },
  {
    id: 'criminal-defesa',
    nome: 'Defesa Criminal',
    descricao: 'Defesa em processos criminais diversos',
    categoria: 'Criminal',
  },
  {
    id: 'criminal-tributario',
    nome: 'Crimes Tributários',
    descricao: 'Defesa em processos de crimes contra a ordem tributária',
    categoria: 'Criminal',
  },

  // Empresarial
  {
    id: 'empresarial',
    nome: 'Direito Empresarial',
    descricao: 'Sociedades, fusões, aquisições, recuperação judicial',
    categoria: 'Empresarial',
  },
  {
    id: 'empresarial-societario',
    nome: 'Direito Societário',
    descricao: 'Constituição e gestão de empresas, participações societárias',
    categoria: 'Empresarial',
  },
  {
    id: 'empresarial-falencia',
    nome: 'Recuperação e Falência',
    descricao: 'Processos de recuperação judicial e falência',
    categoria: 'Empresarial',
  },

  // Tributário
  {
    id: 'tributario',
    nome: 'Direito Tributário',
    descricao: 'Consultoria e defesa em questões fiscais e tributárias',
    categoria: 'Tributário',
  },
  {
    id: 'tributario-planejamento',
    nome: 'Planejamento Tributário',
    descricao: 'Otimização tributária e estruturação fiscal',
    categoria: 'Tributário',
  },

  // Previdenciário
  {
    id: 'previdenciario',
    nome: 'Direito Previdenciário',
    descricao: 'Aposentadoria, auxílio-doença, pensão por morte, INSS',
    categoria: 'Previdenciário',
  },
  {
    id: 'previdenciario-aposentadoria',
    nome: 'Aposentadoria',
    descricao: 'Planejamento e requerimento de aposentadoria',
    categoria: 'Previdenciário',
  },

  // Imobiliário
  {
    id: 'imobiliario',
    nome: 'Direito Imobiliário',
    descricao: 'Compra e venda, regularização de imóveis, usucapião',
    categoria: 'Imobiliário',
  },

  // Ambiental
  {
    id: 'ambiental',
    nome: 'Direito Ambiental',
    descricao: 'Licenciamento, compensação ambiental, crimes ambientais',
    categoria: 'Ambiental',
  },

  // Administrativo
  {
    id: 'administrativo',
    nome: 'Direito Administrativo',
    descricao: 'Licitações, concursos públicos, servidores públicos',
    categoria: 'Administrativo',
  },

  // Trabalhista Previdenciário
  {
    id: 'trabalhista-previdenciario',
    nome: 'Trabalhista Previdenciário',
    descricao: 'Questões que envolvem trabalho e previdência',
    categoria: 'Trabalhista',
  },
];

export const categoriasAtividades = [
  'Trabalhista',
  'Civil',
  'Criminal',
  'Empresarial',
  'Tributário',
  'Previdenciário',
  'Imobiliário',
  'Ambiental',
  'Administrativo',
];

