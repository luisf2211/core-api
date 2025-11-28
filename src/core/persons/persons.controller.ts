import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/http/base-response';
import { PersonsService } from './persons.service';
import { PersonDto } from './dtos/person.dto';
import { CreatePersonDto } from './dtos/create-person.dto';

@ApiBearerAuth('access-token')
@ApiTags('Persons')
@Controller()
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Get('/persons')
  @ApiResponse({ status: 200, description: 'List of persons', type: BaseResponse })
  async getAll(): Promise<BaseResponse<PersonDto[]>> {
    const data = await this.personsService.getAll();
    return new BaseResponse(true, 'Persons retrieved', data);
  }

  @Get('/person/:id')
  @ApiResponse({ status: 200, description: 'Single person found', type: BaseResponse })
  @ApiResponse({ status: 404, description: 'Person not found' })
  async getById(@Param('id') id: string): Promise<BaseResponse<PersonDto>> {
    const person = await this.personsService.getById(id);
    return new BaseResponse(true, 'Person retrieved', person);
  }

  @Post('/person')
  @ApiResponse({ status: 201, description: 'Person created', type: BaseResponse })
  @ApiResponse({ status: 400, description: 'Invalid payload' })
  @HttpCode(201)
  async create(@Body() body: CreatePersonDto): Promise<BaseResponse<PersonDto>> {
    const person = await this.personsService.create(body);
    return new BaseResponse(true, 'Person created', person);
  }

  @Put('/person/:id')
  @ApiResponse({ status: 200, description: 'Person updated', type: BaseResponse })
  @ApiResponse({ status: 404, description: 'Person not found' })
  async update(
    @Param('id') id: string,
    @Body() body: CreatePersonDto,
  ): Promise<BaseResponse<null>> {
    await this.personsService.update(id, body);
    return new BaseResponse(true, 'Person updated');
  }

  @Delete('/person/:id')
  @ApiResponse({ status: 200, description: 'Person deleted', type: BaseResponse })
  @ApiResponse({ status: 404, description: 'Person not found' })
  async delete(@Param('id') id: string): Promise<BaseResponse<null>> {
    await this.personsService.delete(id);
    return new BaseResponse(true, 'Person deleted');
  }
}
