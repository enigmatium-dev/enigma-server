"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
app.use(`/ping`, (req, res) => {
    res.status(200).json({ message: 'Ping OK' });
});
io.use((socket, next) => {
    let handshake = socket.handshake;
    console.log('io.use handshake', handshake);
});
io.on('connection', (socket) => {
    let handshake = socket.handshake;
    console.log('connection handshake', handshake);
    console.log('initial transport', socket.conn.transport.name);
    socket.conn.once('upgrade', () => {
        console.log('upgraded transport', socket.conn.transport.name);
    });
    socket.conn.on('packet', ({ type, data }) => {
    });
    socket.conn.on('packetCreate', ({ type, data }) => {
    });
    socket.conn.on('drain', () => {
    });
    socket.conn.on('heartbeat', () => {
        console.log('heartbeat');
    });
    socket.conn.on('close', (reason) => {
    });
});
const PORT = process.env.PORT || 8080;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
