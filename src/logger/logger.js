"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "crash.log", level: "error" }),
    ],
});
exports.default = logger;
