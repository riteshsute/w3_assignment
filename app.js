const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
// const dotenv = require('dotenv'); // Import dotenv

// dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('api is running');
})

const userRoutes = require('./Routes/user');
const leaderboardRoutes = require('./Routes/leaderboard');

// Middleware Setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);



mongoose 
  .connect(
      'mongodb+srv://suteritesh:weXiGHQRRu59RE5x@cluster01.h70wf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01'
  )
  .then(() => {
      const server = app.listen(7000, () => {
          console.log('Server connected on port 7000');
      });

      // Socket.io for real-time functionality
      const io = require('socket.io')(server, {
          cors: {
              origin: "*",
              methods: ["GET", "POST"],
              allowedHeaders: ["Content-Type"],
              credentials: true
          }
      });

      io.on('connection', (socket) => {
          console.log('A user connected');

          socket.on('disconnect', () => {
              console.log('A user disconnected');
          });
      });
  })
  .catch(err => {
      console.log(err);
  });
