###### English

# Fullstack Boilerplate for MERN with Typescript

A simple boilerplate designed to get fullstack projects up and running quickly using MERN (MySQL, Express, React and Node.js) with Typescript, while providing a consistent developer experience, with tools like Volta, Husky, Lint-staged and ESLint. On the frontend, it uses Next.js 13 and Sass, and on the backend, Sequelize.

### Features

- Consistent code standards: on every commit Husky executes Lint-staged, running linters, formating with Prettier and type checking all staged files.
- Linters: ESLint for .tsx and .ts files and Stylelint for .scss and .css files

- Standardized commit messages with Commitlint and Angular Conventional Commits

- Docker: easily run the whole app with a single command

- Node version locking with Volta locally

#### Frontend

- Sass: Syntactically Awesome Style Sheets aka CSS with superpowers

- SVGR: use .svg images as React components

- Next.js pages router

#### Backend

- RESTful API with Node.js, Express, MySQL and Sequelize

### Requirements

- Node ^16

- npm ^8

- Docker if you want to use it to run the app

- Volta if you want to automatically manage Node and npm versions

### Getting started

#### With Docker:

To use this boilerplate:

```shell
git clone https://github.com/igordosreis/boilerplate-fullstack project-name
cd project-name
npm run setup
```

Or click the 'Use this template' button at the top of this repository and then clone the newly created repository. After cloning, run in the root folder of the project:

```shell
npm run setup
```

To run the project in development mode, run in the root folder of the project:

```shell
docker compose up -d
```

#### Locally:

To use this boilerplate:

```shell
git clone https://github.com/igordosreis/boilerplate-fullstack project-name
cd project-name
npm run setup:local
```

Or click the 'Use this template' button at the top of this repository and then clone the newly created repository. After cloning, run on the root folder of the project:

```shell
npm run setup:local
```

If you want to use Volta:

```shell
curl https://get.volta.sh | bash
```

To run the project locally in development mode, do the following steps:

1. On the frontend folder, open a new terminal window and run:

```shell
npm run dev
```

2. On the backend folder, open a new terminal window and run:

```shell
npm run dev
```

The server uses port `3071`. You can change this by using the provided .env file: remove the `.example` and change the value of the SERVER_PORT variable. Or change the port on the backend/src/server.ts file.

3. Create a new MySQL server

The database uses port `3306`, username as `root` and password as `123456`.
You can change this by using the provided .env file: remove the `.example` and change the value of the DB_PORT, DB_USER and DB_PASS variables, respectively. Or change these values on the backend/src/database/config/database.ts file.

---

###### Português

# Boilerplate Fullstack para MERN com Typescript

Um boilerplate simples concebido para rapidamente iniciar projetos usando MERN (MySQL, Express, React e Node.js) com Typescript e também para prover uma experiência de desenvolvimento consistente, através de ferramentas como Volta, Husky, Lint-staged e ESLint. No frontend, é usado Next.js 13 e Sass, e no backend, Sequelize.

### Funcionalidades

- Padrões de código consistentes: em cada commit o Husky executa o Lint-staged, rodando linters, formatando com Prettier e fazendo checagem de tipos em todos os arquivos staged.

- Linters: ESLint para arquivos .tsx e .ts and Stylelint para arquivos .scss e .css

- Mensagens de commit padronizadas com Commitlint e Angular Conventional Commits

- Docker: rode o app inteiro facilmente com um único comando

- Versão do Node fixa com o Volta localmente

#### Frontend

- Sass: Syntactically Awesome Style Sheets também conhecido como CSS com super poderes

- SVGR: use imagens .svg como componentes de React

- Pages router do Next.js

#### Backend

- API RESTful com Node.js, Express, MySQL e Sequelize

### Requirements

- Node ^16

- npm ^8

- Docker caso você queira usá-lo para rodar o app

- Volta caso você queira automaticamente gerenciar as versões do Node e do npm

### Como utilizar

#### Com Docker:

Para usar esse boilerplate:

```shell
git clone https://github.com/igordosreis/boilerplate-fullstack nome-do-projeto
cd nome-do-projeto
npm run setup
```

Ou clique no botão 'Use this template' no topo desse repositório e então clone o repositório criado. Após clonar, rode na pasta raiz do projeto:

```shell
npm run setup
```

Para rodar o projeto localmente em modo de desenvolvimento, rode na pasta raiz do projeto:

```shell
docker compose up -d
```

#### Localmente:

Para usar esse boilerplate:

```shell
git clone https://github.com/igordosreis/boilerplate-fullstack project-name
cd nome-do-projeto
npm run setup:local
```

Ou clique no botão 'Use this template' no topo desse repositório e então clone o repositório criado. Após clonar, rode na pasta raiz do projeto:

```shell
npm run setup:local
```

Caso você queira usar o Volta:

```shell
curl https://get.volta.sh | bash
```

Para rodar o projeto localmente em modo de desenvolvimento, faça os seguintes passos:

1. Na pasta frontend, abra uma nova janela do terminal e rode:

```shell
npm run dev
```

2. Na pasta backend, abra uma nova janela do terminal e rode:

```shell
npm run dev
```

O servidor usa a porta `3071`. Você pode mudar isso usando o arquivo .env fornecido: remova o `.example` e mude o valor da variável SERVER_PORT. Ou mude o valor da porta no arquivo backend/src/server.ts.

3. Crie um novo servidor de MySQL

O banco de dados usa a porta `3306`, o username como `root` e a senha como `123456`.
Você pode mudar isso usando o arquivo .env fornecido: remova o `.example` e mude o valor das variáveis DB_PORT, DB_USER e DB_PASS, respectivamente. Ou mude o valor da porta no arquivo backend/src/database/config/database.ts.
