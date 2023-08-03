import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();


import lessonsRouter from './routes/lessons.route.js'
import usersRouter from './routes/users.route.js';
import groupRouter from './routes/group.route.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(usersRouter);
app.use(lessonsRouter);
app.use(groupRouter);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(process.env.PORT, () => {
  console.log("Сервер запущен успешно");
});
