import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      login(email, 'Coffee Lover'); // Default name
      setIsLoading(false);
      onNavigate('home');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1510] relative overflow-hidden px-6 pt-20">
       <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1716808681381-52cf8055b02d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwY29mZmVlJTIwc2hvcCUyMHRleHR1cmUlMjBiZWlnZSUyMGRhcmt8ZW58MXx8fHwxNzcwMTIwNzI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1a1510]/80 backdrop-blur-xl border border-[#C6A87C]/20 p-8 md:p-12 relative z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-[#E8E0D5] mb-2">Welcome Back</h2>
          <p className="text-[#E8E0D5]/50 text-sm">Sign in to continue your journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#C6A87C] mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-[#E8E0D5] px-4 py-3 focus:outline-none focus:border-[#C6A87C] transition-colors placeholder:text-white/20"
              placeholder="hello@example.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#C6A87C] mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-[#E8E0D5] px-4 py-3 focus:outline-none focus:border-[#C6A87C] transition-colors placeholder:text-white/20"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#C6A87C] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <a href="#" className="text-xs text-white/40 hover:text-[#C6A87C] transition-colors">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#C6A87C] text-[#1a1510] font-bold uppercase tracking-widest py-4 hover:bg-[#b09265] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? 'Signing In...' : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#E8E0D5]/40 text-sm">
            Don't have an account?{' '}
            <button 
              onClick={() => onNavigate('signup')}
              className="text-[#C6A87C] hover:underline decoration-[#C6A87C]/50 underline-offset-4"
            >
              Join Us
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
