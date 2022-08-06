import dotenv from 'dotenv'
class Config {

}

class DevelopmentConfig extends Config {
    isDevelopment = true
    logFile = 'logger.log'
    connectionString = process.env.MONGODB_URI
}

class ProductionConfig extends Config {
    isDevelopment = false
    logFile = 'logger.log'
    connectionString = process.env.MONGODB_URI
}

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()
export default config