import { Request } from 'express';
import {
  IWaMessage,
  WaMessageDirection,
} from 'src/wa-messages/types/wa-message.interface';
import { WaMessageInboundParser } from 'src/wa-messages/wa-message-inbound-parser.interface';
import { InfobipInboundRequest } from './infobip-inbound-request.interface';

export class InfobipInboundParser implements WaMessageInboundParser {
  parse(requestBody: any): Promise<Partial<IWaMessage>[]> {
    const infobipRequest = requestBody as InfobipInboundRequest;

    return new Promise((resolve) => {
      const messages: Partial<IWaMessage>[] = infobipRequest.results.map(
        (result) => ({
          from: result.from.toString(),
          to: result.to.toString(),
          text: result.message.text,
          type: result.message.type,
          timestamp: new Date(result.receivedAt),
          direction: WaMessageDirection.INCOMING,
        }),
      );
      resolve(messages);
    });
  }
}
