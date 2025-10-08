import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { IWaMessage } from 'src/wa-messages/types/wa-message.interface';
import { WaSender } from 'src/wa-sender/wa-sender.interface';

@Injectable()
export class InfobipWaSender implements WaSender {
  private readonly senderPhoneNumber: string;
  private readonly apiUri: string;
  private readonly apiKey: string;
  private readonly axiosInstance: AxiosInstance;

  constructor(apiUri: string, apiKey: string, senderPhoneNumber: string) {
    this.apiUri = apiUri;
    this.apiKey = apiKey;
    this.senderPhoneNumber = senderPhoneNumber;
    this.axiosInstance = axios.create({
      baseURL: this.apiUri,
      headers: {
        Authorization: `App ${this.apiKey}`,
      },
    });
  }

  async sendTextMessage(
    message: Pick<IWaMessage, 'text'>,
    to: string,
  ): Promise<void> {
    await this.axiosInstance.post('/whatsapp/1/message/text', {
      from: this.senderPhoneNumber,
      to,
      content: {
        text: message.text || '',
      },
    });
  }
}
