import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:5173'], // Allow frontend origins
    credentials: true,
  },
})
export class MessagesWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessagesWebSocketGateway.name);
  private connectedClients = new Map<string, Socket>();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
    this.connectedClients.set(client.id, client);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.connectedClients.delete(client.id);
  }

  @SubscribeMessage('join-conversation')
  handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`conversation-${data.conversationId}`);
    this.logger.log(`Client ${client.id} joined conversation ${data.conversationId}`);
  }

  @SubscribeMessage('leave-conversation')
  handleLeaveConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(`conversation-${data.conversationId}`);
    this.logger.log(`Client ${client.id} left conversation ${data.conversationId}`);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { conversationId: string; isTyping: boolean; userName?: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.to(`conversation-${data.conversationId}`).emit('user-typing', {
      userId: client.id,
      isTyping: data.isTyping,
      userName: data.userName,
    });
  }

  // Method to emit new message to conversation participants
  emitNewMessage(conversationId: string, message: any) {
    this.server.to(`conversation-${conversationId}`).emit('new-message', message);
    this.logger.log(`New message emitted to conversation ${conversationId}`);
  }

  // Method to emit message status updates
  emitMessageStatusUpdate(conversationId: string, messageId: string, status: string) {
    this.server.to(`conversation-${conversationId}`).emit('message-status-update', {
      messageId,
      status,
    });
  }

  // Method to emit conversation updates
  emitConversationUpdate(conversationId: string, conversation: any) {
    this.server.emit('conversation-update', conversation);
    this.logger.log(`Conversation update emitted for ${conversationId}`);
  }
}