import { NextRequest, NextResponse } from 'next/server';
import { WorketyamoAgent } from '@/lib/ai-agent/agent';

// Function to format AI response for better UI display
function formatAIResponse(text: string): string {
  if (!text) return text;
  
  // Clean up extra whitespace and line breaks
  let formatted = text.trim();
  
  // Convert multiple line breaks to paragraph breaks
  formatted = formatted.replace(/\n\s*\n/g, '\n\n');
  
  // Remove any existing markdown formatting
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '$1'); // Remove **bold**
  formatted = formatted.replace(/\*(.*?)\*/g, '$1');     // Remove *italic*
  formatted = formatted.replace(/`(.*?)`/g, '$1');       // Remove `code`
  formatted = formatted.replace(/#{1,6}\s*(.*)/g, '$1'); // Remove # headers
  
  // Remove emojis at the beginning
  formatted = formatted.replace(/^[🎓☁️💡🚀🎯📚⚡🔥]+\s*/, '');
  
  // Clean up bullet points to simple dashes
  formatted = formatted.replace(/^[•·▪▫]\s/gm, '- ');
  
  return formatted;
}

export async function POST(request: NextRequest) {
  try {
    const { message, courseId, conversationId, courseContext } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate unique conversation ID if not provided
    const uniqueConversationId = conversationId || `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    console.log('[AI-Agent] Chat request received:', { 
      message: message.substring(0, 100) + '...', 
      courseId,
      conversationId: uniqueConversationId,
      courseContext: courseContext ? {
        courseName: courseContext.label,
        fullTitle: courseContext.fullTitle,
        level: courseContext.level
      } : 'No course context provided'
    });

    // Try webhook AI agent first
    try {
      const webhookUrl = 'https://broom.ledom.space/webhook/de2a557e-c5e4-4a31-b067-afdcad9c32e0';
      
      const requestPayload = {
        message: message.trim(),
        courseId: courseId,
        conversationId: uniqueConversationId,
        courseContext: courseContext || null,
        context: {
          platform: 'worketyamo',
          timestamp: new Date().toISOString(),
          userAgent: request.headers.get('user-agent')
        }
      };

      console.log('[AI-Agent] Attempting webhook AI agent...');
      console.log('[AI-Agent] Webhook URL:', webhookUrl);
      console.log('[AI-Agent] Request payload:', JSON.stringify(requestPayload, null, 2));
      
      // Try with additional fetch options for better compatibility
      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Worketyamo-AI-Agent/1.0',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestPayload),
        signal: AbortSignal.timeout(15000), // Reduced timeout
        // Add Node.js specific options
        ...(typeof process !== 'undefined' && {
          agent: false,
          keepAlive: false
        })
      });

      console.log('[AI-Agent] Webhook response status:', webhookResponse.status);
      console.log('[AI-Agent] Webhook response headers:', Object.fromEntries(webhookResponse.headers.entries()));

      if (webhookResponse.ok) {
        const webhookData = await webhookResponse.json();
        
        console.log('[AI-Agent] Webhook response data:', JSON.stringify(webhookData, null, 2));
        console.log('[AI-Agent] Webhook AI agent responded successfully');
        
        // Extract response from different possible formats
        let responseText = 'Réponse reçue du webhook';
        
        if (Array.isArray(webhookData) && webhookData.length > 0) {
          // Handle array format: [{"output": "text"}]
          responseText = webhookData[0].output || webhookData[0].response || webhookData[0].message || responseText;
        } else if (webhookData.output) {
          // Handle direct output field
          responseText = webhookData.output;
        } else if (webhookData.response) {
          // Handle response field
          responseText = webhookData.response;
        } else if (webhookData.message) {
          // Handle message field
          responseText = webhookData.message;
        }
        
        // Format the response for better display
        const formattedResponse = formatAIResponse(responseText);
        
        return NextResponse.json({
          success: true,
          response: formattedResponse,
          confidence: webhookData.confidence || 0.9,
          toolCalls: webhookData.tools_used?.map((toolName: string) => ({
            name: toolName,
            success: true
          })) || [],
          metadata: {
            courseId,
            conversationId: uniqueConversationId,
            timestamp: new Date().toISOString(),
            agent: 'Webhook-AI-Agent',
            source: 'broom-webhook',
            webhookId: 'de2a557e-c5e4-4a31-b067-afdcad9c32e0'
          }
        });
      } else {
        const errorText = await webhookResponse.text();
        console.log('[AI-Agent] Webhook failed with status:', webhookResponse.status, 'Response:', errorText);
      }
      
      console.log('[AI-Agent] Webhook agent failed, falling back to TypeScript agent');
      
    } catch (webhookError) {
      console.log('[AI-Agent] Webhook agent error details:', {
        name: webhookError instanceof Error ? webhookError.name : 'Unknown',
        message: webhookError instanceof Error ? webhookError.message : 'Unknown error',
        code: (webhookError as any)?.code,
        cause: (webhookError as any)?.cause,
        stack: webhookError instanceof Error ? webhookError.stack?.split('\n').slice(0, 5) : undefined
      });
      
      // Test basic connectivity
      try {
        const testUrl = 'https://httpbin.org/get';
        console.log('[AI-Agent] Testing basic internet connectivity to:', testUrl);
        const testResponse = await fetch(testUrl, { 
          method: 'GET',
          signal: AbortSignal.timeout(5000)
        });
        console.log('[AI-Agent] Basic connectivity test:', testResponse.ok ? 'SUCCESS' : 'FAILED');
      } catch (connectivityError) {
        console.log('[AI-Agent] Basic connectivity test FAILED:', 
          connectivityError instanceof Error ? connectivityError.message : 'Unknown'
        );
      }
      
      console.log('[AI-Agent] Webhook agent unavailable, using TypeScript fallback');
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