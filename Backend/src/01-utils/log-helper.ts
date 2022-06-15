import { createLogger, transports, format } from 'winston'
import config from './config'

const logger = createLogger({
    level: 'info',
    transports: [
        new transports.File({ filename: config.logFile })
    ],
    format: format.combine(
        format.timestamp({ format: 'YYYY:MM:DD hh:mm:ss' }),
        format.printf(log => `${log.level}\t${log.timestamp}\t${log.message}`)
    )
})




export default logger