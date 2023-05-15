// const express = require('express');
// require('dotenv').config();

// const router = express.Router();

// const authRoutes = require('./routes/authRoutes');
// const sauceRoutes = require('./routes/saucesRoutes');

// const app = express();

// app.use('/api/auth', authRoutes);
// app.use('/api/sauces', sauceRoutes);

// router.use(express.json()); // intercepte les requêtes en json et met son contenu sur l'objet req.body
// const mongoose = require('mongoose');
// const uri = process.env.MONGODB_URI;  //URI signifie Uniform Resource Identifier

// const Thing = require('./models/thing');

// mongoose.connect(uri,
//   { useNewUrlParser: true,
//     useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie !'))
//   .catch(() => console.log('Connexion à MongoDB échouée !'));

// router.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
//   });

//   router.post('/', (req, res, next) => {
//     delete req.body._id;
//     const thing = new Thing({
//       ...req.body
//     });
//     thing.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

//   router.put('/:id', (req, res, next) => {
//     Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

//   router.delete('/:id', (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

//   router.get('/:id', (req, res, next) => {
//     Thing.findOne({ _id: req.params.id })
//       .then(thing => res.status(200).json(thing))
//       .catch(error => res.status(404).json({ error }));
//   });

//   router.get('/', (req, res, next) => {
//     Thing.find()
//       .then(things => res.status(200).json(things))
//       .catch(error => res.status(400).json({ error }));
//   });

// module.exports = router;