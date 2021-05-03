const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/testimonials').get((req, res) => {
  res.json(db.testimonials);
});

let randomElement = Math.floor(Math.random() * db.testimonials.length);

router.route('/testimonials/:id').get((req, res) => {
  res.json(db.testimonials.find(randomElement => randomElement.id === req.params.id));
});

router.route('/testimonials/random').get((req, res) => {
  res.json(db.testimonials[randomElement]);
});

router.route('/testimonials').post((req, res) => {
  const testimonial = {
    id: uuidv4(),
    author: req.body.author,
    text: req.body.text,
  }
  db.testimonials.push(testimonial);
  return res.json(testimonial);
});

router.route('/testimonials/:id').put((req, res) => {
  db.testimonials = db.testimonials.map(item => {
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

router.route('/testimonials/:id').delete((req, res) => {
  db.testimonials.splice(req.params.id, 1);
  res.json({ message: "Ok!" });
});

module.exports = router;