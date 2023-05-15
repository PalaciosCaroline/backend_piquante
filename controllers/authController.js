const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'default_secret';

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Création d'un nouvel utilisateur
    const user = new User({ email, password });

    // Hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarde l'utilisateur dans la base de données
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérification si l'utilisateur existe
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found!' });
    }

    // Comparaison du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Incorrect password!' });
    }

    res.status(200).json({
      userId: user._id,
      token: jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '24h' })
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};