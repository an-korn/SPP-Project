require('dotenv').config();
const express = require("express");
const app = express();

require('../config/routes')(app);

app.listen(process.env.API_PORT);