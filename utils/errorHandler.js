
export default class ErrorHandler extends Error {

    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }

    static handler(err, res) {
        console.error(err.stack);
        const { statusCode, message } = err;
        return res.status(statusCode || 500).json({ 
            status: "error",
            statusCode: statusCode || 500,
            message: message || "Erro interno no Servidor"
        });
    }
}