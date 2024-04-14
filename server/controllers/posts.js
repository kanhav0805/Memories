//now we will import our model of the post
import mongoose from "mongoose";
import PostMessage from "../models/postMesage.js";

export const getPosts = async (req, res) => {
  //always there will be try and catch block
  try {
    //first get all the posts stored in the array
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  //get the id
  const { id: _id } = req.params;
  const post = req.body;
  //check if the particular id is there in mongo
  if (!mongoose.Types.ObjectId.isValid(_id))
    res.status(404).send("No Post with that id");
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });
  res.status(200).json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Post with that id");

  try {
    // Find and delete the post
    const deletedPost = await PostMessage.findByIdAndDelete(_id);

    // Check if the post exists
    if (!deletedPost) {
      return res.status(404).send("No Post found with that id");
    }

    // Send the deleted post as a response
    res.json(deletedPost);
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error("Error deleting post:", error);
    res.status(500).send("Error deleting post");
  }
};
