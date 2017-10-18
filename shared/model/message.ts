export interface Message {
  id: number;
  threadId: number;
  participantId: number;
  text: string;
  timestamp: number;
}

export interface MessageVM {
  id: number;
  text: string;
  participantName: string;
  timestamp: number;
}