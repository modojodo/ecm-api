const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/index');
const mediaRouter = require('./routes/mediaRoutes');
const swaggerRouter = require('./routes/swaggerRoutes');

const app = express();




app.use(cors({ origin: '*' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/docs', swaggerRouter);
app.get('/media', mediaRouter);

module.exports = app;
