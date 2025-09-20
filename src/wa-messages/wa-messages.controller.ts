import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreateMessageDto } from './dtos/create-message.dto';
import { WaMessagesService } from './wa-messages.service';

@Controller('wa-messages')
export class WaMessagesController {
  constructor(private readonly waMessagesService: WaMessagesService) {}

  @Post()
  async createMessage(@Res() res: Response, @Body() body: CreateMessageDto) {
    try {
      const message = await this.waMessagesService.createNewMessage(body);
      return res.status(201).json(message);
    } catch (error) {
      console.error('Error creating message:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
