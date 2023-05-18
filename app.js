const express = require('express');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');

const userRoutes = require('./routes/user');
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));
// const helmet = require('helmet');
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

// Configuration de la politique de sécurité du contenu

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'", 'data:', "'unsafe-inline'", "'unsafe-eval'", "*"],
//       fontSrc: ["'self'", 'data:', 'https:', 'http:', "'unsafe-inline'", "'unsafe-eval'", "*"],
//       styleSrc: ["'self'", "'unsafe-inline'", "*"],
//       scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
//     },
//   })
// );

app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;