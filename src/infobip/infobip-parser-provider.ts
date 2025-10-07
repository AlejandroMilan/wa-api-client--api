import { Provider } from '@nestjs/common';
import { InfobipInboundParser } from './infobip-inbound-parser';

export const InfobipInboundParserProvider: Provider = {
  provide: 'WaMessageInboundParser',
  useClass: InfobipInboundParser,
};
