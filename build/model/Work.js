"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const WorkSchmea = new mongoose_1.Schema({
    work_name: { type: String, required: true },
    work_color: { type: String, required: true },
    work_complete_date: { type: Date, required: true },
}, { timestamps: true });
exports.default = mongoose_1.model("Work", WorkSchmea);
//# sourceMappingURL=Work.js.map