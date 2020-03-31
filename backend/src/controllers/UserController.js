const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

require("../models/User");
const User = mongoose.model("users");

module.exports = {
  create(req, res) {
    const { name, email, password } = req.body;

    User.findOne({email: email, active: true}).then((user) => {
      if(!user) {
        let newPassword = password;
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newPassword, salt, (err, hash) => {
            if(err) {
              return res.status(400).json({ error: 'Erro ao cifrar a senha.'});
            }
            const newUser = new User({
              name: name,
              email: email,
              password: hash,
            });
            newUser.save().then(() => {
              return res.json({ success: 'Usuário criado com sucesso.'}).status(204);
            }).catch((err) => {
              return res.status(400).json({ error: 'Erro ao criar usuário.'});
            })
          });
        });
      } else {
        return res.status(400).json({ error: 'Já existe um usuário com este endereço de E-mail.'});
      }
    }).catch((err) => {
      return res.status(400).json({ error: 'Erro ao verificar E-mail.'});
    });
  },

  index (req, res) {
    User.find({active: true}).then((users) => {
      return res.json(users);
    }).catch((err) => {
      return res.status(404).json({ error: 'Não foi possível encontrar os usuários.' }).send();
    });
  },

  delete (req, res) {
    const id = req.params.id;
    User.findById(id).then((user) => {
      user.active = false;
      user.save().then(() => {
        return res.json({ success: 'Usuário deletado com sucesso.' });
      }).catch((err) => {
        return res.status(400).json({ error: 'Não foi possível deletar o usuário. '});
      });
    }).catch((err) => {
      return res.status(404).json({ error: 'Não foi possível encontrar o usuário.' });
    });
  },
}