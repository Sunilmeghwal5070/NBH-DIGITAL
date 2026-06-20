import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { marketData } from '../data/mockData';
import { ArrowLeft, Share2, MapPin, MoreVertical, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShareModal from '../components/ShareModal';

export default function ProductDetail() {
  const { id } = useParams();
  const { goBack, navigate } = useSafeNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Find product in marketData.products
  const product = marketData.products.find(p => p.id === id);

  if (!product) {
    return <div className="p-8 text-center text-gray-500">Product not found</div>;
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "OLAX1S",
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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-white min-h-screen font-sans pb-24"
    >
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center sticky top-0 z-20">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full bg-gray-50 flex items-center justify-center transition">
          <ArrowLeft size={20} className="text-gray-900" />
        </motion.button>
        <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Details</h1>
      </div>

      {/* Main Image View */}
      <div className="w-full relative bg-gray-100 flex justify-center overflow-hidden h-[400px]">
        <img src="https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80" className="object-cover h-full" alt="Olax1s" />
        <div className="absolute inset-x-0 bottom-4 flex justify-center">
            <div className="w-6 h-1 bg-white rounded-full shadow-sm"></div>
        </div>
        <div className="absolute bottom-4 right-4 bg-gray-600/80 text-white text-sm px-3 py-1 rounded font-medium shadow-sm">
          1/1
        </div>
      </div>

      <div className="p-4 bg-white mt-1">
        <h1 className="text-[22px] font-bold text-gray-900 mb-1 leading-tight">OLAX1S</h1>
        <p className="text-[17px] font-medium text-gray-800 mb-4">Ask : ₹60000</p>
        
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1 text-[#4f46e5]" />
              <span className="text-sm font-medium">Bassi</span>
           </div>
           <button onClick={handleShare} className="flex items-center space-x-1.5 text-gray-800 bg-gray-50 px-4 py-2 hover:bg-gray-100 rounded-xl text-sm font-bold transition">
              <Share2 size={16} /> <span>Share</span>
           </button>
        </div>

        <p className="text-[15.5px] text-gray-800 uppercase tracking-wide">OLA ELECTRIC SCOOTER</p>
      </div>

      {/* Ad Section */}
      <div className="p-4 flex items-center bg-white mt-4 border-t border-gray-50 pt-6">
         <div className="w-[120px] h-[180px] bg-gray-100 rounded-xl relative overflow-hidden mr-4 shadow-sm border border-gray-100 flex-shrink-0">
             <img src="https://images.unsplash.com/photo-1627952865913-91cb6f1ac5db?auto=format&fit=crop&q=80" className="w-full h-full object-cover" alt="Facebook Reels" />
             <div className="absolute top-1 left-2 text-[10px] font-bold text-white z-10 drop-shadow-md">Facebook Reels</div>
         </div>
         <div className="flex flex-col flex-1 pl-2">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-3 shadow-[0_4px_10px_rgba(37,99,235,0.2)]">f</div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">Facebook</h3>
            <p className="text-sm text-gray-600 flex items-center font-medium">
                4.1 <span className="text-green-600 mx-1">★</span> <span className="text-[11px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">Google Play</span>
            </p>
         </div>
      </div>

      {/* Bottom Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-20 max-w-md mx-auto shadow-[0_-2px_6px_rgba(0,0,0,0.02)]">
         <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
               <div className="w-11 h-11 bg-[#4f46e5] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-sm shrink-0">R</div>
               <div>
                  <h3 className="font-bold text-[15px] text-gray-900 leading-tight">RAHUL SINGH RANAWAT</h3>
                  <p className="text-xs text-gray-500 font-medium">1 day ago</p>
               </div>
            </div>
            <motion.button 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setShowModal(true)}
              className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-6 py-2.5 rounded-xl font-bold transition shadow-sm"
            >
               Contact
            </motion.button>
         </div>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
         {showModal && (
            <>
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="fixed inset-0 bg-black/40 z-30"
                 onClick={() => setShowModal(false)}
               />
               <motion.div 
                 initial={{ opacity: 0, y: 100 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: 100 }}
                 className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 z-40 max-w-md mx-auto"
               >
                  <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
                  
                  <div className="flex justify-between items-start mb-10">
                     <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#4f46e5] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-sm shrink-0">R</div>
                        <div>
                           <h3 className="font-bold text-[17px] text-gray-900 leading-tight">RAHUL SINGH RANAWAT</h3>
                           <p className="text-sm text-gray-500 font-medium mt-0.5">Usually responds quickly</p>
                        </div>
                     </div>
                     <button onClick={() => setShowModal(false)} className="p-1.5 bg-gray-50 rounded-full text-gray-500">
                        <X size={20} />
                     </button>
                  </div>

                  <div className="space-y-3 pb-4">
                     <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#5C5CFF] text-white py-3.5 rounded-xl font-bold flex items-center justify-center text-lg shadow-sm">
                        <Phone size={20} className="mr-2" /> Call Now
                     </motion.button>
                     <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-[#25D366] text-white py-3.5 rounded-xl font-bold flex items-center justify-center text-lg shadow-sm">
                        
                        <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.487-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>                 
                        WhatsApp
                     </motion.button>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        title="OLAX1S" 
        text="Check out this product on Digital Nimbahera!" 
        url={window.location.href} 
      />
    </motion.div>
  );
}
