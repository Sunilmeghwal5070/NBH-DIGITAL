import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, ChevronRight } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion, AnimatePresence } from 'motion/react';
import { businessCategories } from '../data/mockData';

export default function BusinessRegistration() {
  const { goBack, navigate } = useSafeNavigate();
  const [formData, setFormData] = useState({
     name: '',
     description: '',
     category: ''
  });
  const [showCategory, setShowCategory] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.category) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'businesses'), {
        ...formData,
        createdAt: new Date().toISOString(),
        verified: false,
        rating: 0,
        reviews: 0
      });
      navigate('/business/category/home-services');
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans pb-32"
    >
      {/* Header */}
      <div className="px-5 py-6 flex items-start justify-between bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
         <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Become a Provider</h1>
            <p className="text-xs font-medium text-gray-500 mt-1">Grow your business</p>
         </div>
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
            <X size={18} className="text-gray-900" />
         </motion.button>
      </div>

      <div className="p-5 space-y-6">
         {/* Banner */}
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden"
         >
            <div className="absolute top-[-50%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h2 className="text-xl font-bold mb-1.5 relative z-10">Reach More Customers</h2>
            <p className="text-sm text-blue-100 leading-snug relative z-10">Showcase your services and connect with local customers instantly.</p>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm"
         >
            {/* Images */}
            <div className="mb-6">
               <h3 className="text-sm font-bold text-gray-900 mb-3">Images (max 3)</h3>
               <motion.div whileTap={{ scale: 0.95 }} className="w-24 h-24 bg-gray-50 border border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition">
                  <Plus size={28} className="text-gray-400" />
               </motion.div>
            </div>

            {/* Form */}
            <div className="space-y-5">
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Name *</label>
                  <input 
                     type="text" 
                     placeholder="Enter name"
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  />
               </div>

               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                  <textarea 
                     placeholder="Enter description"
                     rows={4}
                     value={formData.description}
                     onChange={(e) => setFormData({...formData, description: e.target.value})}
                     className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition resize-none"
                  />
               </div>

               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <div className="relative">
                     <motion.button 
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowCategory(!showCategory)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-left flex justify-between items-center text-gray-800 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                     >
                        <span className={formData.category ? 'font-medium' : 'text-gray-400'}>{formData.category || 'Select category'}</span>
                        <ChevronRight size={18} className="text-gray-400" />
                     </motion.button>
                     
                     <AnimatePresence>
                       {showCategory && (
                          <motion.div 
                             initial={{ opacity: 0, height: 0 }}
                             animate={{ opacity: 1, height: 'auto' }}
                             exit={{ opacity: 0, height: 0 }}
                             className="overflow-hidden mt-2"
                          >
                             <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-2 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                                {businessCategories.map(c => (
                                   <motion.button 
                                     whileTap={{ scale: 0.95 }}
                                     key={c.id}
                                     onClick={() => { setFormData({...formData, category: c.name}); setShowCategory(false); }}
                                     className="w-full text-left px-3 py-3 text-sm font-medium hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors border border-transparent hover:border-blue-100 flex items-center"
                                   >
                                      <span className="mr-2 text-lg">{c.icon}</span> {c.name}
                                   </motion.button>
                                ))}
                             </div>
                          </motion.div>
                       )}
                     </AnimatePresence>
                  </div>
               </div>
            </div>
         </motion.div>

         {/* Help Box */}
         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-5 mt-8 shadow-sm"
         >
            <h3 className="font-bold text-gray-900 mb-2">Need help creating your account?</h3>
            <p className="text-sm text-gray-600 mb-4 leading-snug">Send us your details and our team will help you create your account.</p>
            <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-[#25D366] text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center shadow-sm hover:opacity-90 transition">
               <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5 mr-2 brightness-0 invert" alt="WhatsApp" />
               Get Help
            </motion.button>
         </motion.div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <motion.button 
           whileTap={{ scale: 0.98 }}
           onClick={handleSubmit}
           disabled={loading || !formData.name || !formData.category}
           className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl text-[15px] hover:bg-blue-700 shadow-sm transition disabled:opacity-50"
         >
            {loading ? 'Submitting...' : 'Submit Application'}
         </motion.button>
      </div>
    </motion.div>
  );
}
