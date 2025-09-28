import { Inject, Injectable } from '@nestjs/common';
import type { IWaConversationRepository } from './wa-conversation.repository.interface';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { ListConversationsDto } from './dtos/list-conversations.dto';
import {
  ConversationWithLastMessageDto,
  ListConversationsResponseDto,
} from './dtos/conversation-with-last-message.dto';
import type { IWaConversation } from './types/wa-conversation.interface';

@Injectable()
export class WaConversationsService {
  constructor(
    @Inject('IWaConversationRepository')
    private readonly waConversationRepository: IWaConversationRepository,
  ) {}

  async createConversation(
    payload: CreateConversationDto,
  ): Promise<IWaConversation> {
    return await this.waConversationRepository.save(payload);
  }

  async getConversationById(id: string): Promise<IWaConversation | null> {
    return await this.waConversationRepository.findByID(id);
  }

  async getConversationByPhoneNumber(
    phoneNumber: string,
  ): Promise<IWaConversation | null> {
    return await this.waConversationRepository.findByPhoneNumber(phoneNumber);
  }

  async listConversations(
    query: ListConversationsDto,
  ): Promise<ListConversationsResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;

    const { conversations, total } =
      await this.waConversationRepository.findPaginated(page, limit);

    // Map conversations to response format (without last message for now)
    const conversationsWithLastMessage: ConversationWithLastMessageDto[] =
      conversations.map((conversation) => ({
        _id: conversation._id!,
        status: conversation.status,
        phoneNumber: conversation.phoneNumber,
        contactName: conversation.contactName,
        creationDate: conversation.creationDate,
        lastActivity: conversation.lastActivity,
        unreadCount: conversation.unreadCount,
        // lastMessage will be fetched separately using the messages service
      }));

    const totalPages = Math.ceil(total / limit);

    return {
      conversations: conversationsWithLastMessage,
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

  async incrementUnreadCount(conversationId: string): Promise<void> {
    await this.waConversationRepository.incrementUnreadCount(conversationId);
  }

  async resetUnreadCount(conversationId: string): Promise<void> {
    await this.waConversationRepository.resetUnreadCount(conversationId);
  }
}
