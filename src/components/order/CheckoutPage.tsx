import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';
import { Check, ChevronRight, CreditCard, MapPin, Store, ArrowLeft, ShoppingBag } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Details' },
  { id: 2, label: 'Payment' },
  { id: 3, label: 'Done' }
];

export default function CheckoutPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const { cart, cartTotal, clearCart, user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form State
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(c => c + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(c => c - 1);
    else onNavigate('order');
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      setCurrentStep(3);
    }, 2000);
  };

  if (cart.length === 0 && currentStep !== 3) {
    return (
      <div className="min-h-screen bg-[#1a1510] pt-32 px-6 flex flex-col items-center justify-center text-center">
        <div className="bg-[#2a2520] p-8 rounded-full mb-6">
          <ShoppingBag size={48} className="text-[#E8E0D5]/20" />
        </div>
        <h2 className="text-2xl font-serif text-[#E8E0D5] mb-4">Your cart is empty</h2>
        <button 
          onClick={() => onNavigate('order')}
          className="text-[#C6A87C] border-b border-[#C6A87C] pb-1 uppercase tracking-widest text-xs font-bold hover:text-[#b09265] transition-colors"
        >
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1510] pt-28 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between relative z-10">
            {STEPS.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 bg-[#1a1510] ${
                      isActive || isCompleted 
                        ? 'border-[#C6A87C] text-[#C6A87C]' 
                        : 'border-white/20 text-white/20'
                    }`}
                  >
                    {isCompleted ? <Check size={16} /> : step.id}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest mt-2 transition-colors duration-500 ${
                    isActive || isCompleted ? 'text-[#C6A87C]' : 'text-white/20'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
          {/* Progress Line */}
          <div className="absolute top-[132px] left-0 w-full h-[2px] bg-white/5 -z-0 hidden md:block" /> 
          <div className="relative -top-9 mx-auto w-[calc(100%-4rem)] h-[2px] bg-white/10 -z-0">
             <motion.div 
               className="h-full bg-[#C6A87C]"
               initial={{ width: '0%' }}
               animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
               transition={{ duration: 0.5 }}
             />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-7">
             <AnimatePresence mode="wait">
               {currentStep === 1 && (
                 <motion.div
                   key="step1"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="space-y-8"
                 >
                   <div>
                     <h2 className="text-2xl font-serif text-[#E8E0D5] mb-6">How should we get this to you?</h2>
                     <div className="grid grid-cols-2 gap-4">
                       <button 
                         onClick={() => setDeliveryMethod('pickup')}
                         className={`p-6 border flex flex-col items-center gap-3 transition-all ${
                           deliveryMethod === 'pickup' 
                             ? 'border-[#C6A87C] bg-[#C6A87C]/10 text-[#C6A87C]' 
                             : 'border-white/10 text-white/50 hover:border-white/30'
                         }`}
                       >
                         <Store size={24} />
                         <span className="uppercase tracking-widest text-xs font-bold">Pick Up</span>
                       </button>
                       <button 
                         onClick={() => setDeliveryMethod('delivery')}
                         className={`p-6 border flex flex-col items-center gap-3 transition-all ${
                           deliveryMethod === 'delivery' 
                             ? 'border-[#C6A87C] bg-[#C6A87C]/10 text-[#C6A87C]' 
                             : 'border-white/10 text-white/50 hover:border-white/30'
                         }`}
                       >
                         <MapPin size={24} />
                         <span className="uppercase tracking-widest text-xs font-bold">Delivery</span>
                       </button>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <h3 className="text-[#C6A87C] text-xs uppercase tracking-widest font-bold border-b border-white/10 pb-2 mb-4">Contact Info</h3>
                     <div className="grid grid-cols-2 gap-4">
                       <input 
                         type="text" 
                         placeholder="Name" 
                         value={formData.name}
                         onChange={e => setFormData({...formData, name: e.target.value})}
                         className="col-span-2 md:col-span-1 bg-white/5 border border-white/10 p-4 text-[#E8E0D5] focus:border-[#C6A87C] focus:outline-none transition-colors"
                       />
                       <input 
                         type="tel" 
                         placeholder="Phone Number" 
                         value={formData.phone}
                         onChange={e => setFormData({...formData, phone: e.target.value})}
                         className="col-span-2 md:col-span-1 bg-white/5 border border-white/10 p-4 text-[#E8E0D5] focus:border-[#C6A87C] focus:outline-none transition-colors"
                       />
                       <input 
                         type="email" 
                         placeholder="Email Address" 
                         value={formData.email}
                         onChange={e => setFormData({...formData, email: e.target.value})}
                         className="col-span-2 bg-white/5 border border-white/10 p-4 text-[#E8E0D5] focus:border-[#C6A87C] focus:outline-none transition-colors"
                       />
                     </div>
                   </div>

                   {deliveryMethod === 'delivery' && (
                     <div className="space-y-4">
                       <h3 className="text-[#C6A87C] text-xs uppercase tracking-widest font-bold border-b border-white/10 pb-2 mb-4">Delivery Details</h3>
                       <textarea 
                         placeholder="Delivery Address" 
                         rows={3}
                         value={formData.address}
                         onChange={e => setFormData({...formData, address: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-4 text-[#E8E0D5] focus:border-[#C6A87C] focus:outline-none transition-colors resize-none"
                       />
                       <textarea 
                         placeholder="Delivery Notes (Gate code, landmarks, etc.)" 
                         rows={2}
                         value={formData.notes}
                         onChange={e => setFormData({...formData, notes: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 p-4 text-[#E8E0D5] focus:border-[#C6A87C] focus:outline-none transition-colors resize-none"
                       />
                     </div>
                   )}
                 </motion.div>
               )}

               {currentStep === 2 && (
                 <motion.div
                   key="step2"
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   className="space-y-8"
                 >
                   <h2 className="text-2xl font-serif text-[#E8E0D5] mb-6">Payment Method</h2>
                   
                   <div className="space-y-4">
                     <div className="border border-[#C6A87C] bg-[#C6A87C]/5 p-6 flex items-start gap-4">
                       <div className="w-4 h-4 rounded-full border border-[#C6A87C] flex items-center justify-center mt-1">
                         <div className="w-2 h-2 rounded-full bg-[#C6A87C]" />
                       </div>
                       <div className="flex-grow">
                         <div className="flex justify-between items-center mb-2">
                            <h4 className="font-bold text-[#E8E0D5]">Credit / Debit Card</h4>
                            <div className="flex gap-2">
                               <div className="w-8 h-5 bg-white/10 rounded"></div>
                               <div className="w-8 h-5 bg-white/10 rounded"></div>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4 mt-4">
                            <input 
                              type="text" 
                              placeholder="Card Number" 
                              className="col-span-2 bg-[#1a1510] border border-white/10 p-3 text-sm text-[#E8E0D5] focus:border-[#C6A87C] focus:outline-none"
                            />
                            <input 
                              type="text" 
                              placeholder="MM/YY" 
                              className="bg-[#1a1510] border border-white/10 p-3 text-sm text-[#E8E0D5] focus:border-[#C6A87C] focus:outline-none"
                            />
                            <input 
                              type="text" 
                              placeholder="CVC" 
                              className="bg-[#1a1510] border border-white/10 p-3 text-sm text-[#E8E0D5] focus:border-[#C6A87C] focus:outline-none"
                            />
                         </div>
                       </div>
                     </div>

                     <div className="border border-white/10 p-6 flex items-center gap-4 opacity-50 cursor-not-allowed">
                        <div className="w-4 h-4 rounded-full border border-white/20" />
                        <span className="text-[#E8E0D5]">GCash / Maya (Unavailable)</span>
                     </div>
                     
                     <div className="border border-white/10 p-6 flex items-center gap-4 opacity-50 cursor-not-allowed">
                        <div className="w-4 h-4 rounded-full border border-white/20" />
                        <span className="text-[#E8E0D5]">Cash on Delivery</span>
                     </div>
                   </div>
                 </motion.div>
               )}

               {currentStep === 3 && (
                 <motion.div
                   key="step3"
                   initial={{ opacity: 0, scale: 0.95 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="flex flex-col items-center justify-center text-center py-12"
                 >
                   <div className="w-20 h-20 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mb-6 border border-green-500/20">
                     <Check size={40} />
                   </div>
                   <h2 className="text-3xl font-serif text-[#E8E0D5] mb-4">Order Confirmed!</h2>
                   <p className="text-white/60 max-w-md mb-8">
                     Thank you, {formData.name}. We've received your order. 
                     {deliveryMethod === 'pickup' 
                       ? " Please proceed to the counter when your number is called." 
                       : " Our rider will be with you shortly."}
                   </p>
                   
                   <div className="bg-white/5 p-6 w-full max-w-sm border border-white/10 mb-8">
                      <p className="uppercase tracking-widest text-xs text-[#C6A87C] mb-2">Order Reference</p>
                      <p className="text-2xl font-mono text-[#E8E0D5]">#TIMPLA-{Math.floor(Math.random() * 10000)}</p>
                   </div>

                   <button 
                     onClick={() => onNavigate('home')}
                     className="px-8 py-3 bg-[#C6A87C] text-[#1a1510] font-bold uppercase tracking-widest hover:bg-[#b09265] transition-colors"
                   >
                     Back to Home
                   </button>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          {currentStep < 3 && (
            <div className="lg:col-span-5">
              <div className="bg-white/5 border border-white/10 p-8 sticky top-32">
                <h3 className="font-serif text-xl text-[#E8E0D5] mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-start text-sm">
                      <div className="flex gap-3">
                         <span className="text-[#C6A87C] font-bold">{item.quantity}x</span>
                         <span className="text-[#E8E0D5]/80">{item.name}</span>
                      </div>
                      <span className="text-[#E8E0D5] font-mono">₱{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm text-[#E8E0D5]/50">
                    <span>Subtotal</span>
                    <span>₱{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#E8E0D5]/50">
                    <span>{deliveryMethod === 'delivery' ? 'Delivery Fee' : 'Service Fee'}</span>
                    <span>₱{deliveryMethod === 'delivery' ? 50 : 0}</span>
                  </div>
                  <div className="flex justify-between text-xl font-serif text-[#C6A87C] pt-4 border-t border-white/10 mt-4">
                    <span>Total</span>
                    <span>₱{cartTotal + (deliveryMethod === 'delivery' ? 50 : 0)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  {currentStep === 1 ? (
                    <button 
                      onClick={handleNext}
                      className="w-full bg-[#C6A87C] text-[#1a1510] font-bold uppercase tracking-widest py-4 hover:bg-[#b09265] transition-all flex items-center justify-center gap-2"
                    >
                      Proceed to Payment <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full bg-[#C6A87C] text-[#1a1510] font-bold uppercase tracking-widest py-4 hover:bg-[#b09265] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isProcessing ? 'Processing...' : 'Complete Order'}
                    </button>
                  )}
                  
                  <button 
                    onClick={handleBack}
                    className="w-full text-[#E8E0D5]/50 text-xs uppercase tracking-widest py-2 hover:text-[#E8E0D5] transition-colors flex items-center justify-center gap-2"
                  >
                     <ArrowLeft size={14} /> {currentStep === 1 ? 'Back to Menu' : 'Back to Details'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
