import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostulacionDto {
  @ApiProperty({
    description: 'ID de la vacante a la que se postula',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsNotEmpty()
  @IsString()
  vacanteId: string;
}
