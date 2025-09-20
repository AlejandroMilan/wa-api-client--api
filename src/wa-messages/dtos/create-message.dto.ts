import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  type IWaMessage,
  WaMessageDirection,
  WaMessageType,
} from '../types/wa-message.interface';

export class CreateMessageDto implements Partial<IWaMessage> {
  @ApiProperty({
    description: 'Type of the message',
    enum: WaMessageType,
    example: WaMessageType.TEXT,
  })
  @IsString()
  @IsNotEmpty()
  type: WaMessageType;

  @ApiProperty({
    description: 'Direction of the message',
    enum: WaMessageDirection,
    example: WaMessageDirection.OUTGOING,
  })
  @IsString()
  @IsNotEmpty()
  direction: WaMessageDirection;

  @ApiProperty({
    description: 'ID of the conversation this message belongs to',
    example: '507f1f77bcf86cd799439011',
  })
  @IsString()
  @IsNotEmpty()
  conversation: string;

  @ApiProperty({
    description: 'Text content of the message',
    example: 'Hello, how can I help you?',
  })
  @IsString()
  text: string;

  @ApiPropertyOptional({
    description: 'Template configuration for template messages',
    type: 'object',
    properties: {
      templateName: { type: 'string' },
      params: {
        type: 'object',
        additionalProperties: true,
        example: {
          body: { 0: 'John', 1: 'Doe' },
        },
      },
    },
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
