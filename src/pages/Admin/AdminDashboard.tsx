import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdvogado } from '../../context/AdvogadoContext';
import { atividadesJuridicas, categoriasAtividades } from '../../data/atividadesJuridicas';
import ContatosPage from './ContatosPage';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { configuracao, atualizarConfiguracao, toggleAtividade } = useAdvogado();
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
  const [mensagemSucesso, setMensagemSucesso] = useState<string>('');
  const [erros, setErros] = useState<Record<string, string>>({});
  const [abaAtiva, setAbaAtiva] = useState<'configuracoes' | 'contatos'>('configuracoes');

  const atividadesFiltradas =
    categoriaFiltro === 'Todas'
      ? atividadesJuridicas
      : atividadesJuridicas.filter((atividade) => atividade.categoria === categoriaFiltro);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin/login');
  };

  const validarCampo = (campo: string, valor: string): string => {
    switch (campo) {
      case 'email':
        if (valor && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
          return 'E-mail inválido';
        }
        break;
      case 'telefone':
        if (valor && !/^[\d\s\(\)\-\+]+$/.test(valor)) {
          return 'Telefone inválido';
        }
        break;
      case 'oab':
        if (valor && !/^OAB\/[A-Z]{2}\s\d+$/.test(valor)) {
          return 'Formato OAB inválido. Use: OAB/SP 123456';
        }
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (campo: string, valor: string) => {
    const erro = validarCampo(campo, valor);
    setErros((prev) => ({ ...prev, [campo]: erro }));
    
    if (!erro) {
      setMensagemSucesso('');
      atualizarConfiguracao({ [campo]: valor });
      
      // Mostrar mensagem de sucesso após salvar
      if (campo === 'nome' || campo === 'oab' || campo === 'email' || campo === 'telefone' || campo === 'endereco') {
        setMensagemSucesso('Informações salvas com sucesso!');
        setTimeout(() => setMensagemSucesso(''), 3000);
      }
    }
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <div>
            <h1>Painel Administrativo</h1>
            <p>Configure suas informações e atividades profissionais</p>
          </div>
          <div className="admin-header-actions">
            <a href="/" target="_blank" rel="noopener noreferrer" className="view-site-btn">
              Ver Site
            </a>
            <button onClick={handleLogout} className="logout-btn">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="admin-tabs">
        <button
          className={abaAtiva === 'configuracoes' ? 'active' : ''}
          onClick={() => setAbaAtiva('configuracoes')}
        >
          ⚙️ Configurações
        </button>
        <button
          className={abaAtiva === 'contatos' ? 'active' : ''}
          onClick={() => setAbaAtiva('contatos')}
        >
          💬 Contatos e Agendamentos
        </button>
      </div>

      <div className="admin-content">
        {abaAtiva === 'contatos' ? (
          <ContatosPage />
        ) : (
          <>
            {mensagemSucesso && (
              <div className="mensagem-sucesso">
                {mensagemSucesso}
              </div>
            )}
            
            {/* Seção de Informações Pessoais */}
        <section className="admin-section">
          <h2>Informações Profissionais</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nome">Nome Completo</label>
              <input
                type="text"
                id="nome"
                value={configuracao.nome}
                onChange={(e) => handleChange('nome', e.target.value)}
                placeholder="Seu nome completo"
                className={erros.nome ? 'erro' : ''}
              />
              {erros.nome && <span className="mensagem-erro">{erros.nome}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="oab">OAB</label>
              <input
                type="text"
                id="oab"
                value={configuracao.oab}
                onChange={(e) => handleChange('oab', e.target.value)}
                placeholder="Ex: OAB/SP 123456"
                className={erros.oab ? 'erro' : ''}
              />
              {erros.oab && <span className="mensagem-erro">{erros.oab}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={configuracao.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="seu@email.com"
                className={erros.email ? 'erro' : ''}
              />
              {erros.email && <span className="mensagem-erro">{erros.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                value={configuracao.telefone}
                onChange={(e) => handleChange('telefone', e.target.value)}
                placeholder="(00) 00000-0000"
                className={erros.telefone ? 'erro' : ''}
              />
              {erros.telefone && <span className="mensagem-erro">{erros.telefone}</span>}
            </div>

            <div className="form-group full-width">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                id="endereco"
                value={configuracao.endereco}
                onChange={(e) => handleChange('endereco', e.target.value)}
                placeholder="Endereço completo do escritório"
                className={erros.endereco ? 'erro' : ''}
              />
              {erros.endereco && <span className="mensagem-erro">{erros.endereco}</span>}
            </div>
          </div>
        </section>

        {/* Seção de Atividades */}
        <section className="admin-section">
          <h2>Atividades Profissionais</h2>
          <p className="section-description">
            Selecione as áreas do direito que você atua para exibir no seu site
          </p>

          {/* Filtro por categoria */}
          <div className="categoria-filtro">
            <button
              className={categoriaFiltro === 'Todas' ? 'active' : ''}
              onClick={() => setCategoriaFiltro('Todas')}
            >
              Todas
            </button>
            {categoriasAtividades.map((categoria) => (
              <button
                key={categoria}
                className={categoriaFiltro === categoria ? 'active' : ''}
                onClick={() => setCategoriaFiltro(categoria)}
              >
                {categoria}
              </button>
            ))}
          </div>

          {/* Lista de atividades */}
          <div className="atividades-grid">
            {atividadesFiltradas.map((atividade) => {
              const isSelected = configuracao.atividadesSelecionadas.includes(atividade.id);
              return (
                <div
                  key={atividade.id}
                  className={`atividade-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleAtividade(atividade.id)}
                >
                  <div className="atividade-header">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleAtividade(atividade.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <h3>{atividade.nome}</h3>
                  </div>
                  <p className="atividade-categoria">{atividade.categoria}</p>
                  <p className="atividade-descricao">{atividade.descricao}</p>
                </div>
              );
            })}
          </div>

          {/* Estatísticas */}
          <div className="atividades-stats">
            <p>
              <strong>{configuracao.atividadesSelecionadas.length}</strong> atividade(s)
              selecionada(s) de <strong>{atividadesJuridicas.length}</strong> disponíveis
            </p>
          </div>
        </section>
          </>
        )}
      </div>
    </div>
  );
}

