import type { IWaMessage } from './types/wa-message.interface';

export interface PaginatedMessages {
  messages: IWaMessage[];
  total: number;
}

export interface IWaMessageRepository {
  save(message: Partial<IWaMessage>): Promise<IWaMessage>;
  findLastByConversationId(conversationId: string): Promise<IWaMessage | null>;
  findPaginatedByConversationId(
    conversationId: string,
    page: number,
    limit: number,
  ): Promise<PaginatedMessages>;
}
