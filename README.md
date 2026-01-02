# Painel Adm Hotel

Painel administrativo do SaaS Hotel, construido em React, com rotas para dashboard, hoteis, reservas e pagamentos.

## Visao geral

- App React com Create React App
- Requisicoes HTTP via Axios
- Grafico no dashboard com Chart.js
- Navegacao com React Router

## Funcionalidades

- Dashboard com indicadores e grafico de status de reservas
- Gerenciamento de hoteis (listar, adicionar, editar, excluir)
- Gerenciamento de reservas (listar e cancelar)
- Pagamentos a partir de reservas pendentes
- Autenticacao via token salvo no `localStorage`

## Rotas

- `/` - Dashboard
- `/hotels` - Hoteis
- `/reservations` - Reservas
- `/reports` - Pagamentos/relatorios

## Requisitos

- Node.js e npm instalados

## Como rodar

```bash
npm install
npm start
```

O app fica em `http://localhost:3000`.

## Configuracao da API

O projeto usa URLs fixas do backend. Ajuste conforme o seu ambiente:

- `src/services/api.js` define `baseURL` para a maioria das rotas
- `src/pages/Reservations.jsx` usa `API_URL` direto
- `src/pages/Login.jsx` usa `API_URL` direto

## Scripts

- `npm start` - ambiente de desenvolvimento
- `npm test` - testes em modo watch
- `npm run build` - build de producao
- `npm run eject` - expor configuracoes do CRA

## Estrutura do projeto

```
src/
  components/  componentes reutilizaveis (navbar, listagem e formulario)
  pages/       paginas principais (dashboard, hoteis, reservas, pagamentos)
  services/    configuracao de API (axios)
```
