export enum WaMessageDirection {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
}

export enum WaMessageType {
  TEXT = 'TEXT',
  TEMPLATE = 'TEMPLATE',
}

export interface IWaMessage {
  _id?: string;
  type: WaMessageType;
  direction: WaMessageDirection;
  conversation: string;
  timestamp: Date;
  text: string;
  template?: {
    templateName: string;
    templateParams: Record<string, any>;
  };
}
