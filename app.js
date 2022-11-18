const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use('/', (req, res, next) => {
  req.user = {
    _id: '6374fe720c1fa2e7d2eaee1f',
  };
  next();
});

app.use('/', require('./routers/index'));

app.listen(PORT);
