import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    shareId: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    tags: [String],
    selectedFile: String,
    likeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    likeCount: {
        type: Number,
        default: 0,
    },
    comments:[{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String },
        replies: [{
            userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
            text: { type: String },
        }],
        createdAt: { type: Date, default: new Date()},

    }],
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const PostMessage = mongoose.model('PostMessage',postSchema);

export default PostMessage;