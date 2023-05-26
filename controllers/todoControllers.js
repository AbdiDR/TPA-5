const { Todo, Users } = require("../database/models");

// const bcrypt = require("bcrypt");
// const jwtHelper = require("../helper/jwtHelper");
console.log(Todo);
const addTodo = async (req, res) => {
  try {
    const user = req.user;
    const { title, description, status } = req.body;
    console.log({
      user,
      title,
      description,
      status,
    });

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todo.create({
      title,
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

const getByid = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todo.findByPk(id);

    console.log(todo);

    if (!todo) {
      return res.status(404).json({
        message: "Data tidak ditemukan!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Berhasil mendapatkan dengan ID",
      todo,
    });
  } catch (error) {}
};

const putByid = async (req, res) => {
  try {
    const user = req.user;
    const { title, description, status } = req.body;
    const id = req.params.id;

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    //   const todo = await getByid(req);
    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        message: "Data tidak ditemukan!",
      });
    }
    await Todo.update(
      {
        title,
        description,
        status,
      },
      {
        where: { id },
      }
    );

    return res.status(200).json({
      success: true,
      message: "Berhasil update",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteByid = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todo.findByPk(id);

    if (!todo) {
      return res.status(404).json({
        message: "Data tidak ditemukan!",
      });
    }
    await Todo.destroy({
      where: { id },
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteAll = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "User tidak ada!",
      });
    }

    const todo = await Todo.findAll();
    console.log(todo)

    if (todo.length < 1) {
      return res.status(404).json({
        message: "Data tidak ditemukan!",
      });
    }
    await Todo.destroy({
      //   where: { id },
      where: {},
      truncate: true,
    });

    return res.status(200).json({
      success: true,
      message: "Berhasil menghapus semua todo",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addTodo,
  getAll,
  getByid,
  putByid,
  deleteByid,
  deleteAll,
};
