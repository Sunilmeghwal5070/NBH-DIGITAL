import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, MapPin, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import ShareModal from '../components/ShareModal';

export default function EventDetail() {
  const { goBack, navigate } = useSafeNavigate();
  const [showShareModal, setShowShareModal] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'KEYCHAIN MAKING WORKSHOP',
          text: 'Check out this event on Digital Nimbahera!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-20 justify-between">
        <div className="flex items-center">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition mr-2">
            <ArrowLeft size={24} className="text-gray-900" />
            </motion.button>
            <h1 className="text-xl font-bold text-gray-900">Event Detail</h1>
        </div>
      </div>

      <div>
         <img src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&q=80&w=800&h=400" className="w-full object-cover" />
      </div>

      <div className="p-5">
         <div className="flex space-x-3 mb-4">
            <div className="bg-[#4f46e5] text-white px-4 py-1.5 rounded-lg font-bold text-xs">UPCOMING</div>
            <button onClick={handleShare} className="bg-gray-100 text-gray-700 px-4 py-1.5 rounded-lg font-bold text-xs flex items-center shadow-sm hover:bg-gray-200">
               <Share2 size={14} className="mr-1.5" /> Share
            </button>
         </div>

         <h1 className="text-3xl font-black text-gray-900 mb-4 leading-tight uppercase">KEYCHAIN MAKING WORKSHOP</h1>

         <div className="space-y-3 mb-8">
            <div className="flex items-center text-gray-700 font-medium">
               <Clock size={20} className="mr-3 text-[#4f46e5]" />
               20 Jun · 5:00 pm - 7:00 pm
            </div>
            <div className="flex items-center text-gray-700 font-medium">
               <MapPin size={20} className="mr-3 text-[#4f46e5]" />
               HOTEL PADMINI
            </div>
         </div>

         <div className="flex justify-between border-t border-gray-100 mb-8 pt-5">
            <div>
               <p className="text-gray-500 text-sm mb-1">Registration</p>
               <p className="font-bold text-gray-900 text-lg">Registration Required</p>
            </div>
            <div className="text-right">
               <p className="text-gray-500 text-sm mb-1">Organized by</p>
               <p className="font-bold text-gray-900 text-lg uppercase">SHRUTI INANI</p>
            </div>
         </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-safe">
         <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#4f46e5] text-white font-bold py-4 rounded-xl flex items-center justify-center text-lg">
            <span className="mr-2">📞</span> Contact Organizer
         </motion.button>
      </div>

      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        title="KEYCHAIN MAKING WORKSHOP" 
        text="Check out this event on Digital Nimbahera!" 
        url={window.location.href} 
      />
    </motion.div>
  );
}
