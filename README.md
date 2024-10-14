# PandaVideo Backend e Frontend

Este projeto é um servidor backend `Node.js` para interagir com a API da **PandaVideo**, fornecendo dados ao frontend. Ele inclui autenticação de usuários, rotas protegidas, caching de vídeos e manipulação de erros.
Pré-requisitos

Antes de começar, você precisará ter instalado o Docker

## Como usar o código localmente
### 1. Clone o repositório

```
git clone https://github.com/V-Perotto/teste-pandavideo.git
cd teste-pandavideo
```

### 2. Configurar o arquivo .env.dev

Crie um arquivo `.env.dev` na pasta `pandavideo-backend` do projeto com as seguintes variáveis de ambiente:

#### Exemplo de variáveis de ambiente:
```
PORT=3000
MONGO_URI="mongodb://root:password@mongodb:27017/admin?authSource=admin"
JWT_SECRET=<<SECRET_KEY>>
PANDA_API_KEY=<<TOKEN_KEY>>
```

### 3. Iniciar o Docker Compose

```
docker-compose up
```

- Agora o servidor backend estará rodando em http://localhost:3000.
- Agora o frontend estará rodando em http://localhost:8080/.

## Rotas da API
```
Autenticação:
    POST /signup: Criar uma nova conta.
    POST /login: Realizar login e autenticar.

API de Vídeos (rotas protegidas):
    GET /videos: Buscar e filtrar vídeos.
```

#### Estrutura do Projeto - Back-End
```
pandavideo-backend/
├── src/
│   ├── controllers/        # Controladores que implementam a lógica de negócios
│   ├── middlewares/        # Middlewares para funcionalidades como autenticação
│   ├── models/             # Modelos do Mongoose para gerenciamento de dados (ex: Usuários)
│   ├── routes/             # Definição das rotas da API
│   ├── services/           # Serviços para interações externas (ex: API de vídeos)
│   ├── tests/              # Testes unitários e de integração
│   ├── utils/              # Funções utilitárias (ex: manipuladores de erro)
├── app.js                  # Configuração principal do Express
├── package-lock.json       # Pacote de bibliotecas npm no estado lock
├── package.json            # Pacote de bibliotecas npm
├── swagger.js              # Configuração para construir o Swagger
```

#### Estrutura do Projeto - Front-End
```
pandavideo-frontend/
├── public/                 # Página index e ícone
├── src/
│   ├── assets/             # Diretório de imagens
│   ├── components/         # Componentes das páginas
│   │   ├── css/
│   │   ├──js/
│   ├── router/             # Definição das rotas
│   ├── services/           # Serviços para interações externas
│   ├── views/              # Telas de visualização
│   ├── App.vue             # Tela principal do app
│   ├── main.js             # Criação do app
├── babel.config.js         # Configuração do Babel
├── jsconfig.json           # Configuração do JS
├── package-lock.json       # Pacote de bibliotecas npm no estado lock
├── package.json            # Pacote de bibliotecas npm
├── vue.config.js           # Configuração do Vue
```

## Tecnologias Utilizadas

- **Node.js**: Linguagem para o backend.
- **Express.js**: Framework web para criação das rotas e middleware.
- **MongoDB + Mongoose**: Banco de dados NoSQL para persistência de dados.
- **JWT (jsonwebtoken)**: Para autenticação de usuários.
- **Axios**: Para realizar requisições à API externa.
- **Docker**: Para criar containeres das aplicações e rodar em qualquer máquina.
- **Jest & Supertest**: Para testes unitários e de integração.