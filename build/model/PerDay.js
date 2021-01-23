"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PerDay = new mongoose_1.Schema({
    todos: [{ type: mongoose_1.Types.ObjectId, required: true, ref: "todo" }],
}, { timestamps: true });
exports.default = mongoose_1.model("perday", PerDay);
//# sourceMappingURL=PerDay.js.map