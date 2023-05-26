const { Todo, Users } = require("../database/models");

// const bcrypt = require("bcrypt");
// const jwtHelper = require("../helper/jwtHelper");
console.log(Todo);
const addTodo = async (req, res) => {
  try {
    const user = req.user;
    const { name, description, status } = req.body;
    console.log({
      user,
      name,
      description,
      status,
    });

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todo.create({
      name,
      description,
      status,
      user_id: user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil menambahkan todo!",
      todo,
    });
  } catch (error) {}
};

const getAll = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todo.findAll({
      include: [
        {
          model: Users,
          as: "createdBy",
          attributes: ["id", "name"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {}
};

module.exports = {
  addTodo,
  getAll,
};
