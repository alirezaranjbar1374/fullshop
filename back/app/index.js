const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
const dotEnv = require("dotenv");

require('winston-mongodb');
require('express-async-errors');
const ErrorMiddleware = require('./http/midelware/Error');
const api = require('./routes/api');
const cookieParser = require('cookie-parser');
const app = express();
//load_config
dotEnv.config({ path: "./config/config.env" });

class Application {
  constructor() {
    this.setupExpressServer();
    this.setupMongoose();
    this.setupRoutesAndMiddlewares();
    this.setupConfigs();
  }

  setupRoutesAndMiddlewares() {
    // built-in middleware
    app.use(cookieParser());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // app.use(express.static('/public'));
    app.use('/public', express.static('./public'));
    if (app.get('env') !== 'production') app.use(morgan('tiny'));

    // third-party middleware
    app.use(cors());

    //routes
    app.use('/api', api);

    app.use(ErrorMiddleware);
  }

  setupConfigs() {
    winston.add(new winston.transports.File({ filename: 'error-log.log' }));
    winston.add(
      new winston.transports.MongoDB({
        db: 'mongodb://localhost:27017/toplearn-Teaching-programming',
        level: 'error',
      }),
    );

    process.on('uncaughtException', (err) => {
      console.log(err);
      winston.error(err.message);
    });
    process.on('unhandledRejection', (err) => {
      console.log(err);
      winston.error(err.message);
    });

    app.set('view engine', 'pug');
    app.set('views', '../views'); // default
  }

  setupMongoose() {
    mongoose
      .connect('mongodb://localhost:27017/Teaching-programming', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('db connected');
        winston.info('db connected');
      })
      .catch((err) => {
        console.error('db not connected', err);
      });
  }
  setupExpressServer() {
    const port = process.env.myPort || 3001;
    app.listen(port, (err) => {
      if (err) console.log(err);
      else console.log(`app listen to port ${port}`);
    });
  }
}

module.exports = Application;
