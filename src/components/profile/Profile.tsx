import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { User, Settings, Coffee, LogOut, Edit2, X, AlertCircle } from 'lucide-react';

export default function Profile({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    onNavigate('home');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#1a1510] pt-32 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1510] border border-[#C6A87C]/20 p-8 md:p-12 relative"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-b border-white/10 pb-12 mb-12">
            <div className="w-32 h-32 rounded-full bg-[#2a2520] border-2 border-[#C6A87C] flex items-center justify-center shrink-0 overflow-hidden">
               {/* Avatar Display */}
               {user.avatar ? (
                 <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
               ) : (
                 <span className="text-4xl font-serif text-[#C6A87C]">{user.name.charAt(0)}</span>
               )}
            </div>
            
            <div className="text-center md:text-left flex-grow">
              <h1 className="text-3xl md:text-4xl font-serif text-[#E8E0D5] mb-2">{user.name}</h1>
              <p className="text-[#E8E0D5]/50 mb-4">{user.email}</p>
              <p className="text-[#E8E0D5]/80 italic max-w-lg mx-auto md:mx-0">
                "{user.bio || 'No bio yet.'}"
              </p>
            </div>

            <button 
              onClick={() => onNavigate('edit-profile')}
              className="group flex items-center gap-2 px-6 py-3 border border-[#C6A87C]/50 text-[#C6A87C] hover:bg-[#C6A87C] hover:text-[#1a1510] transition-all uppercase tracking-widest text-xs font-bold"
            >
              <Edit2 size={14} /> Edit Profile
            </button>
          </div>

          {/* Stats/Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-6 border border-white/5 hover:border-[#C6A87C]/30 transition-colors">
              <div className="flex items-center gap-3 mb-4 text-[#C6A87C]">
                <Coffee size={20} />
                <h3 className="uppercase tracking-widest text-xs font-bold">Favorite Drink</h3>
              </div>
              <p className="text-xl font-serif text-[#E8E0D5]">{user.favoriteDrink || 'Not selected'}</p>
            </div>

            <div className="bg-white/5 p-6 border border-white/5 hover:border-[#C6A87C]/30 transition-colors">
              <div className="flex items-center gap-3 mb-4 text-[#C6A87C]">
                <Settings size={20} />
                <h3 className="uppercase tracking-widest text-xs font-bold">Membership Status</h3>
              </div>
              <p className="text-xl font-serif text-[#E8E0D5]">Gold Member</p>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-white/10 flex justify-center md:justify-start">
            <button 
              onClick={handleLogoutClick}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors text-sm uppercase tracking-widest font-bold"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </motion.div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutConfirm(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#1a1510] border border-[#C6A87C] p-8 max-w-sm w-full shadow-2xl relative text-center"
              >
                <div className="mb-6 flex justify-center text-[#C6A87C]">
                  <AlertCircle size={48} strokeWidth={1.5} />
                </div>
                
                <h3 className="text-2xl font-serif text-[#E8E0D5] mb-2">Sign Out?</h3>
                <p className="text-[#E8E0D5]/60 mb-8 text-sm">
                  Are you sure you want to leave? Your cart items will be saved for next time.
                </p>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-3 border border-white/10 text-[#E8E0D5] hover:bg-white/5 transition-colors uppercase tracking-widest text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmLogout}
                    className="flex-1 py-3 bg-[#C6A87C] text-[#1a1510] hover:bg-[#b09265] transition-colors uppercase tracking-widest text-xs font-bold"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
