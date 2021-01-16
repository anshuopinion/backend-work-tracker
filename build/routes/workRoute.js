"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workController_1 = require("../controller/workController");
const router = express_1.Router();
router.get("/all/:uid", workController_1.getWorksByUserId);
router.post("/create/:uid", workController_1.addNewWork);
router.delete("/remove/:wid", workController_1.deleteWork);
exports.default = router;
//# sourceMappingURL=workRoute.js.map