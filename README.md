# TeamProjects Back-End

# TeamProject - Gerenciamento de Equipes e Atividades

**TeamProject** é um sistema para gerenciamento de equipes e suas atividades. O sistema permite o cadastro de pessoas, a criação de projetos, a adição de pessoas em equipes e a atribuição de tarefas a cada membro da equipe dentro dos projetos.

## Funcionalidades

- **Cadastro de Usuários**: Permite o cadastro e a autenticação de usuários.
- **Gerenciamento de Projetos**: Crie, edite e exclua projetos.
- **Gestão de Equipes**: Adicione pessoas às equipes e atribua tarefas específicas para cada projeto.
- **Atribuição de Tarefas**: Defina e acompanhe tarefas atribuídas aos membros das equipes.

## Dependências

Este projeto utiliza as seguintes dependências:

- **bcrypt**: Biblioteca para hashing de senhas.
- **cors**: Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- **dotenv**: Carrega variáveis de ambiente de um arquivo `.env` para `process.env`.
- **express**: Framework web para Node.js para construção da API.
- **jsonwebtoken**: Implementação de JSON Web Tokens para autenticação.
- **mongoose**: Biblioteca para modelagem de dados MongoDB em ambiente Node.js.
- **mysql2** Conector para MySQL que suporta Promises.
- **sequelize**: ORM (Object-Relational Mapping) para Node.js que suporta MySQL e outras bases de dados.
- **tall**: Ferramenta para gerenciamento de filas e tarefas assíncronas.

## Instalação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/tema-project.git
   cd tema-project

