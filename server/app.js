const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = 'mongodb+srv://ahuanggg:Andyxie130@cluster0.styc6.mongodb.net/DomoMaker?authSource=admin&replicaSet=atlas-143hk9-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(dbURL, mongooseOptions, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const router = require('./router.js');

const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted`)));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    key: 'sessionid',
    secret: 'Domo Arigato',
    resave: true,
    saveUninitialized: true,
  }),
);
app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(cookieParser());

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
