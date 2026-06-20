import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';

export default function CreateResale() {
  const { goBack, navigate } = useSafeNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('0');
  const [location, setLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!title || !price || !selectedCategory) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'resale'), {
        title,
        price,
        location,
        description,
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col bg-white min-h-screen text-gray-900 font-sans"
    >
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full transition">
            <X size={26} className="text-gray-900" />
         </motion.button>
         <div className="ml-2 flex flex-col justify-center">
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Sell your item</h1>
            <p className="text-sm font-medium text-gray-600">Reach buyers nearby</p>
         </div>
      </div>

      <div className="p-4 overflow-y-auto pb-24">
         <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
               <h2 className="font-bold text-[22px] text-gray-900">Photos</h2>
               <span className="text-[#4f46e5] font-bold text-base">0/3</span>
            </div>
            <p className="text-base text-gray-600 mb-4">Items with clear photos sell faster</p>
            <div className="flex gap-4">
              <motion.div whileTap={{ scale: 0.95 }} className="w-28 h-28 bg-white border-2 border-dashed border-gray-200 rounded-[24px] flex flex-col items-center justify-center cursor-pointer transition-colors shadow-sm">
                 <Plus size={32} className="text-gray-800 mb-1" strokeWidth={1.5} />
                 <span className="text-sm font-medium text-gray-900">Add Photo</span>
              </motion.div>
            </div>
         </div>

         <div className="space-y-5">
            <h2 className="font-bold text-[22px] text-gray-900">Basic Details</h2>
            
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Item Name *</label>
              <input 
                type="text" 
                placeholder="e.g. iPhone 13"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-gray-50/80 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] transition-colors text-base"
              />
            </div>
            
            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Price *</label>
              <div className="relative flex items-center">
                <span className="absolute left-4 font-bold text-[#4f46e5] text-xl">₹</span>
                <input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-gray-50/80 border border-gray-100 rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] text-2xl font-bold text-gray-700 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-bold text-gray-900 mb-2">Location *</label>
              <input 
                type="text" 
                placeholder="e.g. Pratap Nagar"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-50/80 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] transition-colors text-base"
              />
            </div>

            <div>
              <h2 className="font-bold text-[22px] text-gray-900">Category</h2>
              <p className="text-base text-gray-600 mb-2">Choose the most relevant category</p>
              <div className="w-full bg-gray-50/80 border border-gray-100 rounded-xl px-4 py-3.5 flex justify-between items-center text-left cursor-pointer hover:bg-gray-100 transition">
                <span className={`text-base font-medium text-gray-600`}>
                  {selectedCategory || 'Select category'}
                </span>
                <ChevronRight size={18} className="text-gray-500" />
              </div>
            </div>

            <div className="pt-2">
              <h2 className="font-bold text-[22px] text-gray-900">Description</h2>
              <p className="text-base text-gray-600 mb-2">Mention condition, accessories, warranty, etc.</p>
              <textarea 
                placeholder="Describe your item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                className="w-full bg-gray-50/80 border border-gray-100 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] transition-colors resize-none text-base"
              />
            </div>
         </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50/80 backdrop-blur border-t border-gray-100 z-20 max-w-md mx-auto">
         <motion.button 
           whileTap={{ scale: 0.98 }}
           onClick={handlePublish}
           className="w-full bg-[#4f46e5] text-white font-bold py-3.5 rounded-xl text-[17px] shadow-sm transition-all"
         >
            Post Item
         </motion.button>
      </div>

    </motion.div>
  );
}
