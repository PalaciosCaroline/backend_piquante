const express = require('express');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(helmet());

// Configuration de la politique de sécurité du contenu
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      fontSrc: ["'self'", "data:"], // Autorise les polices de caractères depuis 'self' et 'data:'
    },
  })
);

app.use('/api/auth', authRoutes);

module.exports = app;