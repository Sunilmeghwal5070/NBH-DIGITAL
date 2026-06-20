import { useState, useEffect } from 'react';
import { User, Bell, Shield, Settings, Share2, HelpCircle, LogOut, ChevronRight, Store, FileText, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import ShareModal from '../components/ShareModal';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optional: navigate home or stay on profile
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handleInvite = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Digital Nimbahera',
          text: 'Join me on Digital Nimbahera! The heartbeat of our city.',
          url: window.location.origin, // or a specific play store link if you have it
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShowShareModal(true);
    }
  };

  const handleConnect = () => {
    window.location.href = 'mailto:support@digitalnimbahera.com';
  };

  const menuItems = [
    { icon: FileText, label: 'My Posts', path: '/my-posts', color: 'text-blue-500', bg: 'bg-blue-50' },
    { icon: Store, label: 'My Business', path: '/my-businesses', color: 'text-orange-500', bg: 'bg-orange-50' },
    { icon: Bell, label: 'Notification Settings', path: '/notifications/settings', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { icon: Share2, label: 'Connect with us', action: handleConnect, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { icon: User, label: 'Invite Friends', action: handleInvite, color: 'text-rose-500', bg: 'bg-rose-50' },
    { icon: Settings, label: 'Account Settings', path: '/account-settings', color: 'text-gray-600', bg: 'bg-gray-100' },
  ];

  if (loading) {
    return <div className="min-h-screen bg-gray-50"></div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-gray-50 min-h-screen pb-24 font-sans text-gray-900"
    >
      {/* Header */}
      <div className="bg-white px-6 py-5 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 text-center">Profile</h1>
      </div>

      <div className="px-4 space-y-6 max-w-sm mx-auto w-full pt-6">
        {/* User Info */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="flex flex-col items-center mb-6"
        >
          {user ? (
            <>
              <div className="w-24 h-24 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4 border-4 border-white shadow-md relative overflow-hidden">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user.displayName || 'User'}</h2>
              <p className="text-gray-500 font-medium mb-1">{user.email}</p>
            </>
          ) : (
             <>
               <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center text-4xl font-bold text-gray-400 mb-4 border-4 border-white shadow-md relative">
                 <User size={40} />
               </div>
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Guest User</h2>
               <button onClick={() => navigate('/auth')} className="bg-[#4f46e5] text-white px-6 py-2 rounded-full font-bold shadow-sm">Login / Signup</button>
             </>
          )}
        </motion.div>

        {user && (
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-between"
          >
             <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-50 rounded-full border border-green-100 flex items-center justify-center text-xl shadow-sm">
                   🌱
                </div>
                <div>
                   <h3 className="font-bold text-lg text-gray-900 leading-none mb-1">Beginner</h3>
                   <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Level 1</p>
                </div>
             </div>
             <div className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-bold text-sm flex items-center shadow-sm">
                <span className="text-yellow-500 mr-1.5">★</span> 0
             </div>
          </motion.div>
        )}

        {/* Menu Items */}
        <div className="space-y-3 mt-6">
          {menuItems.map((item, index) => (
             <motion.button 
               whileTap={{ scale: 0.98 }}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.15 + (index * 0.05) }}
               key={index} 
               onClick={() => item.action ? item.action() : item.path && navigate(item.path)}
               className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:border-gray-200 transition-all group"
             >
                <div className="flex items-center space-x-4">
                   <div className={`p-2.5 rounded-xl ${item.bg} group-hover:scale-110 transition-transform`}>
                      <item.icon size={20} className={item.color} strokeWidth={2}/>
                   </div>
                   <span className="font-semibold text-gray-700">{item.label}</span>
                </div>
                <ChevronRight size={20} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
             </motion.button>
          ))}
          
          {user && (
            <motion.button 
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full bg-red-50 rounded-xl border border-red-100 p-4 flex items-center justify-between hover:bg-red-100 transition-all mt-4 group"
            >
               <div className="flex items-center space-x-4">
                  <div className="p-2.5 bg-white rounded-xl shadow-sm text-red-500 group-hover:scale-110 transition-transform">
                     <LogOut size={20} strokeWidth={2}/>
                  </div>
                  <span className="font-bold text-red-600">Logout</span>
               </div>
               <ChevronRight size={20} className="text-red-400" />
            </motion.button>
          )}
        </div>
      </div>

      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        title="Digital Nimbahera" 
        text="Join me on Digital Nimbahera! The heartbeat of our city." 
        url={window.location.origin} 
      />
    </motion.div>
  );
}
