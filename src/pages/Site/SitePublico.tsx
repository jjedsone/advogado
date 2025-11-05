import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdvogado } from '../../context/AdvogadoContext';
import { atividadesJuridicas } from '../../data/atividadesJuridicas';
import ModalContato from '../../components/ModalContato';
import './SitePublico.css';

export default function SitePublico() {
  const { configuracao } = useAdvogado();
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const conhecaRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [modalAberto, setModalAberto] = useState(false);
  
  // Obter atividades selecionadas do contexto
  const atividadesSelecionadas = atividadesJuridicas.filter((atividade) =>
    configuracao.atividadesSelecionadas.includes(atividade.id)
  );

  useEffect(() => {
    const handleScroll = () => {
      try {
        setScrollY(window.scrollY);
        
        // Verificar seções visíveis para animações
        const sections = document.querySelectorAll('[data-section]');
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          const sectionId = section.getAttribute('data-section') || '';
          if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
            setVisibleSections((prev) => new Set([...prev, sectionId]));
          }
        });
      } catch (error) {
        // Ignorar erros de extensões do navegador
        console.debug('Erro de scroll ignorado:', error);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Chamar imediatamente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Usar atividades selecionadas ou padrão se não houver seleção
  const especialidades = atividadesSelecionadas.length > 0
    ? atividadesSelecionadas.map((atividade) => ({
        titulo: atividade.nome,
        descricao: atividade.descricao,
      }))
    : [
        {
          titulo: 'Advogado Civil',
          descricao: 'Atuamos na defesa de direitos em contratos, propriedade, indenizações, causas familiares e disputas judiciais.',
        },
        {
          titulo: 'Advogado de Família',
          descricao: 'Somos especialista em mediação e resolução de conflitos familiares, atuando em divórcios, guarda de filhos, pensão alimentícia e herança.',
        },
        {
          titulo: 'Advogado das Sucessões',
          descricao: 'Atuamos em planejamento e resolução de questões hereditárias, inventários, testamentos e divisão de bens familiares.',
        },
        {
          titulo: 'Advogado Trabalhista',
          descricao: 'Especialista na defesa dos direitos trabalhistas, auxiliando em causas de rescisão, salários, horas extras, assédio e benefícios.',
        },
        {
          titulo: 'Advogado Criminalista',
          descricao: 'Atuamos na defesa em processos criminais, atuando em investigações e acompanhamento em Delegacia, julgamentos e recursos.',
        },
        {
          titulo: 'Advogado INSS',
          descricao: 'Especialista em direitos previdenciários, atuando em aposentadorias, benefícios por incapacidade, revisões de benefício e pensões',
        },
      ];

  // Lista de especializações a partir das atividades selecionadas
  const listaEspecializacoes = atividadesSelecionadas.length > 0
    ? atividadesSelecionadas.map((atividade) => atividade.nome)
    : [
        'Direito Civil',
        'Direito de Família',
        'Divórcio',
        'Divórcio Internacional',
        'Divórcio por Procuração',
        'Separação',
        'Dissolução de União Estável',
        'Direito das Sucessões em Inventário',
        'Herança',
        'Imobiliário',
        'Contratos',
        'Condomínios',
        'Trabalhista',
        'Previdenciário',
      ];

  return (
    <div className="site-publico">
      {/* Header */}
      <header className="site-header" style={{ transform: `translateY(${Math.max(0, scrollY * 0.5)}px)` }}>
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-container">
                <span className="logo-santos">{configuracao.nome || 'Santos'}</span>
                <div className="logo-advocacia-box">
                  <span className="logo-advocacia">Advocacia</span>
                </div>
              </div>
              <p className="logo-subtitle">
                {configuracao.oab ? `OAB ${configuracao.oab}` : 'Advogados Especializados'}
              </p>
            </div>
            <nav className="main-nav">
              <a href="#quem-somos">Quem Somos</a>
              <a href="#o-que-fazemos" className="dropdown">
                O que fazemos <span className="arrow">▼</span>
              </a>
              <a href="#contato">Contato</a>
              <a href="#blog">Blog</a>
            </nav>
            <button 
              onClick={() => setModalAberto(true)}
              className="cta-header-btn"
              type="button"
            >
              <span className="chat-icon">💬</span>
              Fale com um Advogado
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="hero-section" 
        data-section="hero"
        style={{ 
          backgroundPosition: `center ${scrollY * 0.3}px`,
        }}
      >
        {/* Vídeo de Background */}
        <div className="hero-video-wrapper">
          <iframe
            className="hero-background-video"
            src="https://www.youtube.com/embed/ZRDUqLEEhcM?controls=0&rel=0&playsinline=1&autoplay=1&mute=1&loop=1&playlist=ZRDUqLEEhcM&enablejsapi=1&origin=https://jsantosadvocacia.com.br&widgetid=1&forigin=https://jsantosadvocacia.com.br/&aoriginsup=1&gporigin=https://www.bing.com/&vf=6"
            title="São Paulo do alto - Imagens aéreas feitas com o drone Mavic 2 Zoom"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          ></iframe>
          <div className="hero-video-overlay"></div>
        </div>
        <div className="hero-animated-bg"></div>
        <div className="container">
          <div className={`hero-content ${visibleSections.has('hero') ? 'visible' : ''}`}>
            <h1 className="hero-title">Advogados Especializados</h1>
            <div className={`especializacoes-list ${visibleSections.has('hero') ? 'visible' : ''}`}>
              {listaEspecializacoes.map((esp, index) => (
                <span key={index} className="especialidade-item">{esp}</span>
              ))}
            </div>
            <button 
              onClick={() => setModalAberto(true)}
              className="cta-hero-btn"
              type="button"
            >
              <span className="chat-icon">💬</span>
              Fale com um Advogado
            </button>
          </div>
        </div>
      </section>

      {/* Seção Conheça a Santos Advocacia */}
      <section 
        ref={conhecaRef}
        className="conheca-section" 
        data-section="conheca"
      >
        <div className="container">
          <div className={`conheca-content ${visibleSections.has('conheca') ? 'visible' : ''}`}>
            <div className="conheca-image">
              <div className="image-placeholder">
                <div className="professional-photo">
                  <div className="photo-person person-1"></div>
                  <div className="photo-person person-2"></div>
                  <div className="photo-person person-3"></div>
                </div>
              </div>
            </div>
            <div className="conheca-text">
              <h2>Conheça a Santos Advocacia</h2>
              <p className="intro-text">
                {configuracao.nome 
                  ? `Somos um Escritório de Advocacia modelo Boutique, com estrutura reduzida, 
                altamente tecnológica, soluções online e presenciais visando oferecer a melhor 
                experiência em serviços jurídicos virtual online e presencial.`
                  : `Somos um Escritório de Advocacia modelo Boutique, com estrutura reduzida, 
                altamente tecnológica, soluções online e presenciais visando oferecer a melhor 
                experiência em serviços jurídicos virtual online e presencial.`}
              </p>
              {configuracao.nome && (
                <p>
                  O escritório {configuracao.nome} Advocacia representa uma carteira diversificada 
                  de clientes nacionais e internacionais, dos mais diversos setores.
                </p>
              )}
              {atividadesSelecionadas.length > 0 && (
                <p>
                  Atuamos nas áreas de {atividadesSelecionadas.slice(0, 3).map(a => a.nome).join(', ')}
                  {atividadesSelecionadas.length > 3 ? ' e outras áreas especializadas.' : '.'}
                </p>
              )}
              {configuracao.endereco && (
                <p className="localizacao">
                  Atendemos em {configuracao.endereco}
                </p>
              )}
              {!configuracao.endereco && (
                <p className="localizacao">
                  Atendemos São Paulo Capital, Zona Sul SP, Zona Leste, Zona Norte, Zona Oeste, 
                  Centro, além da grande São Paulo.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades */}
      <section className="especialidades-section" data-section="especialidades">
        <div className="container">
          <h2 className={`section-title ${visibleSections.has('especialidades') ? 'visible' : ''}`}>
            Nossas Especialidades
          </h2>
          <div className="especialidades-grid">
            {especialidades.map((esp, index) => (
              <div 
                key={index} 
                className={`especialidade-card ${visibleSections.has('especialidades') ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3>{esp.titulo}</h3>
                <p>{esp.descricao}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seção sobre o advogado */}
      <section className="sobre-section" data-section="sobre">
        <div className="container">
          <div className={`sobre-content ${visibleSections.has('sobre') ? 'visible' : ''}`}>
            <h2>Esclareça suas dúvidas jurídicas</h2>
            <p>
              O "melhor advogado" de São Paulo não é aquele que se intitula como o melhor em 
              seus sites, mas sim aquele que entende as necessidades do cliente e, de forma 
              ética, resolve sua necessidade no menor tempo possível – assim não acredite em 
              auto declarações e sim em opiniões de clientes
            </p>
            <p>
              Fale agora com Advogados em São Paulo (SP). Agende para tirar dúvidas com 
              Advogado Especialista em São Paulo (SP)
            </p>
            <button 
              onClick={() => setModalAberto(true)}
              className="cta-section-btn"
              type="button"
            >
              Fale com um Advogado
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <p>© {new Date().getFullYear()} {configuracao.nome || 'Santos'} Advocacia. Todos os direitos reservados.</p>
              {configuracao.endereco ? (
                <p>{configuracao.endereco}</p>
              ) : (
                <p>Rua Rio Azul, 348 – Sala 1 – Morumbi, São Paulo – SP, 05519-120</p>
              )}
              {configuracao.telefone && (
                <p>Telefone: {configuracao.telefone}</p>
              )}
              {configuracao.email && (
                <p>E-mail: {configuracao.email}</p>
              )}
            </div>
            <div className="footer-links">
              <a href="#privacidade">Política de Privacidade</a>
              <a href="#termos">Termos de Uso</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Botão Flutuante WhatsApp */}
      {configuracao.telefone && (
        <a 
          href={`https://wa.me/${configuracao.telefone.replace(/\D/g, '')}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="whatsapp-float"
          style={{
            transform: `translateY(${-scrollY * 0.1}px)`,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="28" height="28">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
          </svg>
        </a>
      )}

      {/* Link para Admin */}
      <Link to="/admin" className="admin-link-float">
        ⚙️
      </Link>

      {/* Modal de Contato */}
      <ModalContato
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSuccess={() => {
          // Feedback de sucesso já é exibido no modal
        }}
      />
    </div>
  );
}
