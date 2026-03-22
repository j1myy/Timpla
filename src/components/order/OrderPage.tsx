import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, MenuItem } from '../../context/AuthContext';
import { Plus, Minus, ShoppingBag, X } from 'lucide-react';

const MENU_ITEMS: MenuItem[] = [
  // --- Signature Coffee ---
  {
    id: '1',
    name: "Barako Gold Espresso",
    description: "Rich, bold, single-origin espresso from Batangas. Notes of dark chocolate and jackfruit.",
    price: 250,
    category: "Signature Coffee",
    image: "https://images.unsplash.com/photo-1719840195557-b87e064766e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGVsZWdhbnQlMjBjZXJhbWljJTIwY3VwfGVufDF8fHx8MTc3MDEyMDUwOHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '2',
    name: "Manila Cold Brew",
    description: "Slow-steeped for 24 hours with a hint of pandan essence and coconut sugar.",
    price: 280,
    category: "Signature Coffee",
    image: "https://images.unsplash.com/photo-1759340642565-806308b041a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwYWVzdGhldGljJTIwZ2xhc3MlMjBjb25jcmV0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcwMTIwNTA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '3',
    name: "Tablea Mocha",
    description: "Native Davao chocolate melted into velvety steamed milk and espresso.",
    price: 320,
    category: "Signature Coffee",
    image: "https://images.unsplash.com/photo-1715584019942-4f8e6535cc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VyJTIwb3ZlciUyMGNvZmZlZSUyMGdsYXNzJTIwY2FyYWZlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzAxMjA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '4',
    name: "Dirty Horchata",
    description: "House-made rice milk with cinnamon, topped with a shot of espresso.",
    price: 300,
    category: "Signature Coffee",
    image: "https://images.unsplash.com/photo-1631602375050-2b2f8838cf1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwbWlsayUyMGRyaW5rJTIwY2lubmFtb24lMjBnbGFzc3xlbnwxfHx8fDE3NzAxMjEzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '5',
    name: "Spanish Latte",
    description: "A sweeter, creamier espresso based drink with textured condensed milk.",
    price: 290,
    category: "Signature Coffee",
    image: "https://images.unsplash.com/photo-1584031037009-c3cde80bd41f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFuaXNoJTIwbGF0dGUlMjBjb25kZW5zZWQlMjBtaWxrJTIwbGF5ZXIlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwMTIxMzI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '6',
    name: "Iced Caramel Macchiato",
    description: "Espresso, milk, and house-made salted caramel. Simple and classic.",
    price: 340,
    category: "Signature Coffee",
    image: "https://images.unsplash.com/photo-1609250144053-5a919b51af61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY2FyYW1lbCUyMG1hY2NoaWF0byUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzAxMjA4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  
  // --- Non-Coffee ---
  {
    id: '7',
    name: "Uji Matcha Latte",
    description: "Premium ceremonial grade matcha from Uji, Japan. Served with oat milk.",
    price: 330,
    category: "Non-Coffee",
    image: "https://images.unsplash.com/photo-1759363580278-058211df7102?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBsYXR0ZSUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzAxMjA4OTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '8',
    name: "Tsokolate de Batirol",
    description: "Traditional Filipino hot chocolate, whisked until frothy with a wooden batirol.",
    price: 290,
    category: "Non-Coffee",
    image: "https://images.unsplash.com/photo-1766207107686-24114348f857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBjaG9jb2xhdGUlMjB0cmFkaXRpb25hbCUyMGZpbGlwaW5vJTIwYmF0aXJvbHxlbnwxfHx8fDE3NzAxMjEzMjV8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '9',
    name: "Calamansi Honey Tea",
    description: "Refreshing iced black tea infused with local calamansi and wild honey.",
    price: 260,
    category: "Non-Coffee",
    image: "https://images.unsplash.com/photo-1725790684308-800f2e2b120e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwdGVhJTIwbGVtb24lMjBob25leSUyMGdsYXNzJTIwY2FyYWZlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzAxMjEzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  
  // --- Food ---
  {
    id: '10',
    name: "Sourdough Avocado Toast",
    description: "Local avocado, feta cheese, chili flakes, and microgreens on toasted sourdough.",
    price: 480,
    category: "Food",
    image: "https://images.unsplash.com/photo-1719520670204-dbe1903a789f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdm9jYWRvJTIwdG9hc3QlMjBhZXN0aGV0aWMlMjBwbGF0ZXxlbnwxfHx8fDE3NzAxMDAzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '11',
    name: "Kesong Puti Toast",
    description: "Pan-seared local white cheese with basil pesto and roasted tomatoes.",
    price: 450,
    category: "Food",
    image: "https://images.unsplash.com/photo-1722239312886-c1ba4d265948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2FzdCUyMHdoaXRlJTIwY2hlZXNlJTIwaGVyYnMlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzcwMTIxMzI1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '12',
    name: "Longganisa Breakfast Bowl",
    description: "Garlic fried rice, house-made skinless longganisa, and a sunny-side up egg.",
    price: 550,
    category: "Food",
    image: "https://images.unsplash.com/photo-1730613998518-6ae2c364dc3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMGJyZWFrZmFzdCUyMHJpY2UlMjBib3dsJTIwZWdnJTIwc2F1c2FnZXxlbnwxfHx8fDE3NzAxMjEzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '13',
    name: "Pain Au Chocolat",
    description: "Buttery, flaky croissant with dark chocolate center. Baked fresh daily.",
    price: 280,
    category: "Food",
    image: "https://images.unsplash.com/photo-1763493323698-01df95609872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXN0aGV0aWMlMjBjcm9pc3NhbnQlMjBvbiUyMHBsYXRlJTIwZGFyayUyMHRhYmxlfGVufDF8fHx8MTc3MDEyMDUwOXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '14',
    name: "Ube Cheese Pandesal",
    description: "Soft, purple yam bread filled with melting cheese. A modern classic.",
    price: 250,
    category: "Food",
    image: "https://images.unsplash.com/photo-1599191179068-a4bb11ecd500?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1YmUlMjBjaGVlc2UlMjBwYW5kZXNhbCUyMHB1cnBsZSUyMGJyZWFkJTIwYWVzdGhldGljfGVufDF8fHx8MTc3MDEyMTMyNXww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: '15',
    name: "Bibingka Galette",
    description: "A French twist on the Filipino classic. Coconut sponge cake with salted egg.",
    price: 380,
    category: "Food",
    image: "https://images.unsplash.com/photo-1768700583700-969654256d27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NvbnV0JTIwY2FrZSUyMGJhbmFuYSUyMGxlYWYlMjBkZXNzZXJ0fGVufDF8fHx8MTc3MDEyMTMzMnww&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

const CATEGORIES = ["All", "Signature Coffee", "Non-Coffee", "Food"];

export default function OrderPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { addToCart, cart, updateQuantity, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useAuth();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleCheckout = () => {
    setIsCartOpen(false);
    onNavigate('checkout');
  };

  return (
    <div className="min-h-screen bg-[#1a1510] pt-24 pb-12">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-serif text-[#E8E0D5] mb-2">Order Online</h1>
            <p className="text-[#E8E0D5]/50">Freshly prepared, straight to your table.</p>
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="fixed md:static bottom-6 right-6 z-40 md:z-0 bg-[#C6A87C] text-[#1a1510] px-6 py-3 font-bold uppercase tracking-widest flex items-center gap-3 shadow-lg hover:bg-[#b09265] transition-all rounded-full md:rounded-none"
          >
            <ShoppingBag size={20} />
            <span className="md:hidden">Cart</span>
            {cart.length > 0 && (
              <span className="bg-[#1a1510] text-[#C6A87C] w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {cart.reduce((a, b) => a + b.quantity, 0)}
              </span>
            )}
            {cart.length > 0 && <span className="hidden md:inline">₱{cartTotal}</span>}
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 border whitespace-nowrap text-sm uppercase tracking-widest transition-all ${
                activeCategory === category 
                  ? 'border-[#C6A87C] bg-[#C6A87C] text-[#1a1510] font-bold' 
                  : 'border-white/20 text-[#E8E0D5]/70 hover:border-white/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/5 hover:border-[#C6A87C]/30 transition-colors group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif text-[#E8E0D5]">{item.name}</h3>
                  <span className="text-[#C6A87C] font-bold">₱{item.price}</span>
                </div>
                <p className="text-[#E8E0D5]/60 text-sm mb-6 flex-grow line-clamp-2">{item.description}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="w-full py-3 border border-white/20 text-[#E8E0D5] font-bold text-xs uppercase tracking-widest hover:bg-[#C6A87C] hover:text-[#1a1510] hover:border-[#C6A87C] transition-all flex items-center justify-center gap-2 mt-auto"
                >
                  <Plus size={16} /> Add to Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#1a1510] border-l border-white/10 z-50 shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#1a1510]">
                <h2 className="text-2xl font-serif text-[#E8E0D5]">Your Order</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-[#E8E0D5]/50 hover:text-[#E8E0D5]">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-[#E8E0D5]/30">
                    <ShoppingBag size={48} className="mb-4 opacity-50" />
                    <p className="uppercase tracking-widest text-sm">Your cart is empty</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-white/5 shrink-0" />
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-serif text-[#E8E0D5] line-clamp-1">{item.name}</h4>
                          <span className="text-[#C6A87C] font-bold text-sm">₱{item.price * item.quantity}</span>
                        </div>
                        <p className="text-xs text-[#E8E0D5]/50 mb-3">{item.category}</p>
                        
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-white/10">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center text-[#E8E0D5] hover:bg-white/5"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-[#E8E0D5]">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center text-[#E8E0D5] hover:bg-white/5"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-xs text-red-400 hover:text-red-300 uppercase tracking-wider ml-auto"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#1a1510]">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-[#E8E0D5]/50 uppercase tracking-widest text-xs">Total</span>
                    <span className="text-3xl font-serif text-[#C6A87C]">₱{cartTotal}</span>
                  </div>
                  
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-[#C6A87C] text-[#1a1510] font-bold uppercase tracking-widest py-4 hover:bg-[#b09265] transition-all"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
