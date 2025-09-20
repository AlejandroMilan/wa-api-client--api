import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaConversationsModule } from './wa-conversations/wa-conversations.module';
import { WaMessagesModule } from './wa-messages/wa-messages.module';

@Module({
  imports: [WaConversationsModule, WaMessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
