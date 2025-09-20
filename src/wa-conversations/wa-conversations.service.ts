import { Inject, Injectable } from '@nestjs/common';
import type { IWaConversationRepository } from './wa-conversation.repository.interface';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { IWaConversation } from './types/wa-conversation.interface';

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
}
