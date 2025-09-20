import { IWaConversation } from './types/wa-conversation.interface';

export interface IWaConversationRepository {
  save(conversation: Partial<IWaConversation>): Promise<IWaConversation>;
  findByID(id: string): Promise<IWaConversation | null>;
  findByPhoneNumber(phoneNumber: string): Promise<IWaConversation | null>;
}
