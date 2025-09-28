import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WaMessage, WaMessageDocument } from './wa-message.schema';
import { Model } from 'mongoose';
import {
  type IWaMessageRepository,
  type PaginatedMessages,
} from '../wa-message.repository.interface';
import type { IWaMessage } from '../types/wa-message.interface';

@Injectable()
export class WaMessageMongoRepository implements IWaMessageRepository {
  constructor(
    @InjectModel(WaMessage.name)
    private waMessageModel: Model<WaMessageDocument>,
  ) {}

  async save(message: Partial<IWaMessage>): Promise<IWaMessage> {
    const createdMessage = new this.waMessageModel(message);
    await createdMessage.save();
    return createdMessage.toObject<IWaMessage>();
  }

  async findLastByConversationId(
    conversationId: string,
  ): Promise<IWaMessage | null> {
    return await this.waMessageModel
      .findOne({ conversation: conversationId })
      .sort({ timestamp: -1 })
      .lean<IWaMessage | null>();
  }

  async findPaginatedByConversationId(
    conversationId: string,
    page: number,
    limit: number,
  ): Promise<PaginatedMessages> {
    const skip = (page - 1) * limit;

    const [messages, total] = await Promise.all([
      this.waMessageModel
        .find({ conversation: conversationId })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean<IWaMessage[]>(),
      this.waMessageModel.countDocuments({ conversation: conversationId }),
    ]);

    return {
      messages,
      total,
    };
  }

  async markAllAsReadByConversationId(conversationId: string): Promise<void> {
    await this.waMessageModel.updateMany(
      { conversation: conversationId, readed: false },
      { $set: { readed: true } },
    );
  }
}
