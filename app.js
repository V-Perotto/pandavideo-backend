const express = require('express');
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const errorHandler = require('./utils/errorHandler');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

app.use(errorHandler);

module.exports = app;
