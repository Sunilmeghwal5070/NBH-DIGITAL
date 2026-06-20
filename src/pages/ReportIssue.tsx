import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export default function ReportIssue() {
  const { goBack, navigate } = useSafeNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['Road', 'Water', 'Electricity', 'Garbage', 'Safety', 'Other'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-900">Report Civic Issue</h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft size={24} className="text-gray-900 rotate-180" /> {/* Simulate X icon, wait X icon is better */}
        </motion.button>
      </div>
      <div className="px-4 text-sm text-gray-500 mb-4 -mt-2">Help improve your city</div>

      <div className="p-4 space-y-5 pb-24">
        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Photos (0/3) *</label>
           <div className="w-24 h-24 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center text-gray-400">
             <Plus size={24} />
           </div>
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Category *</label>
           <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                 <button 
                   key={cat}
                   onClick={() => setSelectedCategory(cat)}
                   className={`px-4 py-2 border rounded-full text-sm font-medium transition ${selectedCategory === cat ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-800'}`}
                 >
                   {cat}
                 </button>
              ))}
           </div>
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Title *</label>
           <input type="text" placeholder="Example: Pothole near bus stand" className="w-full bg-gray-50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Description *</label>
           <textarea rows={4} placeholder="Describe the issue clearly" className="w-full bg-gray-50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></textarea>
           <div className="text-right text-xs text-gray-400 mt-1">0/400</div>
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Location *</label>
           <input type="text" placeholder="Area / Landmark" className="w-full bg-gray-50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-safe">
         <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#4f46e5] text-white font-bold py-4 rounded-xl">
            Submit Issue
         </motion.button>
      </div>
    </motion.div>
  );
}
