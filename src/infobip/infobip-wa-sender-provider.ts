import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WaSender } from 'src/wa-sender/wa-sender.interface';
import { InfobipWaSender } from './infobip-wa-sender';

export const InfobipWaSenderProvider: Provider = {
  provide: 'WaSender',
  inject: [ConfigService],
  useFactory: (configService: ConfigService): WaSender => {
    const apiKey = configService.get('INFOBIP_API_KEY') as string;
    const apiUri = configService.get('INFOBIP_API_URI') as string;
    const senderPhoneNumber = configService.get(
      'INFOBIP_SENDER_NUMBER',
    ) as string;

    return new InfobipWaSender(apiUri, apiKey, senderPhoneNumber);
  },
};
