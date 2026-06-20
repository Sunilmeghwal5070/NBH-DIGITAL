import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Share2, MapPin, Ruler, Home, Box } from 'lucide-react';
import { motion } from 'motion/react';

export default function PropertyDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '2BHK For Rent',
          text: 'Check out this property on Digital Nimbahera!',
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-gray-50 min-h-screen pb-24 font-sans"
    >
      {/* Header Over Image */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10 pt-safe">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2.5 bg-white/80 backdrop-blur rounded-full hover:bg-white text-gray-900 shadow-sm transition">
            <ArrowLeft size={20} />
         </motion.button>
         <motion.button onClick={handleShare} whileTap={{ scale: 0.9 }} className="p-2.5 bg-white/80 backdrop-blur rounded-full hover:bg-white text-gray-900 shadow-sm transition">
            <Share2 size={20} />
         </motion.button>
      </div>

      {/* Image Gallery */}
      <motion.div 
         initial={{ y: -20, opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         className="w-full h-80 bg-gray-200 relative overflow-hidden"
      >
         <img src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800&h=600" className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
         <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest">
            For Rent
         </div>
         <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg">
            1/1
         </div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="p-5 bg-white flex-grow relative -mt-6 rounded-t-3xl z-10 shadow-sm"
      >
         <h1 className="text-2xl font-bold text-gray-900 mb-3">2BHK</h1>
         
         <div className="inline-block bg-blue-50 text-blue-700 font-bold text-2xl px-4 py-2 rounded-xl mb-6 shadow-sm border border-blue-100">
            ₹ 10000
         </div>

         <div className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
               <MapPin size={14} className="mr-1" /> Location
            </h3>
            <p className="text-gray-800 font-semibold leading-relaxed">
               Maheshpuram road vidhya vihar sr.sec.school ke pass Prem residency colony
            </p>
         </div>

         <div className="mb-8">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Property Highlights</h3>
            <div className="flex flex-wrap gap-2">
               <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                  <Ruler size={16} className="text-gray-400 mr-2" />
                  <span className="font-bold text-gray-700 text-sm">912 sqft</span>
               </div>
               <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                  <Home size={16} className="text-amber-500 mr-2" />
                  <span className="font-bold text-gray-700 text-sm">Semi Furnished</span>
               </div>
               <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                  <Box size={16} className="text-emerald-500 mr-2" />
                  <span className="font-bold text-gray-700 text-sm">30 ft</span>
               </div>
            </div>
         </div>

         {/* Extracted Video/FB Link Placeholder */}
         <div className="bg-blue-50 rounded-2xl p-4 flex items-center border border-blue-100 mb-6 group cursor-pointer hover:bg-blue-100 transition-colors">
            <div className="w-20 h-28 bg-gray-200 rounded-xl overflow-hidden mr-4 relative flex-shrink-0 shadow-sm border border-white">
               <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=150" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-1 left-1 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Reels</div>
            </div>
            <div className="flex-grow">
               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mb-2 shadow-md">
                 <span className="text-white font-bold text-lg font-serif">f</span>
               </div>
               <h4 className="font-bold text-gray-900">Facebook Reel</h4>
               <motion.button whileTap={{ scale: 0.95 }} className="mt-2 bg-blue-600 text-white font-bold py-1.5 px-6 rounded-full text-xs hover:bg-blue-700 transition shadow-sm">
                  Watch
               </motion.button>
            </div>
         </div>
      </motion.div>

      {/* Fixed Bottom Bar */}
      <motion.div 
         initial={{ y: 100 }}
         animate={{ y: 0 }}
         transition={{ delay: 0.2 }}
         className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe flex items-center justify-between shadow-[0_-10px_20px_rgba(0,0,0,0.02)] z-20"
      >
         <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md border-2 border-white">
               A
            </div>
            <div>
               <h4 className="font-bold text-gray-900 leading-tight">ABHAY SINGH</h4>
               <p className="text-xs font-medium text-gray-500 mt-0.5">Posted 4 days ago</p>
            </div>
         </div>
         <motion.button whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-700 transition shadow-sm">
            Contact
         </motion.button>
      </motion.div>
    </motion.div>
  );
}
