import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

export default function ShareIdea() {
  const { goBack, navigate } = useSafeNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-900">Share Idea</h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition">
          <X size={24} className="text-gray-900" />
        </motion.button>
      </div>

      <div className="p-4 space-y-4 pb-24">
        
        <div className="bg-[#f5f3ff] rounded-2xl p-5 flex items-start">
           <span className="text-3xl mr-3">💡</span>
           <div>
              <h2 className="font-bold text-gray-900 text-lg">Share an Idea</h2>
              <p className="text-gray-600 text-sm mt-1 leading-relaxed">Help improve Nimbahera with your suggestions.</p>
           </div>
        </div>

        <input type="text" placeholder="Idea title" className="w-full bg-gray-50 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#8b8cf8] mt-2 font-medium" />
        
        <textarea rows={6} placeholder="Describe your idea..." className="w-full bg-gray-50 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#8b8cf8] font-medium"></textarea>

        <div className="w-full py-8 border border-[#e2e8f0] border-dashed rounded-xl flex items-center justify-center text-[#4f46e5] font-semibold bg-white cursor-pointer hover:bg-gray-50">
           + Add image (optional)
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white pb-safe">
         <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#4f46e5] text-white font-bold py-4 rounded-xl">
            Submit Idea
         </motion.button>
      </div>
    </motion.div>
  );
}
