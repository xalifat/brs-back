import mongoose from "mongoose";

const journalSchema = mongoose.Schema({
  groupId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Groups",
  }],
  lessonId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lessons",
  }]
});

export const Journal = mongoose.model("Journal", userSchema);
