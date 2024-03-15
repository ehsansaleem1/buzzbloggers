import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: { type: String }
    },
  ],
});

userSchema.methods.generateAuthToken = async function () {
  console.log(this._id)
  const plainObject = {
    _id: this._id
  }
  const token = jwt.sign(plainObject, "ehsansaleemisaverygoodyoutuberandgoodboy");
  this.tokens = this.tokens.concat({ token: token });
  await this.save()
  return token
}

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
