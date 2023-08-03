import { Group } from "../models/group.model.js";
import { Lesson } from "../models/lesson.model.js";
import { User } from "../models/user.model.js";

const groupController = {
  getGroup: async (req, res) => {
    //показ всех групп
    try {
      const group = await Group.find();
      res.json(group);
    } catch (error) {
      res.status(401).json({ error: "Ошибка при показе групп" });
    }
  },
  getGroupsById: async (req, res) => {
    //показ одной группы
    try {
      const group = await Group.findById(req.params.id).populate("users");
      if (!group) {
        return res.status(401).json({ error: "Группа не найдена" });
      }
      return res.json(group);
    } catch (error) {
      return res.status(401).json({ error: "Ошибка при получении группы" });
    }
  },
  postGroup: async (req, res) => {
    //создание группы
    const { name, users, lessons } = req.body;
    try {
      const group = await Group.create({
        name,
        users,
        lessons,
      });
      return res.json(group);
    } catch (error) {
      return res.status(401).json({ error: "Ошибка при создании группы" });
    }
  },
  patchGroup: async (req, res) => {
    //изменение группы
    const groupId = req.params.id;
    const { name, users, lessons } = req.body;
    try {
      const group = await Group.findByIdAndUpdate(
        groupId,
        { name, users, lessons },
        { new: true }
      );

      if (!group) {
        return res.status(404).json({ error: "Группа не найдена" });
      }
      return res.json(group);
    } catch (error) {
      return res.status(401).json({ error: "Ошибка при изменении группы" });
    }
  },
  deleteGroup: async (req, res) => {
    //удаление группы
    try {
      const groupId = req.params.id;

      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: "Группа не найдена" });
      }
      await Group.findByIdAndRemove(groupId);

      return res.json({ message: "Группа успешно удалена" });
    } catch (error) {
      return res.status(401).json({ error: "Ошибка при удалении группы" });
    }
  },
  addUserInGroup: async (req, res) => {
    //добавление пользователя в группу
    try {
      const groupId = req.params.id;
      const userId = req.params.userId;

      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(401).json({ error: "Группа не найдена" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ error: "Пользователь не найден" });
      }

      if (group.users.includes(userId)) {
        return res
          .status(401)
          .json({ error: "Такой пользователь уже есть в группе" });
      }

      //Добавим айди пользователя в поле users
      group.users.push(userId);
      await group.save();

      // Добавим айди группы в поле groups у пользователя
      user.groups.push(groupId);
      await user.save();

      return res.json(user);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Ошибка при добавлении пользователя в группу" });
    }
  },
  deleteUserFromGroup: async (req, res) => {
    //удаление пользователя из группы
    try {
      const groupId = req.params.id;
      const userId = req.params.userId;

      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: "Группа не найдена" });
      }

      const user = await User.findById(userId);
      if (!user || !group.users.includes(userId)) {
        return res
          .status(404)
          .json({ error: "Пользователь не найден в группе" });
      }

      // Удаляем айди группы из массива group.users
      group.users = group.users.filter((id) => id.toString() !== userId);
      await group.save();

      // Удаляем айди группы из массива user.groups
      user.groups = user.groups.filter((id) => id.toString() !== groupId);
      await user.save();

      return res.json({ message: "Пользователь успешно удален из группы" });
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Ошибка при удалении пользователя из группы" });
    }
  },
  addLessonInGroup: async (req, res) => {
    //добавление предмета в группу
    try {
      const groupId = req.params.id;
      const { lessonId } = req.params;

      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(401).json({ error: "Группа не найдена" });
      }

      const lesson = await Lesson.findById(lessonId);
      if (!lesson) {
        return res.status(401).json({ error: "Предмет не найден" });
      }

      if (group.lessons.includes(lessonId)) {
        return res
          .status(401)
          .json({ error: "Такой предмет уже есть в группе" });
      }

      group.lessons.push(lessonId);
      await group.save();

      return res.json(lesson);
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Ошибка при добавлении предмета в группу" });
    }
  },
  deleteLessonFromGroup: async (req, res) => {
    // Удаление предмета из группы
    try {
      const groupId = req.params.id;
      const {lessonId} = req.params;
  
      const group = await Group.findById(groupId);
      if (!group) {
        return res.status(404).json({ error: "Группа не найдена" });
      }
  
      const lesson = await Lesson.findById(lessonId);
      if (!lesson) {
        return res.status(401).json({ error: "Предмет не найден" });
      }
  
      // Удаляется айди предмета из массива group.lessons
      group.lessons = group.lessons.filter((id) => id.toString() !== lessonId);
      await group.save();
  
      return res.json({ message: "Предмет успешно удален из группы" });
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Ошибка при удалении предмета из группы" });
    }
  },
};

export default groupController;
