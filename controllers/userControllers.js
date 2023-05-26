const { Users } = require("../database/models");
const bcrypt = require("bcrypt");
const jwtHelper = require("../helper/jwtHelper");


const userController = {
  getAll: async (req, res, next) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          message: "User tidak ada!",
        });
      }

      const users = await Users.findAll();
      return res.json({ status: 200, message: "Get all users", users });
    } catch (error) {
      console.log("error:", error);
    }
  },
  addUser: async (req, res, next) => {
    try {

      // ambil body
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(404).json({
          message: "Tolong isi semua input!",
        });
      }

      const isUser = await Users.findOne({
        where: { email: email },
      });

      if (isUser) {
        return res.status(404).json({
          message: "Email sudah terdaftar!",
        });
      }
      
      const hashPassword = await bcrypt.hash(password, 10);

      const user = await Users.create({
        name,
        email,
        password: hashPassword,
      });

      console.log(hashPassword);
      return res.json({
        status: 202,
        message: "Akun berhasil dibuat",
        data: user,
      });
    } catch (error) {
      console.log("error:", error);
    }
  },
  loginUser: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Tolong isi semua input!",
        });
      }

      const user = await Users.findOne({
        where: { email: email },
      });

      if (!user) {
        return res.status(400).json({
          message: "Akun belum terdaftar!",
        });
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return res.status(400).json({
          message: "Password salah!",
        });
      }

      const token = jwtHelper.signIn({
        id: user.id,
      });

      return res.status(200).json({
        message: "Berhasil Login!",
        token,
      });
    } catch (error) {}
  },
};

module.exports = userController;
