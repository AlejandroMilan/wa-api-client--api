import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsDateString,
  IsEnum,
  IsOptional,
} from 'class-validator';

import { WaMessageType } from '../types/wa-message.interface';

export class InboundMessageDto {
  @ApiProperty({
    description: 'Text content of the message',
    example: 'Hello, this is an incoming message',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'Type of the WhatsApp message',
    enum: WaMessageType,
    example: WaMessageType.TEXT,
  })
  @IsEnum(WaMessageType)
  type: WaMessageType;
}

export class InboundResultDto {
  @ApiProperty({
    description: 'Sender phone number with country code',
    example: '+1234567890',
  })
  @IsString()
  @IsNotEmpty()
  from: string;

  @ApiProperty({
    description: 'Recipient phone number (your WhatsApp number)',
    example: '+9876543210',
  })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({
    description: 'Integration type identifier',
    example: 'WHATSAPP',
  })
  @IsString()
  @IsNotEmpty()
  integrationType: string;

  @ApiProperty({
    description: 'Timestamp when the message was received (ISO 8601 format)',
    example: '2023-10-07T12:30:45.123Z',
  })
  @IsDateString()
  receivedAt: string;

  @ApiProperty({
    description: 'Unique message identifier from the provider',
    example: 'msg_1234567890abcdef',
  })
  @IsString()
  @IsNotEmpty()
  messageId: string;

  @ApiPropertyOptional({
    description: 'Optional callback data associated with the message',
    example: 'custom_callback_data',
  })
  @IsOptional()
  @IsString()
  callbackData?: string;

  @ApiProperty({
    description: 'Message content and metadata',
    type: InboundMessageDto,
  })
  @ValidateNested()
  message: InboundMessageDto;
}

export class RegisterInboundMessageDto {
  @ApiProperty({
    description: 'Array of inbound message results',
    type: [InboundResultDto],
    example: [
      {
        from: '+1234567890',
        to: '+9876543210',
        integrationType: 'WHATSAPP',
        receivedAt: '2023-10-07T12:30:45.123Z',
        messageId: 'msg_1234567890abcdef',
        callbackData: 'custom_data',
        message: {
          text: 'Hello, this is an incoming message',
          type: 'TEXT',
        },
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  results: InboundResultDto[];

  @ApiProperty({
    description: 'Total number of messages in this batch',
    example: 1,
    minimum: 0,
  })
  @IsNumber()
  messageCount: number;

  @ApiProperty({
    description: 'Number of pending messages in the queue',
    example: 0,
    minimum: 0,
  })
  @IsNumber()
  pendingMessageCount: number;
}
