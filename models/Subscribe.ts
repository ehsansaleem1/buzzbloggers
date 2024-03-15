import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const subSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  }
});

const subModel = mongoose.models.subscribers || mongoose.model("subscribers", subSchema);

export default subModel;
