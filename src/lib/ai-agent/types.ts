// AI Agent Types following Google ADK patterns
export interface AgentConfig {
  name: string;
  model: string;
  description: string;
  tools: AgentTool[];
  systemPrompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface AgentTool {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
  handler: (params: any) => Promise<any>;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  toolCalls?: ToolCall[];
  metadata?: Record<string, any>;
}

export interface ToolCall {
  id: string;
  name: string;
  parameters: Record<string, any>;
  result?: any;
}

export interface AgentResponse {
  message: string;
  toolCalls?: ToolCall[];
  confidence?: number;
  metadata?: Record<string, any>;
}

export interface CourseData {
  id: string;
  label: string;
  fullTitle: string;
  description: string;
  level?: string;
  duration?: string;
  schedule?: string;
  price?: string;
  modules: Array<{
    title: string;
    description: string;
    topics: string[];
  }>;
  instructors: Array<{
    name: string;
    title: string;
    experience: string;
  }>;
  skills: Array<{
    name: string;
    category: string;
  }>;
  testimonials: Array<{
    name: string;
    text: string;
    rating: number;
  }>;
  certifications: Array<{
    name: string;
    type: string;
    provider: string;
  }>;
}

export interface ConversationContext {
  courseId?: string;
  userPreferences?: {
    language: 'fr' | 'en';
    experienceLevel?: string;
    interests?: string[];
  };
  sessionHistory: ConversationMessage[];
}