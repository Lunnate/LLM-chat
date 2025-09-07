export interface APIResponse {
  id: string,
  provider: string,
  model: string,
  object: string,
  created: number,
  choices: APIChoice[],
  usage: APIUsage[]
}

export interface APIChoice {
  logprobs: string | null,
  finish_reason: string,
  native_finish_reason: string,
  index: number,
  message: APIMessage;
}

export interface APIMessage {
  role: string,
  content: string,
  refusal: string | null,
  reasoning: string | null
}

export interface APIUsage {
  prompt_tokens: number,
  completion_tokens: number,
  total_tokens: number,
  prompt_tokens_details: string | null
}

export interface APIError {
  message: string,
  code?: number,
  type?: string
}














