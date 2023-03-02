// DTO: Data Transfer Object

export interface CallDTO {
  id: string;
  is_archived: boolean;
  duration: number;
  created_at: string;
  call_type?: CallTypeOptions;
  direction?: DirectionOptions;
  from?: number;
  to?: number;
  via?: number;
}

type CallTypeOptions = "missed" | "answered" | "voicemail";

type DirectionOptions = "inbound" | "outbound";
