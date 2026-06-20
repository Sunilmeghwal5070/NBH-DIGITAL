import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { motion } from 'motion/react';

export default function Authentication() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home', { replace: true });
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      // Wait for auth state change to trigger redirect
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to initialize Google sign in');
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-green-100 rounded-full blur-3xl opacity-50"></div>

      <div className="px-4 py-4 flex items-center bg-transparent z-10 relative">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-200 transition">
            <ArrowLeft size={24} className="text-gray-900" />
         </motion.button>
      </div>

      <div className="flex-grow flex flex-col p-6 mt-4 max-w-md mx-auto w-full relative z-10">
         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center mb-10"
         >
            <img src="https://i.pinimg.com/474x/92/89/ab/9289ab9601c7dbc835bd0b05f3547985.jpg" className="w-16 h-16 rounded-2xl object-cover mr-4 shadow-lg border border-gray-100" alt="Digital Nimbahera" />
            <div>
               <h1 className="text-3xl font-bold text-gray-900 leading-tight">Digital<br/>Nimbahera</h1>
            </div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-7 md:p-8 rounded-3xl shadow-sm border border-gray-100"
         >
           <h2 className="text-xl font-bold text-gray-900 mb-6">Welcome!</h2>
           <p className="text-gray-500 mb-6 leading-relaxed font-medium">Please sign in to access personalized features, share updates, and participate in the community.</p>
           
           <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
             <p className="text-xs text-blue-800 font-medium">
               <strong>Note:</strong> If you are using an app wrapper or an in-app browser (like WhatsApp/Instagram), Google Login may be blocked. Please open this link directly in <strong>Chrome</strong> or <strong>Safari</strong>.
             </p>
           </div>

           {error && (
             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm font-medium border border-red-100">
               {error}
             </motion.div>
           )}

           <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white flex items-center justify-center font-bold text-gray-700 py-4 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all disabled:opacity-50 disabled:pointer-events-none"
           >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 mr-3" />
              {loading ? 'Signing in...' : 'Google Sign In'}
           </motion.button>
         </motion.div>
      </div>
    </motion.div>
  );
}
