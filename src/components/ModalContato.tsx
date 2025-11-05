import { useState, useEffect } from 'react';
import type { ClienteFormulario } from '../types';
import './ModalContato.css';

interface ModalContatoProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const STORAGE_KEY = 'clientes-contato';

export default function ModalContato({ isOpen, onClose, onSuccess }: ModalContatoProps) {
  const [formData, setFormData] = useState<Omit<ClienteFormulario, 'id' | 'dataContato'>>({
    nome: '',
    telefone: '',
    sexo: '',
    idade: '',
    situacao: '',
  });

  const [erros, setErros] = useState<Record<string, string>>({});
  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Limpar formulário quando fechar
      setFormData({
        nome: '',
        telefone: '',
        sexo: '',
        idade: '',
        situacao: '',
      });
      setErros({});
      setMensagemSucesso('');
      setMensagemErro('');
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validarTelefone = (telefone: string): string => {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (!telefoneLimpo || telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      return 'Telefone inválido. Use (00) 00000-0000 ou (00) 0000-0000';
    }
    return '';
  };

  const verificarDuplicado = (telefone: string): boolean => {
    try {
      const clientesSalvos = localStorage.getItem(STORAGE_KEY);
      if (!clientesSalvos) return false;

      const clientes: ClienteFormulario[] = JSON.parse(clientesSalvos);
      const telefoneLimpo = telefone.replace(/\D/g, '');
      
      return clientes.some((cliente) => {
        const clienteTelefoneLimpo = cliente.telefone.replace(/\D/g, '');
        return clienteTelefoneLimpo === telefoneLimpo;
      });
    } catch (error) {
      console.error('Erro ao verificar duplicado:', error);
      return false;
    }
  };

  const handleChange = (campo: string, valor: string | number) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
    
    // Limpar erro do campo quando começar a digitar
    if (erros[campo]) {
      setErros((prev) => {
        const novos = { ...prev };
        delete novos[campo];
        return novos;
      });
    }

    setMensagemErro('');
  };

  const validarFormulario = (): boolean => {
    const novosErros: Record<string, string> = {};

    if (!formData.nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 3) {
      novosErros.nome = 'Nome deve ter pelo menos 3 caracteres';
    }

    if (!formData.telefone.trim()) {
      novosErros.telefone = 'Telefone é obrigatório';
    } else {
      const erroTelefone = validarTelefone(formData.telefone);
      if (erroTelefone) {
        novosErros.telefone = erroTelefone;
      }
    }

    if (!formData.sexo) {
      novosErros.sexo = 'Selecione o sexo';
    }

    if (formData.idade === '' || formData.idade === null || formData.idade === undefined || (typeof formData.idade === 'number' && formData.idade === 0)) {
      novosErros.idade = 'Idade é obrigatória';
    } else {
      const idadeNum = typeof formData.idade === 'number' ? formData.idade : Number(formData.idade);
      if (isNaN(idadeNum) || idadeNum < 1 || idadeNum > 120) {
        novosErros.idade = 'Idade inválida (entre 1 e 120 anos)';
      }
    }

    if (!formData.situacao.trim()) {
      novosErros.situacao = 'Descreva sua situação';
    } else if (formData.situacao.trim().length < 10) {
      novosErros.situacao = 'Descreva sua situação com pelo menos 10 caracteres';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagemErro('');
    setMensagemSucesso('');

    if (!validarFormulario()) {
      return;
    }

    // Verificar duplicado
    if (verificarDuplicado(formData.telefone)) {
      setMensagemErro('Este telefone já está cadastrado. Verifique se você já enviou um contato anteriormente.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Criar objeto do cliente
      const novoCliente: ClienteFormulario = {
        id: Date.now().toString(),
        ...formData,
        idade: Number(formData.idade),
        dataContato: new Date().toISOString(),
      };

      // Salvar no localStorage
      const clientesSalvos = localStorage.getItem(STORAGE_KEY);
      const clientes: ClienteFormulario[] = clientesSalvos 
        ? JSON.parse(clientesSalvos) 
        : [];

      clientes.push(novoCliente);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));

      setMensagemSucesso('Contato enviado com sucesso! Entraremos em contato em breve.');
      
      // Limpar formulário após 2 segundos
      setTimeout(() => {
        setFormData({
          nome: '',
          telefone: '',
          sexo: '',
          idade: '',
          situacao: '',
        });
        setIsSubmitting(false);
        onSuccess();
        setTimeout(() => {
          onClose();
        }, 1500);
      }, 2000);

    } catch (error) {
      console.error('Erro ao salvar contato:', error);
      setMensagemErro('Erro ao enviar contato. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const formatarTelefone = (valor: string) => {
    const apenasNumeros = valor.replace(/\D/g, '');
    if (apenasNumeros.length <= 10) {
      return apenasNumeros.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    } else {
      return apenasNumeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        <div className="modal-header">
          <h2>Fale com um Advogado</h2>
          <p>Preencha seus dados e descreva sua situação</p>
        </div>

        {mensagemSucesso && (
          <div className="mensagem-sucesso-modal">
            {mensagemSucesso}
          </div>
        )}

        {mensagemErro && (
          <div className="mensagem-erro-modal">
            {mensagemErro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group-modal">
            <label htmlFor="nome">Nome Completo *</label>
            <input
              type="text"
              id="nome"
              value={formData.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Seu nome completo"
              className={erros.nome ? 'erro' : ''}
              disabled={isSubmitting}
            />
            {erros.nome && <span className="mensagem-erro-campo">{erros.nome}</span>}
          </div>

          <div className="form-group-modal">
            <label htmlFor="telefone">Telefone *</label>
            <input
              type="tel"
              id="telefone"
              value={formData.telefone}
              onChange={(e) => handleChange('telefone', formatarTelefone(e.target.value))}
              placeholder="(00) 00000-0000"
              className={erros.telefone ? 'erro' : ''}
              maxLength={15}
              disabled={isSubmitting}
            />
            {erros.telefone && <span className="mensagem-erro-campo">{erros.telefone}</span>}
          </div>

          <div className="form-row-modal">
            <div className="form-group-modal">
              <label htmlFor="sexo">Sexo *</label>
              <select
                id="sexo"
                value={formData.sexo}
                onChange={(e) => handleChange('sexo', e.target.value)}
                className={erros.sexo ? 'erro' : ''}
                disabled={isSubmitting}
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
              </select>
              {erros.sexo && <span className="mensagem-erro-campo">{erros.sexo}</span>}
            </div>

            <div className="form-group-modal">
              <label htmlFor="idade">Idade *</label>
              <input
                type="number"
                id="idade"
                value={formData.idade}
                onChange={(e) => handleChange('idade', e.target.value ? Number(e.target.value) : '')}
                placeholder="Ex: 30"
                min="1"
                max="120"
                className={erros.idade ? 'erro' : ''}
                disabled={isSubmitting}
              />
              {erros.idade && <span className="mensagem-erro-campo">{erros.idade}</span>}
            </div>
          </div>

          <div className="form-group-modal">
            <label htmlFor="situacao">Descreva sua situação *</label>
            <textarea
              id="situacao"
              value={formData.situacao}
              onChange={(e) => handleChange('situacao', e.target.value)}
              placeholder="Descreva brevemente sua situação jurídica..."
              rows={5}
              className={erros.situacao ? 'erro' : ''}
              disabled={isSubmitting}
            />
            {erros.situacao && <span className="mensagem-erro-campo">{erros.situacao}</span>}
          </div>

          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancelar"
              disabled={isSubmitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-enviar"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Contato'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

