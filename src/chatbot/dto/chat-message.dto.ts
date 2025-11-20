import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ChatMessageDto {
  @ApiProperty({ 
    description: 'Mensaje del usuario', 
    example: '¿Cómo puedo postularme a una vacante?' 
  })
  @IsNotEmpty()
  @IsString()
  mensaje: string;

  @ApiProperty({ 
    description: 'ID de sesión para mantener contexto (opcional)', 
    example: 'uuid-1234-5678',
    required: false 
  })
  @IsOptional()
  @IsString()
  sessionId?: string;
}
