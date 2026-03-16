import React from 'react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1566095793571-f4aba992cc5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwZWxlZ2FudCUyMGNvZmZlZSUyMHNob3AlMjBpbnRlcmlvciUyMG1vb2R5fGVufDF8fHx8MTc3MDEyMDUwOHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Coffee Shop Interior"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1510]/70 via-[#1a1510]/50 to-[#1a1510]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-[#C6A87C] text-sm md:text-base uppercase tracking-[0.3em] font-medium mb-6 border-b border-[#C6A87C]/50 pb-2">
            Est. Manila 2024
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-[#E8E0D5] mb-8 leading-tight"
        >
          Elevated Local <br/>
          <span className="italic text-[#C6A87C]">Coffee Culture</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/70 text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto mb-12"
        >
          A fusion of world-class brewing techniques and the Philippines' finest heritage beans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
        >
          <button className="px-8 py-4 bg-[#C6A87C] text-[#1a1510] font-bold uppercase tracking-widest hover:bg-[#b09265] transition-all duration-300 min-w-[200px]">
            View Menu
          </button>
          <button className="px-8 py-4 border border-[#E8E0D5]/30 text-[#E8E0D5] font-bold uppercase tracking-widest hover:bg-[#E8E0D5]/10 transition-all duration-300 min-w-[200px]">
            Our Story
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#C6A87C] to-transparent"></div>
      </motion.div>
    </section>
  );
}
