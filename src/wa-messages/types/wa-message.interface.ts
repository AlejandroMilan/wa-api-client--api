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
  text?: string;
  template?: {
    templateName: string;
    params: {
      body: Record<string, any>;
      header?: Record<string, any>;
      buttons?: Record<string, any>;
    };
  };
}
