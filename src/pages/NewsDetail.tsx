import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

export default function NewsDetail() {
  const navigate = useNavigate();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Nimbahera | हल्दीघाटी से फिर उठा राष्ट्र गौरव का संदेश',
          text: 'Check out this news on Digital Nimbahera!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Your browser does not support the Web Share API.');
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
         <div className="flex items-center">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 bg-gray-50 rounded-full hover:bg-gray-100 transition mr-4">
              <ArrowLeft size={20} className="text-gray-900" />
            </motion.button>
            <h1 className="text-xl font-bold text-gray-900">News</h1>
         </div>
      </div>

      <div className="w-full bg-gray-900 relative">
         <img src="https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=800&h=450" className="w-full object-cover" />
         <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur pl-1 cursor-pointer">
                ▶
             </div>
         </div>
      </div>

      <div className="p-4 pt-6">
         <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
            Nimbahera | हल्दीघाटी से फिर उठा राष्ट्र गौरव का संदेश, मेवाड़ में गूंजा महाराणा प्रताप का गौरवगान। Exclusive
         </h1>

         <div className="flex items-center text-sm font-medium text-gray-500 mb-6">
            <span>First India • 23 hours ago</span>
            <button onClick={handleShare} className="ml-auto bg-gray-50 px-3 py-1.5 rounded-lg flex items-center text-gray-700 font-bold hover:bg-gray-100">
               <Share2 size={14} className="mr-1.5" /> Share
            </button>
         </div>

         {/* Ad Placeholder matched with Manus AI from screenshot */}
         <div className="bg-white border text-center p-6 border-gray-100 rounded-3xl shadow-sm my-6 flex items-center flex-col justify-center">
             <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                <span className="text-3xl">AI</span>
             </div>
             <h3 className="font-bold text-gray-900 mb-1">Manus AI</h3>
             <p className="text-xs text-gray-500 mb-4 font-medium">4.7 ★ • Google Play</p>
             <button className="bg-[#1a73e8] text-white px-8 py-2 rounded-full font-bold text-sm w-full">Install</button>
         </div>
      </div>

    </motion.div>
  );
}
