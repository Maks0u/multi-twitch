import winston from 'winston';

let logLevel = 'debug';
logLevel = ['error', 'warn', 'info', 'http', 'verbose', 'debug', 'silly'].includes(logLevel) ? logLevel : 'info';

const defaultFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.colorize(),
    winston.format.printf((log) => `${log.timestamp} \u00b7 ${log.level} \u00b7 ${log.message}`)
);

export default winston.createLogger({
    format: defaultFormat,
    transports: [
        new winston.transports.Console({
            level: logLevel,
        }),
        new winston.transports.File({
            filename: 'logs/debug.log',
            maxsize: 100000,
            maxFiles: 2,
            level: 'debug',
        }),
        new winston.transports.File({
            filename: 'logs/info.log',
            maxsize: 100000,
            maxFiles: 2,
            level: 'info',
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            maxsize: 100000,
            maxFiles: 2,
            level: 'warn',
        }),
    ],
});
