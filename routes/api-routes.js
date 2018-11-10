const db = require('../models/');
const RestfulAPI = require('./RestClass');

module.exports = function (app) {

    const message = new RestfulAPI('message', app, db.Message);
    message.find();
    message.create();

    const chat = new RestfulAPI('chat', app, db.Chat);
    chat.find();
    chat.create();

}
