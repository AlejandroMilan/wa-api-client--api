import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WaMessage, WaMessageDocument } from './wa-message.schema';
import { Model } from 'mongoose';
import type { IWaMessageRepository } from '../wa-message.repository.interface';
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
}
