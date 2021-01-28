"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Day = new mongoose_1.Schema({
    date: { type: String, required: true },
    todo: [{ type: mongoose_1.Types.ObjectId, ref: "todo" }],
});
exports.default = mongoose_1.model("day", Day);
//# sourceMappingURL=Day.js.map