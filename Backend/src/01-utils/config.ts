class Config {

}

class DevelopmentConfig extends Config {
    isDevelopment = true
    logFile = 'logger.log'
    connectionString = 'mongodb://localhost:27017/_________'
}

class ProductionConfig extends Config {
    isDevelopment = false
    logFile = 'logger.log'
    connectionString = 'mongodb://localhost:27017/________'
}

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()
export default config