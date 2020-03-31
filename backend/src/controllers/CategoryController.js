const mongoose = require('mongoose');
require("../models/Category");
const Category = mongoose.model("categories");


module.exports = {
  create(req, res) {
    const { title, description } = req.body;
      const newCategory = new Category({
        title: title,
        description: description,
      });
      newCategory.save().then(() => {
        return res.status(204).send();
      }).catch((err) => {
        return res.status(400).json({ error: 'Erro ao criar categoria.'});
      });
  },

  index (req, res) {
    Category.find({active: true}).then((categories) => {
      return res.json(categories);
    }).catch((err) => {
      return res.status(400).json({ error: 'Erro ao buscar categorias.'});
    });
  },

  delete(req, res) {
    const id = req.params.id;
    Category.findOne({_id: id}).then((category) => {
      category.active = false;
      category.save().then(() => {
        return res.status(204).send();
      }).catch((err) => {
        return res.status(400).json({ error: 'Erro ao deletar categoria.'});
      });
    }).catch((err) => {
      return res.status(400).json({ error: 'Erro ao deletar categoria.'});
    });
  },

  update(req, res) {
    const id = req.params.id;
    const { title, description } = req.body;
    Category.findOne({_id: id}).then((category) => {
      category.title =  title;
      category.description = description;
      category.save().then(() => {
        return res.status(204).send();
      }).catch((err) => {
        return res.status(400).json({ error: 'Erro ao salvar categoria.'});
      });
    }).catch((err) => {
      return res.status(400).json({ error: 'Erro ao encontrar categoria.'});
    });
  },
}