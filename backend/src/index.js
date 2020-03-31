//Carregando pacotes.
  //Pacotes do Node.
  const express = require('express');
  const mongoose = require('mongoose');

  //Arquivo de Rotas.
  const routes = require('./routes');

//Configurações
  //App.
  const app = express();
  app.use(express.json());
  app.use(routes);

  //Mongoose.
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost/Blog-Node-React", {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conectado ao Banco de Dados!")
  }).catch((err) => {
    console.log("Erro ao conectar ao banco de dados: " + err)
  })



//Outros
  //Definição da porta e deixando o servidor na espera de novas requisições.
  const PORT = 3333
  app.listen(PORT, () => {
    console.log("Servidor disponível!");
  })