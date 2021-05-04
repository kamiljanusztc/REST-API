const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

const randomElement = Math.floor(Math.random() * db.seats.length);

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find(randomElement => randomElement.id === req.params.id));
});

router.route('/seats').post((req, res) => {
  const testimonial = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  }
  db.seats.push(testimonial);
  return res.json(testimonial);
});

router.route('/seats/:id').delete((req, res) => {
  db.seats = db.seats.map(item => {
    if (item.id == req.params.id) {
      const index = db.seats.indexOf(item);
      db.seats.splice(index, 1);
    }
    res.json({ message: "Ok!" });
  });
});

router.route('/seats/:id').put((req, res) => {
  db.seats = db.seats.map(item => {
    if (item.id == req.params.id) {
      return {
        id: req.params.id,
        author: req.body.author,
        text: req.body.text,
      };
    } else {
      return item;
    };
  })
  res.json({ message: "Ok!" });
});

module.exports = router;