'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, MessageCircle, Sparkles, Brain, Zap } from 'lucide-react';
import { CourseDetailWithTranslations } from '@/lib/courses';

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
  confidence?: number;
  toolsUsed?: string[];
}

interface AdvancedCourseAIAssistantProps {
  courseDetail: CourseDetailWithTranslations;
  realCourseId?: string;
}

export default function AdvancedCourseAIAssistant({ courseDetail, realCourseId }: AdvancedCourseAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [agentStatus, setAgentStatus] = useState<'idle' | 'thinking' | 'processing' | 'responding'>('idle');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'connecting'>('connected');
  const [pageViewTime, setPageViewTime] = useState(0);
  const [proactiveTriggered, setProactiveTriggered] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Hide suggestions after first user message
  useEffect(() => {
    const userMessages = messages.filter(m => !m.isBot);
    if (userMessages.length > 0) {
      setShowSuggestions(false);
    }
  }, [messages]);

  // Proactive assistance based on page view time
  useEffect(() => {
    const timer = setInterval(() => {
      setPageViewTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Trigger proactive AI assistance after 30 seconds of viewing
  useEffect(() => {
    if (pageViewTime > 30 && !proactiveTriggered && messages.length === 0) {
      setProactiveTriggered(true);
      
      const proactiveMessage: ChatMessage = {
        id: 'proactive-' + Date.now(),
        content: `👋 **Assistant Proactif Activé !**

Je vois que vous consultez attentivement **${courseDetail.fullTitle}**. Permettez-moi de vous accompagner !

🎯 **Questions fréquentes sur cette formation :**
• "Est-ce que cette formation correspond à mon niveau ?"
• "Combien de temps faut-il pour maîtriser ces compétences ?"
• "Quels sont les débouchés concrets après cette formation ?"

💡 **Conseil personnalisé :** Décrivez-moi votre parcours actuel, et je vous dirai précisément comment cette formation peut booster votre carrière !

N'hésitez pas à me poser vos questions ! 🚀`,
        isBot: true,
        timestamp: new Date(),
        confidence: 0.95
      };
      
      setMessages([proactiveMessage]);
    }
  }, [pageViewTime, proactiveTriggered, messages.length, courseDetail.fullTitle]);

  // Enhanced course-specific suggested questions with AI-powered personalization
  const getSuggestedQuestions = useCallback(() => {
    const courseName = courseDetail.label;
    const userInteractionLevel = messages.length;
    
    // Base suggestions that evolve based on conversation
    let dynamicSuggestions = [];
    
    if (userInteractionLevel === 0) {
      // First-time suggestions - overview focused
      dynamicSuggestions = [
        `Détaille-moi le programme complet ${courseName}`,
        `Suis-je fait pour la formation ${courseName} ?`,
        `Quelles compétences vais-je maîtriser en ${courseName} ?`,
        `Qui sont les formateurs de cette formation ?`,
      ];
    } else {
      // Follow-up suggestions - more specific
      dynamicSuggestions = [
        `Quels sont les projets pratiques en ${courseName} ?`,
        `Comment se déroule l'évaluation et la certification ?`,
        `Quel accompagnement après la formation ?`,
        `Quels sont les débouchés concrets après ${courseName} ?`,
      ];
    }

    // Add highly specific suggestions based on course content
    if (courseDetail.modules && courseDetail.modules.length > 0) {
      const firstModule = courseDetail.modules[0];
      const lastModule = courseDetail.modules[courseDetail.modules.length - 1];
      
      if (userInteractionLevel === 0) {
        dynamicSuggestions.push(`Explique-moi le module "${firstModule.title}"`);
      } else {
        dynamicSuggestions.push(`Comment le module "${lastModule.title}" prépare au monde professionnel ?`);
      }
    }
    
    if (courseDetail.shareable || courseDetail.industryRecognized) {
      if (userInteractionLevel === 0) {
        dynamicSuggestions.push(`Quelles certifications vais-je obtenir ?`);
      } else {
        dynamicSuggestions.push(`Comment valoriser ces certifications sur LinkedIn ?`);
      }
    }
    
    if (courseDetail.instructors && courseDetail.instructors.length > 0) {
      const instructor = courseDetail.instructors[0];
      if (userInteractionLevel === 0) {
        dynamicSuggestions.push(`Parle-moi de ${instructor.name}`);
      } else {
        dynamicSuggestions.push(`Comment les formateurs accompagnent-ils individuellement ?`);
      }
    }

    if (courseDetail.testimonials && courseDetail.testimonials.length > 0) {
      if (userInteractionLevel === 0) {
        dynamicSuggestions.push(`Quels sont les retours des anciens étudiants ?`);
      } else {
        dynamicSuggestions.push(`Quelles réussites professionnelles après cette formation ?`);
      }
    }

    if (courseDetail.skills && courseDetail.skills.length > 0) {
      if (userInteractionLevel === 0) {
        dynamicSuggestions.push(`Combien de temps pour devenir opérationnel ?`);
      } else {
        dynamicSuggestions.push(`Comment maintenir mes compétences ${courseName} à jour ?`);
      }
    }
    
    // Smart filtering based on previous questions
    const askedTopics = messages
      .filter(m => !m.isBot)
      .map(m => m.content.toLowerCase());
      
    const filteredSuggestions = dynamicSuggestions.filter(suggestion => {
      const suggestionWords = suggestion.toLowerCase().split(' ');
      return !askedTopics.some(topic => 
        suggestionWords.some(word => topic.includes(word) && word.length > 3)
      );
    });
    
    return filteredSuggestions.slice(0, 5);
  }, [courseDetail, messages]);

  // Advanced message processing with AI agent
  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    setAgentStatus('thinking');
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageContent.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      setConnectionStatus('connecting');
      setAgentStatus('processing');

      // Call the advanced AI agent API
      const response = await fetch('/api/ai-agent/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageContent.trim(),
          courseId: realCourseId || courseDetail.id,
          conversationId: conversationId,
          courseContext: {
            id: realCourseId || courseDetail.id,
            label: courseDetail.label,
            fullTitle: courseDetail.fullTitle,
            subtitle: courseDetail.subtitle,
            level: courseDetail.level,
            duration: courseDetail.scheduleDuration,
            moduleCount: courseDetail.modules?.length || 0,
            instructorCount: courseDetail.instructors?.length || 0,
            skillCount: courseDetail.skills?.length || 0,
            hasTestimonials: (courseDetail.testimonials?.length || 0) > 0
          }
        }),
      });

      setConnectionStatus('connected');
      setAgentStatus('responding');

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'AI agent response failed');
      }

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        isBot: true,
        timestamp: new Date(),
        confidence: data.confidence,
        toolsUsed: data.toolCalls?.map((call: any) => call.name) || []
      };

      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Advanced AI Agent Error:', error);
      setConnectionStatus('disconnected');
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Je rencontre des difficultés techniques avec mes systèmes avancés. Puis-je vous aider autrement ? Reformulez votre question et je ferai de mon mieux pour vous répondre avec mes capacités locales.",
        isBot: true,
        timestamp: new Date(),
        confidence: 0.3
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setAgentStatus('idle');
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(input);
    setInput('');
  };

  // Handle suggestion click
  const handleSuggestionClick = async (suggestion: string) => {
    await sendMessage(suggestion);
  };

  // Initialize conversation with advanced welcome
  const initializeChat = useCallback(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: `🧠 **Assistant IA Avancé - ${courseDetail.label}**

Bonjour ! Je suis votre assistant IA spécialisé pour **${courseDetail.fullTitle}**. Je connais parfaitement cette formation spécifique : chaque module, chaque formateur, chaque compétence développée.

🎯 **Mes capacités spécialisées pour cette formation :**
• Programme détaillé module par module
• Présentation de l'équipe pédagogique
• Analyse de votre adéquation avec les prérequis
• Compétences concrètes que vous développerez
• Informations sur les certifications incluses
• Témoignages d'anciens étudiants de cette formation

✨ **Intelligence contextuelle :** Toutes mes réponses sont basées sur les données réelles de **cette formation spécifique** dans notre base de données.

Posez-moi vos questions sur cette formation !`,
        isBot: true,
        timestamp: new Date(),
        confidence: 1.0,
        toolsUsed: ['advanced_initialization']
      };
      setMessages([welcomeMessage]);
    }
  }, [courseDetail.label, messages.length]);

  // Initialize conversation ID and session persistence
  useEffect(() => {
    const courseKey = realCourseId || courseDetail.id;
    
    // Generate or restore conversation ID
    let savedConversationId = localStorage.getItem(`ai-conversation-id-${courseKey}`);
    if (!savedConversationId) {
      savedConversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem(`ai-conversation-id-${courseKey}`, savedConversationId);
    }
    setConversationId(savedConversationId);

    // Restore messages
    const savedMessages = localStorage.getItem(`ai-chat-${courseKey}`);
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          })));
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Failed to restore chat history:', error);
      }
    }
  }, [courseDetail.id, realCourseId]);


  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      const courseKey = realCourseId || courseDetail.id;
      localStorage.setItem(`ai-chat-${courseKey}`, JSON.stringify(messages));
    }
  }, [messages, courseDetail.id, realCourseId]);

  // Open chat and initialize
  const openChat = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      initializeChat();
    }
  };

  // Close chat
  const closeChat = () => {
    setIsOpen(false);
    setShowSuggestions(true);
    setAgentStatus('idle');
  };

  // Status indicator component
  const StatusIndicator = () => {
    const getStatusColor = () => {
      switch (agentStatus) {
        case 'thinking': return 'text-blue-400';
        case 'processing': return 'text-orange-400';
        case 'responding': return 'text-green-400';
        default: return 'text-gray-400';
      }
    };

    const getStatusText = () => {
      switch (agentStatus) {
        case 'thinking': return 'Analyse...';
        case 'processing': return 'Consultation BDD...';
        case 'responding': return 'Génération...';
        default: return 'Prêt';
      }
    };

    return (
      <div className="flex items-center gap-2 text-xs">
        <div className={`w-2 h-2 rounded-full ${agentStatus !== 'idle' ? 'animate-pulse bg-orange-400' : 'bg-gray-400'}`} />
        <span className={getStatusColor()}>{getStatusText()}</span>
        {connectionStatus === 'disconnected' && (
          <span className="text-red-400">• Hors ligne</span>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Enhanced Floating AI Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.8, 
          type: "spring", 
          stiffness: 120,
          damping: 10
        }}
      >
        <motion.button
          onClick={openChat}
          className="relative group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Enhanced glow effects */}
          <div className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-r from-orange-500 via-purple-500 to-blue-500 opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
          <div className="absolute inset-[-3px] rounded-full blur-lg bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 opacity-15 group-hover:opacity-30 transition-opacity duration-500" />
          
          {/* Main button with gradient border */}
          <div className="relative w-16 h-16 bg-[#21262D]/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl shadow-slate-900/80 border border-orange-500/30 group-hover:border-purple-500/50 transition-all duration-500">
            {/* Animated AI sparkles */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="absolute top-1 right-2 w-3 h-3 text-orange-400 opacity-70" />
              <Brain className="absolute bottom-2 left-1 w-3 h-3 text-purple-400 opacity-60" />
              <Zap className="absolute top-3 left-2 w-2 h-2 text-blue-400 opacity-50" />
            </motion.div>
            
            {/* Enhanced bot icon with AI glow */}
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Bot className="w-7 h-7 text-orange-500 drop-shadow-lg" />
              <motion.div
                className="absolute inset-0 rounded-full bg-orange-400/20"
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            {/* AI indicator badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
          </div>
          
          {/* Enhanced tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-[#21262D]/95 backdrop-blur-md text-white text-sm rounded-lg border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-400" />
              <span>Assistant IA Avancé</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Powered by ADK Intelligence</div>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Enhanced Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-end p-4 pointer-events-none">
            {/* Enhanced backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm md:hidden pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
            />
            
            {/* Enhanced Chat Container */}
            <motion.div
              className="relative w-full max-w-md h-[550px] bg-gradient-to-br from-[#21262D]/98 via-[#1a1f26]/98 to-[#21262D]/98 backdrop-blur-xl rounded-2xl border border-white/15 shadow-2xl shadow-slate-900/80 flex flex-col pointer-events-auto overflow-hidden"
              initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100, rotateX: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Enhanced Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-9 h-9 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-orange-500" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-heading text-sm flex items-center gap-2">
                      Assistant IA - {courseDetail.label}
                      {connectionStatus === 'connected' && (
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      )}
                    </h3>
                    <StatusIndicator />
                  </div>
                </div>
                <button
                  onClick={closeChat}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Enhanced Messages */}
              <div 
                className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#4B5563 #1F2937'
                }}
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1 border border-white/10">
                        <Brain className="w-4 h-4 text-orange-500" />
                      </div>
                    )}
                    <div className="max-w-[85%] space-y-1">
                      <div
                        className={`p-3 rounded-lg text-sm font-body ${
                          message.isBot
                            ? 'bg-gradient-to-r from-[#2D2A2A]/90 via-[#252525]/90 to-[#2D2A2A]/90 text-gray-100 border border-white/10 shadow-lg'
                            : 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg'
                        }`}
                      >
                        {message.content}
                      </div>
                      {/* Enhanced message metadata */}
                      {message.isBot && (message.confidence !== undefined || message.toolsUsed) && (
                        <div className="flex items-center gap-2 text-xs text-gray-400 px-2">
                          {message.confidence !== undefined && (
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {Math.round(message.confidence * 100)}%
                            </span>
                          )}
                          {message.toolsUsed && message.toolsUsed.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Brain className="w-3 h-3" />
                              Outils: {message.toolsUsed.length}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Enhanced Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex gap-3 justify-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1 border border-white/10">
                      <Brain className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="bg-gradient-to-r from-[#2D2A2A]/90 via-[#252525]/90 to-[#2D2A2A]/90 text-gray-100 p-3 rounded-lg border border-white/10">
                      <div className="flex gap-1 items-center">
                        <motion.div 
                          className="w-2 h-2 bg-orange-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-purple-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-blue-400 rounded-full"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        />
                        <span className="ml-2 text-xs">{agentStatus === 'processing' ? 'Consultation base de données...' : 'Analyse en cours...'}</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Enhanced Question Suggestions */}
                {showSuggestions && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-3"
                  >
                    <div className="text-xs text-gray-400 font-body px-2 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400" />
                      Questions intelligentes suggérées :
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getSuggestedQuestions().map((suggestion, index) => (
                        <motion.button
                          key={suggestion}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-2 bg-gradient-to-r from-[#2D2A2A]/60 via-[#252525]/60 to-[#2D2A2A]/60 hover:from-[#2D2A2A] hover:via-[#252525] hover:to-[#2D2A2A] text-gray-300 hover:text-white text-xs rounded-lg border border-white/10 hover:border-orange-500/40 transition-all duration-300 font-body text-left shadow-md"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Enhanced Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-gradient-to-r from-[#21262D]/50 via-[#1a1f26]/50 to-[#21262D]/50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question à l'IA..."
                    className="flex-1 px-4 py-3 bg-[#2D2A2A]/80 text-white rounded-lg border border-white/15 focus:border-orange-500/50 focus:outline-none font-body text-sm placeholder-gray-400 transition-all duration-200"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-4 py-3 bg-gradient-to-r from-orange-500 to-purple-500 text-white rounded-lg hover:from-orange-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}