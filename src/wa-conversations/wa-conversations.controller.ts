import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { WaConversationsService } from './wa-conversations.service';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { ListConversationsDto } from './dtos/list-conversations.dto';
import { ListConversationsResponseDto } from './dtos/conversation-with-last-message.dto';
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

  @Get()
  @ApiOperation({
    summary: 'List WhatsApp conversations',
    description:
      'Get a paginated list of WhatsApp conversations with their last messages. Conversations are sorted by last activity in descending order.',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (1-based)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of conversations per page (max 100)',
    example: 10,
  })
  @ApiOkResponse({
    description: 'List of conversations retrieved successfully',
    type: ListConversationsResponseDto,
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
  async listConversations(
    @Res() res: Response,
    @Query() query: ListConversationsDto,
  ) {
    try {
      const result = await this.waConversationsService.listConversations(query);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Error listing conversations:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
