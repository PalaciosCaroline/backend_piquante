const Sauce = require('../models/sauce');
const fs = require('fs');

exports.createSauce = (req, res, next) => {
    // à vérifier 
    if (!req.file) {
        return res.status(400).json({ message: 'Image requise' });
      }
    const sauceObject = req.file ? 
    JSON.parse(req.body.sauce) : 
    req.body;

    delete sauceObject._id;

    const sauce = new Sauce({
    ...sauceObject,
    imageUrl: req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
    });

  sauce.save()
  .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
  .catch(error => { res.status(400).json( { error })})
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  }).then(
    (sauce) => {
      res.status(200).json(sauce);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauce = (req, res, next) => {
    Sauce.findOne({_id: req.params.id})
      .then(sauce => {
        const sauceObject = req.file ? 
        {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
  
        if (req.file) {
          // A new image was uploaded, so we delete the old image.
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ error: 'Erreur lors de la suppression de l\'ancienne image' });
            }
          });
        }
  
        Sauce.updateOne({_id: req.params.id}, { ...sauceObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
          if (sauce.userId != req.auth.userId) {
              res.status(401).json({message: 'Non authorisé'});
          } else {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Sauce.deleteOne({_id: req.params.id})
                      .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                      .catch(error => res.status(401).json({ error }));
              });
          }
      })
      .catch( error => {
          res.status(500).json({ error });
      });
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeDislikeSauce = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;
    const sauceId = req.params.id;

    Sauce.findOne({ _id: sauceId })
        .then(sauce => {
            switch (like) {
                case 1:
                    if (!sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 } })
                            .then(() => res.status(200).json({ message: 'Like ajouté !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
                case -1:
                    if (!sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 } })
                            .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
                case 0:
                    if (sauce.usersLiked.includes(userId)) {
                        Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
                            .then(() => res.status(200).json({ message: 'Like retiré !' }))
                            .catch(error => res.status(400).json({ error }));
                    } else if (sauce.usersDisliked.includes(userId)) {
                        Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
                            .then(() => res.status(200).json({ message: 'Dislike retiré !' }))
                            .catch(error => res.status(400).json({ error }));
                    }
                    break;
                default:
                    res.status(400).json({ message: 'Requête invalide' });
            }
        })
        .catch(error => res.status(500).json({ error }));
};