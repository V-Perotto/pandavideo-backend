import { mongoose } from "mongoose";

const userModel = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
}, { timestamps: {} });

export default mongoose.model('User', userModel);
