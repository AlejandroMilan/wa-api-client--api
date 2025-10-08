import { Module } from '@nestjs/common';
import { WaSenderService } from './wa-sender.service';
import { InfobipWaSenderProvider } from 'src/infobip/infobip-wa-sender-provider';

@Module({
  providers: [WaSenderService, InfobipWaSenderProvider],
  exports: [WaSenderService, InfobipWaSenderProvider],
})
export class WaSenderModule {}
