import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="visit" className="bg-[#1a1510] text-[#E8E0D5] pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16">
          
          {/* Brand */}
          <div className="md:col-span-4">
            <h2 className="text-4xl font-serif font-bold tracking-wider mb-6">TIMPLA</h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Elevating the daily ritual of coffee through local heritage and modern brewing excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C6A87C] hover:border-[#C6A87C] hover:text-[#1a1510] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C6A87C] hover:border-[#C6A87C] hover:text-[#1a1510] transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="md:col-span-4">
            <h3 className="text-[#C6A87C] uppercase tracking-[0.2em] text-xs font-bold mb-8">Locations</h3>
            <div className="space-y-8">
              <div>
                <h4 className="font-serif text-xl mb-2">Makati Central</h4>
                <p className="text-white/60 text-sm flex items-start gap-2 mb-2">
                  <MapPin size={14} className="mt-1 shrink-0" />
                  G/F Salcedo Towers, Salcedo Village,<br/>Makati City
                </p>
                <p className="text-white/60 text-sm flex items-center gap-2">
                  <Clock size={14} />
                  Mon-Sun: 7am - 10pm
                </p>
              </div>
              <div>
                <h4 className="font-serif text-xl mb-2">BGC Flagship</h4>
                <p className="text-white/60 text-sm flex items-start gap-2 mb-2">
                  <MapPin size={14} className="mt-1 shrink-0" />
                  High Street South,<br/>Bonifacio Global City
                </p>
                <p className="text-white/60 text-sm flex items-center gap-2">
                  <Clock size={14} />
                  Mon-Thu: 8am - 11pm <br/>Fri-Sun: 8am - 12am
                </p>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-4 flex flex-col md:items-end">
            <h3 className="text-[#C6A87C] uppercase tracking-[0.2em] text-xs font-bold mb-8 md:text-right">Explore</h3>
            <ul className="space-y-4 md:text-right">
              {['Our Story', 'Careers', 'Wholesale', 'Privacy Policy'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 uppercase tracking-wider">
          <p>&copy; 2024 Timpla Coffee Co. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed with &hearts; in Manila</p>
        </div>
      </div>
    </footer>
  );
}
