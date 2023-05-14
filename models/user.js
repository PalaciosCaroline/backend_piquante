const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Définir le schéma pour le modèle utilisateur
const UserSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
  }
});

// Avant d'enregistrer le modèle utilisateur, hacher le mot de passe
UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

// Ajoute une méthode pour comparer le mot de passe
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// création du modèle utilisateur d'après schéma
const User = mongoose.model('User', UserSchema);

module.exports = User;