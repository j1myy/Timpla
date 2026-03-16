import React from 'react';
import { motion } from 'motion/react';

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 bg-[#1a1510] text-[#E8E0D5] overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          
          <div className="w-full md:w-1/2 relative">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[3/4] overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1763493323698-01df95609872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBjcm9pc3NhbnQlMjBvbiUyMHBsYXRlJTIwZGFyayUyMHRhYmxlfGVufDF8fHx8MTc3MDEyMDUwOXww&ixlib=rb-4.1.0&q=80&w=1080" 
                alt="Coffee Detail" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 border-l-2 border-[#C6A87C] pl-4">
                 <p className="text-xs uppercase tracking-[0.2em] text-[#C6A87C]">Daily Ritual</p>
              </div>
            </motion.div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-[#C6A87C]/20 rounded-full z-0 hidden md:block" />
          </div>

          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-[#C6A87C] text-sm uppercase tracking-[0.3em] font-bold mb-4">Our Philosophy</h2>
              <h3 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
                Slow Down. <br/>
                <span className="text-white/50">Savor Local.</span>
              </h3>
              <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
                In a world that rushes, Timpla is your pause. We believe in the quiet power of a well-brewed cup. 
                Our approach blends the sophistication of third-wave coffee culture with the warmth of Filipino hospitality.
              </p>
              <p className="text-white/70 text-lg font-light leading-relaxed mb-12">
                Every bean tells a story of our local farmers, roasted to perfection to bring out notes of dark chocolate, caramel, and tropical fruits inherent to our land.
              </p>
              
              <div className="flex gap-8">
                <div>
                  <h4 className="text-3xl font-serif text-[#C6A87C] mb-1">100%</h4>
                  <p className="text-xs uppercase tracking-widest text-white/50">Local Sourcing</p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-[#C6A87C] mb-1">24h</h4>
                  <p className="text-xs uppercase tracking-widest text-white/50">Cold Brew Process</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
