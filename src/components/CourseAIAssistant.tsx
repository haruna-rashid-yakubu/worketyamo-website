'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, MessageCircle, Sparkles } from 'lucide-react';
import { CourseDetailWithTranslations } from '@/lib/courses';

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface CourseAIAssistantProps {
  courseDetail: CourseDetailWithTranslations;
}

export default function CourseAIAssistant({ courseDetail }: CourseAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  // Suggested questions based on course data
  const getSuggestedQuestions = () => {
    const suggestions = [
      "Combien de temps dure cette formation ?",
      "Quels sont les prérequis ?",
      "Qui sont les formateurs ?",
      "Quel est le programme détaillé ?",
    ];

    // Add dynamic suggestions based on available course data
    if (courseDetail.shareable || courseDetail.industryRecognized) {
      suggestions.push("Est-ce que j'aurai un certificat ?");
    }
    if (courseDetail.modules && courseDetail.modules.length > 0) {
      suggestions.push("Quelles compétences vais-je apprendre ?");
    }
    if (courseDetail.rating && courseDetail.reviewCount) {
      suggestions.push("Quels sont les avis des étudiants ?");
    }
    
    return suggestions.slice(0, 5); // Limit to 5 suggestions
  };

  // Generate course-specific AI responses
  const generateCourseResponse = async (userMessage: string): Promise<string> => {
    const message = userMessage.toLowerCase();
    const courseName = courseDetail.label;
    const courseTitle = courseDetail.fullTitle;
    
    // Course-specific responses
    if (message.includes('durée') || message.includes('temps') || message.includes('combien')) {
      return `La formation ${courseName} a une durée de ${courseDetail.scheduleDuration || 'plusieurs semaines'} avec un rythme ${courseDetail.scheduleFlexibility || 'flexible'}. Le planning est ${courseDetail.schedule || 'adapté aux professionnels'}.`;
    }
    
    if (message.includes('niveau') || message.includes('prérequis') || message.includes('débutant')) {
      return `Cette formation ${courseName} est de niveau ${courseDetail.level || 'intermédiaire'} et nécessite ${courseDetail.experienceRequired || 'quelques connaissances de base'}. Elle est accessible aux professionnels motivés !`;
    }
    
    if (message.includes('certificat') || message.includes('certification')) {
      if (courseDetail.shareable) {
        return `Oui ! À la fin de la formation ${courseName}, vous obtiendrez un certificat partageable que vous pourrez ajouter à votre profil LinkedIn. ${courseDetail.shareableText || 'C\'est un plus pour votre carrière !'}`;
      }
      return `Les détails sur la certification pour ${courseName} seront précisés lors de l'inscription. N'hésitez pas à nous contacter pour plus d'informations !`;
    }
    
    if (message.includes('module') || message.includes('programme') || message.includes('contenu')) {
      const moduleCount = courseDetail.modules?.length || 0;
      if (moduleCount > 0) {
        const firstModule = courseDetail.modules[0];
        return `La formation ${courseName} comprend ${moduleCount} modules principaux. Le premier module couvre "${firstModule.title}" où vous apprendrez ${firstModule.description}. Chaque module est conçu pour une progression optimale !`;
      }
      return `Le programme de ${courseName} est structuré en modules progressifs couvrant tous les aspects essentiels. Vous pouvez voir le détail complet sur cette page !`;
    }
    
    if (message.includes('formateur') || message.includes('instructor') || message.includes('professeur')) {
      const instructorCount = courseDetail.instructors?.length || 0;
      if (instructorCount > 0) {
        const instructor = courseDetail.instructors[0];
        return `Nos formateurs sont des experts ! ${instructor.name}, ${instructor.title}, vous accompagnera dans cette formation. ${instructor.courses ? `Il a animé ${instructor.courses} cours` : 'Il a une grande expérience'} et ${instructor.learners ? `formé ${instructor.learners.toLocaleString()} apprenants` : 'une pédagogie reconnue'}.`;
      }
      return `Nos formateurs pour ${courseName} sont des professionnels expérimentés du domaine, sélectionnés pour leur expertise et leurs qualités pédagogiques.`;
    }
    
    if (message.includes('compétence') || message.includes('skill') || message.includes('apprendre')) {
      const skillCount = courseDetail.skills?.length || 0;
      if (skillCount > 0) {
        const skills = courseDetail.skills.slice(0, 3).map(s => s.name).join(', ');
        return `Avec ${courseName}, vous développerez ${skillCount} compétences clés, notamment : ${skills}${skillCount > 3 ? ' et bien d\'autres' : ''}. Ces compétences sont très recherchées sur le marché !`;
      }
      return `Cette formation ${courseName} vous permettra d'acquérir des compétences pratiques et directement applicables dans votre travail quotidien.`;
    }
    
    if (message.includes('prix') || message.includes('coût') || message.includes('tarif')) {
      return `Pour connaître les tarifs de la formation ${courseName} et nos modalités de financement (OPCO, CPF, paiement en plusieurs fois), je vous invite à vous inscrire à notre newsletter ou à nous contacter directement. Nous proposons des solutions adaptées à chaque situation !`;
    }
    
    if (message.includes('inscription') || message.includes('comment') || message.includes('démarrer')) {
      return `Pour vous inscrire à ${courseName}, cliquez sur le bouton "Register" en haut de cette page ! Vous pourrez aussi poser toutes vos questions avant de vous engager. Nous sommes là pour vous accompagner dans votre démarche !`;
    }
    
    if (message.includes('avis') || message.includes('témoignage') || message.includes('retour')) {
      const rating = courseDetail.rating;
      const reviewCount = courseDetail.reviewCount;
      if (rating && reviewCount) {
        return `Les retours sur ${courseName} sont excellents ! La formation a une note moyenne de ${rating}/5 basée sur ${reviewCount.toLocaleString()} avis. Vous pouvez voir quelques témoignages d'anciens étudiants sur cette page !`;
      }
      return `Les retours sur nos formations sont très positifs ! Nos étudiants apprécient particulièrement la qualité pédagogique et l'accompagnement personnalisé.`;
    }
    
    if (message.includes('entreprise') || message.includes('professionnel') || message.includes('travail')) {
      return `${courseName} est parfaitement adaptée aux professionnels ! Notre approche pratique et nos horaires flexibles permettent de concilier formation et activité professionnelle. De nombreuses entreprises font confiance à Worketyamo pour former leurs équipes.`;
    }
    
    // General course info
    if (message.includes('formation') || message.includes('cours')) {
      return `${courseTitle} est une formation complète qui vous permettra de maîtriser ${courseName}. Avec ${courseDetail.enrollmentCount?.toLocaleString() || 'de nombreux'} étudiants déjà inscrits, c'est l'une de nos formations les plus appréciées !`;
    }
    
    // Default response
    return `Je suis spécialisé dans la formation ${courseName} ! Je peux vous renseigner sur le programme, la durée, les prérequis, les certificats, nos formateurs, et bien plus. Quelle information vous intéresse le plus sur cette formation ?`;
  };

  // Send message (used by both form submit and suggestion clicks)
  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: messageContent.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate thinking time for more natural interaction
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const botResponse = await generateCourseResponse(userMessage.content);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Désolé, je rencontre un problème technique. Pouvez-vous reformuler votre question ?",
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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

  // Initialize conversation
  const initializeChat = useCallback(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: `Bonjour ! Je suis votre assistant spécialisé pour la formation ${courseDetail.label}. Je peux répondre à toutes vos questions sur cette formation : programme, durée, prérequis, formateurs, certificats, et bien plus.

Choisissez une question ci-dessous ou posez la vôtre !`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [courseDetail.label, messages.length]);

  // Open chat and initialize
  const openChat = () => {
    setIsOpen(true);
    initializeChat();
  };

  // Close chat
  const closeChat = () => {
    setIsOpen(false);
    // Reset suggestions when closing chat
    setShowSuggestions(true);
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 1.5, 
          duration: 0.6, 
          type: "spring", 
          stiffness: 150,
          damping: 12
        }}
      >
        <motion.button
          onClick={openChat}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow effects matching page style */}
          <div className="absolute inset-0 rounded-full blur-xl bg-orange-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
          <div className="absolute inset-[-2px] rounded-full blur-md bg-orange-400 opacity-10 group-hover:opacity-20 transition-opacity duration-300" />
          
          {/* Main button */}
          <div className="relative w-14 h-14 bg-[#21262D]/90 backdrop-blur-md border border-orange-500/20 rounded-full flex items-center justify-center shadow-lg shadow-slate-800/80 group-hover:border-orange-500/40 transition-all duration-300">
            {/* Animated sparkles */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="absolute top-1 right-2 w-3 h-3 text-orange-400 opacity-60" />
              <Sparkles className="absolute bottom-2 left-1 w-2 h-2 text-orange-300 opacity-40" />
            </motion.div>
            
            {/* Bot icon with breathing animation */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bot className="w-6 h-6 text-orange-500" />
            </motion.div>
          </div>
          
          {/* Tooltip */}
          <motion.div
            className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-[#21262D]/90 backdrop-blur-md text-white text-sm rounded-md border border-white/10 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 0, y: 5 }}
            whileHover={{ opacity: 1, y: 0 }}
          >
            Poser une question sur ce cours
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-end justify-end p-4 pointer-events-none">
            {/* Backdrop for mobile */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm md:hidden pointer-events-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeChat}
            />
            
            {/* Chat Container */}
            <motion.div
              className="relative w-full max-w-sm h-[500px] bg-[#21262D]/95 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl shadow-slate-900/50 flex flex-col pointer-events-auto"
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-heading text-sm">Assistant {courseDetail.label}</h3>
                    <p className="text-gray-400 text-xs font-body">Spécialisé dans cette formation</p>
                  </div>
                </div>
                <button
                  onClick={closeChat}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-orange-500" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm font-body ${
                        message.isBot
                          ? 'bg-[#2D2A2A] text-gray-100 border border-white/5'
                          : 'bg-orange-500 text-white'
                      }`}
                    >
                      {message.content}
                    </div>
                    {!message.isBot && (
                      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2 justify-start"
                  >
                    <div className="w-7 h-7 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="bg-[#2D2A2A] text-gray-100 p-3 rounded-lg border border-white/5">
                      <div className="flex gap-1">
                        <motion.div 
                          className="w-2 h-2 bg-orange-400 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-orange-400 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-2 h-2 bg-orange-400 rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Question Suggestions */}
                {showSuggestions && !isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <div className="text-xs text-gray-400 font-body px-2">
                      💡 Questions suggérées :
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {getSuggestedQuestions().map((suggestion, index) => (
                        <motion.button
                          key={suggestion}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-2 bg-[#2D2A2A]/50 hover:bg-[#2D2A2A] text-gray-300 hover:text-white text-xs rounded-lg border border-white/5 hover:border-orange-500/30 transition-all duration-200 font-body text-left"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Posez votre question..."
                    className="flex-1 px-3 py-2 bg-[#2D2A2A] text-white rounded-lg border border-white/10 focus:border-orange-500/50 focus:outline-none font-body text-sm placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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