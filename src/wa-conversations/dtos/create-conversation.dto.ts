import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import type {
  IWaConversation,
  WaConversationStatus,
} from '../types/wa-conversation.interface';

export class CreateConversationDto implements Partial<IWaConversation> {
  @ApiProperty({
    description: 'Phone number of the WhatsApp contact',
    example: '+1234567890',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    description: 'Display name of the contact',
    example: 'John Doe',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  contactName: string;

  @IsString()
  status?: WaConversationStatus | undefined;
}
