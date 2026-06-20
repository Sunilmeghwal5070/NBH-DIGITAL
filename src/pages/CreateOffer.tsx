import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';

const categories = ['Food', 'Shopping', 'Salon', 'Gym', 'Other'];

export default function CreateOffer() {
  const { goBack, navigate } = useSafeNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [title, setTitle] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!title || !businessName || !selectedCategory) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'offers'), {
        title,
        businessName,
        location,
        category: selectedCategory,
        createdAt: new Date().toISOString()
      });
      goBack();
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-gray-50 min-h-screen font-sans relative"
    >
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-20 border-b border-gray-100 justify-between">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 flex-shrink-0 transition">
            <ArrowLeft size={24} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Create Offer</h1>
         <div className="w-10"></div>
      </div>

      <div className="p-4 overflow-y-auto pb-32">
         {/* Image Upload Placeholder */}
         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-48 bg-white border border-gray-100 border-dashed rounded-3xl flex flex-col items-center justify-center mb-6 cursor-pointer hover:bg-gray-50 transition shadow-sm text-gray-500 font-bold"
         >
            <span className="text-2xl mb-1 text-gray-300">+</span>
            Add Offer Image
         </motion.div>

         {/* Inputs */}
         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 mb-8"
         >
            <input 
              type="text" 
              placeholder="e.g. 50% OFF on Pizza"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium transition"
            />
            <input 
              type="text" 
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium transition"
            />
            <input 
              type="text" 
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium transition"
            />
         </motion.div>

         {/* Category Selection */}
         <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
         >
            <h3 className="font-bold text-gray-900 mb-3 px-1">Category</h3>
            <div className="flex flex-wrap gap-2">
               {categories.map((cat) => (
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-sm ${
                      selectedCategory === cat 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-700 border border-gray-100 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </motion.button>
               ))}
            </div>
         </motion.div>
      </div>

      {/* Floating Bottom Button */}
      <motion.div 
         initial={{ y: 100 }}
         animate={{ y: 0 }}
         transition={{ delay: 0.3 }}
         className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-safe z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]"
      >
         <motion.button 
           whileTap={{ scale: 0.98 }}
           onClick={handlePublish}
           disabled={loading || !title || !businessName || !selectedCategory}
           className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-sm hover:bg-blue-700 transition disabled:opacity-50 disabled:pointer-events-none"
         >
            {loading ? 'Publishing...' : 'Publish Offer'}
         </motion.button>
      </motion.div>

    </motion.div>
  );
}
