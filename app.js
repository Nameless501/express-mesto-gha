const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { handleError } = require('./utils/utils');

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(DB_URL);

app.use('/', require('./routers/index'));

app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(PORT);
