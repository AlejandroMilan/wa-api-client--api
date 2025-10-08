import { Inject, Injectable } from '@nestjs/common';
import type { IWaMessageRepository } from './wa-message.repository.interface';
import { CreateMessageDto } from './dtos/create-message.dto';
import {
  WaMessageDirection,
  WaMessageType,
} from './types/wa-message.interface';
import { WaConversationsService } from 'src/wa-conversations/wa-conversations.service';
import {
  IWaConversation,
  WaConversationStatus,
} from 'src/wa-conversations/types/wa-conversation.interface';
import { WaSenderService } from 'src/wa-sender/wa-sender.service';
import { MessagesWebSocketGateway } from 'src/websocket/websocket.gateway';

@Injectable()
export class WaMessagesService {
  constructor(
    @Inject('IWaMessageRepository')
    private waMessageRepository: IWaMessageRepository,
    private readonly waConversationsService: WaConversationsService,
    private readonly waSenderService: WaSenderService,
    private readonly webSocketGateway: MessagesWebSocketGateway,
  ) {}

  async createNewMessage(message: CreateMessageDto) {
    if (message.type === WaMessageType.TEMPLATE && !message.template) {
      throw new Error('Template data must be provided for template messages.');
    }
    if (message.type === WaMessageType.TEXT && !message.text) {
      throw new Error('Text content must be provided for text messages.');
    }

    let conversation: IWaConversation | null = null;

    if (message.conversation) {
      conversation = await this.waConversationsService.getConversationById(
        message.conversation,
      );
      if (!conversation)
        throw new Error('Conversation with the provided ID does not exist.');
    } else {
      const phoneNumber =
        message.direction === WaMessageDirection.OUTGOING
          ? message.to
          : message.from;
      if (!phoneNumber) {
        throw new Error(
          'Phone number could not be determined from the message direction and from/to fields.',
        );
      }
      if (!conversation)
        conversation =
          await this.waConversationsService.getConversationByPhoneNumber(
            phoneNumber,
          );
      if (!conversation)
        conversation = await this.waConversationsService.createConversation({
          phoneNumber,
          contactName: phoneNumber,
          status:
            message.direction === WaMessageDirection.INCOMING
              ? WaConversationStatus.ACTIVE
              : WaConversationStatus.WAITING_RESPONSE,
        });

      message.conversation = conversation._id!.toString();
    }

    const savedMessage = await this.waMessageRepository.save({
      ...message,
      timestamp: new Date(),
      readed: message.readed ?? false,
    });

    // Increment unread count for incoming messages
    if (message.direction === WaMessageDirection.INCOMING && !message.readed) {
      await this.waConversationsService.incrementUnreadCount(conversation._id!);
    }

    if (
      message.type === WaMessageType.TEXT &&
      message.direction === WaMessageDirection.OUTGOING
    ) {
      await this.waSenderService.sendTextMessage(
        message.text,
        conversation.phoneNumber,
      );
    }

    // Emit real-time message to conversation participants
    this.webSocketGateway.emitNewMessage(
      conversation._id!.toString(),
      savedMessage,
    );

    // Emit conversation update for sidebar refresh
    const updatedConversation = await this.waConversationsService.getConversationById(
      conversation._id!.toString(),
    );
    if (updatedConversation) {
      this.webSocketGateway.emitConversationUpdate(
        conversation._id!.toString(),
        updatedConversation,
      );
    }

    return savedMessage;
  }

  async getLastMessageByConversationId(conversationId: string) {
    return await this.waMessageRepository.findLastByConversationId(
      conversationId,
    );
  }

  async listMessagesByConversationId(
    conversationId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const { messages, total } =
      await this.waMessageRepository.findPaginatedByConversationId(
        conversationId,
        page,
        limit,
      );

    const totalPages = Math.ceil(total / limit);

    return {
      messages,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async markAllMessagesAsRead(conversationId: string): Promise<void> {
    // Mark all messages as read
    await this.waMessageRepository.markAllAsReadByConversationId(
      conversationId,
    );

    // Reset unread count in conversation
    await this.waConversationsService.resetUnreadCount(conversationId);

    // Emit message status update to conversation participants
    this.webSocketGateway.emitMessageStatusUpdate(
      conversationId,
      'all',
      'read',
    );

    // Emit conversation update for sidebar refresh
    const updatedConversation = await this.waConversationsService.getConversationById(
      conversationId,
    );
    if (updatedConversation) {
      this.webSocketGateway.emitConversationUpdate(
        conversationId,
        updatedConversation,
      );
    }
  }
}
