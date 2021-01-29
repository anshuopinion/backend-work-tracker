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
exports.addDay = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const Day_1 = __importDefault(require("../model/Day"));
const Work_1 = __importDefault(require("../model/Work"));
const addDay = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const workId = req.params.wid;
    try {
        const date = new Date().toLocaleDateString().split("/").join("-");
        const work = yield Work_1.default.findById(workId);
        if (!work)
            return next(http_errors_1.default(404, "work not found"));
        const dayExist = work.days.filter((day) => day.date !== date);
        if (dayExist)
            return next(http_errors_1.default(407, "day already exist"));
        const day = new Day_1.default({ date });
        yield day.save();
        work.days.push(day);
        work.save();
        res.status(201).json(day);
    }
    catch (error) {
        return next(http_errors_1.default(501, error));
    }
});
exports.addDay = addDay;
//# sourceMappingURL=dayController.js.map