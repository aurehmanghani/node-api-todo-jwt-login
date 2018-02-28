import mongoose from 'mongoose';

let Schema = mongoose.Schema;

let todoSchema = new Schema({
    todo : String
});

module.exports = mongoose.model('todo',todoSchema);