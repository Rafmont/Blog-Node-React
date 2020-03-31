const mongoose = require('mongoose');

require('../models/Comment');
require('../models/User');

const Comment = mongoose.model('comments');
const User = mongoose.model('users');

module.exports = {
  create (req, res) {
    const { title, content, date } = req.body;
    const { user_id, post_id } = req.headers;

    const newComment = new Comment({
      title: title,
      content: content,
      date: date,
      user: user_id,
      post: post_id,
    });

    newComment.save().then(() => {
      return res.json({ success: 'Comentário salvo com sucesso.' });
    }).catch((err) => {
      return res.status(500).json({ error: 'Erro ao salvar comentário.', m_err: err });
    });
  },

  index (req, res) {
    const post_id = req.params.id;

    Comment.find({post: post_id}).then((comments) => {
      return res.json(comments);
    }).catch((err) => {
      return res.status(500).json({ error: 'Erro ao encontrar comentários '});
    });
  },

  delete (req, res) {
    const user_id = req.headers.user;
    const comment_id = req.params.id;

    User.findOne({_id: user_id}).then((user) => {
      Comment.findOne({_id: comment_id}).then((comment) => {
        console.log(comment.user + " == " + user._id);
        if(user.type >= 1 || user_id == comment.user) {
          Comment.deleteOne({_id: comment_id}).then(() => {
            return res.status(200).json({ success: 'Comentário deletado com sucesso. '});
          }).catch((err) => {
            return res.status(500).json({ error: 'Não foi possível deletar o comentário. '});
          });
        } else {
          return res.status(401).json({ error: 'Você não está autorizado a excluir este comentário '});
        }
      }).catch((err) => {
        return res.status(500).json({ error: 'Não foi possível encontrar o comentário selecionado. '});
      });
    }).catch((err) => {
      return res.status(500).json({ error: 'Não foi possível veriricar o usuário que requisitou a operação.' });
    });
  },
}