# 🛠️ Admin Panel - TCC UNIP 2025

Aplicação desenvolvida em **Next.js** como parte do **Trabalho de Conclusão de Curso (TCC) - UNIP 2025 (2º semestre)**.  
O sistema fornece um **painel administrativo** para gestão de dispositivos inteligentes e testes de comunicação, com foco em **acessibilidade**, **segurança** e **internacionalização**.

---

## 🎯 Objetivo

O **Admin Panel** tem como objetivo fornecer uma interface visual para:

- 📡 **Cadastro de dispositivos** inteligentes (ex.: Câmeras viárias, Semáforos inteligentes).  
- 🔗 **Testes de comunicação** entre dispositivos **antes do cadastro definitivo**.  
- 🔐 **Página de login** (apenas autenticação, criação de usuários é feita pelo administrador).  
- 🌍 **Acessibilidade** (requisito para sistemas de governo).  
- 🌐 **Multi-idioma** (requisito obrigatório).  

---

## 📝 Requisitos do Sistema

### ✅ Requisitos Funcionais
- Login seguro via Auth.js (Credentials).  
- Cadastro e gerenciamento de dispositivos inteligentes.  
- Testes de comunicação antes do cadastro definitivo.  
- Multi-idioma (PT-BR, EN, ES).  
- Acessibilidade seguindo padrões WAI-ARIA.  
- Tema claro/escuro configurável pelo usuário.  

### ⚙️ Requisitos Não Funcionais
- Deploy em nuvem (Vercel).  
- HTTPS obrigatório em todos os ambientes.  
- Sessão segura via cookies HTTP-Only.  
- Performance monitorada com **PageSpeed Insights** (Core Web Vitals).  
- Disponibilidade monitorada (observabilidade).  
- Boas práticas de **Qualidade de Software**:  
  - Testes unitários e de integração com `Jest` 
  - Linting (ESLint + Prettier).  
  - Versionamento Git (branching `feature/`, `release/`, `hotfix/`).  
  - Documentação atualizada no READ.ME
 

## 🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) – Framework React para aplicações modernas
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) – Linguagem base
- [React Hook Form](https://react-hook-form.com/) – Manipulação e validação de formulários
- [Auth.js](https://authjs.dev/) – Autenticação (com provider `Credentials`)
- [Next INTL](https://next-intl-docs.vercel.app/) – Internacionalização (multi idioma)
- [Next Themes](https://github.com/pacocoursey/next-themes) – Alternância de tema (dark/light)
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) – Fontes otimizadas (Geist)
- [Jest](https://jestjs.io/docs/getting-started) – Biblioteca de Testes
- **HTTPS** – Comunicação segura
- **Cookies HTTP-Only** – Armazenamento de sessão seguro

---

## 📂 Estrutura de Pastas (resumida)

```graphql
# Code & components for pages
./src/* 
  ├─ src/assets - # Minified images, fonts, icon files
  ├─ src/components - # Individual smaller components
  ├─ src/fragments - # Larger chunks of a page composed of multiple components
  ├─ src/layouts - # Page layouts used for different types of pages composed of components and fragments
  ├─ src/page - # Custom pages or pages composed of layouts with hardcoded data components, fragments, & layouts
  ├─ src/pages/* - # Next.js file based routing
  │  ├─ _app.js - # next.js app entry point
  │  ├─ _document.js - # next.js document wrapper
  │  ├─ global.css - #  Global CSS styles
  │  └─ Everything else... - # File based routing
  └─ src/utils - # Utility functions used in various places
```
---

## 🔑 Autenticação

- Implementada com **Auth.js (Credentials)**.  
- Apenas **login** está disponível para usuários comuns (cadastro de usuários é restrito ao administrador).  
- Sessões são gerenciadas com **cookies HTTP-Only** via HTTPS.  

---

## 🌍 Internacionalização

- Implementada com **Next INTL**.  
- Requisito obrigatório de **multi idioma** (ex.: PT-BR, EN, ES).  
- Permite fácil expansão para novos idiomas.  

---

## ♿ Acessibilidade

- Requisito obrigatório para sistemas voltados ao governo.  
- Utiliza **padrões WAI-ARIA** e boas práticas de acessibilidade.  
- Suporte a **teclado** e **leitores de tela**.  

---

## 🎨 Temas

- Suporte a **modo claro/escuro** via **Next Themes**.  
- Preferência de tema é salva entre sessões.  

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com:

```env
NEXTAUTH_SECRET=chave-secreta-aqui
NEXTAUTH_URL=https://localhost:3000
API_USER_URL=https://localhost:{PORTA}/api{VERSÃO}
API_METRICS_URL=https://localhost:{PORTA}/api{VERSÃO}
```


Outras variáveis podem ser adicionadas conforme integrações de API.

🚀 Como rodar o projeto

Clone o repositório e instale as dependências:

git clone [https://github.com/JamzMarks/Dashboard](https://github.com/JamzMarks/Dashboard) 
cd Dashboard

# instalar dependências
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

Execute o ambiente de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra no navegador:
👉 http://localhost:3000

## 📦 Deploy

O deploy é realizado na **Vercel**, plataforma oficial do Next.js, com integração contínua (CI/CD) a partir do GitHub.

- ✅ **CI/CD**: Cada push para `main` ou `develop` dispara build e preview automático.  
- ✅ **PageSpeed Insights**: Monitoramento contínuo de performance, acessibilidade e SEO (métricas Core Web Vitals).  
- ✅ **Práticas de DevOps**:  
  - Integração Contínua (CI)  
  - Entrega Contínua (CD)  
  - Versionamento semântico (`release/x.y.z`)  
  - Uso de ambientes (`.env`) para separar desenvolvimento, homologação e produção  
  - Observabilidade e monitoramento do uptime  

Configurar as variáveis de ambiente diretamente no painel da **Vercel**.

## 🔒 Segurança

- Comunicação via HTTPS.  
- Cookies de sessão com flag HTTP-Only.  
- **Bearer Token** corrigido e padronizado para chamadas à API.  
- Proteção contra ataques XSS e CSRF.  
- Sanitização de inputs no backend.

---

### 📚 Recursos Úteis

- [Next.js (Documentação Oficial)](https://nextjs.org/docs)  
- [Auth.js (Autenticação para Next.js)](https://authjs.dev/)  
- [React Hook Form (Forms em React)](https://react-hook-form.com/)  
- [Next INTL (Internacionalização no Next.js)](https://next-intl-docs.vercel.app/)  
- [Next Themes (Suporte a temas claro/escuro)](https://github.com/pacocoursey/next-themes)  

 ---
### 📌 Status do Projeto

> [!NOTE]  
> Em desenvolvimento – Entrega prevista para o 2º semestre de 2025 (TCC UNIP).

> [!CAUTION]
> Bearer Token com error.
