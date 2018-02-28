import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import routes from './routes';
import passport from 'passport';
const localStrategy = require('passport-local').Strategy;

let app = express();
app.server = http.createServer(app);

app.use(bodyParser.json({
    limit : config.bodyLimit
}));

//  Middleware

//  passport config
app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    Account.authenticate()
));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


app.use('/v1',routes);


app.server.listen(config.port);
//console.log('Server Started ${app.server.address().port}');
console.log(`Started on port ${app.server.address().port}`);
export default app;