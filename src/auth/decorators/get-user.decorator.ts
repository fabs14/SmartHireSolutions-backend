import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    
    if (!data) return user;
    
    // Soporte para propiedades anidadas usando dot notation (ej: 'candidato.id') no tocar pls
    return data.split('.').reduce((obj, key) => obj?.[key], user);
  },
);
