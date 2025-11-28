import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty({
    example: 'Luis',
    description: 'Nombre de la persona',
    type: String,
  })
  name: string;

  @ApiProperty({
    example: 'Reyes',
    description: 'Apellido de la persona',
    type: String,
  })
  lastName: string;

  @ApiProperty({
    example: '8091234567',
    description: 'Número de celular',
    type: String,
  })
  cellphone: string;

  @ApiProperty({
    example: 'luis@example.com',
    description: 'Correo electrónico',
    type: String,
  })
  email: string;

  @ApiProperty({
    example: 'Santo Domingo',
    description: 'Dirección (opcional)',
    type: String,
    required: false,
  })
  address?: string;
}
