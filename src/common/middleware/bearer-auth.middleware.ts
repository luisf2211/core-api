import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class BearerAuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {

        const header = req.headers['authorization'];

        if (!header || !header.startsWith('Bearer ')) {
            throw new UnauthorizedException('Missing Basic Auth header');
        }

        const token = header.split(' ')[1];

        try {
            const payload = jwt.verify(token, process.env.CLIENT_SECRET);
            req.user = payload;
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        next();
    }
}
