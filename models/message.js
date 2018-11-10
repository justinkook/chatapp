var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
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

var Message = mongoose.model("Message", MessageSchema);

module.exports = Message;