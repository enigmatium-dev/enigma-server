"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const socketio_1 = require("./lib/socketio");
const logger_1 = __importDefault(require("./helpers/logger"));
const app = (0, express_1.default)();
const server = app.listen(process.env.PORT);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, socketio_1.initSocketServer)(server);
const io = (0, socketio_1.getSocketServer)();
app.use(`/ping`, (req, res) => {
    res.status(200).json({ message: 'Ping OK' });
});
app.use((req, res) => {
    res.status(404).send('Not found');
});
io.on('connection', (socket) => {
    socket.on('message', (data) => {
        logger_1.default.b('incoming message', data);
        socket.emit('message', data);
    });
    socket.conn.once('upgrade', () => {
        logger_1.default.b('connection: upgrade', socket.conn.transport.name);
    });
    socket.conn.on('packet', ({ type, data }) => {
        logger_1.default.b('connection: packet');
    });
    socket.conn.on('packetCreate', ({ type, data }) => {
        logger_1.default.b('connection: packetCreate');
    });
    socket.conn.on('drain', () => {
        logger_1.default.b('connection: drain');
    });
    socket.conn.on('heartbeat', () => {
        logger_1.default.b('connection: heartbeat');
    });
    socket.conn.on('close', (reason) => {
        logger_1.default.b('connection: close > reason', reason);
    });
});
