import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IWaMessage,
  WaMessageDirection,
  WaMessageType,
} from '../types/wa-message.interface';

@Schema({ timestamps: true, collection: 'wa-messages' })
export class WaMessage implements IWaMessage {
  @Prop({ required: true, enum: Object.values(WaMessageType) })
  type: WaMessageType;

  @Prop({ required: true, enum: Object.values(WaMessageDirection) })
  direction: WaMessageDirection;

  @Prop({ required: true })
  conversation: string;
  @Prop({ required: true })
  timestamp: Date;
  @Prop({ required: true, default: false })
  readed: boolean;
  @Prop()
  text: string;

  @Prop({ type: Object })
  template?:
    | {
        templateName: string;
        params: {
          body: Record<string, any>;
          header?: Record<string, any>;
          buttons?: Record<string, any>;
        };
      }
    | undefined;
}

export type WaMessageDocument = WaMessage & Document;
export const WaMessageSchema = SchemaFactory.createForClass(WaMessage);
