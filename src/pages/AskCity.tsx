import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export default function AskCity() {
  const { goBack, navigate } = useSafeNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-900 mx-auto">Ask Your City</h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="absolute right-4 p-2 rounded-full hover:bg-gray-100 transition">
          <X size={24} className="text-gray-900" />
        </motion.button>
      </div>

      <div className="p-4 space-y-6 pb-24">
        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Your Question</label>
           <textarea rows={6} placeholder="Ask something about your city..." className="w-full bg-gray-50 rounded-2xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#93c5fd]"></textarea>
           <div className="text-right text-xs text-gray-400 mt-1">0/300</div>
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Image (optional)</label>
           <div className="w-32 h-32 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
              <Plus size={32} />
           </div>
           <p className="text-sm text-gray-500 mt-2">Add an image if it helps explain your question.</p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white pb-safe">
         <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#8b8cf8] text-white font-bold py-4 rounded-2xl">
            Post Question
         </motion.button>
      </div>
    </motion.div>
  );
}
