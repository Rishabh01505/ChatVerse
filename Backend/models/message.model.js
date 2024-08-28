//defining database for the messages
//sender id, receiver id, messsage, id for each message
import mongoose from "mongoose";

//get these from our mongodb database
const messageSchema=new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
        },
}, {timestamps: true});

const Message = mongoose.model("message", messageSchema);

export default Message;