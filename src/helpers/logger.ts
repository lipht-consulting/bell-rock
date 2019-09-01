import winston = require('winston');
import { format } from 'winston';
const { combine, timestamp, colorize, printf } = format;
const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

export const logger = winston.createLogger({
    level: 'debug',
    format: combine(colorize(), timestamp(), myFormat),
    transports: [new winston.transports.Console()],
});

// Add the file transport, if env variable "CONFIG_LOG_TO_FILE" is set to 1
if (process.env.CONFIG_LOG_TO_FILE === '1') {
    logger.add(
        new winston.transports.File({
            filename: 'output.log',
            maxsize: 5000000, // Max size of log file, in bytes, before a new file will be created.
            maxFiles: 1, // Limit the number of files created when the size of the logfile is exceeded.
        })
    );
}
