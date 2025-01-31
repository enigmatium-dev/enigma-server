"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_1 = require("./date");
const colors = {
    red: '\x1b[31m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m',
    blue: '\x1b[36m%s\x1b[0m',
};
const logToConsole = (color, msg, data) => {
    const time = (0, date_1.getTime)();
    const msgWithTime = `[${time}] ${msg}`;
    console.log(color, msgWithTime, data ? data : '');
};
const logger = {
    r: (msg, data) => logToConsole(colors.red, msg, data),
    g: (msg, data) => logToConsole(colors.green, msg, data),
    y: (msg, data) => logToConsole(colors.yellow, msg, data),
    b: (msg, data) => logToConsole(colors.blue, msg, data),
};
exports.default = logger;
