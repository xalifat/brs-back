import { User } from "../models/user.model.js";

const usersController = {
  getUser: async (req, res) => {
    try {
      const user = await User.find();
      res.json(user);
    } catch (error) {
      res.status(401).json({ error: "Ошибка при показе пользователей" });
    }
  },
};

export default usersController;