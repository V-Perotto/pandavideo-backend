const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server conectado na porta: ${PORT}`));
  })
  .catch((error) => console.log('Erro ao conectar no banco de dados', error));
