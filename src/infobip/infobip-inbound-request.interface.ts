import { WaMessageType } from 'src/wa-messages/types/wa-message.interface';

export interface InfobipInboundRequest {
  results: [
    {
      from: number;
      to: number;
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
