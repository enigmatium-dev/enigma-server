"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureMessageDate = void 0;
exports.getTime = getTime;
function getTime() {
    return new Date().toLocaleTimeString('uk-UA');
}
const configureMessageDate = () => {
    const date = new Date();
    const createdAt = date.getTime();
    const day = date.toISOString().split('T')[0];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const time = `${hours}:${minutes}`;
    return {
        createdAt,
        date: {
            day,
            time,
        },
    };
};
exports.configureMessageDate = configureMessageDate;
