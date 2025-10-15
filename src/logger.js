import winston from "winston";
import fs from "fs";
import path from "path";

const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const logFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toUpperCase()} - ${message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: path.join(logDir, "app.log"),
      handleExceptions: true,
    }),
  ],
  exitOnError: false,
});
