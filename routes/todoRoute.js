const todoController = require("../controllers/todoControllers");
const authMiddleware = require("../middleware/index");
const router = require("express").Router();

router.get("/todos", authMiddleware, todoController.getAll);
router.post("/todos", authMiddleware, todoController.addTodo);
router.get("/todos/:id", authMiddleware, todoController.getByid);
router.put("/todos/:id", authMiddleware, todoController.putByid);
router.delete("/todos/:id", authMiddleware, todoController.deleteByid);
router.delete("/todos", authMiddleware, todoController.deleteAll);

module.exports = router;