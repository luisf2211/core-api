// src/common/dto/base-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  response?: T;

  constructor(success: boolean, message: string, response?: T) {
    this.success = success;
    this.message = message;
    if (response !== undefined) {
      this.response = response;
    }
  }
}
