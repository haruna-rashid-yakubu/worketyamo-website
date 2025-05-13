"use client";

import Image from "next/image";
import CourseSearch from "../components/CourseSearch";
import AwspartnerLogo from "../../public/Images/aws-partner.png"
import Udemylogo from "../../public/Images/udemy.png"
import { motion } from "framer-motion";

export default function Home() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1.2,
      }
    }
  };
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(6px)" 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };
  
  const partnersContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 1.8,
      }
    }
  };
  
  const partnerLogoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }
    }
  };
  // Background animation variant
  const backgroundVariants = {
    hidden: { 
      opacity: 0,
      scale: 1.05
    },
    visible: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };
  
  return (
    <motion.div 
      className="relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={backgroundVariants}
    >
      <motion.div 
        className="flex flex-col md:flex md:flex-col md:justify-center bg-[url('/Images/background-place.jpg')] bg-cover bg-center bg-no-repeat bg-fixed min-h-screen md:items-center p-4 py-10 md:py-0 md:pb-16 gap-8 sm:gap-12 md:gap-16 lg:gap-5"
        initial={{ filter: "blur(20px)" }}
        animate={{ filter: "blur(0px)" }}
        transition={{ duration: 1.5, delay: 0.2 }}
      >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Image 
          src="/Images/worketyamo.svg" 
          alt="Worketyamo logo" 
          width={200} 
          height={40} 
          className="w-32 sm:w-40 sm:h-40 md:w-48 md:mx-auto"
          priority
        />
      </motion.div>
      
      <main className="flex flex-col gap-6 sm:gap-8 md:items-center text-left md:text-center w-full max-w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
        <motion.div 
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg md:mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl text-left md:text-6xl lg:text-7xl font-heading md:text-center bg-gradient-to-r from-gray-600 via-gray-50 to-white bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Accélérateur de talents tech
          </motion.h1>
          
          <motion.p 
            className="text-base sm:text-lg font-body text-left md:text-center text-[#C3C3C3] mt-2 sm:mt-3"
            variants={itemVariants}
          >
            Bootcamps intensifs et expérience de projet réel vous permettant de lancer une carrière technologique à fort impact.
          </motion.p>
          
          <motion.div 
            className="flex flex-col items-start justify-start md:justify-center md:items-center mt-5 space-y-2"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-xl md:text-2xl font-heading text-left md:text-center text-white"
              variants={itemVariants}
            >
              Nos partenaires
            </motion.h3>
            
            <motion.div 
              className="flex gap-5"
              variants={partnersContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={partnerLogoVariants}>
                <Image 
                  src={AwspartnerLogo}
                  alt="AWS Partner Logo"
                  width={100}
                  height={40}
                  className="w-auto h-10"
                />
              </motion.div>
              
              <motion.div variants={partnerLogoVariants}>
                <Image 
                  src={Udemylogo}
                  alt="Udemy Logo"
                  width={106}
                  height={40}
                  className="w-auto h-10"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Course Search Component */}
        <motion.div 
          className="w-full max-w-full sm:max-w-sm md:max-w-lg lg:max-w-lg xl:max-w-xl md:mx-auto"
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 1.2, 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <CourseSearch />
        </motion.div>
      </main>
      </motion.div>
    </motion.div>
  );
}
