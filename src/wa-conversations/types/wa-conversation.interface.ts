export enum WaConversationStatus {
  ACTIVE = 'ACTIVE',
  WAITING_RESPONSE = 'WAITING_RESPONSE',
  CLOSED = 'CLOSED',
}

export interface IWaConversation {
  _id?: string;
  status: WaConversationStatus;
  phoneNumber: string;
  contactName: string;
  creationDate: Date;
  lastActivity: Date;
  unreadCount: number;
}
