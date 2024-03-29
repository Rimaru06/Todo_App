"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/user', UserRoutes_1.default);
app.get('/', (req, res) => {
    res.send("Hello World");
});
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.listen(config_1.PORT, () => {
    console.log("listening on port " + config_1.PORT);
});
