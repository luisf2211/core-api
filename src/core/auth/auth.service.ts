import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Injectable()
export class AuthService {
  authenticate(): AuthResponseDto {
    const token = jwt.sign({ sub: 'userId' }, process.env.CLIENT_SECRET, {
      expiresIn: '1h',
    });

    return new AuthResponseDto(token);
  }
}
