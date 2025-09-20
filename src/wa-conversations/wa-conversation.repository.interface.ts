import { IWaConversation } from './types/wa-conversation.interface';

export interface IWaConversationRepository {
  save(conversation: Partial<IWaConversation>): Promise<IWaConversation>;
}
