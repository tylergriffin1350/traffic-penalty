import {createLogger, format, transports} from "winston";

const {combine, timestamp, colorize, printf} = format;
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        colorize(),
        printf(({timestamp, level, message}) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({filename: 'error.log', level: 'error'}),
        new transports.File({filename: 'combined.log'})
    ],
});

export default logger;