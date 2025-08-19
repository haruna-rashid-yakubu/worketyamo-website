export interface AIAgentMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface AIAgentResponse {
  response: string
  error?: string
}

export class AIAgentService {
  private static instance: AIAgentService
  private baseUrl: string

  private constructor() {
    this.baseUrl = '/api/ai-agent'
  }

  public static getInstance(): AIAgentService {
    if (!AIAgentService.instance) {
      AIAgentService.instance = new AIAgentService()
    }
    return AIAgentService.instance
  }

  async sendMessage(message: string, courseId?: string): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          courseId,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: AIAgentResponse = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      return data.response
    } catch (error) {
      console.error('AI Agent Service Error:', error)
      throw new Error('Impossible de contacter l\'assistant IA. Veuillez réessayer.')
    }
  }

  generateMessageId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  createMessage(role: 'user' | 'assistant', content: string): AIAgentMessage {
    return {
      id: this.generateMessageId(),
      role,
      content,
      timestamp: new Date(),
    }
  }
}

export const aiAgentService = AIAgentService.getInstance()