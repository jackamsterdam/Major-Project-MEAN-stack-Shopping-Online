class Config {

}

class DevelopmentConfig extends Config {
    isDevelopment = true
    logFile = 'logger.log'
    connectionString = 'mongodb://localhost:27017/ShoppingOnlineDB'
}

class ProductionConfig extends Config {
    isDevelopment = false
    logFile = 'logger.log'
    connectionString = 'mongodb://localhost:27017/ShoppingOnlineDB'
}

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()
export default config