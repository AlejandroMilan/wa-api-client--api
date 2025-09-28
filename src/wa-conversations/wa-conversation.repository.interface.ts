import type { IWaConversation } from './types/wa-conversation.interface';

export interface PaginatedConversations {
  conversations: IWaConversation[];
  total: number;
}

export interface IWaConversationRepository {
  save(conversation: Partial<IWaConversation>): Promise<IWaConversation>;
  findByID(id: string): Promise<IWaConversation | null>;
  findByPhoneNumber(phoneNumber: string): Promise<IWaConversation | null>;
  findPaginated(page: number, limit: number): Promise<PaginatedConversations>;
  incrementUnreadCount(conversationId: string): Promise<void>;
  resetUnreadCount(conversationId: string): Promise<void>;
}
