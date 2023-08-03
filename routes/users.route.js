import { Router } from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

router.post('/users', usersController.registUser);
router.post('/login', usersController.login);
router.get('/users', usersController.getUser);


export default router;
