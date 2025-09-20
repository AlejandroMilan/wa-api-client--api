import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WaMessage, WaMessageDocument } from './wa-message.schema';
import { Model } from 'mongoose';
import { IWaMessageRepository } from '../wa-message.repository.interface';
import { IWaMessage } from '../types/wa-message.interface';

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
}
