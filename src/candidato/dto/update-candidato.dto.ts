import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateCandidatoDto {
  @ApiProperty({ example: 'Full Stack Developer', required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ example: 'Desarrollador apasionado por la tecnología...', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: 'Ciudad de México', required: false })
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @ApiProperty({ example: 'https://example.com/foto.jpg', required: false })
  @IsOptional()
  @IsUrl()
  foto_perfil_url?: string;
}
