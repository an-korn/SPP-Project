require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin'  : 'http://localhost:3000',
    'Access-Control-Allow-Methods' : 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    "Access-Control-Allow-Headers" : "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  });
  next();
});

app.use(bodyParser.json());
require('../config/routes')(app);

app.listen(process.env.API_PORT, () =>{
  console.log(`Server started on port ${process.env.API_PORT}`);
});
 