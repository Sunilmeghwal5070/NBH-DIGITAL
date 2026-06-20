import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function MyPosts() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-center sticky top-0 z-20">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition absolute left-4">
           <ArrowLeft size={20} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900">My Posts</h1>
      </div>

      <div className="p-4 pt-10">
         <div className="bg-gray-50 rounded-3xl p-8 py-12 flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-black text-gray-900 mb-4">No Posts Yet</h2>
            <p className="text-gray-600 font-medium leading-relaxed max-w-[250px]">
                Your marketplace listings and posts will appear here.
            </p>
         </div>
      </div>
    </motion.div>
  );
}
