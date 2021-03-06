const express = require("express");

const mongoose = require("mongoose");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
require('./routes/api-routes-menu')(app);
require('./routes/api-routes-order')(app);
require('./sockets/order-sockets')(io);
// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://restpro:abc123@ds155614.mlab.com:55614/heroku_shc98bq5");

// Start the API server
server.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});