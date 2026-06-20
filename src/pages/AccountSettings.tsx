import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function AccountSettings() {
  const { goBack, navigate } = useSafeNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>('User');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        setUserName(user.displayName || 'User');
      }
    });
    return () => unsub();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-20">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 bg-gray-50 rounded-full hover:bg-gray-100 transition mr-4">
           <ArrowLeft size={20} className="text-gray-900" />
         </motion.button>
         <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
      </div>

      <div className="p-4 space-y-5">
         
         <div className="bg-gray-50 rounded-3xl p-5 flex items-center">
            <div className="w-16 h-16 bg-[#e0e7ff] text-[#4f46e5] rounded-full flex items-center justify-center text-2xl font-bold mr-4 uppercase">
               {userName ? userName.charAt(0) : 'U'}
            </div>
            <div>
               <h2 className="text-xl font-bold text-gray-900 truncate max-w-[200px]">{userName}</h2>
               <p className="text-gray-500 font-medium truncate max-w-[200px]">{userEmail || '+91 0000000000'}</p>
            </div>
         </div>

         <div className="bg-red-50/50 border border-red-100 rounded-3xl p-6">
            <div className="flex items-center mb-3">
               <div className="w-12 h-12 bg-red-100 text-red-500 rounded-xl flex items-center justify-center mr-4">
                  🗑️
               </div>
               <h3 className="font-bold text-gray-900 text-xl">Delete Account</h3>
            </div>
            <p className="text-gray-600 text-sm mb-6 font-medium leading-relaxed">
               Permanently remove your account and associated data.
            </p>
            <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#dc2626] text-white font-bold py-3.5 rounded-xl">
               Delete Permanently
            </motion.button>
         </div>

      </div>
    </motion.div>
  );
}
