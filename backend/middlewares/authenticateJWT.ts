import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IRequest } from '../types';  // Adjust the import path accordingly

export function authenticateJWT(req: IRequest, res: Response, next: NextFunction) {
    if(req.body.width && req.body.height) return next(); //skipping auth to see if this is the only error
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
