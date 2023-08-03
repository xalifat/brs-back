import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  login: { type: String, require: true, unique: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  surName: { type: String, require: true },
  role: { type: String, default: "user" },
  password: { type: String, require: true },
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
    },
  ],
});

export const User = mongoose.model("User", userSchema);
