import { WaMessageType } from 'src/wa-messages/types/wa-message.interface';

export interface InfobipInboundRequest {
  results: [
    {
      from: string;
      to: string;
      integrationType: string;
      receivedAt: string;
      messageId: string;
      callbackData: string;
      message: {
        text: string;
        type: WaMessageType;
      };
    },
  ];
  messageCount: number;
  pendingMessageCount: number;
}
