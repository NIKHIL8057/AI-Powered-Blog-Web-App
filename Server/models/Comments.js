import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
     blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
     },
     name: {
        type: String,
        required: true
     },
     content: {
        type: String,
        required: true
     },
     isApproved: {
        type: Boolean,
        default: false
     }
}, { timestamps: true });

const Comments = mongoose.model("Comments", commentsSchema);

export default Comments;