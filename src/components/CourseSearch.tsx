'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Command } from 'cmdk';
import { X, MessageCircle, Send, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { CourseWithTranslations } from '../lib/courses';
import { getCoursesAction } from '../app/actions';

interface ChatMessage {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export default function CourseSearch() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<CourseWithTranslations[]>([]);
  
  // Chatbot state
  const [chatMode, setChatMode] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const coursesData = await getCoursesAction();
        setCourses(coursesData);
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadCourses();
  }, []);
  
  const filteredCourses = searchQuery 
    ? courses.filter(course => 
        course.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : courses;

  // Reset chat mode
  const resetChatMode = () => {
    setChatMode(false);
    setChatMessages([]);
    setChatInput('');
  };

  // Close dialog and reset state
  const closeDialog = useCallback(() => {
    setOpen(false);
    resetChatMode();
    setSearchQuery('');
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  // Enhanced AI response using the new agent system
  const generateBotResponse = async (userMessage: string): Promise<string> => {
    try {
      // Try to use the advanced AI agent first
      const response = await fetch('/api/ai-agent/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          courseId: null // No specific course context
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          return data.response;
        }
      }
    } catch (error) {
      console.error('Advanced AI failed, falling back to basic responses:', error);
    }

    // Fallback to basic keyword-based responses
    const message = userMessage.toLowerCase();
    
    if (message.includes('aws') || message.includes('cloud')) {
      return "Je vois que vous vous intéressez au cloud AWS ! Nous proposons une formation AWS Cloud Engineer Associate qui couvre les services cloud et l'infrastructure. Voulez-vous en savoir plus sur cette formation ?";
    }
    
    if (message.includes('python') || message.includes('programmation')) {
      return "Excellente question sur Python ! Notre formation Python Developer couvre les fondamentaux de la programmation jusqu'aux concepts avancés pour créer des applications réelles. Cette formation est parfaite pour débuter ou améliorer vos compétences en développement.";
    }
    
    if (message.includes('docker') || message.includes('conteneur')) {
      return "Docker est une technologie fantastique ! Notre formation Docker vous apprend à maîtriser la conteneurisation pour améliorer l'efficacité, la scalabilité et les workflows de développement.";
    }
    
    if (message.includes('sécurité') || message.includes('burp') || message.includes('cybersécurité')) {
      return "La sécurité web est cruciale ! Notre formation Burp Suite vous enseigne les tests de sécurité web avec des outils de test de pénétration standards de l'industrie.";
    }
    
    if (message.includes('design') || message.includes('ux') || message.includes('ui')) {
      return "Le design UX/UI est passionnant ! Notre formation couvre l'expérience utilisateur et le design d'interface pour créer des produits numériques intuitifs et beaux avec des outils et méthodologies modernes.";
    }
    
    if (message.includes('ia') || message.includes('intelligence artificielle') || message.includes('automation')) {
      return "L'IA et l'automation sont l'avenir ! Notre formation AI Automation vous apprend à construire des systèmes intelligents qui automatisent les processus et créent des workflows efficaces.";
    }
    
    if (message.includes('terraform') || message.includes('infrastructure')) {
      return "Terraform est parfait pour l'infrastructure as code ! Notre formation vous enseigne à gérer l'infrastructure de manière déclarative et automatisée.";
    }
    
    if (message.includes('github') || message.includes('ci/cd') || message.includes('déploiement')) {
      return "GitHub Actions est un outil puissant ! Notre formation vous apprend à automatiser vos workflows avec des capacités CI/CD directement depuis votre repository GitHub.";
    }
    
    if (message.includes('prix') || message.includes('coût') || message.includes('tarif')) {
      return "Pour les informations sur les prix et les modalités de financement, je vous recommande de vous inscrire à notre newsletter ou de nous contacter directement. Nous proposons différentes options de paiement et de financement.";
    }
    
    if (message.includes('durée') || message.includes('temps') || message.includes('planning')) {
      return "Nos formations sont conçues pour être flexibles ! La plupart durent entre quelques semaines et quelques mois, avec des horaires adaptés aux professionnels. Chaque formation a son propre rythme et sa propre flexibilité.";
    }
    
    if (message.includes('certificat') || message.includes('certification')) {
      return "Oui ! Nos formations incluent des certificats partageables que vous pouvez ajouter à votre profil LinkedIn. Certaines formations offrent également des certifications reconnues par l'industrie.";
    }
    
    if (message.includes('niveau') || message.includes('débutant') || message.includes('expérience')) {
      return "Nos formations s'adressent à différents niveaux ! Nous avons des cours pour débutants comme pour professionnels expérimentés. Chaque formation précise le niveau requis et l'expérience recommandée.";
    }
    
    // Default response for general queries
    return `Je comprends votre intérêt pour "${userMessage}". Bien que nous n'ayons pas de formation spécifique correspondant exactement à votre recherche, nous proposons 8 formations en tech : AWS Cloud Engineer, UX/UI Design, Docker, GitHub Actions, Python Developer, Burp Suite, AI Automation, et Terraform. Pouvez-vous me dire quel domaine vous intéresse le plus ?`;
  };

  // Handle chat message submission
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: chatInput.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    try {
      // Simulate a small delay for more natural feel
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const botResponse = await generateBotResponse(userMessage.content);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating bot response:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Désolé, je rencontre un problème technique. Pouvez-vous reformuler votre question ?",
        isBot: true,
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setChatLoading(false);
    }
  };

  // Switch to chat mode
  const activateChatMode = () => {
    setChatMode(true);
    if (chatMessages.length === 0) {
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: "Bonjour ! Je suis votre assistant Worketyamo. Je peux vous aider à trouver la formation qui vous convient ou répondre à vos questions sur nos programmes. Que recherchez-vous ?",
        isBot: true,
        timestamp: new Date()
      };
      setChatMessages([welcomeMessage]);
    }
  };

  // Prevent scrolling when search dialog is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    }
  }, [open]);

  // Handle keyboard shortcuts (⌘K to open, Escape to close)
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Close with Escape key
      if (e.key === 'Escape') closeDialog();
      
      // Open with Command+K (Mac) or Ctrl+K (Windows/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Prevent default browser behavior
        setOpen(true);
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [closeDialog]);

  const handleCourseClick = (course: CourseWithTranslations) => {
    // Close search dialog
    setOpen(false);
    // Reset chat mode
    resetChatMode();
    // Navigation will be handled by Next.js Link component
  };

  return (
    <div className="w-full max-w-screen md:max-w-full md:mx-auto relative">
      {/* Search Trigger Button */}
      {!open && (
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="w-full px-4 py-3 bg-[#333333] text-white rounded-md focus:outline-none cursor-pointer font-body flex items-center"
          >
            <span className="flex-1 text-left">Rechercher une formation...</span>
            <span className="text-gray-400">⌘K</span>
          </button>
        </motion.div>
      )}

      {/* Course Buttons (when not in search mode) */}
      {!open && (
        <div className="flex w-full flex-wrap md:items-center md:justify-center gap-2">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="w-fit sm:w-1/2 md:w-auto"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, // Longer delay between items for more noticeable effect
                duration: 0.5,
                type: "spring",
                stiffness: 100
              }}
            >
              <Link 
                href={`/course/${course.id}`}
                className="flex w-full md:w-auto items-center text-sm md:text-base gap-2 px-2 py-1.5 rounded-md text-white transition-all font-heading justify-start"
                style={{ backgroundColor: course.backgroundColor || '#333333' }}
              >
                {/* Icon placeholder - you'll insert your own logos here */}
                <div className="w-6 h-6 flex-shrink-0 bg-transparent flex items-center justify-center rounded-sm overflow-hidden">
                  {course.iconUrl ? (
                    <Image 
                      src={course.iconUrl} 
                      alt={`${course.label} icon`} 
                      width={24}
                      height={24}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full rounded bg-white/20 flex items-center justify-center text-white text-xs">
                      {course.label.charAt(0)}
                    </div>
                  )}
                </div>
                <span>{course.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* CMDK Dialog */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              className="fixed inset-0 bg-black/70 backdrop-blur-3xl"
              onClick={closeDialog}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            
            {/* Dialog */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div 
                className="relative z-20 bg-[#21262D] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#333]"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, type: "spring", damping: 20 }}
              >
                <Command 
                  className="overflow-hidden"
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                  filter={(value, search, keywords) => {
                    // Don't filter when no search query - show all courses
                    if (!search) return 1
                    
                    // Otherwise use default filtering
                    const label = value.toLowerCase()
                    const query = search.toLowerCase()
                    return label.includes(query) ? 1 : 0
                  }}
                >
                  <div className="p-4 flex items-center justify-between relative h-16">
                    <Command.Input 
                      placeholder="Rechercher une formation..."
                      className="w-full pl-2 pr-10 py-2 bg-transparent text-white border-none focus:outline-none font-body text-lg"
                      autoFocus
                    />
                    <button 
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white flex items-center justify-center"
                      onClick={closeDialog}
                      aria-label="Close dialog"
                    >
                      <X className="h-5 w-5" strokeWidth={2} />
                    </button>
                  </div>

                  <Command.List className="max-h-[60vh] overflow-y-auto px-2 pb-2">
                    {loading && <Command.Loading>Loading courses...</Command.Loading>}

                    <Command.Empty className="p-6">
                      {!chatMode ? (
                        <div className="text-center">
                          <div className="text-gray-400 font-body mb-4">
                            Aucune formation trouvée pour &ldquo;{searchQuery}&rdquo;
                          </div>
                          <button
                            onClick={activateChatMode}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-body"
                          >
                            <MessageCircle className="h-4 w-4" />
                            Demander à notre assistant
                          </button>
                        </div>
                      ) : (
                        <div className="h-[400px] flex flex-col">
                          {/* Chat Header */}
                          <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-600">
                            <div className="flex items-center gap-2">
                              <Bot className="h-5 w-5 text-orange-500" />
                              <span className="text-white font-heading">Assistant Worketyamo</span>
                            </div>
                            <button
                              onClick={resetChatMode}
                              className="text-gray-400 hover:text-white transition-colors"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Chat Messages */}
                          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                            {chatMessages.map((message) => (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                              >
                                {message.isBot && (
                                  <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                                    <Bot className="h-4 w-4 text-white" />
                                  </div>
                                )}
                                <div
                                  className={`max-w-[80%] p-3 rounded-lg text-sm font-body ${
                                    message.isBot
                                      ? 'bg-gray-700 text-gray-100'
                                      : 'bg-orange-500 text-white ml-auto'
                                  }`}
                                >
                                  {message.content}
                                </div>
                                {!message.isBot && (
                                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                                    <User className="h-4 w-4 text-white" />
                                  </div>
                                )}
                              </motion.div>
                            ))}
                            {chatLoading && (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex gap-2 justify-start"
                              >
                                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
                                  <Bot className="h-4 w-4 text-white" />
                                </div>
                                <div className="bg-gray-700 text-gray-100 p-3 rounded-lg text-sm font-body">
                                  <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                            <div ref={chatEndRef} />
                          </div>

                          {/* Chat Input */}
                          <form onSubmit={handleChatSubmit} className="flex gap-2">
                            <input
                              type="text"
                              value={chatInput}
                              onChange={(e) => setChatInput(e.target.value)}
                              placeholder="Posez votre question..."
                              className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-orange-500 focus:outline-none font-body text-sm"
                              disabled={chatLoading}
                            />
                            <button
                              type="submit"
                              disabled={!chatInput.trim() || chatLoading}
                              className="px-3 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Send className="h-4 w-4" />
                            </button>
                          </form>
                        </div>
                      )}
                    </Command.Empty>
                    
                    <div className="pl-4 pr-0 py-2 text-sm text-gray-400 font-body text-left">
                      Suggestion
                    </div>

                    <Command.Group className="mb-2">
                      {/* Debug courses count */}
                      {/* <div className="text-white">Courses: {filteredCourses.length}</div> */}
                      {courses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            delay: index * 0.03,
                            duration: 0.2
                          }}
                        >
                          <Command.Item
                            value={course.id}
                            className="px-4 py-2 hover:bg-[#333] rounded-sm flex items-center justify-between cursor-pointer my-1 aria-selected:bg-[#333]"
                            onSelect={() => {
                              closeDialog();
                              window.location.href = `/course/${course.id}`;
                            }}
                          >
                            <div className="text-white font-heading text-sm md:text-lg">{course.label}</div>
                            <div className="flex items-center justify-center w-8 h-8 rounded overflow-hidden">
                              {course.iconUrl ? (
                                <Image 
                                  src={course.iconUrl} 
                                  alt={`${course.label} icon`} 
                                  width={32}
                                  height={32}
                                  className="w-full h-full object-contain"
                                />
                              ) : (
                                <div className="w-6 h-6 rounded bg-blue-500 flex items-center justify-center text-white text-xs">
                                  {course.label.charAt(0)}
                                </div>
                              )}
                            </div>
                          </Command.Item>
                        </motion.div>
                      ))}
                    </Command.Group>
                  </Command.List>
                </Command>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
