"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
const router = express_1.default.Router();
router.get("*", (req, res) => {
    res.send("Hello World!");
});
app.use(router);
