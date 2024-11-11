import jwt, { JwtPayload } from 'jsonwebtoken';

export const decodeToken = (token: string| any): JwtPayload | null => {
    return jwt.decode(token, { complete: true })?.payload as JwtPayload | null;
};