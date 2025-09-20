import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaConversationsModule } from './wa-conversations/wa-conversations.module';
import { WaMessagesModule } from './wa-messages/wa-messages.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        user: configService.get<string>('MONGO_USER'),
        pass: configService.get<string>('MONGO_PASS'),
        dbName: configService.get<string>('MONGO_DB'),
      }),
      inject: [ConfigService],
    }),
    WaConversationsModule,
    WaMessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
