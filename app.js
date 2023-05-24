const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');

const userRoutes = require('./routes/user');
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));
require('dotenv').config();

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;