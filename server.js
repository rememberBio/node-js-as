var express = require('express');
var server = express();
const config = require("./config.js");

const log = require('morgan');
const logger = require('./lib/logger');

var corsOptions = {
    origin: "http://localhost:4000",
};
const cors = require("cors");

var passport = require('passport');
require('./initializers/passport');

const bodyParser = require("body-parser");

var cookieSession = require('cookie-session')
server.use(cookieSession({
  name: 'session',
  secret: 'rememberuYEc2B',
}));

server.use(passport.initialize());
server.use(passport.session());

server.use(cors());
server.use(bodyParser.json());

//Mongo DB
const mongoose = require('mongoose');
const uri = `mongodb+srv://${config.DB_USER_NAME}:${config.DB_PASSWORD}@cluster0.hwlle.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
}).then(() => { console.log("succeeded to connect to Mongo") }).catch(err => {
    console.log(err, 'error to connect to mongodb');
});

//routes
const userRoutes = require("./routes/userRouter");
const rpRoutes = require('./routes/rememberPageRouter');

server.use("/user", userRoutes);
server.use("/rp", rpRoutes);

const port = config.PORT;

server.listen(process.env.PORT || 4000, async() => {
    console.log(`Server running at port: ${port}`);
});