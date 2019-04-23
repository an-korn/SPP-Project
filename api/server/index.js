require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const socket = require('socket.io');
const app = express();
const server = http.createServer(app);
const socketIO = socket.listen(server);

app.use(bodyParser.json());
app.use(cors({allowedOrigins: ['localhost:3000']}));

app.get(`${process.env.API_URL}/authentication`, require('../controllers/authentication').get);
app.get(`${process.env.API_URL}/authentication/callback`, require('../controllers/authentication').callback);

socketIO.on('connection', (socket) => {
  console.log('socket is working');
  require('../config/routes')(socket);
});

server.listen(process.env.API_PORT, () =>{
  console.log(`Server started on port ${server.address().port}`);
});
 