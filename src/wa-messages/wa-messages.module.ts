import { Module } from '@nestjs/common';
import { WaMessagesController } from './wa-messages.controller';
import { WaMessagesService } from './wa-messages.service';
import { WaConversationsModule } from 'src/wa-conversations/wa-conversations.module';
import { WaConversationsService } from 'src/wa-conversations/wa-conversations.service';
import { WaMessageMongoRepoProvider } from './mongo/wa-message.mongoRepository.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { WaMessage, WaMessageSchema } from './mongo/wa-message.schema';
import { InfobipInboundParserProvider } from 'src/infobip/infobip-parser-provider';
import { WaSenderModule } from 'src/wa-sender/wa-sender.module';
import { WaSenderService } from 'src/wa-sender/wa-sender.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WaMessage.name, schema: WaMessageSchema },
    ]),
    WaConversationsModule,
    WaSenderModule,
  ],
  controllers: [WaMessagesController],
  providers: [
    WaMessagesService,
    WaMessageMongoRepoProvider,
    WaConversationsService,
    InfobipInboundParserProvider,
    WaSenderService,
  ],
  exports: [WaMessagesService, WaMessageMongoRepoProvider],
})
export class WaMessagesModule {}
