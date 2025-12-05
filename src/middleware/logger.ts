import { Request, Response, NextFunction } from 'express';
//this is made by samiran chakraborty
export enum LogLevel { INFO = 'INFO', ERROR = 'ERROR' }

const log = (level: LogLevel, message: string, meta?: any) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] ${message}`, meta || '');
};

export const logger = {
    info: (msg: string, meta?: any) => log(LogLevel.INFO, msg, meta),
    error: (msg: string, meta?: any) => log(LogLevel.ERROR, msg, meta)
};

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        logger.info(`${req.method} ${req.url} ${res.statusCode} - ${duration}ms`);
    });
    next();
};

export const errorLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled error', { error: err.message });
    next(err);
};
