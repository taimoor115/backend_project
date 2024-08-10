class ApiError extends Error { 
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        statck = "",
    ) { 
            super(message)
            this.statusCode = statusCode,
            this.date = null,
            this.success = false,
            this.message = message,
            this.errors = errors
        if (stack) {
            this.stack = statck
        } else { 
            Error.captureStackTrace(this, this.constructor)
        }
        
    }
}