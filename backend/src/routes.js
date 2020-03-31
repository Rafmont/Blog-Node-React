const express = require('express');

const CategoryController = require('./controllers/CategoryController');
const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');

const routes = express.Router();

//CRUD Categorias:
routes.post('/categories', CategoryController.create);
routes.get('/categories', CategoryController.index);
routes.delete('/categories/:id', CategoryController.delete);
routes.put('/categories/:id', CategoryController.update);

//CRUD Usuários:
routes.post('/users', UserController.create);
routes.get('/users', UserController.index);
routes.delete('/users/:id', UserController.delete);

//CRUD Postagens:
routes.post('/posts', PostController.create);
routes.get('/posts', PostController.index);
routes.delete('/posts/:id', PostController.delete);

module.exports = routes;