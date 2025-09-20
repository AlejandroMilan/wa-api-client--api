import { IWaMessage } from './types/wa-message.interface';

export interface IWaMessageRepository {
  save(message: Partial<IWaMessage>): Promise<IWaMessage>;
}
