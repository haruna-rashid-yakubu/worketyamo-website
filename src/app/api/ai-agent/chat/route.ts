import { NextRequest, NextResponse } from 'next/server';
import { WorketyamoAgent } from '@/lib/ai-agent/agent';

export async function POST(request: NextRequest) {
  try {
    const { message, courseId, conversationHistory } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    console.log('[AI-Agent] Chat request received:', { 
      message: message.substring(0, 100) + '...', 
      courseId 
    });

    // Try Python ADK agent first (if available)
    try {
      const pythonAgentUrl = process.env.PYTHON_AGENT_URL || 'http://localhost:8000';
      
      console.log('[AI-Agent] Attempting Python ADK agent...');
      
      const pythonResponse = await fetch(`${pythonAgentUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message.trim(),
          course_id: courseId,
          conversation_history: conversationHistory?.slice(-10) || []
        }),
        signal: AbortSignal.timeout(15000) // 15 second timeout for Python agent
      });

      if (pythonResponse.ok) {
        const pythonData = await pythonResponse.json();
        
        if (pythonData.success) {
          console.log('[AI-Agent] Python ADK agent responded successfully');
          
          return NextResponse.json({
            success: true,
            response: pythonData.response,
            confidence: pythonData.confidence,
            toolCalls: pythonData.tools_used?.map((toolName: string) => ({
              name: toolName,
              success: true
            })) || [],
            metadata: {
              courseId,
              timestamp: new Date().toISOString(),
              agent: 'Python-ADK-Agent',
              source: 'google-adk'
            }
          });
        }
      }
      
      console.log('[AI-Agent] Python agent failed, falling back to TypeScript agent');
      
    } catch (pythonError) {
      console.log('[AI-Agent] Python agent unavailable, using TypeScript fallback:', 
        pythonError instanceof Error ? pythonError.message : 'Unknown error'
      );
    }

    // Fallback to TypeScript agent
    console.log('[AI-Agent] Using TypeScript agent fallback');
    
    const agent = new WorketyamoAgent(courseId);
    const response = await agent.processMessage(message);

    return NextResponse.json({
      success: true,
      response: response.message,
      confidence: response.confidence,
      toolCalls: response.toolCalls?.map(call => ({
        name: call.name,
        parameters: call.parameters,
        success: !call.result?.error
      })) || [],
      metadata: {
        courseId,
        timestamp: new Date().toISOString(),
        agent: 'TypeScript-Agent',
        source: 'local-fallback'
      }
    });

  } catch (error) {
    console.error('[AI-Agent] Chat Error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to process message',
        response: "Désolé, je rencontre un problème technique. Pouvez-vous reformuler votre question ?"
      },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    agent: 'WorketyamoAgent',
    capabilities: [
      'course_information',
      'course_search',
      'prerequisites_check',
      'registration_assistance',
      'conversational_support'
    ],
    timestamp: new Date().toISOString()
  });
}