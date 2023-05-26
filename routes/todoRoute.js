const todoController = require("../controllers/todoControllers");
const authMiddleware = require("../middleware/index");
const router = require("express").Router();

router.get("/todos", authMiddleware, todoController.getAll);
router.post("/todos", authMiddleware, todoController.addTodo);
// userRouter.post("/users/login", userController.loginUser);

module.exports = router;