class ErrorModel {
    status: number
    message: string

    constructor(status: number, message: string) {
        this.status = status
        this.message = message
    }
}

export default ErrorModel