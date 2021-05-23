const express = require('express');
const path = require('path');
const cors = require('cors');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertModel = require('./models/concert.model');

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes); 
app.use('/api', seatsRoutes); 

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

// connects our backend code with the database
// mongoose.connect('mongodb+srv://kamil_janusz:-71limak71-@cluster0.uwrti.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// mongoose.connect


const determineDbUri = (envType) => {
  switch (envType) {
    case 'production':
      return 'mongodb+srv://${process.env.NewWaveUser}:${process.env.NewWaveApp}@cluster0.uwrti.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
    case "test":
      return 'mongodb://localhost:27017/NewWaveDBTest';
    default:
      return 'mongodb://localhost:27017/NewWaveDB';
  }
};

mongoose.connect(determineDbUri(process.env.NODE_ENV), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;



db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket!');
});

module.exports = server;