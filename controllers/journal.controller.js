import { Journal } from "../models/journal.model";

const journalController = {
  getJournal: async (req, res) => {
    try {
     
    } catch (error) {
      res.status(401).json({ error: "" });
    }
  },
};

export default journalController;