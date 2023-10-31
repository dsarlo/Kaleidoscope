import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IRequest } from '../types';  // Adjust the import path accordingly

export function authenticateJWT(req: IRequest, res: Response, next: NextFunction) {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ error: 'Forbidden' });  // Forbiddenx
        }

        req.user = user;
        next();
    });
}