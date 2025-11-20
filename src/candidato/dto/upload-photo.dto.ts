import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadPhotoDto {
  @ApiProperty({
    description: 'Imagen en base64',
    example: 'data:image/jpeg;base64,/9j/4AAQSkZJRg...',
  })
  @IsNotEmpty()
  @IsString()
  imageData: string;
}
