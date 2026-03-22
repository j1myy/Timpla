import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onNavigate, currentPage }: { onNavigate: (page: string) => void, currentPage: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, cartCount, setIsCartOpen } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target: string) => {
    if (['Origins', 'Menu', 'Philosophy', 'Visit'].map(s => s.toLowerCase()).includes(target)) {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      onNavigate(target);
    }
    setIsMobileMenuOpen(false);
  };

  const navBackground = currentPage !== 'home' ? 'bg-[#1a1510] shadow-lg border-b border-white/5' : (isScrolled ? 'bg-[#1a1510]/95 backdrop-blur-md shadow-lg border-b border-white/5' : 'bg-transparent');

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${navBackground}`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <button onClick={() => onNavigate('home')} className="relative z-50 group">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-widest text-[#E8E0D5] transition-colors">
              TIMPLA
              <span className="block h-0.5 w-0 group-hover:w-full transition-all duration-300 bg-[#C6A87C] mt-1"></span>
            </h1>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            {['Origins', 'Menu', 'Philosophy', 'Visit'].map((item) => (
              <button 
                key={item} 
                onClick={() => handleNavClick(item.toLowerCase())}
                className="text-sm uppercase tracking-[0.2em] text-[#E8E0D5]/80 hover:text-[#C6A87C] transition-colors duration-300 font-medium"
              >
                {item}
              </button>
            ))}

            <button 
              onClick={() => handleNavClick('order')}
              className="text-sm uppercase tracking-[0.2em] text-[#E8E0D5]/80 hover:text-[#C6A87C] transition-colors duration-300 font-medium"
            >
              Order Online
            </button>
            
            <button 
              onClick={() => {
                if (currentPage !== 'order') onNavigate('order');
                setIsCartOpen(true);
              }}
              className="relative text-[#E8E0D5] hover:text-[#C6A87C] transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                 <span className="absolute -top-2 -right-2 bg-[#C6A87C] text-[#1a1510] w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
                   {cartCount}
                 </span>
              )}
            </button>
            
            {isAuthenticated ? (
               <button 
                onClick={() => handleNavClick('profile')}
                className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#C6A87C] hover:text-[#b09265] transition-colors duration-300 font-bold border-l border-white/10 pl-8"
               >
                 {user?.avatar ? (
                   <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full object-cover border border-[#C6A87C]" />
                 ) : (
                    <div className="w-8 h-8 rounded-full bg-[#C6A87C]/20 border border-[#C6A87C] flex items-center justify-center">
                       <User size={14} />
                    </div>
                 )}
                 {user?.name.split(' ')[0]}
               </button>
            ) : (
              <button 
                onClick={() => handleNavClick('login')}
                className="text-sm uppercase tracking-[0.2em] text-[#E8E0D5] font-bold hover:text-[#C6A87C] pl-4 border-l border-white/10"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <button 
              onClick={() => {
                if (currentPage !== 'order') onNavigate('order');
                setIsCartOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="text-[#C6A87C] relative"
             >
                <ShoppingBag size={24} />
                {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                   {cartCount}
                 </span>
                )}
             </button>
             <button 
              className="z-50 text-[#E8E0D5]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1a1510] z-40 flex flex-col items-center justify-center space-y-8"
          >
            {['Origins', 'Menu', 'Philosophy', 'Visit'].map((item, i) => (
              <motion.button
                key={item}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => handleNavClick(item.toLowerCase())}
                className="text-2xl font-serif text-[#E8E0D5] hover:text-[#C6A87C]"
              >
                {item}
              </motion.button>
            ))}
            
            <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={() => handleNavClick('order')}
                className="text-2xl font-serif text-[#C6A87C]"
              >
                Order Online
            </motion.button>

            <div className="w-12 h-[1px] bg-white/20 my-4"></div>

            {isAuthenticated ? (
               <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleNavClick('profile')}
                className="text-xl font-serif text-[#E8E0D5]"
              >
                My Profile
              </motion.button>
            ) : (
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={() => handleNavClick('login')}
                className="text-xl font-serif text-[#E8E0D5]"
              >
                Sign In
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
