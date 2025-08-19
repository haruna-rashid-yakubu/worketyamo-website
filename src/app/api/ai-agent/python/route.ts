import { NextRequest, NextResponse } from 'next/server';

interface PythonAgentRequest {
  message: string;
  course_id?: string;
  conversation_history?: Array<{
    id: string;
    content: string;
    isBot: boolean;
    timestamp: string;
  }>;
}

interface PythonAgentResponse {
  success: boolean;
  response: string;
  confidence: number;
  tools_used: string[];
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, courseId, conversationHistory } = body;

    // Validate required fields
    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Prepare request for Python agent
    const pythonRequest: PythonAgentRequest = {
      message: message.trim(),
      course_id: courseId,
      conversation_history: conversationHistory?.slice(-10) || [] // Send last 10 messages
    };

    // Get Python agent URL from environment
    const pythonAgentUrl = process.env.PYTHON_AGENT_URL || 'http://localhost:8000';
    
    console.log(`[AI-Agent] Calling Python agent at ${pythonAgentUrl}/chat`);
    console.log(`[AI-Agent] Request:`, { 
      message: pythonRequest.message.substring(0, 100) + '...', 
      course_id: pythonRequest.course_id 
    });

    // Call Python ADK agent
    const response = await fetch(`${pythonAgentUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pythonRequest),
      signal: AbortSignal.timeout(30000) // 30 second timeout
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[AI-Agent] Python agent HTTP error ${response.status}:`, errorText);
      
      // Fallback to basic response
      return NextResponse.json({
        success: true,
        response: `Désolé, mon système avancé rencontre des difficultés techniques (erreur ${response.status}). Je peux tout de même vous aider avec mes capacités de base. Reformulez votre question et je ferai de mon mieux pour vous répondre.`,
        confidence: 0.3,
        toolCalls: [],
        fallback: true
      });
    }

    const pythonResponse: PythonAgentResponse = await response.json();
    
    console.log(`[AI-Agent] Python agent response:`, {
      success: pythonResponse.success,
      confidence: pythonResponse.confidence,
      tools_used: pythonResponse.tools_used,
      response_length: pythonResponse.response.length
    });

    if (!pythonResponse.success) {
      console.error(`[AI-Agent] Python agent error:`, pythonResponse.error);
      
      // Fallback to basic response
      return NextResponse.json({
        success: true,
        response: `Je rencontre quelques difficultés avec mes systèmes avancés. ${pythonResponse.error || 'Erreur inconnue'}. Puis-je vous aider autrement ? Reformulez votre question et je ferai de mon mieux.`,
        confidence: 0.3,
        toolCalls: [],
        fallback: true
      });
    }

    // Transform response to match expected format
    return NextResponse.json({
      success: true,
      response: pythonResponse.response,
      confidence: pythonResponse.confidence,
      toolCalls: pythonResponse.tools_used.map(toolName => ({
        name: toolName,
        success: true
      })),
      source: 'python-adk'
    });

  } catch (error) {
    console.error('[AI-Agent] Python bridge error:', error);
    
    // Network or timeout error - provide fallback
    const isTimeoutError = error instanceof Error && error.name === 'TimeoutError';
    const isNetworkError = error instanceof Error && (
      error.message.includes('ECONNREFUSED') || 
      error.message.includes('fetch failed') ||
      error.message.includes('Failed to fetch')
    );

    let fallbackMessage = "Je rencontre des difficultés techniques avec mes systèmes avancés.";
    
    if (isTimeoutError) {
      fallbackMessage += " (Délai d'attente dépassé)";
    } else if (isNetworkError) {
      fallbackMessage += " (Service temporairement indisponible)";
    }
    
    fallbackMessage += " Puis-je vous aider autrement ? Reformulez votre question et je ferai de mon mieux avec mes capacités locales.";

    return NextResponse.json({
      success: true,
      response: fallbackMessage,
      confidence: 0.2,
      toolCalls: [],
      fallback: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}