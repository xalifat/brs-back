import { Router } from "express";
import journalController from "../controllers/journal.controller";
const router = Router();

router.get("/journal", journalController.getJournal); //показ журнала

export default router;
