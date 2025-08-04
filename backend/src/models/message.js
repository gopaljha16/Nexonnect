const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = Schema({
    sender:
    {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    content:{
        type:String,
    },
    timestamp:{
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['sent', 'delivered', 'seen'],
        default: 'sent'
    },
    // For group messages
    group: {
        type: Schema.Types.ObjectId,
        ref: 'group'
    },
    // For private messages
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
})

const Message = mongoose.model("message" , messageSchema);
module.exports = Message;