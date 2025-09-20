import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { WaConversationsService } from './wa-conversations.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import type { Response } from 'express';

@ApiTags('wa-conversations')
@Controller('wa-conversations')
export class WaConversationsController {
  constructor(
    private readonly waConversationsService: WaConversationsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new WhatsApp conversation',
    description:
      'Creates a new conversation with the provided phone number and contact name',
  })
  @ApiBody({
    type: CreateConversationDto,
    description: 'Conversation data including phone number and contact name',
  })
  @ApiCreatedResponse({
    description: 'Conversation created successfully',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string', description: 'Conversation ID' },
        status: {
          type: 'string',
          enum: ['ACTIVE', 'WAITING_RESPONSE', 'CLOSED'],
          description: 'Current status of the conversation',
        },
        phoneNumber: { type: 'string', description: 'Phone number' },
        contactName: { type: 'string', description: 'Contact name' },
        creationDate: {
          type: 'string',
          format: 'date-time',
          description: 'When the conversation was created',
        },
        lastActivity: {
          type: 'string',
          format: 'date-time',
          description: 'Last activity timestamp',
        },
        unreadCount: {
          type: 'number',
          description: 'Number of unread messages',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        error: { type: 'string', example: 'Internal Server Error' },
      },
    },
  })
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
