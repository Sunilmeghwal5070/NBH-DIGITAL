import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreVertical, X } from 'lucide-react';
import { motion } from 'motion/react';

export default function PositiveUpdates() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 pt-6 pb-2 sticky top-0 z-20">
         <div className="flex justify-between items-center mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Positive Updates</h1>
            <button onClick={() => navigate('/positive-updates/share')} className="bg-[#4f46e5] text-white px-5 py-1.5 rounded-full font-bold text-sm">Post</button>
         </div>
         <p className="text-gray-500 text-sm">Good things happening around your city</p>
      </div>

      <div className="p-4 space-y-6">
         {/* Item 1 */}
         <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
            <div className="min-w-[280px] bg-white rounded-2xl overflow-hidden">
               <div className="h-48 relative rounded-2xl overflow-hidden mb-3">
                  <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-[#10b981] text-white text-xs font-bold px-3 py-1.5 rounded-full">Positive</div>
               </div>
               <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3">Park Inauguration and foundation event</h3>
               <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-200">
                     <img src="https://ui-avatars.com/api/?name=Harsh&background=random" className="w-full h-full" />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-gray-900 leading-none">harsh menaria</p>
                     <p className="text-xs text-gray-500 mt-1">Shared a positive update</p>
                  </div>
               </div>
            </div>

            <div className="min-w-[280px] bg-white rounded-2xl overflow-hidden">
               <div className="h-48 relative rounded-2xl overflow-hidden mb-3">
                  <img src="https://images.unsplash.com/photo-1519331582079-052b618eb1a6?auto=format&fit=crop&q=80&w=400&h=300" className="w-full h-full object-cover" />
                  <div className="absolute bottom-3 left-3 bg-[#10b981] text-white text-xs font-bold px-3 py-1.5 rounded-full">Positive</div>
               </div>
               <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3">Beautiful park...</h3>
               <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-gray-200">
                     <img src="https://ui-avatars.com/api/?name=Harsh&background=random" className="w-full h-full" />
                  </div>
                  <div>
                     <p className="text-sm font-bold text-gray-900 leading-none">harsh m...</p>
                     <p className="text-xs text-gray-500 mt-1">Shared a p...</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
      
      {/* Bottom Nav padding */}
      <div className="h-20"></div>
    </motion.div>
  );
}
