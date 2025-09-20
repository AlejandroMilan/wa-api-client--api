import { Module } from '@nestjs/common';
import { WaConversationsService } from './wa-conversations.service';
import { WaConversationsController } from './wa-conversations.controller';
import {
  WaConversation,
  WaConversationSchema,
} from './mongo/wa-conversation.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WaConversationMongoRepoProvider } from './mongo/wa-conversation.mongoRepository.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WaConversation.name, schema: WaConversationSchema },
    ]),
  ],
  providers: [WaConversationsService, WaConversationMongoRepoProvider],
  controllers: [WaConversationsController],
  exports: [WaConversationsService, WaConversationMongoRepoProvider],
})
export class WaConversationsModule {}
