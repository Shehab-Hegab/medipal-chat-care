export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  action?: AgentAction;
  reminder?: ReminderData;
  med_info?: MedicationInfo;
}

export interface AgentAction {
  type: "ask_confirm" | "provide_med_info" | "set_reminder" | "snooze_reminder" | "general";
}

export interface ReminderData {
  medication_name: string;
  dose: string;
  frequency: string;
  frequency_description?: string;
  start_time: string;
  next_occurrence?: string;
  reminder_id?: string;
}

export interface MedicationInfo {
  name: string;
  common_uses: string;
  side_effects: string;
}

export interface ChatRequest {
  user_id: string;
  input: string;
  context: {
    timezone: string;
    locale: string;
  };
  session_id?: string;
}

export interface ChatResponse {
  reply_text: string;
  action?: string;
  reminder?: ReminderData;
  med_info?: MedicationInfo;
}
