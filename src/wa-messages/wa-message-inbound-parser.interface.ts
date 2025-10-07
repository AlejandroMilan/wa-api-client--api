import { Request } from 'express';
import { IWaMessage } from './types/wa-message.interface';

export interface WaMessageInboundParser {
  parse(requestBody: any): Promise<Partial<IWaMessage>[]>;
}
