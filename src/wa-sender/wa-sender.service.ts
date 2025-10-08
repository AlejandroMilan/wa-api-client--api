import { Inject, Injectable } from '@nestjs/common';
import type { WaSender } from './wa-sender.interface';

@Injectable()
export class WaSenderService {
  constructor(@Inject('WaSender') private readonly waSender: WaSender) {}

  async sendTextMessage(text: string, to: string): Promise<void> {
    await this.waSender.sendTextMessage({ text }, to);
  }
}
