import { Injectable } from '@nestjs/common';
import type { IWaConversation } from '../types/wa-conversation.interface';
import {
  type IWaConversationRepository,
  type PaginatedConversations,
} from '../wa-conversation.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import {
  WaConversation,
  WaConversationDocument,
} from './wa-conversation.schema';
import { Model } from 'mongoose';

@Injectable()
export class WaConversationMongoRepository
  implements IWaConversationRepository
{
  constructor(
    @InjectModel(WaConversation.name)
    private waConversationModel: Model<WaConversationDocument>,
  ) {}

  async save(conversation: Partial<IWaConversation>): Promise<IWaConversation> {
    const createdConversation = new this.waConversationModel(conversation);
    await createdConversation.save();
    return createdConversation.toObject<IWaConversation>();
  }

  async findByID(id: string): Promise<IWaConversation | null> {
    return await this.waConversationModel
      .findById(id)
      .lean<IWaConversation | null>();
  }

  async findByPhoneNumber(
    phoneNumber: string,
  ): Promise<IWaConversation | null> {
    return await this.waConversationModel
      .findOne({ phoneNumber })
      .lean<IWaConversation | null>();
  }

  async findPaginated(
    page: number,
    limit: number,
  ): Promise<PaginatedConversations> {
    const skip = (page - 1) * limit;

    const [conversations, total] = await Promise.all([
      this.waConversationModel
        .find()
        .sort({ lastActivity: -1 })
        .skip(skip)
        .limit(limit)
        .lean<IWaConversation[]>(),
      this.waConversationModel.countDocuments(),
    ]);

    return {
      conversations,
      total,
    };
  }

  async incrementUnreadCount(conversationId: string): Promise<void> {
    await this.waConversationModel.updateOne(
      { _id: conversationId },
      {
        $inc: { unreadCount: 1 },
        $set: { lastActivity: new Date() },
      },
    );
  }

  async resetUnreadCount(conversationId: string): Promise<void> {
    await this.waConversationModel.updateOne(
      { _id: conversationId },
      { $set: { unreadCount: 0 } },
    );
  }
}
