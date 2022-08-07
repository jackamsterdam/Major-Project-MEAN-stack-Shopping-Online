import dotenv from 'dotenv'
class Config {

}

class DevelopmentConfig extends Config {
    isDevelopment = true
    logFile = 'logger.log'
    connectionString = "mongodb+srv://shopinig:shopingcluster@shopingcluster.ux98rij.mongodb.net/?retryWrites=true"
}

class ProductionConfig extends Config {
    isDevelopment = false
    logFile = 'logger.log'
    // connectionString = process.env.MONGODB_URI
    connectionString = "mongodb+srv://shopinig:shopingcluster@shopingcluster.ux98rij.mongodb.net/?retryWrites=true"
}

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()
export default config