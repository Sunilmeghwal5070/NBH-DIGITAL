import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { X } from 'lucide-react';

export default function ShareCity() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <motion.button onClick={() => navigate(-1)} className="text-[#4f46e5] font-bold">Cancel</motion.button>
        <h1 className="text-xl font-bold text-gray-900">Share with City</h1>
        <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-4 pb-24">
        
        <p className="text-gray-500 text-sm font-medium mb-2">Your submission will be reviewed before publishing</p>

        <input type="text" placeholder="Title" className="w-full bg-gray-50 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#8b8cf8] font-medium" />
        
        <textarea rows={6} placeholder="Describe the information" className="w-full bg-gray-50 rounded-xl px-4 py-4 focus:outline-none focus:ring-2 focus:ring-[#8b8cf8] font-medium"></textarea>

        <div className="w-32 h-32 border border-[#e2e8f0] rounded-xl flex items-center justify-center text-gray-500 font-medium bg-gray-50 cursor-pointer">
           + Add Image
        </div>

        <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#4f46e5] text-white font-bold py-4 rounded-xl mt-4">
            Submit for Review
        </motion.button>

        <div className="bg-[#f0fdf4] rounded-2xl p-5 mt-6 flex items-start border border-[#bbf7d0]">
           <div className="w-10 h-10 bg-[#22c55e] rounded-full flex items-center justify-center text-white mr-4 flex-shrink-0">
               <span className="font-bold">💬</span>
           </div>
           <div>
              <h3 className="font-bold text-gray-900 mb-1">Share videos on WhatsApp</h3>
              <p className="text-gray-600 text-sm leading-relaxed">You can also send incident videos, photos & updates directly on WhatsApp.</p>
           </div>
        </div>

      </div>

    </motion.div>
  );
}
