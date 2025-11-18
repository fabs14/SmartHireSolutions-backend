import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ChatbotService } from './chatbot.service';
import { ChatMessageDto } from './dto/chat-message.dto';

@ApiTags('chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatbotService: ChatbotService) {}

  @Post('chat')
  @ApiOperation({ summary: 'Enviar mensaje al chatbot - Guía de la plataforma' })
  async chat(@Body() chatMessageDto: ChatMessageDto) {
    return this.chatbotService.chat(chatMessageDto);
  }

  @Get('session/:sessionId/history')
  @ApiOperation({ summary: 'Obtener historial de conversación de una sesión' })
  async getHistory(@Param('sessionId') sessionId: string) {
    return this.chatbotService.getSessionHistory(sessionId);
  }

  @Delete('session/:sessionId')
  @ApiOperation({ summary: 'Limpiar sesión de chat (borrar historial)' })
  async clearSession(@Param('sessionId') sessionId: string) {
    return this.chatbotService.clearSession(sessionId);
  }
}
