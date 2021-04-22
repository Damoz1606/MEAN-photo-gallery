"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./routes/router"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config/config");
const app = express_1.default();
//database
mongoose_1.default.connect(config_1.mongoURL(), {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => {
    console.log("Mongo connect");
})
    .catch(err => {
    console.log(err);
});
//settings
app.set("port", config_1.PORT());
//middlewares
app.use(morgan_1.default("dev"));
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
//routes
app.use("/api", router_1.default);
//static
app.use('/uploads', express_1.default.static(path_1.default.resolve("uploads")));
exports.default = app;
