var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RealTimeChatSchema = new Schema(
    {

        sender: {
            type: String,
            trim: true
        },
        message: {
            type: String,
            trim: true
        },

    }
);

var RealTimeChat = mongoose.model("RealTimeChat", RealTimeChatSchema);

module.exports = RealTimeChat;