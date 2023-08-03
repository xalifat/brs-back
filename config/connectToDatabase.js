import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("Успешно соединились с сервером MongoDB");
  } catch (error) {
    console.log("Ошибка при соединении с сервером MongoDB", error.message);
  }
}