"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const workRoute_1 = __importDefault(require("./routes/workRoute"));
const http_errors_1 = __importDefault(require("http-errors"));
const config_1 = require("./config");
const app = express_1.default();
const port = config_1.PORT || 9000;
app.use(morgan_1.default("tiny"));
app.use(cors_1.default({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookie_parser_1.default());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "working" });
});
app.use("/api/user", userRoute_1.default);
app.use("/api/work", workRoute_1.default);
app.use(() => {
    const error = http_errors_1.default(404, "Could not find this route");
    throw error;
});
const errorHandler = (error, req, res, next) => {
    console.log(error.message);
    if (res.headersSent) {
        return next(error);
    }
    res
        .status(error.code || 500)
        .json({ message: error.message || "An Unknown error occured" });
};
app.use(errorHandler);
mongoose_1.default
    .connect(config_1.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
})
    .then(() => {
    console.log("Connected to db");
    app.listen(port, () => {
        console.log(`Listening On Port ${port}`);
    });
})
    .catch(() => {
    throw http_errors_1.default(501, "Unable to connect database");
});
//# sourceMappingURL=index.js.map