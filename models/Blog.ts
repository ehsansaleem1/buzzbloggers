import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postedon: {
    type: Date,
    default: Date.now()
  },
});

const blogModel = mongoose.models.blogs || mongoose.model("blogs", blogSchema);

export default blogModel;
