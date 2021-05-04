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
  const testimonial = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  }
  db.concerts.push(testimonial);
  return res.json(testimonial);
});

router.route('/concerts/:id').delete((req, res) => {
  db.concerts = db.concerts.map(item => {
    if (item.id == req.params.id) {
      const index = db.concerts.indexOf(item);
      db.concerts.splice(index, 1);
    }
    res.json({ message: "Ok!" });
  });
});

router.route('/concerts/:id').put((req, res) => {
  db.concerts = db.concerts.map(item => {
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