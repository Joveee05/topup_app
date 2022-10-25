const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const globalErrorHandler = require('./controllers/error');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRoutes');

// const indexRouter = require('./routes/index');

const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use("/", indexRouter);
app.use('/api/v1/users/', userRouter);

app.use(globalErrorHandler);

module.exports = app;
