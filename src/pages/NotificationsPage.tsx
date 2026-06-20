import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotificationsPage() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-center sticky top-0 z-20">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition absolute left-4">
           <ArrowLeft size={20} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
      </div>

      <div className="p-4 pb-24">
         <h3 className="font-bold text-gray-500 mb-4 px-2">Yesterday</h3>
         <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} onClick={() => navigate('/event/1')} className="flex cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                   <div className="w-12 h-12 bg-gray-200 rounded-xl overflow-hidden mr-4 flex-shrink-0">
                      <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=100&h=100" className="w-full h-full object-cover" />
                   </div>
                   <div className="flex-grow border-b border-gray-50 pb-4">
                      <div className="flex justify-between items-start mb-1">
                         <h4 className="font-bold text-gray-900 text-sm leading-tight pr-2">KEYCHAIN MAKING WORKSHOP</h4>
                         <span className="bg-[#ef4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-1">KEYCHAIN MAKING WORKSHOP</p>
                      <p className="text-gray-400 text-xs">10 hr ago</p>
                   </div>
                </div>
            ))}
         </div>

         <h3 className="font-bold text-gray-500 mb-4 mt-8 px-2">Earlier</h3>
         <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
                <div key={i} onClick={() => navigate('/polls')} className="flex cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-colors">
                   <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl mr-4 flex-shrink-0">
                      📣
                   </div>
                   <div className="flex-grow border-b border-gray-50 pb-4">
                      <div className="flex justify-between items-start mb-1">
                         <h4 className="font-bold text-gray-900 text-sm leading-tight pr-2">Daily Quiz is Live!</h4>
                         <span className="bg-[#ef4444] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NEW</span>
                      </div>
                      <p className="text-gray-500 text-xs mb-1">Waiting room is open!</p>
                      <p className="text-gray-400 text-xs">Yesterday</p>
                   </div>
                </div>
            ))}
         </div>
      </div>
    </motion.div>
  );
}
