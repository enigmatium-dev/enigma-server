"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocket = exports.getSocketServer = exports.initSocketServer = void 0;
const socket_io_1 = require("socket.io");
const logger_1 = __importDefault(require("../helpers/logger"));
let io;
const initErrMsg = 'Socket server not initialized';
const initSocketServer = (httpServer) => {
    if (io)
        return io;
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    if (io) {
        logger_1.default.b(`✔️ Socket server initialized`);
    }
    io.on('connection', (socket) => {
        logger_1.default.b(`✔️ Connected socket ${socket.id}`);
        socket.conn.on('close', (reason) => {
            logger_1.default.y(`❌ Disconnected socket ${socket.id}. Reason: ${reason}`);
        });
    });
    return io;
};
exports.initSocketServer = initSocketServer;
const getSocketServer = () => {
    if (!io)
        throw new Error(initErrMsg);
    return io;
};
exports.getSocketServer = getSocketServer;
const getSocket = (userId) => {
    if (!io)
        throw new Error(initErrMsg);
    let socket;
    const socketMap = io.sockets.sockets;
    for (let [_, s] of socketMap) {
        if (s.data.userId === userId) {
            socket = s;
            break;
        }
    }
    return socket;
};
exports.getSocket = getSocket;
