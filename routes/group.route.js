import { Router } from "express";
import groupController from "../controllers/group.controller.js";

const router = Router();

router.get("/groups", groupController.getGroup); //показ всех групп
router.get("/group/:id", groupController.getGroupsById); //показ одной группы
router.post("/group", groupController.postGroup); //создание группы
router.patch("/group/:id", groupController.patchGroup); //изменение группы
router.delete("/group/:id", groupController.deleteGroup); //удаление группы
router.post("/group/:id/add-user/:userId", groupController.addUserInGroup); //добавление пользователя в группу
router.delete("/group/:id/delete-user/:userId", groupController.deleteUserFromGroup); //удаление пользователя из группы
router.post("/group/:id/add-lesson/:lessonId", groupController.addLessonInGroup); //добавление предмета в группу
router.delete("/group/:id/delete-lesson/:lessonId", groupController.deleteLessonFromGroup); //удаление предмета из группы

export default router;
