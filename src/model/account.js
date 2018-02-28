/*import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
const Schema = mongoose.Schema;

let Account = new Schema({
    email: String,
    password: String
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);*/

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import passportLocalMongoose from 'passport-local-mongoose';

let Account = new Schema({
  email: String,
  password: String
});

Account.plugin(passportLocalMongoose);
module.exports = mongoose.model('Account', Account);