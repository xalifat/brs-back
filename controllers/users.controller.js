import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const usersController = {
  registUser: async (req, res) => {
    const { firstName, lastName, surName, password, login } = req.body;
    const hash = await bcrypt.hash(password, +process.env.BCRYPT_ROUNDS);
    try {
      const user = await User.create({
        firstName,
        lastName,
        surName,
        password: hash,
        login,
      });
      res.json(user);
    } catch (error) {
      res.status(401).json({ error: "Ошибка при регистрации" + error.message });
    }
  },

  login: async (req, res) => {
    const { password, login } = req.body;

    const candidate = await User.findOne({ login });
    if (!candidate) {
      return res.status(401).json("Неверный логин");
    }
    const valid = await bcrypt.compare(password, candidate.password);
    if (!valid) {
      return res.status(401).json("Неверный пароль");
    }

    const payload = {
      id: candidate._id,
      login: candidate.login,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      surName: candidate.surName,
    };

    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: "24h",
    });
    res.json(token);
  },

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
