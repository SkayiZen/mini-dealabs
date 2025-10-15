import winston from "winston";
import fs from "fs";
import path from "path";

// Dossier de logs
const logDir = "logs";

// Création du dossier s’il n’existe pas
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Définition des niveaux personnalisés
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    success: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    error: "red",
    warn: "yellow",
    success: "green",
    info: "cyan",
    debug: "gray",
  },
};

// Application des couleurs aux logs console
winston.addColors(customLevels.colors);

// Format de base sans couleur
const plainFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] ${level.toUpperCase()} - ${message}`;
});

// Format coloré (uniquement pour la console)
const colorizedFormat = winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    plainFormat
);

// Format non coloré (pour les fichiers)
const fileFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    plainFormat
);

// Création du logger
export const logger = winston.createLogger({
  levels: customLevels.levels,
  level: "debug",
  transports: [
    // 1️⃣ Console (en couleur)
    new winston.transports.Console({
      format: colorizedFormat,
      handleExceptions: true,
    }),

    // 2️⃣ Fichier global (sans couleur)
    new winston.transports.File({
      filename: path.join(logDir, "app.log"),
      level: "debug",
      format: fileFormat,
      handleExceptions: true,
    }),

    // 3️⃣ Fichiers spécifiques par niveau (sans couleur)
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, "warn.log"),
      level: "warn",
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, "success.log"),
      level: "success",
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, "info.log"),
      level: "info",
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: path.join(logDir, "debug.log"),
      level: "debug",
      format: fileFormat,
    }),
  ],
  exitOnError: false,
});

// Méthodes simplifiées d'accès aux logs
logger.error = (msg) => logger.log("error", msg);
logger.warn = (msg) => logger.log("warn", msg);
logger.success = (msg) => logger.log("success", msg);
logger.info = (msg) => logger.log("info", msg);
logger.debug = (msg) => logger.log("debug", msg);
