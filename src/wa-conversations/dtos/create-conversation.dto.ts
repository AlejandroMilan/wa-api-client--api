import { IsNotEmpty, IsString } from 'class-validator';
import { IWaConversation } from '../types/wa-conversation.interface';

export class CreateConversationDto implements Partial<IWaConversation> {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  contactName: string;
}
