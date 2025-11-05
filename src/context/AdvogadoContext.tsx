import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { ConfiguracaoAdvogado } from '../types';

interface AdvogadoContextType {
  configuracao: ConfiguracaoAdvogado;
  atualizarConfiguracao: (novaConfig: Partial<ConfiguracaoAdvogado>) => void;
  toggleAtividade: (atividadeId: string) => void;
}

const AdvogadoContext = createContext<AdvogadoContextType | undefined>(undefined);

const CONFIG_STORAGE_KEY = 'advogado-config';

const configuracaoInicial: ConfiguracaoAdvogado = {
  nome: '',
  oab: '',
  email: '',
  telefone: '',
  endereco: '',
  atividadesSelecionadas: [],
};

export function AdvogadoProvider({ children }: { children: ReactNode }) {
  const [configuracao, setConfiguracao] = useState<ConfiguracaoAdvogado>(() => {
    try {
      const saved = localStorage.getItem(CONFIG_STORAGE_KEY);
      return saved ? JSON.parse(saved) : configuracaoInicial;
    } catch (error) {
      console.error('Erro ao carregar configuração do localStorage:', error);
      return configuracaoInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(configuracao));
    } catch (error) {
      console.error('Erro ao salvar configuração no localStorage:', error);
    }
  }, [configuracao]);

  const atualizarConfiguracao = (novaConfig: Partial<ConfiguracaoAdvogado>) => {
    setConfiguracao((prev) => ({ ...prev, ...novaConfig }));
  };

  const toggleAtividade = (atividadeId: string) => {
    setConfiguracao((prev) => {
      const atividades = prev.atividadesSelecionadas.includes(atividadeId)
        ? prev.atividadesSelecionadas.filter((id) => id !== atividadeId)
        : [...prev.atividadesSelecionadas, atividadeId];
      return { ...prev, atividadesSelecionadas: atividades };
    });
  };

  return (
    <AdvogadoContext.Provider
      value={{
        configuracao,
        atualizarConfiguracao,
        toggleAtividade,
      }}
    >
      {children}
    </AdvogadoContext.Provider>
  );
}

export function useAdvogado() {
  const context = useContext(AdvogadoContext);
  if (context === undefined) {
    throw new Error('useAdvogado deve ser usado dentro de AdvogadoProvider');
  }
  return context;
}

