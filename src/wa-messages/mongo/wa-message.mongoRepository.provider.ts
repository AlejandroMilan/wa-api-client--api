import { Provider } from '@nestjs/common';
import { WaMessageMongoRepository } from './wa-message.mongoRepository';

export const WaMessageMongoRepoProvider: Provider = {
  provide: 'IWaMessageRepository',
  useClass: WaMessageMongoRepository,
};
