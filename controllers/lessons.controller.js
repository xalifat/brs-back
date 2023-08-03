import { Lesson } from "../models/lesson.model.js";

const lessonsController = {
  getAllLessons: async (req, res) => {
    const lessons = await Lesson.find();
    res.json(lessons);
  },

  addLesson: async (req, res) => {
    const { title } = req.body;
    try {
      const lesson = await Lesson.create({
        title,
      });
      return res.json(lesson);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },
  updateLesson: async (req, res) => {
    const { lessonId } = req.params;
    const { title } = req.body;

    try {
      const lesson = await Lesson.findByIdAndUpdate(
        lessonId,
        { title },
        { new: true }
      );

      if (!lesson) {
        return res.status(404).json({ error: "Предмет не найден" });
      }

      return res.json(lesson);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },
  deleteLesson: async (req, res) => {
    const { lessonId } = req.params;

    try {
      const lesson = await Lesson.findByIdAndDelete(lessonId);

      if (!lesson) {
        return res.status(404).json({ error: "Предмет не найден" });
      }

      return res.json({ message: "Предмет удален" });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  },
};

export default lessonsController;