import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ListMessagesDto } from './dtos/list-messages.dto';
import { ListMessagesResponseDto } from './dtos/list-messages-response.dto';
import { WaMessagesService } from './wa-messages.service';

@ApiTags('wa-messages')
@Controller('wa-messages')
export class WaMessagesController {
  constructor(private readonly waMessagesService: WaMessagesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new WhatsApp message',
    description:
      'Creates a new message in a WhatsApp conversation. Can be text or template message.',
  })
  @ApiBody({
    type: CreateMessageDto,
    description:
      'Message data including type, direction, conversation ID and content',
  })
  @ApiCreatedResponse({
    description: 'Message created successfully',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string', description: 'Message ID' },
        type: {
          type: 'string',
          enum: ['TEXT', 'TEMPLATE'],
          description: 'Type of the message',
        },
        direction: {
          type: 'string',
          enum: ['INCOMING', 'OUTGOING'],
          description: 'Direction of the message',
        },
        conversation: {
          type: 'string',
          description: 'ID of the conversation this message belongs to',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          description: 'When the message was created',
        },
        text: {
          type: 'string',
          description: 'Text content of the message',
        },
        template: {
          type: 'object',
          description: 'Template configuration for template messages',
          properties: {
            templateName: { type: 'string' },
            params: {
              type: 'object',
              properties: {
                body: { type: 'object' },
                header: { type: 'object' },
                buttons: { type: 'object' },
              },
            },
          },
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Internal server error' },
      },
    },
  })
  async createMessage(@Res() res: Response, @Body() body: CreateMessageDto) {
    try {
      const message = await this.waMessagesService.createNewMessage(body);
      return res.status(201).json(message);
    } catch (error) {
      console.error('Error creating message:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get('last/:conversationId')
  @ApiOperation({
    summary: 'Get last message for a conversation',
    description:
      'Retrieves the most recent message for a specific conversation ID',
  })
  @ApiParam({
    name: 'conversationId',
    description: 'ID of the conversation',
    example: '507f1f77bcf86cd799439011',
  })
  @ApiOkResponse({
    description: 'Last message retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        _id: { type: 'string', description: 'Message ID' },
        type: {
          type: 'string',
          enum: ['TEXT', 'TEMPLATE'],
          description: 'Type of the message',
        },
        direction: {
          type: 'string',
          enum: ['INCOMING', 'OUTGOING'],
          description: 'Direction of the message',
        },
        conversation: {
          type: 'string',
          description: 'ID of the conversation this message belongs to',
        },
        timestamp: {
          type: 'string',
          format: 'date-time',
          description: 'When the message was created',
        },
        text: {
          type: 'string',
          description: 'Text content of the message',
        },
        template: {
          type: 'object',
          description: 'Template configuration for template messages',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'No messages found for this conversation',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'No messages found for this conversation',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Internal server error' },
      },
    },
  })
  async getLastMessage(
    @Res() res: Response,
    @Param('conversationId') conversationId: string,
  ) {
    try {
      const lastMessage =
        await this.waMessagesService.getLastMessageByConversationId(
          conversationId,
        );

      if (!lastMessage) {
        return res
          .status(404)
          .json({ message: 'No messages found for this conversation' });
      }

      return res.status(200).json(lastMessage);
    } catch (error) {
      console.error('Error getting last message:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  @Get('conversation/:conversationId')
  @ApiOperation({
    summary: 'List messages for a conversation',
    description:
      'Get a paginated list of messages for a specific conversation. Messages are sorted from newest to oldest.',
  })
  @ApiParam({
    name: 'conversationId',
    description: 'ID of the conversation',
    example: '507f1f77bcf86cd799439011',
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
    description: 'Number of messages per page (max 100)',
    example: 10,
  })
  @ApiOkResponse({
    description: 'Messages retrieved successfully',
    type: ListMessagesResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Conversation not found or no messages',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'No messages found for this conversation',
        },
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Internal server error' },
      },
    },
  })
  async listMessages(
    @Res() res: Response,
    @Param('conversationId') conversationId: string,
    @Query() query: ListMessagesDto,
  ) {
    try {
      const page = query.page ?? 1;
      const limit = query.limit ?? 10;

      const result = await this.waMessagesService.listMessagesByConversationId(
        conversationId,
        page,
        limit,
      );

      if (result.messages.length === 0 && page === 1) {
        return res.status(404).json({
          message: 'No messages found for this conversation',
        });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error listing messages:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
