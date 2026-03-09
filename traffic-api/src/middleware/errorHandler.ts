import logger from "../logger";

export const notFoundHandler = (req: any, res: any, next: any) => {
    res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.originalUrl}`,
    });
}


export const errorHandler = (err: any, req: any, res: any, next: any) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    logger.error(`Error: ${message}, Status Code: ${statusCode}`);
    res.status(statusCode).json({
        error: message,
        ...(process.env.NODE_ENV !== 'development' && {
            stack: err.stack,
        })
    })
}