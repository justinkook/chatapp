const db = require('../models/');
const RestfulAPI = require('./RestClass');

module.exports = function (app) {

    const realTimeChat = new RestfulAPI('realTimeChat', app, db.RealTimeChat);
    realTimeChat.find();
    realTimeChat.create();
}