const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

const cors = require('cors');
const config = require('./config/database');
const helmet = require('helmet');

let api = require('./routes/api');
const app = express();

// connect to database
mongoose.connect(
    config.database,
    {useNewUrlParser: true},
    function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected to ' + config.database);
      }
    }
);

app.use(helmet());
app.disable('x-powered-by');
app.set('trust proxy', 1); // trust first proxy
let corsOptions = {
  origin: 'http://localhost:3000', // Allow from localhost:1337
};
app.use(cors(corsOptions));

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Setup and Run listening server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is listening on port ${port} :)`));