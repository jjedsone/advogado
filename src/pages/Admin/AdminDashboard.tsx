import { useState } from 'react';
import { useAdvogado } from '../../context/AdvogadoContext';
import { atividadesJuridicas, categoriasAtividades } from '../../data/atividadesJuridicas';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const { configuracao, atualizarConfiguracao, toggleAtividade } = useAdvogado();
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');

  const atividadesFiltradas =
    categoriaFiltro === 'Todas'
      ? atividadesJuridicas
      : atividadesJuridicas.filter((atividade) => atividade.categoria === categoriaFiltro);

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Painel Administrativo</h1>
        <p>Configure suas informações e atividades profissionais</p>
      </header>

      <div className="admin-content">
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
                onChange={(e) => atualizarConfiguracao({ nome: e.target.value })}
                placeholder="Seu nome completo"
              />
            </div>

            <div className="form-group">
              <label htmlFor="oab">OAB</label>
              <input
                type="text"
                id="oab"
                value={configuracao.oab}
                onChange={(e) => atualizarConfiguracao({ oab: e.target.value })}
                placeholder="Ex: OAB/SP 123456"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={configuracao.email}
                onChange={(e) => atualizarConfiguracao({ email: e.target.value })}
                placeholder="seu@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                value={configuracao.telefone}
                onChange={(e) => atualizarConfiguracao({ telefone: e.target.value })}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="endereco">Endereço</label>
              <input
                type="text"
                id="endereco"
                value={configuracao.endereco}
                onChange={(e) => atualizarConfiguracao({ endereco: e.target.value })}
                placeholder="Endereço completo do escritório"
              />
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
      </div>
    </div>
  );
}

