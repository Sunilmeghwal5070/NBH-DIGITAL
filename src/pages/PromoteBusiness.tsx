import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

export default function PromoteBusiness() {
  const { goBack, navigate } = useSafeNavigate();
  const [selectedType, setSelectedType] = useState('Promotion');
  const types = ['Promotion', 'Banner', 'Event', 'Other'];

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition">
          <X size={24} className="text-gray-900" />
        </motion.button>
      </div>

      <div className="p-4 space-y-4 pb-24">
        
        <div className="bg-[#4f46e5] text-white rounded-2xl p-6 flex items-start">
           <span className="text-4xl mr-4 opacity-90">📢</span>
           <div>
              <h2 className="font-bold text-xl mb-1">Promote Your Business</h2>
              <p className="text-blue-100 text-sm leading-relaxed">Reach thousands of citizens across Nimbahera through Digital Nimbahera.</p>
           </div>
        </div>

        <input type="text" placeholder="Your name / business name" className="w-full bg-gray-50 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#8b8cf8] mt-2 font-medium" />
        
        <input type="text" placeholder="Contact number / WhatsApp" className="w-full bg-gray-50 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#8b8cf8] font-medium" />

        <textarea rows={4} placeholder="Tell us what you want to promote (optional)" className="w-full bg-gray-50 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#8b8cf8] font-medium"></textarea>

        <div className="flex flex-wrap gap-2 pt-2">
           {types.map((type) => (
              <button 
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition ${selectedType === type ? 'bg-[#4f46e5] text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
              >
                {type}
              </button>
           ))}
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white pb-safe">
         <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#4f46e5] text-white font-bold py-4 rounded-xl">
            Submit Request
         </motion.button>
      </div>
    </motion.div>
  );
}
