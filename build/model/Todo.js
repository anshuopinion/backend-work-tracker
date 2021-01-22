"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Todo = new mongoose_1.Schema({
    name: { type: String, required: true },
    done: { type: Boolean, required: true },
});
exports.default = mongoose_1.model("todo", Todo);
//# sourceMappingURL=Todo.js.map