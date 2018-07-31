const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const Routes = require('./routes/index');

// TODO: Configurable via env
const IMAGE_CACHE_TIME = 1000 * 60 * 60 * 8; // 8 hour image cache

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: IMAGE_CACHE_TIME,
}));

Routes.init(app);

module.exports = app;
