import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { ArrowLeft, Search as SearchIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function SearchPage() {
  const { goBack, navigate } = useSafeNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 justify-between shadow-sm">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={24} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Search</h1>
         <div className="w-10"></div>
      </div>

      <div className="p-4">
         <motion.div 
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative bg-white rounded-2xl shadow-sm border border-gray-100"
         >
             <SearchIcon size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={2}/>
             <input autoFocus type="text" placeholder="Search mobile, electronics..." className="w-full bg-transparent py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl transition-all" />
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
         >
            <div className="w-32 h-32 mb-6 relative">
               <div className="absolute inset-0 bg-blue-100 rounded-full blur-xl"></div>
               <SearchIcon size={80} className="text-blue-300 relative z-10 mx-auto mt-6" />
            </div>
            <p className="text-lg font-bold text-gray-500">Find used products around you</p>
         </motion.div>
      </div>
    </motion.div>
  );
}
