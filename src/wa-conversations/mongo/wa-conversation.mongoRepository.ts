import { Injectable } from '@nestjs/common';
import { IWaConversation } from '../types/wa-conversation.interface';
import { IWaConversationRepository } from '../wa-conversation.repository.interface';
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
}
