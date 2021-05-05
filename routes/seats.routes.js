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
  const seatInUse = db.seats.find(item => item.seat == req.body.seat && item.day == req.body.day);
  if (seatInUse) {
    return res.status(400).json({ message: "The slot is already taken..." })
  } else {
    const seat = {
      id: uuidv4(),
      client: req.body.client,
      day: req.body.day,
      email: req.body.email,
      seat: req.body.seat
    }
    db.seats.push(seat);
    return res.json(seat);
  }
});

router.route('/seats/:id').delete((req, res) => {
  const index = db.seats.findIndex(item => item.id === req.params.id);

    if (index === -1) {
      res.status(404).json({ message: 'Not found' });
    } else {
      db.seats.splice(index, 1);
      res.json({ message: "Ok!" });
    }
});

router.route('/seats/:id').put((req, res) => {
  db.seats = db.seats.map(item => {
    if (item.id === req.params.id) {
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