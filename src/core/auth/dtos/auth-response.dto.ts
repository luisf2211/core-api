import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  
  @ApiProperty({ description: 'Access token for authenticated requests' })
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
