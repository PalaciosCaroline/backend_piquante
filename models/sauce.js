const mongoose = require('mongoose');

const SauceSchema = mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: {type: String, required: false},
  mainPepper: {type: String, required: false},
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: false, min: 1, max: 10 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

module.exports = mongoose.model('Sauce', SauceSchema);