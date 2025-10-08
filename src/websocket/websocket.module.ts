import { Module } from '@nestjs/common';
import { MessagesWebSocketGateway } from './websocket.gateway';

@Module({
  providers: [MessagesWebSocketGateway],
  exports: [MessagesWebSocketGateway],
})
export class WebSocketModule {}