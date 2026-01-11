"use client"
import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Container from '@/components/_core/layout/Container';
import DecryptedText from '@/components/ui/DecryptedText';
import HolographicWave from '@/components/ui/HolographicWave';

export default function HeroSection() {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimationComplete(true);
  }, []);

  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden'>
      <HolographicWave />
      
      <Container className='text-center z-10'>
        
        <div className="relative inline-block mb-6">
          <span 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] md:text-[16rem] text-[#ff0000]/40 -z-10 whitespace-nowrap select-none pointer-events-none drop-shadow-[0_0_30px_rgba(255,0,0,0.8)]"
            style={{ fontFamily: '"Zen Dots", sans-serif' }}
          >
            5.0
          </span>
          <h1 className='text-6xl md:text-8xl font-extrabold tracking-tighter text-white relative z-10'>
            <DecryptedText
              text="TALOS"
              animateOn="view"
              revealDirection="center"
              speed={100}
              maxIterations={20}
              style={{ fontFamily: "'BBH Bartle', cursive" }}
              onAnimationComplete={handleAnimationComplete}
            />
          </h1>
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={isAnimationComplete ? { opacity: 1, y: 0 } : {}}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="mt-8 flex flex-col items-center gap-6"
        >
           <p className="text-3xl md:text-4xl text-[#ff0000]/70 font-bold tracking-wider" style={{ fontFamily: '"Zen Dots", sans-serif' }}>Feb <span className='text-3xl md:text-4xl text-[#ffffff]/70 font-bold tracking-wider'>4</span> 2026</p>
        </motion.div>
      </Container>

      <motion.div 
          initial={{ opacity: 0 }}
          animate={isAnimationComplete ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-4 z-10 pointer-events-none"
      >
          <motion.div 
             animate={{ y: [0, 10, 0] }}
             transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
           >
             <ChevronDown className="w-10 h-10 text-white/80" />
           </motion.div>
          <div className="space-y-2 text-center">
            <p className="text-white/60 text-lg md:text-xl font-medium tracking-wide">Dept of Artificial Intelligence and Data Science</p>
            <p className="text-white/40 text-sm md:text-base">Chennai Institute Of Technology</p>
          </div>
      </motion.div>
    </section>
  );
}