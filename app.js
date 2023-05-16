const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

const dbUri = process.env.MONGODB_URI;

mongoose.connection.on('error', err => {
  console.log('Erreur de connexion à MongoDB :', err);
});

mongoose.connect(dbUri,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json());
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


// Configuration de la politique de sécurité du contenu
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      fontSrc: ["'self'", 'data:'],
    },
  })
);

app.use('/api/auth', userRoutes);

module.exports = app;