"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dayController_1 = require("../controller/dayController");
const express_1 = require("express");
const router = express_1.Router();
router.get("/:wid", dayController_1.addDay);
exports.default = router;
//# sourceMappingURL=dayRoute.js.map