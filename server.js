// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//Arrumando problema 4: Cannot find module './userRoutes'
const routes = require('./routes/userRoutes');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Usando as rotas definidas
app.use('/api/user', routes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});