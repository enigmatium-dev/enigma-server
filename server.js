"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const server = app.listen(process.env.PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(`/ping`, (req, res) => {
    res.status(200).json({ message: 'Ping OK' });
});
app.use((req, res) => {
    res.status(404).send('Not found');
});
