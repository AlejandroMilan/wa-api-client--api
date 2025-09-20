import { Module } from '@nestjs/common';
import { WaMessagesController } from './wa-messages.controller';
import { WaMessagesService } from './wa-messages.service';
import { WaConversationsModule } from 'src/wa-conversations/wa-conversations.module';
import { WaConversationsService } from 'src/wa-conversations/wa-conversations.service';
import { WaMessageMongoRepoProvider } from './mongo/wa-message.mongoRepository.provider';
import { MongooseModule } from '@nestjs/mongoose';
import { WaMessage, WaMessageSchema } from './mongo/wa-message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WaMessage.name, schema: WaMessageSchema },
    ]),
    WaConversationsModule,
  ],
  controllers: [WaMessagesController],
  providers: [
    WaMessagesService,
    WaMessageMongoRepoProvider,
    WaConversationsService,
  ],
})
export class WaMessagesModule {}
