import { Router } from "express";
import lessonsController from "../controllers/lessons.controller.js";
const router = Router();

router.get("/lessons", lessonsController.getAllLessons); //получение всех предметов
router.post("/lessons", lessonsController.addLesson); //добавление предмета
router.patch("/lesson/:lessonId", lessonsController.updateLesson); // изменение предмета
router.delete("/lesson/:lessonId", lessonsController.deleteLesson); // удаление предмета

export default router;
