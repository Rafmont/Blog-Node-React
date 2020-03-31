const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
    required: true,
  },
});

mongoose.model("categories", Category);