import { IsNotEmpty, IsString } from 'class-validator';
import {
  IWaMessage,
  WaMessageDirection,
  WaMessageType,
} from '../types/wa-message.interface';

export class CreateMessageDto implements Partial<IWaMessage> {
  @IsString()
  @IsNotEmpty()
  type: WaMessageType;

  @IsString()
  @IsNotEmpty()
  direction: WaMessageDirection;

  @IsString()
  @IsNotEmpty()
  conversation: string;

  @IsString()
  text: string;

  template?: {
    templateName: string;
    params: {
      body: Record<string, any>;
      header?: Record<string, any>;
      buttons?: Record<string, any>;
    };
  };
}
