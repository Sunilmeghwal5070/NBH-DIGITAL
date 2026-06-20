import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Camera } from 'lucide-react';
import { motion } from 'motion/react';

export default function SharePositiveUpdate() {
  const { goBack, navigate } = useSafeNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const categories = ['Cleanliness', 'Infrastructure', 'Community', 'Environment', 'Education', 'Other'];

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-900">Share Positive Update</h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition">
          <X size={24} className="text-gray-900" />
        </motion.button>
      </div>
      <div className="px-4 text-sm text-gray-500 mb-4 -mt-2">Celebrate improvements in your city</div>

      <div className="p-4 space-y-5 pb-24">
        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Title *</label>
           <input type="text" placeholder="Example: Park Renovation Completed" className="w-full bg-gray-50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
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
           <label className="font-bold text-gray-900 mb-2 block text-sm">Location *</label>
           <input type="text" placeholder="Area / Landmark" className="w-full bg-gray-50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Description *</label>
           <textarea rows={4} placeholder="Tell people what positive change happened..." className="w-full bg-gray-50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></textarea>
           <div className="text-right text-xs text-gray-400 mt-1">0/600</div>
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Photos *</label>
           <div className="w-full py-6 border border-gray-200 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-gray-800 font-bold">
             <div className="flex items-center space-x-2 text-gray-800 mb-1">
                <Camera size={18} /> <span>Add Photos (0/5)</span>
             </div>
             <p className="text-xs text-gray-500 font-medium">Show the positive change clearly</p>
           </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-safe">
         <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#4f46e5] text-white font-bold py-4 rounded-xl">
            Submit Positive Update
         </motion.button>
      </div>
    </motion.div>
  );
}
