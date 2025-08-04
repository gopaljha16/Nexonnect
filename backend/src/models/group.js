const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    memebers: [
        {
            type: Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    avatar:{
        type:String,
    },
},{Timestamp:true});

const Group = mongoose.model("group" , groupSchema);
module.exports = Group;