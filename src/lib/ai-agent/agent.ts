// Advanced AI Agent using Google ADK patterns
import { AgentConfig, ConversationMessage, AgentResponse, ConversationContext, ToolCall } from './types';
import { agentTools } from './tools';

export class WorketyamoAgent {
  private config: AgentConfig;
  private context: ConversationContext;

  constructor(courseId?: string) {
    this.config = {
      name: 'Worketyamo Assistant',
      model: 'advanced-conversational-ai',
      description: 'Expert assistant for Worketyamo training programs',
      tools: agentTools,
      systemPrompt: this.buildSystemPrompt(courseId),
      temperature: 0.7,
      maxTokens: 1000
    };

    this.context = {
      courseId,
      userPreferences: {
        language: 'fr'
      },
      sessionHistory: []
    };
  }

  private buildSystemPrompt(courseId?: string): string {
    return `Tu es l'assistant IA expert de Worketyamo, une plateforme française de formation technologique de premier plan.

CONTEXTE DE WORKETYAMO:
- Plateforme spécialisée dans les formations tech haut de gamme
- 8 formations principales: AWS Cloud Engineer, UX/UI Design, Docker, GitHub Actions, Python Developer, Burp Suite, AI Automation, Terraform
- Public cible: professionnels souhaitant se reconvertir ou monter en compétences
- Approche: formations pratiques, flexibles, avec accompagnement personnalisé
- Certifications reconnues par l'industrie et partageables sur LinkedIn

TON RÔLE:
- Expert technique et pédagogique de toutes les formations Worketyamo
- Conseiller personnalisé pour orienter les apprenants
- Assistant conversationnel fluide et engageant
- Source fiable d'informations précises sur les programmes

DIRECTIVES DE CONVERSATION:
1. **Ton professionnel mais chaleureux**: Tutoie l'utilisateur, sois accessible sans être familier
2. **Expertise technique**: Démontre une connaissance approfondie des technologies et du marché
3. **Conseil personnalisé**: Adapte tes recommandations au profil et aux objectifs de l'utilisateur
4. **Transparence**: Sois honnête sur les prérequis, la difficulté, et les débouchés
5. **Proactivité**: Propose des informations pertinentes et pose des questions qualifiantes

UTILISATION DES OUTILS:
- TOUJOURS utiliser get_course_info en premier pour le contexte de cours actuel
- search_courses: Pour recommander des formations selon les critères
- check_prerequisites: Pour évaluer l'adéquation profil/formation
- create_registration: Pour finaliser une inscription

STRUCTURE DES RÉPONSES:
1. **Accueil empathique**: Comprends le besoin de l'utilisateur
2. **Information précise**: Données factuelles issues de la base avec focus sur le cours actuel
3. **Conseil expert**: Recommandations basées sur l'expérience et le cours consulté
4. **Étapes suivantes**: Actions concrètes proposées en relation avec le cours

${courseId ? `\n🎯 CONTEXTE PRIORITAIRE: L'utilisateur consulte la formation "${courseId}". 
- CONCENTRE-TOI EXCLUSIVEMENT sur cette formation dans tes réponses
- Utilise les données réelles de cette formation (modules, formateurs, compétences, témoignages)
- Compare avec d'autres formations SEULEMENT si demandé explicitement
- Personnalise chaque réponse selon cette formation spécifique
- Référence toujours les éléments concrets de cette formation (noms des modules, formateurs, etc.)` : '\n💡 CONTEXTE GÉNÉRAL: Aide l\'utilisateur à choisir la formation qui lui convient.'}

IMPORTANT: Utilise TOUJOURS les données réelles de la base pour répondre. Ne jamais inventer d'informations.

Réponds toujours en français, sois précis, engageant et démontre ton expertise Worketyamo.`;
  }

  async processMessage(userMessage: string): Promise<AgentResponse> {
    try {
      // Add user message to context
      const userMsg: ConversationMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: userMessage,
        timestamp: new Date()
      };
      this.context.sessionHistory.push(userMsg);

      // Analyze user intent and determine if tools are needed
      const toolCalls = await this.determineToolCalls(userMessage);
      
      // Execute tool calls if any
      const toolResults: ToolCall[] = [];
      if (toolCalls.length > 0) {
        for (const toolCall of toolCalls) {
          const tool = this.config.tools.find(t => t.name === toolCall.name);
          if (tool) {
            try {
              const result = await tool.handler(toolCall.parameters);
              toolResults.push({
                ...toolCall,
                result
              });
            } catch (error) {
              console.error(`Tool ${toolCall.name} failed:`, error);
              toolResults.push({
                ...toolCall,
                result: { error: `Failed to execute ${toolCall.name}` }
              });
            }
          }
        }
      }

      // Generate response based on context, message, and tool results
      const response = await this.generateResponse(userMessage, toolResults);

      // Add assistant response to context
      const assistantMsg: ConversationMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        toolCalls: toolResults
      };
      this.context.sessionHistory.push(assistantMsg);

      return response;

    } catch (error) {
      console.error('Error processing message:', error);
      return {
        message: "Désolé, je rencontre un problème technique. Pouvez-vous reformuler votre question ?",
        confidence: 0.1
      };
    }
  }

  private async determineToolCalls(userMessage: string): Promise<ToolCall[]> {
    const message = userMessage.toLowerCase();
    const toolCalls: ToolCall[] = [];

    // ALWAYS get course info first if we have a courseId context
    if (this.context.courseId) {
      toolCalls.push({
        id: `tool_${Date.now()}`,
        name: 'get_course_info',
        parameters: { courseId: this.context.courseId }
      });
    }

    // Course information requests (additional triggers)
    if (this.context.courseId && (
      message.includes('cette formation') ||
      message.includes('ce cours') ||
      message.includes('programme') ||
      message.includes('module') ||
      message.includes('formateur') ||
      message.includes('durée') ||
      message.includes('prérequis') ||
      message.includes('compétence') ||
      message.includes('certificat') ||
      message.includes('niveau') ||
      message.includes('témoignage') ||
      message.includes('avis') ||
      message.includes('inscription') ||
      message.includes('tarif') ||
      message.includes('prix')
    )) {
      // Course info already added above, but ensure it's there
      const hasCourseTool = toolCalls.some(tool => tool.name === 'get_course_info');
      if (!hasCourseTool) {
        toolCalls.push({
          id: `tool_${Date.now()}`,
          name: 'get_course_info',
          parameters: { courseId: this.context.courseId }
        });
      }
    }

    // Course search requests
    if (message.includes('formation') && (
      message.includes('python') ||
      message.includes('aws') ||
      message.includes('docker') ||
      message.includes('design') ||
      message.includes('sécurité') ||
      message.includes('ia') ||
      message.includes('github') ||
      message.includes('terraform') ||
      message.includes('cherche') ||
      message.includes('recommande')
    )) {
      // Extract search query
      const technologies = ['python', 'aws', 'docker', 'design', 'sécurité', 'ia', 'github', 'terraform'];
      const foundTech = technologies.find(tech => message.includes(tech));
      
      if (foundTech) {
        toolCalls.push({
          id: `tool_${Date.now() + 1}`,
          name: 'search_courses',
          parameters: { query: foundTech }
        });
      }
    }

    // General course listing
    if (message.includes('toutes les formations') || 
        message.includes('liste des cours') ||
        message.includes('formations disponibles')) {
      toolCalls.push({
        id: `tool_${Date.now() + 2}`,
        name: 'get_all_courses',
        parameters: {}
      });
    }

    // Prerequisites check
    if (message.includes('prérequis') || 
        message.includes('niveau requis') ||
        message.includes('puis-je suivre') ||
        message.includes('suis-je capable')) {
      if (this.context.courseId) {
        toolCalls.push({
          id: `tool_${Date.now() + 3}`,
          name: 'check_prerequisites',
          parameters: { 
            courseId: this.context.courseId,
            userExperience: userMessage
          }
        });
      }
    }

    return toolCalls;
  }

  private async generateResponse(userMessage: string, toolResults: ToolCall[]): Promise<AgentResponse> {
    const message = userMessage.toLowerCase();

    // If we have tool results, generate a data-driven response
    if (toolResults.length > 0) {
      return this.generateToolBasedResponse(userMessage, toolResults);
    }

    // Handle common conversational patterns with course context
    if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
      if (this.context.courseId) {
        return {
          message: `Bonjour ! Je suis votre assistant IA spécialisé pour la formation **${this.context.courseId.toUpperCase()}** 🎓\n\nJe connais parfaitement cette formation : son programme détaillé, ses formateurs, les compétences développées, les témoignages étudiants, et bien plus encore !\n\n💡 **Je peux vous aider avec :**\n• Le programme module par module\n• L'équipe pédagogique et leur expertise\n• Les prérequis et votre adéquation\n• Les modalités d'inscription\n• Les débouchés professionnels\n\nQue souhaitez-vous savoir sur cette formation ?`,
          confidence: 0.98
        };
      } else {
        return {
          message: `Bonjour ! Je suis votre assistant Worketyamo, spécialisé dans nos formations tech. Je peux vous aider à choisir la formation qui correspond parfaitement à vos objectifs professionnels.\n\nQue souhaitez-vous savoir ?`,
          confidence: 0.95
        };
      }
    }

    if (message.includes('prix') || message.includes('tarif') || message.includes('coût')) {
      const courseSpecific = this.context.courseId ? `pour la formation **${this.context.courseId.toUpperCase()}**` : '';
      return {
        message: `Excellente question sur les tarifs ${courseSpecific} ! Chez Worketyamo, nous proposons des solutions de financement flexibles :\n\n💰 **Options disponibles :**\n• Financement OPCO pour les salariés\n• Utilisation du CPF (Compte Personnel de Formation)\n• Paiement en plusieurs fois sans frais\n• Tarifs préférentiels entreprise\n\n${this.context.courseId ? `📊 **Spécifiquement pour cette formation :** Le tarif dépend de votre situation (salarié, demandeur d'emploi, financement entreprise).\n\n` : ''}📞 **Pour un devis personnalisé :** Contactez-nous directement ou inscrivez-vous à notre newsletter pour recevoir toutes les informations tarifaires${this.context.courseId ? ' de cette formation' : ''}.\n\n${this.context.courseId ? 'Voulez-vous que je vous donne plus de détails sur le contenu de cette formation ?' : 'Souhaitez-vous que je vous aide à identifier les formations qui correspondent à votre profil ?'}`,
        confidence: 0.9
      };
    }

    if (message.includes('inscription') || message.includes("s'inscrire") || message.includes('comment')) {
      return {
        message: `🎯 **Processus d'inscription Worketyamo :**\n\n1. **Échange personnalisé** : Entretien pour valider l'adéquation formation/profil\n2. **Choix du financement** : OPCO, CPF, ou paiement direct\n3. **Planning personnalisé** : Adaptation selon votre disponibilité\n4. **Démarrage** : Accès plateforme + accompagnement dédié\n\n${this.context.courseId ? "Pour cette formation spécifique, cliquez sur 'Register' en haut de page, ou" : ""} contactez-nous pour débuter votre parcours !\n\nAvez-vous des questions sur une formation en particulier ?`,
        confidence: 0.85
      };
    }

    // Default conversational response with course context
    if (this.context.courseId) {
      return {
        message: `Je suis votre expert dédié à la formation **${this.context.courseId.toUpperCase()}** ! 🎯\n\nJe peux vous renseigner précisément sur :\n\n📚 **Programme complet** : modules détaillés, projets pratiques\n👨‍🏫 **Équipe pédagogique** : profils et expertises de vos formateurs\n🎯 **Compétences** : ce que vous maîtriserez concrètement\n⏱️ **Modalités** : durée, rythme, prérequis spécifiques\n🏆 **Certifications** : reconnaissance professionnelle\n💼 **Débouchés** : opportunités après cette formation\n⭐ **Témoignages** : retours d'anciens étudiants\n\nQuelle information sur cette formation vous intéresse le plus ?`,
        confidence: 0.85
      };
    } else {
      return {
        message: `Je suis là pour vous accompagner dans votre projet de formation ! Je peux vous renseigner sur :\n\n🎓 **Nos 8 formations phares** : AWS, Python, Docker, UX/UI Design, Cybersécurité, IA, GitHub Actions, Terraform\n📚 **Programmes détaillés** : modules, projets pratiques, certifications\n👨‍🏫 **Nos formateurs experts** : profils et expériences\n⏱️ **Modalités** : durée, rythme, prérequis\n💼 **Débouchés professionnels** et retours d'expérience\n\nQuelle information vous intéresse le plus ?`,
        confidence: 0.7
      };
    }
  }

  private async generateToolBasedResponse(_userMessage: string, toolResults: ToolCall[]): Promise<AgentResponse> {
    const responses: string[] = [];

    for (const toolResult of toolResults) {
      if (toolResult.result && !toolResult.result.error) {
        switch (toolResult.name) {
          case 'get_course_info':
            responses.push(this.formatCourseInfoResponse(toolResult.result));
            break;
          case 'search_courses':
            responses.push(this.formatSearchResponse(toolResult.result));
            break;
          case 'get_all_courses':
            responses.push(this.formatAllCoursesResponse(toolResult.result));
            break;
          case 'check_prerequisites':
            responses.push(this.formatPrerequisitesResponse(toolResult.result));
            break;
          case 'create_registration':
            responses.push(this.formatRegistrationResponse(toolResult.result));
            break;
        }
      }
    }

    return {
      message: responses.join('\n\n'),
      toolCalls: toolResults,
      confidence: 0.9
    };
  }

  private formatCourseInfoResponse(courseData: any): string {
    const course = courseData;
    
    // Create a comprehensive, contextual response
    let response = `🎓 **${course.fullTitle}**\n\n`;
    
    // Essential information with specific context
    response += `📋 **Informations essentielles :**\n`;
    response += `• **Niveau :** ${course.level || 'Tous niveaux'}\n`;
    response += `• **Durée :** ${course.duration || 'Flexible selon votre rythme'}\n`;
    response += `• **Format :** ${course.schedule || 'Adapté aux professionnels'}\n\n`;
    
    // Detailed program information
    if (course.modules && course.modules.length > 0) {
      response += `📚 **Programme détaillé (${course.modules.length} modules) :**\n`;
      course.modules.forEach((module: any, idx: number) => {
        response += `**Module ${idx + 1} : ${module.title}**\n`;
        response += `   ${module.description}\n`;
        if (module.topics && module.topics.length > 0) {
          response += `   🔹 ${module.topics.slice(0, 3).join(' • ')}\n`;
        }
        response += `\n`;
      });
    }
    
    // Instructors with detailed info
    if (course.instructors && course.instructors.length > 0) {
      response += `👨‍🏫 **Votre équipe pédagogique :**\n`;
      course.instructors.forEach((instructor: any) => {
        response += `• **${instructor.name}** - ${instructor.title}\n`;
        response += `  ${instructor.experience}\n`;
      });
      response += `\n`;
    }
    
    // Skills development
    if (course.skills && course.skills.length > 0) {
      response += `🎯 **Compétences que vous développerez :**\n`;
      course.skills.forEach((skill: any) => {
        response += `• ${skill.name}\n`;
      });
      response += `\n`;
    }
    
    // Certifications
    if (course.certifications && course.certifications.length > 0) {
      response += `🏆 **Certifications incluses :**\n`;
      course.certifications.forEach((cert: any) => {
        response += `• ${cert.name} (${cert.provider})\n`;
      });
      response += `\n`;
    }
    
    // Testimonials preview
    if (course.testimonials && course.testimonials.length > 0) {
      const topTestimonial = course.testimonials[0];
      response += `⭐ **Témoignage étudiant :**\n`;
      response += `"${topTestimonial.text}" - **${topTestimonial.name}**\n\n`;
    }
    
    response += `💡 **Questions spécifiques ?** Je peux vous donner plus de détails sur n'importe quel aspect de cette formation !`;
    
    return response;
  }

  private formatSearchResponse(searchResults: any[]): string {
    if (searchResults.length === 0) {
      return "🔍 **Aucune formation trouvée** pour votre recherche. Puis-je vous proposer de découvrir toutes nos formations disponibles ?";
    }

    const topResults = searchResults
      .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
      .slice(0, 3);

    return `🎯 **Formations recommandées pour votre recherche :**\n\n${topResults.map((course, idx) => 
      `${idx + 1}. **${course.label}**\n   ${course.description.substring(0, 100)}...\n   ${course.matchedSkills.length > 0 ? `Compétences : ${course.matchedSkills.join(', ')}` : ''}`
    ).join('\n\n')}\n\nSouhaitez-vous plus de détails sur une de ces formations ?`;
  }

  private formatAllCoursesResponse(allCourses: any[]): string {
    return `🎓 **Toutes nos formations Worketyamo (${allCourses.length}) :**\n\n${allCourses.map((course, idx) => 
      `${idx + 1}. **${course.label}** ${course.level ? `(${course.level})` : ''}\n   ${course.description.substring(0, 80)}...\n   ${course.enrollmentCount ? `${course.enrollmentCount} étudiants` : ''} ${course.rating ? `• Note: ${course.rating}/5` : ''}`
    ).join('\n\n')}\n\nQuelle formation vous intéresse le plus ? Je peux vous donner tous les détails !`;
  }

  private formatPrerequisitesResponse(prereqCheck: any): string {
    const { recommendation, confidence, notes, suggestedPreparation } = prereqCheck;
    
    let emoji = '✅';
    let title = 'Parfait pour vous !';
    
    if (recommendation === 'challenging') {
      emoji = '⚠️';
      title = 'Formation exigeante';
    } else if (recommendation === 'excellent_fit') {
      emoji = '🎯';
      title = 'Formation idéale !';
    }

    return `${emoji} **${title}** (Confiance: ${Math.round(confidence * 100)}%)\n\n📝 **Analyse de votre profil :**\n${notes.map((note: string) => `• ${note}`).join('\n')}\n\n${suggestedPreparation.length > 0 ? `🚀 **Préparation recommandée :**\n${suggestedPreparation.map((prep: string) => `• ${prep}`).join('\n')}\n\n` : ''}Voulez-vous que je vous donne plus de détails sur le programme ou les modalités d'inscription ?`;
  }

  private formatRegistrationResponse(regResult: any): string {
    if (regResult.success) {
      return `🎉 **Inscription confirmée !**\n\nFélicitations ! Votre inscription à **${regResult.courseTitle}** a été enregistrée avec succès.\n\n📧 Vous allez recevoir un email de confirmation avec :\n• Les détails de votre formation\n• Les informations de connexion\n• Le calendrier personnalisé\n• Les contacts de votre équipe pédagogique\n\n🚀 **Prochaines étapes :**\n1. Entretien pédagogique sous 48h\n2. Finalisation du financement\n3. Accès à la plateforme de formation\n\nBienvenue chez Worketyamo ! 🎓`;
    } else {
      return `❌ **Problème d'inscription**\n\nDésolé, nous n'avons pas pu finaliser votre inscription. Veuillez :\n• Vérifier vos informations\n• Contacter notre équipe directement\n• Réessayer dans quelques minutes\n\nNotre équipe reste disponible pour vous accompagner !`;
    }
  }

  // Public method to get conversation context
  getContext(): ConversationContext {
    return { ...this.context };
  }

  // Public method to update user preferences
  updateUserPreferences(preferences: Partial<ConversationContext['userPreferences']>): void {
    this.context.userPreferences = {
      language: 'fr', // Default language
      ...this.context.userPreferences,
      ...preferences
    };
  }
}