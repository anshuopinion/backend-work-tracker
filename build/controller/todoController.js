"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeTodo = exports.updateTodo = exports.addTodo = exports.getTodo = exports.getTodoLists = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Todo_1 = __importDefault(require("../model/Todo"));
const getTodoLists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getTodoLists = getTodoLists;
const getTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.tid;
    try {
        const todo = yield Todo_1.default.findById(todoId);
        if (!todo)
            return next(http_errors_1.default(404, "todo not found"));
        res.status(200).json(todo);
    }
    catch (error) {
        return next(http_errors_1.default(501, error));
    }
});
exports.getTodo = getTodo;
const addTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
        }
        catch (error) {
            return next(http_errors_1.default(500, error));
        }
    }
    catch (error) {
        return next(http_errors_1.default(501, error));
    }
});
exports.addTodo = addTodo;
const updateTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.tid;
    const { done, name } = req.body;
    try {
        const todo = yield Todo_1.default.findByIdAndUpdate(todoId, { done, name });
        if (!todo)
            return next(http_errors_1.default(404, "todo not found, Cannot upate"));
        res.status(200).json({ todo });
    }
    catch (error) {
        return next(http_errors_1.default(501, error));
    }
});
exports.updateTodo = updateTodo;
const removeTodo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = req.params.tid;
    try {
        const todo = yield Todo_1.default.findByIdAndDelete(todoId);
        if (!todo)
            return next(http_errors_1.default(404, "todo not found, Cannot delete"));
        res.status(200).json({ message: "deleted" });
    }
    catch (error) {
        return next(http_errors_1.default(501, error));
    }
});
exports.removeTodo = removeTodo;
//# sourceMappingURL=todoController.js.map