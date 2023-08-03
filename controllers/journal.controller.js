import { Journal } from "../models/journal.model";

const journalController = {
  getJournal: async (req, res) => {
    try {
      res.json('journalController')
    } catch (error) {
      res.status(401).json({ error: "journalController" });
    }
  },
};

export default journalController;