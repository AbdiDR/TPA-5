const userRouter = require("./userRoute");
const todoRouter = require("./todoRoute")

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("<h1>Selamat Datang!</h1>");
});

router.use(userRouter);
router.use(todoRouter);

module.exports = router;