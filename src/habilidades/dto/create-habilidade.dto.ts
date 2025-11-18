import { IsString, MinLength, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHabilidadeDto {
  @ApiProperty({ example: 'React', description: 'Nombre de la habilidad' })
  @IsString()
  @MinLength(2)
  nombre: string;

  @ApiProperty({ 
    example: '550e8400-e29b-41d4-a716-446655440000', 
    description: 'ID de la categoría (Frontend, Backend, etc.)',
    required: false 
  })
  @IsOptional()
  @IsUUID()
  categoriaId?: string;
}
