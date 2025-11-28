// src/core/persons/dto/person.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class PersonDto {

    @ApiProperty({ example: '507f1f77bcf86cd799439011' })
    _id?: string | ObjectId;

    @ApiProperty({
        example: 'Luis',
        description: 'First name of the person',
    })
    name: string;

    @ApiProperty({
        example: 'Reyes',
        description: 'Last name of the person',
    })
    lastName: string;

    @ApiProperty({
        example: '8091234567',
        description: 'Cellphone number of the person',
    })
    cellphone: string;

    @ApiProperty({
        example: 'luis@example.com',
        description: 'Email address',
    })
    email: string;

    @ApiProperty({
        example: 'Santo Domingo, Dominican Republic',
        description: 'Physical address of the person',
    })
    address?: string;
}
