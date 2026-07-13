# 🐾 FindAFriend API

O **FindAFriend** é uma API REST desenvolvida para conectar pessoas interessadas em adotar animais de estimação a Organizações Não Governamentais (ORGs) responsáveis. O projeto foi estruturado aplicando de forma rigorosa os princípios do **SOLID** e a prática de **testes automatizados (TDD/BDD)**, garantindo uma arquitetura limpa, escalável e de fácil manutenção.

Para auxiliar no entendimento do negócio e em como os endpoints serão consumidos pela interface (Mobile/Web), o projeto conta com um layout de referência que guia a experiência e as regras de filtragem.

[Projeto Figma](https://www.figma.com/community/file/1220006040435238030)

---

## 🚀 Funcionalidades da Aplicação

### 🏦 Gerenciamento de ORGs

- **Cadastro de ORGs:** Permite que novas organizações se registrem na plataforma para divulgar seus animais disponíveis.
- **Autenticação (Login):** Sistema de autenticação seguro para que a ORG gerencie seus registros e tenha acesso administrativo.

### 🐶 Gerenciamento de Pets

- **Cadastro de Pets:** Registro de novos animais para adoção (exige vinculação direta com uma ORG autenticada).
- **Visualização de Detalhes:** Consulta detalhada de um pet específico, exibindo suas características e os dados de contato da ORG.

### 🔍 Busca e Filtragem

- **Listagem por Localidade:** Lista todos os animais disponíveis para adoção filtrados obrigatoriamente por cidade.
- **Filtros Avançados:** Refinamento opcional da busca com base nas características do pet (ex: idade, porte, nível de energia, nível de independência, etc.).

---

## 💼 Regras de Negócio (Busines Rules)

1.  **Obrigatoriedade de Localização:** A informação da **cidade é estritamente obrigatória** para realizar qualquer listagem de pets.
2.  **Dados de Contato da ORG:** Uma ORG deve obrigatoriamente fornecer um **endereço completo** e um número de **WhatsApp** válido no momento do cadastro.
3.  **Vínculo Empregatício/Pertencimento:** Todo pet cadastrado precisa estar, obrigatoriamente, **vinculado a uma ORG**.
4.  **Fluxo de Adoção Direto:** O contato do usuário interessado em adotar um pet é descentralizado, ocorrendo diretamente com a ORG responsável através de um link/botão para o WhatsApp.
5.  **Filtros Flexíveis:** Com exceção da cidade, todos os outros filtros de características do pet são totalmente opcionais.
6.  **Proteção de Rotas:** Para criar, editar ou excluir registros (ações administrativas), a ORG deve estar **autenticada e logada** no sistema.

---

## 🛠️ Princípios SOLID Aplicados

- **S** single Responsibility Principle (SRP): Cada classe, service e controller possui uma única responsabilidade no ecossistema da aplicação.
- **O** pen/Closed Principle (OCP): A arquitetura permite estender as funcionalidades da API (como novos filtros ou regras de busca) sem a necessidade de modificar o código central existente.
- **L** iskov Substitution Principle (LSP): Uso de abstrações e interfaces garantindo que as implementações de repositórios ou provedores externos possam ser substituídas sem quebrar o comportamento do sistema.
- **I** nterface Segregation Principle (ISP): Criação de interfaces específicas para cada contexto de repositório e caso de uso, evitando dependências desnecessárias.
- **D** ependency Inversion Principle (DIP): Injeção de dependências desacoplada através de interfaces, isolando a regra de negócio de frameworks e drivers específicos (ex: ORM, Banco de Dados).

---

## 📋 Checklist de Desenvolvimento

### 🛣️ Endpoints e Rotas

- [ ] Rota para cadastro de uma ORG (`POST /orgs`), validando obrigatoriedade de endereço e WhatsApp.
- [ ] Rota para autenticação/login da ORG (`POST /sessions`).
- [ ] Rota para cadastro de um pet (`POST /pets`), com validação de vínculo de ID da ORG e middleware de autenticação.
- [ ] Rota para listagem de pets (`GET /pets`), validando parâmetro de query/route de cidade obrigatório.
- [ ] Implementação de filtros dinâmicos e opcionais por características dos pets na rota de listagem.
- [ ] Rota para consulta detalhada de um pet (`GET /pets/:id`).

### 🏗️ Arquitetura e Qualidade

- [ ] Implementação dos Casos de Uso (_Use Cases_) isolados para cada funcionalidade.
- [ ] Restrição de acessos administrativos utilizando middlewares de autenticação (JWT).
- [ ] Criação de Repositórios em memória (_In-Memory Repositories_) para viabilizar testes isolados e rápidos.
- [ ] Cobertura de Testes Unitários para validar todas as regras de negócio cruciais.
- [ ] Cobertura de Testes de Integração (E2E) para garantir o comportamento correto das rotas e controllers da API.

---

## ⚙️ Instruções de Instalação e Execução

### Pré-requisitos

- Gerenciador de pacotes compatível com seu ambiente (npm, yarn ou pnpm).
- Banco de dados configurado (conforme suas variáveis de ambiente).

### Passo a Passo

1. **Clone o repositório:**

   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>
   cd find-a-friend-api
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env` na raiz do projeto baseado no `.env.example` e preencha com as suas configurações.

4. **Gere o Prisma Client e Execute as migrações do banco de dados:**

   ```bash
   npx prisma generate

   npm run db:migrate
   ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

---

## 🧪 Executando os Testes

O projeto conta com uma suíte de testes robusta dividida em testes unitários e de integração (E2E).

```bash
# Executar testes unitários
npm run test

# Executar testes em modo watch (desenvolvimento)
npm run test:watch

# Executar testes E2E / Integração
npm run test:e2e

# Verificar cobertura de testes
npm run test:coverage
```

---

### 🐳 Comandos Docker

| Comando                | Descrição                                                |
| :--------------------- | :------------------------------------------------------- |
| `docker compose up`    | Sobe todos os containers na aplicação pela primeira vez. |
| `docker compose start` | Inicia todos os containers já criados da aplicação.      |
| `docker compose stop`  | Para todos os containers na aplicação.                   |
| `docker compose down`  | Deleta todos os containers na aplicação.                 |
| `docker ps`            | Vê quais containers estão sendo executados.              |
| `docker ps -a`         | Vê todas os containers criadas.                          |

---

### ⚙️ Comandos do Prisma

Após subir o container do PostgreSQL, você pode interagir com o banco de dados e o ORM:

| Comando                  | Descrição                                            |
| :----------------------- | :--------------------------------------------------- |
| `npx prisma generate`    | Gera o Prisma Client após alterações no schema.      |
| `npx prisma migrate dev` | Executa as migrações (cria/atualiza tabelas).        |
| `npx prisma studio`      | Abre uma interface gráfica para visualizar os dados. |

Desenvolvido com foco em arquitetura limpa e qualidade de software. 🐾
