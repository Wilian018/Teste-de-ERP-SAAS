# MercadoPDV - Manual Técnico do Sistema ERP SaaS

Este documento é direcionado a Desenvolvedores, Engenheiros de Software e DevOps responsáveis pela manutenção, evolução e infraestrutura do sistema MercadoPDV.

---

## 1. Arquitetura do Sistema

O MercadoPDV segue uma arquitetura **SaaS (Software as a Service)** dividida em Front-end (Aplicação Web) e Back-end (API Rest), com suporte à comunicação de hardware (PDV Local).

*   **Front-end (Painel Administrativo & PDV Web):**
    *   **Framework:** Next.js (React) App Router.
    *   **Linguagem:** TypeScript.
    *   **Estilização:** Tailwind CSS + Componentes Base (inspirados no Shadcn/UI).
    *   **Ícones:** Lucide-react.
*   **Back-end (API):**
    *   **Framework:** NestJS.
    *   **ORM:** Prisma ORM.
    *   **Banco de Dados:** PostgreSQL (Relacional).
    *   **Autenticação:** JWT (JSON Web Tokens) com Refresh Tokens.
*   **Integração de Hardware (Bridge Local):**
    *   Aplicação instalada no Windows (PDV) que atua como serviço em segundo plano (Node.js/C#) para liberar portas COM/USB (Balança, PinPad, Impressora) para o navegador Web.

---

## 2. Estrutura de Diretórios (Front-end)

A aplicação reside sob a pasta `/frontend/src/app`. O roteamento é gerenciado pelo Next.js App Router:

*   `/`: Dashboard e KPIs.
*   `/(dashboard)/*`: Agrupa as rotas protegidas que compartilham o mesmo `layout.tsx` (Sidebar de navegação).
*   Principais Módulos:
    *   `/pdv`: Frente de caixa otimizada.
    *   `/customers`, `/suppliers`: Cadastro de Entidades.
    *   `/products`, `/purchases`: Catálogo, Lotes e Movimentações de Estoque.
    *   `/procurement`: Gestão de Compras (Cotação a Recebimento).
    *   `/financial`: DRE, Contas a Pagar/Receber, Conciliação.
    *   `/sales`: Fiscal, NFC-e/NF-e e SPED.
    *   `/crm`: Relacionamento, Campanhas e Histórico.
    *   `/reports`: BI e Exportação de Relatórios.
    *   `/print`: Spooler de impressão e Etiquetas.
    *   `/settings`: Configurações globais e hardware.
    *   `/team`: Matriz de Permissões e Auditoria.

---

## 3. Segurança e LGPD

### 3.1. Autenticação e Sessão
*   Todo endpoint do backend exige um `Bearer Token` gerado via login.
*   O *Access Token* tem validade curta (ex: 1 hora), sendo renovado transparentemente pelo *Refresh Token* (armazenado em cookie `HttpOnly`).
*   Configurações de duração da sessão podem ser ajustadas via painel em `/settings`.

### 3.2. Autorização (Controle de Acesso)
A tabela do banco de dados `Role` ou `Permission` interage com os Guards do NestJS.
No front-end, botões e abas são ocultados condicionalmente baseando-se no perfil carregado no estado global/context da aplicação (ex: Administrador, Gerente, Caixa).

### 3.3. Auditoria
Cada ação destrutiva (DELETE, PUT/PATCH crítico) é logada no banco de dados na tabela `AuditLog`, registrando: Usuário, Ação, Entidade, Data/Hora e IP.

---

## 4. Integração com Equipamentos Físicos

O navegador isolado não se comunica diretamente com a porta COM. Para integrar Balanças e PinPads:
1.  O cliente instala o **Spooler/Bridge Local**.
2.  O Bridge abre um WebSocket local em `ws://localhost:9090`.
3.  O front-end conecta neste WebSocket. Quando o usuário clica em "Imprimir", o frontend envia um payload JSON para o WebSocket.
4.  O Bridge processa o JSON e envia bytes brutos (`ESC/POS` para Epson, ou protocolo próprio) para a porta COM ou USB selecionada.

---

## 5. Deployment e Hospedagem

### 5.1. Docker
O sistema suporta containerização. O back-end possui seu próprio `Dockerfile`, e o front-end possui o dele.
Para produção, recomenda-se a execução orquestrada via `docker-compose`.

### 5.2. Scripts Locais
*   Para instalar dependências: `npm install`
*   Para rodar ambiente de desenvolvimento: `npm run dev` (porta 3002 por padrão no front-end).
*   Para buildar versão de produção: `npm run build && npm run start`.

---

## 6. Modelagem de Dados Primária (Prisma)
*(Certifique-se que o schema.prisma no backend reflete isso)*
- `User`: Administradores e operadores.
- `Customer` / `Supplier`: Entidades (Pessoas).
- `Product`: Base do catálogo (Nome, EAN, SKU).
- `ProductBatch`: Controle de Validade e Lote.
- `InventoryMovement`: Histórico de Kardex (Entradas, Saídas, Ajustes).
- `Transaction`: Transações Financeiras (Receitas/Despesas).
- `Sale`: Cupom ou Nota Fiscal amarrada aos itens.
