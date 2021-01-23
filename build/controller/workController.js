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
exports.getWorkById = exports.deleteWork = exports.addNewWork = exports.getWorksByUserId = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = require("mongoose");
const User_1 = __importDefault(require("../model/User"));
const Work_1 = __importDefault(require("../model/Work"));
const getWorksByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.uid;
    let user;
    try {
        user = yield User_1.default.findById(userId).populate("works");
    }
    catch (error) {
        return next(http_errors_1.default(501, "Something went wrong | Unable to find user"));
    }
    if (!user)
        return next(http_errors_1.default(404, "User not found | Invalid user"));
    return res.status(200).json(user.works);
});
exports.getWorksByUserId = getWorksByUserId;
const addNewWork = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.uid;
    const { work_name, work_color, work_complete_date } = req.body;
    const currentDate = new Date();
    const recivedDate = new Date(work_complete_date);
    const diffTime = Math.abs(recivedDate - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let user;
    try {
        user = yield User_1.default.findById(userId);
    }
    catch (error) {
        return next(http_errors_1.default(501, "Something went wrong | Unable to find user"));
    }
    if (!user)
        return next(http_errors_1.default(404, "User not found | Invalid user"));
    const days = [];
    const yesterday = new Date(currentDate.setDate(currentDate.getDate() - 1));
    for (let i = 0; i <= diffDays - 1; i++) {
        const day = new Date(yesterday.setDate(yesterday.getDate() + 1)).toLocaleDateString();
        days.push({ date: day });
    }
    console.log(days);
    const newWork = new Work_1.default({
        work_name,
        work_color,
        work_complete_date,
        days,
    });
    try {
        const sess = yield mongoose_1.startSession();
        sess.startTransaction();
        yield newWork.save({ session: sess });
        user.works.push(newWork);
        yield user.save();
        yield sess.commitTransaction();
    }
    catch (error) {
        return next(http_errors_1.default(500, "Unable to create work, Try Again later."));
    }
    res.status(201).json(newWork);
});
exports.addNewWork = addNewWork;
const deleteWork = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const workId = req.params.wid;
    try {
        yield Work_1.default.findByIdAndDelete(workId);
    }
    catch (error) {
        return next(http_errors_1.default(501, "Something went wrong | Unable to delele work"));
    }
    res.status(200).json({ message: "deleted SuccessFully" });
});
exports.deleteWork = deleteWork;
const getWorkById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const workId = req.params.wid;
    try {
        const work = yield Work_1.default.findById(workId);
        if (!work)
            return next(http_errors_1.default(404, "Work Not found"));
        res.status(200).json(work);
    }
    catch (error) {
        return next(http_errors_1.default(501, "Something went wrong ! Unable to find work"));
    }
});
exports.getWorkById = getWorkById;
//# sourceMappingURL=workController.js.map