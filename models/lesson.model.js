import mongoose from "mongoose";

const LessonShema = new mongoose.Schema({
    title: String,
})

export const Lesson = mongoose.model("Lesson", LessonShema);