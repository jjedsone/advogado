import { useState, useEffect } from 'react';
import type { ClienteFormulario } from '../../types';
import './ContatosPage.css';

const STORAGE_KEY = 'clientes-contato';

export default function ContatosPage() {
  const [contatos, setContatos] = useState<ClienteFormulario[]>([]);
  const [contatoSelecionado, setContatoSelecionado] = useState<ClienteFormulario | null>(null);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'novos' | 'lidos'>('todos');

  useEffect(() => {
    carregarContatos();
    // Recarregar a cada 5 segundos para ver novos contatos
    const interval = setInterval(carregarContatos, 5000);
    return () => clearInterval(interval);
  }, []);

  const carregarContatos = () => {
    try {
      const contatosSalvos = localStorage.getItem(STORAGE_KEY);
      if (contatosSalvos) {
        const contatosArray: ClienteFormulario[] = JSON.parse(contatosSalvos);
        // Ordenar por data mais recente primeiro
        contatosArray.sort((a, b) => 
          new Date(b.dataContato).getTime() - new Date(a.dataContato).getTime()
        );
        setContatos(contatosArray);
      }
    } catch (error) {
      console.error('Erro ao carregar contatos:', error);
    }
  };

  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    const hoje = new Date();
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);

    if (data.toDateString() === hoje.toDateString()) {
      return `Hoje às ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (data.toDateString() === ontem.toDateString()) {
      return `Ontem às ${data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const contatosFiltrados = contatos.filter((contato) => {
    const matchBusca = busca === '' || 
      contato.nome.toLowerCase().includes(busca.toLowerCase()) ||
      contato.telefone.includes(busca) ||
      contato.situacao.toLowerCase().includes(busca.toLowerCase());
    
    // Por enquanto, todos os contatos são considerados "novos" (não implementamos sistema de lidos ainda)
    const matchStatus = filtroStatus === 'todos' || filtroStatus === 'novos';
    
    return matchBusca && matchStatus;
  });

  const excluirContato = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este contato?')) {
      try {
        const novosContatos = contatos.filter((c) => c.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(novosContatos));
        carregarContatos();
        if (contatoSelecionado?.id === id) {
          setContatoSelecionado(null);
        }
      } catch (error) {
        console.error('Erro ao excluir contato:', error);
        alert('Erro ao excluir contato. Tente novamente.');
      }
    }
  };

  const abrirWhatsApp = (telefone: string) => {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    window.open(`https://wa.me/${telefoneLimpo}`, '_blank');
  };

  const abrirTelefone = (telefone: string) => {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    window.location.href = `tel:${telefoneLimpo}`;
  };

  return (
    <div className="contatos-page">
      <div className="contatos-header">
        <div className="contatos-header-top">
          <h2>Contatos e Agendamentos</h2>
          <div className="contatos-stats">
            <span className="stat-item">
              <strong>{contatos.length}</strong> total
            </span>
            <span className="stat-item">
              <strong>{contatosFiltrados.length}</strong> exibidos
            </span>
          </div>
        </div>

        <div className="contatos-filtros">
          <div className="busca-container">
            <input
              type="text"
              placeholder="Buscar por nome, telefone ou situação..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="busca-input"
            />
            <span className="busca-icon">🔍</span>
          </div>

          <div className="filtro-status">
            <button
              className={filtroStatus === 'todos' ? 'active' : ''}
              onClick={() => setFiltroStatus('todos')}
            >
              Todos
            </button>
            <button
              className={filtroStatus === 'novos' ? 'active' : ''}
              onClick={() => setFiltroStatus('novos')}
            >
              Novos
            </button>
            <button
              className={filtroStatus === 'lidos' ? 'active' : ''}
              onClick={() => setFiltroStatus('lidos')}
            >
              Lidos
            </button>
          </div>
        </div>
      </div>

      <div className="contatos-layout">
        <div className="contatos-lista">
          {contatosFiltrados.length === 0 ? (
            <div className="contatos-vazio">
              <p>📭</p>
              <p>Nenhum contato encontrado</p>
              {busca && <p className="contatos-vazio-hint">Tente ajustar os filtros de busca</p>}
            </div>
          ) : (
            contatosFiltrados.map((contato) => (
              <div
                key={contato.id}
                className={`contato-card ${contatoSelecionado?.id === contato.id ? 'selected' : ''}`}
                onClick={() => setContatoSelecionado(contato)}
              >
                <div className="contato-card-header">
                  <div className="contato-avatar">
                    {contato.nome.charAt(0).toUpperCase()}
                  </div>
                  <div className="contato-info-header">
                    <h3>{contato.nome}</h3>
                    <p className="contato-data">{formatarData(contato.dataContato)}</p>
                  </div>
                </div>
                <div className="contato-card-body">
                  <p className="contato-telefone">📞 {contato.telefone}</p>
                  <p className="contato-situacao-preview">
                    {contato.situacao.length > 100 
                      ? contato.situacao.substring(0, 100) + '...' 
                      : contato.situacao}
                  </p>
                </div>
                <div className="contato-badges">
                  <span className="badge">{contato.idade} anos</span>
                  <span className="badge">{contato.sexo}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="contato-detalhes">
          {contatoSelecionado ? (
            <div className="detalhes-content">
              <div className="detalhes-header">
                <div className="detalhes-avatar-large">
                  {contatoSelecionado.nome.charAt(0).toUpperCase()}
                </div>
                <div className="detalhes-titulo">
                  <h2>{contatoSelecionado.nome}</h2>
                  <p className="detalhes-data">{formatarData(contatoSelecionado.dataContato)}</p>
                </div>
                <button
                  className="btn-excluir"
                  onClick={() => excluirContato(contatoSelecionado.id)}
                  title="Excluir contato"
                >
                  🗑️
                </button>
              </div>

              <div className="detalhes-info">
                <div className="info-item">
                  <label>Telefone</label>
                  <div className="info-value-with-actions">
                    <span>{contatoSelecionado.telefone}</span>
                    <div className="info-actions">
                      <button
                        className="btn-action"
                        onClick={() => abrirTelefone(contatoSelecionado.telefone)}
                        title="Ligar"
                      >
                        📞
                      </button>
                      <button
                        className="btn-action"
                        onClick={() => abrirWhatsApp(contatoSelecionado.telefone)}
                        title="WhatsApp"
                      >
                        💬
                      </button>
                    </div>
                  </div>
                </div>

                <div className="info-item">
                  <label>Idade</label>
                  <span>{contatoSelecionado.idade} anos</span>
                </div>

                <div className="info-item">
                  <label>Sexo</label>
                  <span>
                    {contatoSelecionado.sexo === 'masculino' ? 'Masculino' :
                     contatoSelecionado.sexo === 'feminino' ? 'Feminino' : 'Outro'}
                  </span>
                </div>

                <div className="info-item full-width">
                  <label>Situação</label>
                  <div className="situacao-texto">{contatoSelecionado.situacao}</div>
                </div>
              </div>

              <div className="detalhes-actions">
                <button
                  className="btn-whatsapp"
                  onClick={() => abrirWhatsApp(contatoSelecionado.telefone)}
                >
                  💬 Enviar WhatsApp
                </button>
                <button
                  className="btn-ligar"
                  onClick={() => abrirTelefone(contatoSelecionado.telefone)}
                >
                  📞 Ligar Agora
                </button>
              </div>
            </div>
          ) : (
            <div className="detalhes-vazio">
              <p>👈</p>
              <p>Selecione um contato para ver os detalhes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

