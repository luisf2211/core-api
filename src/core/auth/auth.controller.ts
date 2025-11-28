import { Controller, Post, HttpCode, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/http/base-response';
import { AUTH_HEADER } from 'src/common/http/constants';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/login')
  @ApiResponse({ status: 200, description: 'Login OK' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiHeader(AUTH_HEADER)
  @HttpCode(200)
  login(): BaseResponse<AuthResponseDto | null> {
    const auth =  this.authService.authenticate();

    if (auth) {
      return new BaseResponse(true, 'Login successful', auth);
    }

    const badRequestException = new BaseResponse(false, 'Authentication failed', null);
 
    throw new BadRequestException(badRequestException);
  }
}
