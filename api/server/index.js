require('dotenv').config();
const express = require("express");
const app = express();

require('../routes')(app);

app.listen(process.env.API_PORT);