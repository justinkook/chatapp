var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ChatSchema = new Schema(
    {

        userNames: {
            type: Object,
            required: true,
            trim: true
        },
        message: [{
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
        ],

    }
);

var Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;