import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function MyBusinesses() {
  const { goBack, navigate } = useSafeNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-center sticky top-0 z-20">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition absolute left-4">
           <ArrowLeft size={20} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900">My Businesses</h1>
      </div>

      <div className="p-6 flex flex-col items-center justify-center flex-grow -mt-20">
         <h2 className="text-2xl font-black text-gray-900 mb-3 text-center">No Businesses Found</h2>
         <p className="text-gray-600 text-center font-medium mb-8">
             You are not managing any business yet.
         </p>
         <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/business/register')} 
            className="bg-[#4f46e5] text-white font-bold py-3.5 px-8 rounded-xl shadow-sm"
         >
            Create Business
         </motion.button>
      </div>
    </motion.div>
  );
}
