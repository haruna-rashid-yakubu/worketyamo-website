"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { createRegistrationAction } from '@/app/actions';

type RegistrationFormProps = {
  isOpen: boolean;
  onClose: () => void;
  courseTitle: string;
  courseId: string;
};

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  isOpen,
  onClose,
  courseTitle,
  courseId
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    whatsapp: '',
    courseId,
    courseTitle
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      courseId,
      courseTitle
    }));
  }, [courseId, courseTitle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const result = await createRegistrationAction({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        courseId: formData.courseId,
        courseTitle: formData.courseTitle
      });

      if (!result.success) {
        setSubmissionError(result.error || 'Une erreur est survenue');
        setIsSubmitting(false);
        return;
      }

      setFormSubmitted(true);
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        whatsapp: '',
        courseId,
        courseTitle
      });
      
      setTimeout(() => {
        onClose();
        setFormSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error('Unexpected error:', err);
      setSubmissionError('Une erreur inattendue est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, filter: 'blur(12px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, scale: 0.8, filter: 'blur(12px)', transition: { duration: 0.3, ease: 'easeInOut' } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div 
            className="relative bg-[#21262D] border border-white/10 rounded-lg shadow-xl w-full max-w-lg p-6 text-white"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
            
            <div className="text-left mb-6">
              <h2 className="text-2xl font-heading text-white">
                {formSubmitted ? 'Inscription réussie!' : 'S\'inscrire au cours'}
              </h2>
              <p className="text-[#C3C3C3] mt-1 font-body">
                {formSubmitted 
                  ? 'Nous vous avons envoyé un email de confirmation.'
                  : courseTitle}
              </p>
            </div>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-[#2D333B] border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-[#2D333B] border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#2D333B] border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#2D333B] border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="+237 6 99 00 00 00"
                  />
                </div>
                
                <div>
                  <label htmlFor="whatsapp" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1">
                    <MessageCircle size={16} className="text-green-500" />
                    WhatsApp (optionnel)
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-[#2D333B] border border-gray-700 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="+237 6 99 00 00 00"
                  />
                </div>
                
                {submissionError && (
                  <div className="text-red-400 text-sm py-2 px-3 bg-red-900/30 border border-red-800 rounded">
                    {submissionError}
                  </div>
                )}
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-colors font-heading disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Traitement en cours...
                      </>
                    ) : (
                      'Confirmer l\'inscription'
                    )}
                  </button>
                </div>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                  En vous inscrivant, vous acceptez notre politique de confidentialité et nos conditions d&apos;utilisation.
                </p>
              </form>
            ) : (
              <motion.div 
                className="text-center py-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-300">Nous vous contacterons bientôt avec les prochaines étapes.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationForm;