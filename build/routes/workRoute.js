"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controller/todoController");
const workController_1 = require("../controller/workController");
const router = express_1.Router();
router.get("/:wid", workController_1.getWorkById);
router.get("/all/:uid", workController_1.getWorksByUserId);
router.post("/create/:uid", workController_1.addNewWork);
router.delete("/remove/:wid", workController_1.deleteWork);
router.get("/todos/:did", todoController_1.getTodoLists);
router.get("/todo/:tid", todoController_1.getTodo);
router.post("/todo/:wid", todoController_1.addTodo);
router.put("/todo/:tid", todoController_1.updateTodo);
router.delete("/todo/:tid", todoController_1.removeTodo);
exports.default = router;
//# sourceMappingURL=workRoute.js.map