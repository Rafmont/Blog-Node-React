const mongoose = require('mongoose');

require('../models/Post');
const Post = mongoose.model('posts');

module.exports = {
  create (req, res) {
    const { title, content, date, category } = req.body;
    const user_id = req.headers.user;

    const newPost = new Post({
      title: title,
      content: content,
      date: date,
      category: category,
      user: user_id
    });

    newPost.save().then(() => {
      return res.json({ success: 'Postagem cadastrada com sucesso.' });
    }).catch((err) => {
      return res.status(500).json({ error: 'Não foi possível salvar nova postagem, tente novamente.', the_error: err});
    });
  },

  index (req, res) {
    Post.find().populate('category').populate('user').then((posts) => {
      return res.json(posts);
    }).catch((err) => {
      return res.status(401).json({ error: 'Não foi possível encontrar as postagens. '});
    });
  },

  delete (req, res) {
    const post_id = req.params.id;

    Post.findOneAndDelete({_id: post_id}).then(() => {
      return res.json({ success: 'Postagem deletada com sucesso.' });
    }).catch((err) => {
      return res.status(500).json({ error: 'Não foi possível encontrar a postagem selecionada.'});
    });
  }
}