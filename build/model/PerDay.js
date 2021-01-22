"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PerDay = new mongoose_1.Schema({
    todo: [
        {
            name: { type: String, required: true },
            done: { type: Boolean, required: true },
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.model("PerDay", PerDay);
//# sourceMappingURL=PerDay.js.map