import { Provider } from '@nestjs/common';
import { WaConversationMongoRepository } from './wa-conversation.mongoRepository';

export const WaConversationMongoRepoProvider: Provider = {
  provide: 'IWaConversationRepository',
  useClass: WaConversationMongoRepository,
};
