//here we will generate the structure of our post

import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

//now we will convert the post schema to model
const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
