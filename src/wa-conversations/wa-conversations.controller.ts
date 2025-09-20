import { Body, Controller, Post, Res } from '@nestjs/common';
import { WaConversationsService } from './wa-conversations.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import type { Response } from 'express';

@Controller('wa-conversations')
export class WaConversationsController {
  constructor(
    private readonly waConversationsService: WaConversationsService,
  ) {}

  @Post()
  async createConversation(
    @Res() res: Response,
    @Body() body: CreateConversationDto,
  ) {
    try {
      const conversation =
        await this.waConversationsService.createConversation(body);
      return res.status(201).json(conversation);
    } catch (error) {
      console.error('Error creating conversation:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
