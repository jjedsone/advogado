# Site de Advogado - Sistema de Gerenciamento de Atividades

Sistema completo para criação e gerenciamento de sites para advogados, permitindo que o advogado configure suas atividades profissionais através de um painel administrativo.

## 🚀 Funcionalidades

- **Painel Administrativo**: Configure suas informações pessoais e profissionais
- **Gerenciamento de Atividades**: Selecione entre mais de 20 atividades jurídicas disponíveis
- **Site Público**: Exiba automaticamente suas atividades no site
- **Persistência de Dados**: Todas as configurações são salvas no navegador (localStorage)
- **Interface Moderna**: Design responsivo e moderno

## 📋 Áreas de Atuação Disponíveis

O sistema inclui atividades nas seguintes categorias:

- **Trabalhista**: Direito Trabalhista, Rescisão Trabalhista, Direitos CLT
- **Civil**: Direito Civil, Contratos, Direito de Família, Direito do Consumidor
- **Criminal**: Direito Criminal, Defesa Criminal, Crimes Tributários
- **Empresarial**: Direito Empresarial, Direito Societário, Recuperação e Falência
- **Tributário**: Direito Tributário, Planejamento Tributário
- **Previdenciário**: Direito Previdenciário, Aposentadoria
- **Imobiliário**: Direito Imobiliário
- **Ambiental**: Direito Ambiental
- **Administrativo**: Direito Administrativo

## 🛠️ Como Usar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar o Projeto

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

### 3. Configurar seu Perfil

1. Acesse o painel administrativo em `/admin`
2. Preencha suas informações profissionais:
   - Nome completo
   - OAB (número da Ordem)
   - E-mail
   - Telefone
   - Endereço do escritório

3. Selecione suas áreas de atuação:
   - Use os filtros por categoria para facilitar a busca
   - Clique nas atividades para selecioná-las
   - As atividades selecionadas aparecerão destacadas

### 4. Visualizar seu Site

1. Acesse a página inicial (`/`) para ver seu site público
2. Todas as informações e atividades configuradas serão exibidas automaticamente
3. Você pode alternar entre o site público e o painel administrativo a qualquer momento

## 📁 Estrutura do Projeto

```
src/
├── context/
│   └── AdvogadoContext.tsx    # Gerenciamento de estado global
├── data/
│   └── atividadesJuridicas.ts # Lista completa de atividades
├── pages/
│   ├── Admin/
│   │   ├── AdminDashboard.tsx # Painel administrativo
│   │   └── AdminDashboard.css
│   └── Site/
│       ├── SitePublico.tsx    # Site público
│       └── SitePublico.css
├── types/
│   └── index.ts               # Tipos TypeScript
├── App.tsx                    # Configuração de rotas
└── main.tsx                   # Ponto de entrada
```

## 🎨 Personalização

### Adicionar Novas Atividades

Edite o arquivo `src/data/atividadesJuridicas.ts` e adicione novas atividades ao array:

```typescript
{
  id: 'nova-atividade',
  nome: 'Nova Atividade',
  descricao: 'Descrição da nova atividade',
  categoria: 'Categoria',
}
```

### Modificar Estilos

- **Site Público**: Edite `src/pages/Site/SitePublico.css`
- **Painel Admin**: Edite `src/pages/Admin/AdminDashboard.css`
- **Estilos Globais**: Edite `src/index.css`

## 💾 Armazenamento

Os dados são salvos automaticamente no `localStorage` do navegador. Isso significa:

- ✅ Configurações persistem entre sessões
- ✅ Não requer backend ou banco de dados
- ⚠️ Dados são específicos do navegador/dispositivo

## 🔧 Tecnologias Utilizadas

- **React 19** - Biblioteca JavaScript para interfaces
- **TypeScript** - Tipagem estática
- **React Router** - Navegação entre páginas
- **Vite** - Build tool e dev server
- **CSS3** - Estilização moderna com gradientes e animações

## 📱 Responsividade

O site é totalmente responsivo e funciona perfeitamente em:
- 💻 Desktops
- 📱 Tablets
- 📱 Smartphones

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter

## 🚀 Deploy

Para fazer deploy do projeto:

1. Execute `npm run build`
2. A pasta `dist/` conterá os arquivos prontos para produção
3. Faça upload da pasta `dist/` para seu serviço de hospedagem

## 📄 Licença

Este projeto é de uso livre.

---

**Desenvolvido com ❤️ para advogados profissionais**
