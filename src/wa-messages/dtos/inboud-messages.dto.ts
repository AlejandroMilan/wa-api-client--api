import { InfobipInboundRequest } from 'src/infobip/infobip-inbound-request.interface';
import { WaMessageType } from '../types/wa-message.interface';

export class RegisterInboundMessageDto implements InfobipInboundRequest {
  results: [
    {
      from: number;
      to: number;
      integrationType: string;
      receivedAt: string;
      messageId: string;
      callbackData: string;
      message: { text: string; type: WaMessageType };
    },
  ];

  messageCount: number;

  pendingMessageCount: number;
}
