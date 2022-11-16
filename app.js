const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/', (req, res, next) => {
  req.user = {
    _id: '6374fe720c1fa2e7d2eaee1f',
  };
  next();
});

app.use('/users', require('./routers/users'));

app.use('/cards', require('./routers/cards'));

app.listen(PORT);