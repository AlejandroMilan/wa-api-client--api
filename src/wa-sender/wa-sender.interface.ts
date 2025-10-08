import { IWaMessage } from 'src/wa-messages/types/wa-message.interface';

export interface WaSender {
  sendTextMessage(message: Pick<IWaMessage, 'text'>, to: string): Promise<void>;
}
