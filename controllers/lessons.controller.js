

const lessonsControllers = {
    getAllLessons: async (req, res) => {
        const lessons = await Lesson.find();
        res.json(lessons);
    },

    addLesson: async (req, res) => {
        const { title } = req.body;
        try{
            const lesson = await Lesson.create({
title,
            }) 
            return res.json(lesson);
        } catch(error) {
            return res.status(401).json({error: error.message});
        }
    },
}