import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class BasicAuthMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {

        const header = req.headers['token'];

        if (!header) {
            throw new UnauthorizedException('Missing Basic Auth header');
        }

        const decoded = Buffer.from(header, 'base64').toString('utf8');

        const [clientId, clientSecret] = decoded.split(':');

        if (!clientId || !clientSecret) {
            throw new UnauthorizedException('Invalid Basic Auth format');
        }

        if (
            clientId !== process.env.CLIENT_ID ||
            clientSecret !== process.env.CLIENT_SECRET
        ) {
            throw new UnauthorizedException('Invalid client credentials');
        }

        next();
    }
}
