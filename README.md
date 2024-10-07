# PandaVideo Backend

Este projeto é um servidor backend `Node.js` para interagir com a API da **PandaVideo**, fornecendo dados ao frontend. Ele inclui autenticação de usuários, rotas protegidas, caching de vídeos e manipulação de erros.
Pré-requisitos

Antes de começar, você precisará ter instalado:
```
    Node.js (versão 18.x ou superior)
    MongoDB (para a persistência de dados de usuários)
    Docker (opcional, se desejar rodar em containers)
```

### Como usar o código localmente
#### 1. Clone o repositório

```
git clone https://github.com/V-Perotto/pandavideo-backend.git
cd pandavideovideo-backend
```

#### 2. Instalar as dependências

```
npm install
```

#### 3. Configurar o arquivo .env

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```
# Exemplo de variáveis de ambiente
PORT=3000
MONGO_URI=mongodb://localhost:27017/pandavideo
JWT_SECRET=sua-chave-secreta
```

#### 4. Iniciar o servidor

```
npm start
```

Agora o servidor estará rodando em http://localhost:3000.
Rotas da API

```
    Autenticação:
        POST /api/auth/signup: Criar um novo usuário.
        POST /api/auth/login: Realizar login e obter o token JWT.

    API de Vídeos (rotas protegidas):
        GET /api/videos: Buscar e filtrar vídeos. (necessário token JWT no header)

```

Rodar com Docker
#### 1. Criar a imagem Docker

Certifique-se de que o Docker está instalado na sua máquina e crie a imagem com o seguinte comando:

```
docker build -t pandavideo-backend .
```

#### 2. Executar o container

Após criar a imagem, execute o container:

```
docker run -d -p 3000:3000 --name pandavideo-backend-container -e MONGO_URI=mongodb://seu-mongo-url -e JWT_SECRET=sua-chave-secreta pandavideo-backend
```

- O servidor estará acessível em ```http://localhost:3000```.
- O parâmetro -e é usado para definir as variáveis de ambiente.

#### 3. Parar o container

Se precisar parar o container:

```
docker stop pandavideo-backend-container
```

#### 4. Verificar o container rodando

Use o seguinte comando para verificar os containers ativos:

```
docker ps
```

### Testes
#### Executar testes

O projeto inclui testes unitários e de integração para garantir a funcionalidade correta. Para rodar os testes, use:

```
npm test
```

Os testes estão localizados na pasta tests/, cobrindo rotas de autenticação e vídeos.
Estrutura do Projeto

```
pandavideo-backend/
├── controllers/        # Controladores da lógica de negócio
├── middlewares/        # Middlewares (ex: autenticação)
├── models/             # Modelos do Mongoose (ex: Usuários)
├── routes/             # Definição das rotas da API
├── services/           # Serviços que lidam com a lógica externa (ex: API de vídeos)
├── tests/              # Testes unitários e de integração
├── utils/              # Utilitários (ex: manipuladores de erro)
├── app.js              # Configuração principal do Express
├── server.js           # Ponto de entrada do servidor
├── Dockerfile          # Definição da imagem Docker
├── .env                # Variáveis de ambiente (não incluído no repositório)
└── README.md           # Este guia
```

### Tecnologias Utilizadas

- **Node.js**: Runtime para o backend.
- **Express.js**: Framework web para criação das rotas e middleware.
- **MongoDB + Mongoose**: Banco de dados NoSQL para persistência de dados.
- **JWT (jsonwebtoken)**: Para autenticação de usuários.
- **Axios**: Para realizar requisições à API externa.
- **Docker**: Para containerizar a aplicação e rodar em qualquer máquina.
- **Jest & Supertest**: Para testes unitários e de integração.

### Considerações Finais

Com este guia, você pode rodar a aplicação localmente ou via Docker. A aplicação implementa um backend funcional com autenticação, gerenciamento de vídeos e suporte a caching para melhorar a performance.

Se você tiver problemas ou dúvidas, sinta-se à vontade para abrir uma issue ou entrar em contato!