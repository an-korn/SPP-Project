require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(cors({allowedOrigins: ['localhost:3000']}));

require('../config/routes')(app);

app.listen(process.env.API_PORT);