import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotificationSettings() {
  const { goBack, navigate } = useSafeNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-center sticky top-0 z-20">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition absolute left-4">
           <ArrowLeft size={20} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
      </div>

      <div className="p-6 flex flex-col items-center justify-center flex-grow -mt-20">
         
         <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-[#22c55e] rounded-xl flex items-center justify-center text-white text-3xl font-bold">
               ✓
            </div>
         </div>

         <h2 className="text-2xl font-black text-gray-900 mb-3 text-center">Notifications are ON</h2>
         <p className="text-gray-500 text-center font-medium leading-relaxed mb-8 max-w-[300px]">
             You'll receive alerts, updates, and important announcements.
         </p>

         <button className="font-bold text-gray-900 hover:text-[#4f46e5]">Manage in settings</button>

      </div>
    </motion.div>
  );
}
