import { fileURLToPath } from 'url';
import { mongoose, Schema } from 'mongoose';
import path from 'path';
import express from 'express';
import cors from 'cors';
import swaggerAutogen from 'swagger-autogen';
import SwaggerUI from 'swagger-ui-express';
import dotenv from 'dotenv';

import handler from "./utils/errorHandler.js"
import AuthRoutes from './routes/authRoutes.js';
import VideoRoutes from './routes/videoRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const doc = {
  info: {
    title: 'PandaVideo - Back-End',
    description: 'Documentação da API'
  },
  host: 'localhost:3000',
  schemes: ["http"],  
  consumes: ["application/json"],
  produces: ["application/json"]
};
const outputFile = './swagger.json';
const routes = ['./routes/*.js'];

swaggerAutogen()(outputFile, routes, doc);

import swaggerFilePath from './swagger.json' assert { type: "json" }; 

app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(swaggerFilePath));

app.use(cors());
app.use(express.json());
 
app.use(AuthRoutes);
app.use(VideoRoutes);

app.use(handler);

let envPath;
if (process.env.PRODUCTION) {
    envPath = path.join(__dirname, `.env.prd`);
} else {
    envPath = path.join(__dirname, `.env.dev`);
}
dotenv.config({ path: envPath });

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log("Conectado na base de dados."));

app.listen(
    process.env.PORT || 3333, 
    () => console.log(`Running Back-end in port ${process.env.PORT}`)
);