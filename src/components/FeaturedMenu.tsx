import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const drinks = [
  {
    id: 1,
    name: "Barako Gold Espresso",
    description: "Rich, bold, and unapologetically strong. Our signature single-origin espresso.",
    price: "₱250",
    image: "https://images.unsplash.com/photo-1719840195557-b87e064766e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGVsZWdhbnQlMjBjZXJhbWljJTIwY3VwfGVufDF8fHx8MTc3MDEyMDUwOHww&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 2,
    name: "Manila Cold Brew",
    description: "Slow-steeped for 24 hours. Served over ice with a hint of pandan syrup.",
    price: "₱280",
    image: "https://images.unsplash.com/photo-1759340642565-806308b041a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwYWVzdGhldGljJTIwZ2xhc3MlMjBjb25jcmV0ZSUyMGJhY2tncm91bmR8ZW58MXx8fHwxNzcwMTIwNTA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
  },
  {
    id: 3,
    name: "Tablea Mocha",
    description: "Native Davao chocolate melted into velvety steamed milk and espresso.",
    price: "₱320",
    image: "https://images.unsplash.com/photo-1715584019942-4f8e6535cc38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3VyJTIwb3ZlciUyMGNvZmZlZSUyMGdsYXNzJTIwY2FyYWZlJTIwZWxlZ2FudHxlbnwxfHx8fDE3NzAxMjA1MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
  }
];

export default function FeaturedMenu() {
  return (
    <section id="menu" className="py-24 bg-[#E8E0D5] text-[#1a1510]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#1a1510]">Curated Tastes</h2>
            <p className="text-[#1a1510]/70 text-lg font-light leading-relaxed">
              We source our beans directly from farmers in Batangas and Bukidnon. 
              Each cup is a tribute to the rich volcanic soil of the Philippines.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#1a1510] uppercase tracking-widest text-xs font-bold border-b border-[#1a1510] pb-1 hover:text-[#C6A87C] hover:border-[#C6A87C] transition-all mt-6 md:mt-0">
            Full Menu <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {drinks.map((drink, index) => (
            <motion.div
              key={drink.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-200">
                <img 
                  src={drink.image} 
                  alt={drink.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-xl font-serif font-medium">{drink.name}</h3>
                <span className="text-[#C6A87C] font-bold font-serif">{drink.price}</span>
              </div>
              <p className="text-[#1a1510]/60 text-sm leading-relaxed">{drink.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 md:hidden text-center">
             <button className="flex items-center gap-2 text-[#1a1510] uppercase tracking-widest text-xs font-bold border-b border-[#1a1510] pb-1 mx-auto">
            Full Menu <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
