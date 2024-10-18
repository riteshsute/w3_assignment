const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
// const dotenv = require('dotenv'); // Import dotenv

// dotenv.config();

const app = express();

const userRoutes = require('./Routes/user');
const leaderboardRoutes = require('./Routes/leaderboard');

// Middleware Setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Using Routes
app.use('/api/users', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

// Fallback Route for Serving Static Files
// app.use((req, res) => {
//     res.sendFile(path.join(__dirname, `public/${req.url}`));
// });

// Database Connection with Mongoose


mongoose 
  .connect(
      'mongodb+srv://suteritesh:weXiGHQRRu59RE5x@cluster01.h70wf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01'
  )
  .then(() => {
      const server = app.listen(7000, () => {
          console.log('Server connected on port 7000');
      });

      // Setup Socket.io for real-time functionality
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
