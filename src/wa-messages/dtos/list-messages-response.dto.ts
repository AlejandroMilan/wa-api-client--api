import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class MessageDto {
  @ApiProperty({
    description: 'Message ID',
    example: '507f1f77bcf86cd799439011',
  })
  _id: string;

  @ApiProperty({
    description: 'Type of the message',
    enum: ['TEXT', 'TEMPLATE'],
    example: 'TEXT',
  })
  type: string;

  @ApiProperty({
    description: 'Direction of the message',
    enum: ['INCOMING', 'OUTGOING'],
    example: 'OUTGOING',
  })
  direction: string;

  @ApiProperty({
    description: 'ID of the conversation this message belongs to',
    example: '507f1f77bcf86cd799439012',
  })
  conversation: string;

  @ApiProperty({
    description: 'When the message was created',
    format: 'date-time',
  })
  timestamp: Date;

  @ApiPropertyOptional({
    description: 'Text content of the message',
    example: 'Hello, how can I help you?',
  })
  text?: string;

  @ApiPropertyOptional({
    description: 'Template configuration for template messages',
    type: 'object',
    additionalProperties: true,
  })
  template?: {
    templateName: string;
    params: {
      body: Record<string, any>;
      header?: Record<string, any>;
      buttons?: Record<string, any>;
    };
  };
}

export class ListMessagesResponseDto {
  @ApiProperty({
    description: 'List of messages in the conversation',
    type: [MessageDto],
  })
  messages: MessageDto[];

  @ApiProperty({
    description: 'Pagination metadata',
    type: 'object',
    properties: {
      page: { type: 'number', description: 'Current page number' },
      limit: { type: 'number', description: 'Items per page' },
      total: { type: 'number', description: 'Total number of messages' },
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
