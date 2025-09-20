import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IWaConversation,
  WaConversationStatus,
} from '../types/wa-conversation.interface';

@Schema({ timestamps: true, collection: 'wa-conversations' })
export class WaConversation implements IWaConversation {
  @Prop({
    required: true,
    enum: Object.values(WaConversationStatus),
    default: WaConversationStatus.ACTIVE,
  })
  status: WaConversationStatus;

  @Prop({ required: true, unique: true })
  phoneNumber: string;

  @Prop({ required: true })
  contactName: string;

  @Prop({ required: true, default: () => new Date() })
  creationDate: Date;

  @Prop({ required: true, default: () => new Date() })
  lastActivity: Date;

  @Prop({ required: true, default: 0 })
  unreadCount: number;
}

export type WaConversationDocument = WaConversation & Document;
export const WaConversationSchema =
  SchemaFactory.createForClass(WaConversation);
