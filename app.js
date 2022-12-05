const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use('/', require('./routers/index'));

app.use(errors());
app.use((err, req, res, next) => {
  res.status(err.code).send({ message: err.message });
});

app.listen(PORT);
