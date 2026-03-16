import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Save, X, Camera, Upload } from 'lucide-react';

export default function EditProfile({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { user, updateProfile } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [favoriteDrink, setFavoriteDrink] = useState(user?.favoriteDrink || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API delay
    setTimeout(() => {
      updateProfile({ 
        name, 
        bio, 
        favoriteDrink,
        avatar: avatarPreview
      });
      setIsSaving(false);
      onNavigate('profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#1a1510] pt-32 px-6 pb-12">
      <div className="container mx-auto max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1510] border border-[#C6A87C]/20 p-8 md:p-12 relative"
        >
          <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
            <h2 className="text-3xl font-serif text-[#E8E0D5]">Edit Profile</h2>
            <button 
              onClick={() => onNavigate('profile')}
              className="text-white/50 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center mb-8">
              <div 
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#C6A87C] bg-[#2a2520] flex items-center justify-center">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl font-serif text-[#C6A87C]">{name.charAt(0)}</span>
                  )}
                </div>
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <p className="mt-3 text-xs text-[#C6A87C] uppercase tracking-widest font-bold cursor-pointer hover:text-[#b09265]" onClick={() => fileInputRef.current?.click()}>
                Change Photo
              </p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#C6A87C] mb-2">Display Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-[#E8E0D5] px-4 py-3 focus:outline-none focus:border-[#C6A87C] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#C6A87C] mb-2">Bio</label>
              <textarea 
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-[#E8E0D5] px-4 py-3 focus:outline-none focus:border-[#C6A87C] transition-colors resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#C6A87C] mb-2">Favorite Drink</label>
              <select 
                value={favoriteDrink}
                onChange={(e) => setFavoriteDrink(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-[#E8E0D5] px-4 py-3 focus:outline-none focus:border-[#C6A87C] transition-colors appearance-none"
              >
                <option value="" className="bg-[#1a1510]">Select a drink...</option>
                <option value="Barako Gold Espresso" className="bg-[#1a1510]">Barako Gold Espresso</option>
                <option value="Manila Cold Brew" className="bg-[#1a1510]">Manila Cold Brew</option>
                <option value="Tablea Mocha" className="bg-[#1a1510]">Tablea Mocha</option>
                <option value="Dirty Horchata" className="bg-[#1a1510]">Dirty Horchata</option>
              </select>
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                type="submit" 
                disabled={isSaving}
                className="flex-1 bg-[#C6A87C] text-[#1a1510] font-bold uppercase tracking-widest py-4 hover:bg-[#b09265] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSaving ? 'Saving...' : <>Save Changes <Save size={18} /></>}
              </button>
              <button 
                type="button"
                onClick={() => onNavigate('profile')}
                className="px-8 border border-white/20 text-[#E8E0D5] font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
