import { Inject, Injectable } from '@nestjs/common';
import type { IWaMessageRepository } from './wa-message.repository.interface';
import { CreateMessageDto } from './dtos/create-message.dto';
import { WaMessageType } from './types/wa-message.interface';
import { WaConversationsService } from 'src/wa-conversations/wa-conversations.service';

@Injectable()
export class WaMessagesService {
  constructor(
    @Inject('IWaMessageRepository')
    private waMessageRepository: IWaMessageRepository,
    private readonly waConversationsService: WaConversationsService,
  ) {}

  async createNewMessage(message: CreateMessageDto) {
    if (message.type === WaMessageType.TEMPLATE && !message.template) {
      throw new Error('Template data must be provided for template messages.');
    }
    if (message.type === WaMessageType.TEXT && !message.text) {
      throw new Error('Text content must be provided for text messages.');
    }

    const conversation = await this.waConversationsService.getConversationById(
      message.conversation,
    );
    if (!conversation) {
      throw new Error('Conversation not found.');
    }

    return await this.waMessageRepository.save(message);
  }
}
