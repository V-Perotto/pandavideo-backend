import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'PandaVideo Back-End', 
    version: '1.0.0', 
    description: 'Este é uma documentação do teste realizado', 
  },
  servers: [
    {
      url: 'http://localhost:3000', 
    },
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;