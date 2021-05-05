const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

const randomElement = Math.floor(Math.random() * db.concerts.length);

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find(randomElement => randomElement.id === req.params.id));
});

router.route('/concerts').post((req, res) => {
  const concerts = {
    id: uuidv4(),
    performer: req.body.performer,
    genre: req.body.genre,
    price: req.body.price,
    day: req.body.day,
    image: req.body.image
  }
  db.concerts.push(concerts);
  return res.json(concerts);
});

router.route('/concertss/:id').delete((req, res) => {
  const index = db.concertss.findIndex(item => item.id === req.params.id);

    if (index === -1) {
      res.status(404).json({ message: 'Not found' });
    } else {
      db.concertss.splice(index, 1);
      res.json({ message: "Ok!" });
    }
});

router.route('/concerts/:id').put((req, res) => {
  db.concerts = db.concerts.map(item => {
    if (item.id === req.params.id) {
      return {
        id: uuidv4(),
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image
      };
    } else {
      return item;
    };
  })
  res.json({ message: "Ok!" });
});

module.exports = router;