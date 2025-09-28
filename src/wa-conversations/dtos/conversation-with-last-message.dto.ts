import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import type { IWaMessage } from '../../wa-messages/types/wa-message.interface';

export class ConversationWithLastMessageDto {
  @ApiProperty({
    description: 'Conversation ID',
    example: '507f1f77bcf86cd799439011',
  })
  _id: string;

  @ApiProperty({
    description: 'Current status of the conversation',
    enum: ['ACTIVE', 'WAITING_RESPONSE', 'CLOSED'],
    example: 'ACTIVE',
  })
  status: string;

  @ApiProperty({
    description: 'Phone number of the contact',
    example: '+1234567890',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'Display name of the contact',
    example: 'John Doe',
  })
  contactName: string;

  @ApiProperty({
    description: 'When the conversation was created',
    format: 'date-time',
  })
  creationDate: Date;

  @ApiProperty({
    description: 'Last activity timestamp',
    format: 'date-time',
  })
  lastActivity: Date;

  @ApiProperty({
    description: 'Number of unread messages',
    example: 2,
  })
  unreadCount: number;

  @ApiPropertyOptional({
    description:
      'Last message in the conversation (fetch separately using /wa-messages/last/:conversationId)',
    type: 'object',
    properties: {
      _id: { type: 'string' },
      type: { type: 'string', enum: ['TEXT', 'TEMPLATE'] },
      direction: { type: 'string', enum: ['INCOMING', 'OUTGOING'] },
      timestamp: { type: 'string', format: 'date-time' },
      text: { type: 'string' },
    },
  })
  lastMessage?: Partial<IWaMessage>;
}

export class ListConversationsResponseDto {
  @ApiProperty({
    description: 'List of conversations with their last messages',
    type: [ConversationWithLastMessageDto],
  })
  conversations: ConversationWithLastMessageDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: 'object',
    properties: {
      page: { type: 'number', description: 'Current page number' },
      limit: { type: 'number', description: 'Items per page' },
      total: { type: 'number', description: 'Total number of conversations' },
      totalPages: { type: 'number', description: 'Total number of pages' },
      hasNext: { type: 'boolean', description: 'Whether there is a next page' },
      hasPrev: {
        type: 'boolean',
        description: 'Whether there is a previous page',
      },
    },
  })
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}