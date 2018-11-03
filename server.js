const express = require('express');
const mongoose = require('mongoose');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// Set the port to 3000 OR let the process set the port (if deployed to Heroku)
const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static('public'));

// Connect to the Mongo DB using the inventorymaster database (will be created if it doesn't exist)
mongoose.connect('mongodb://localhost/realTimeChat', { useNewUrlParser: true });

// Routes
require('./sockets/message-sockets')(io);
// HTML Routes (require from routes file and pass in Express app)
require('./routes/html-routes')(app);

// Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});