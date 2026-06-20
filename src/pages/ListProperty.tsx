import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, MapPin, Video, Home as HomeIcon, Maximize, Compass, Map, Sofa } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { motion } from 'motion/react';

export default function ListProperty() {
  const { goBack, navigate } = useSafeNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col bg-white min-h-screen text-gray-900 font-sans"
    >
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full transition">
            <X size={26} className="text-gray-900" />
         </motion.button>
         <h1 className="text-[22px] font-bold text-gray-900 ml-4">List Property</h1>
      </div>

      <div className="p-4 overflow-y-auto pb-24 space-y-6">
         
         <div>
            <label className="block text-base font-bold text-gray-900 mb-2">Property Title *</label>
            <input 
              type="text" 
              placeholder="e.g. 2 BHK Flat for Rent"
              className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] transition-colors text-base"
            />
         </div>

         <div>
            <label className="block text-base font-bold text-gray-900 mb-2">Area / Locality *</label>
            <input 
              type="text" 
              placeholder="Area / Locality"
              className="w-full bg-gray-50/80 border border-gray-100 rounded-t-2xl rounded-b-md px-4 py-4 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] text-base"
            />
            <button className="w-full bg-gray-50/80 mt-1.5 border border-gray-100 rounded-b-2xl rounded-t-md px-4 py-3 flex items-center justify-center font-medium">
               <span className="text-red-500 mr-2 text-xl tracking-tight leading-none">📍</span> Detect Property Location
            </button>
         </div>

         <div>
            <label className="block text-base font-bold text-gray-900 mb-2">Price *</label>
            <input 
              type="text" 
              placeholder="₹ 33 L OR ₹ 1.2 Cr"
              className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] text-base"
            />
         </div>

         <div>
            <label className="block text-base font-bold text-gray-900 mb-2">Contact Number *</label>
            <input 
              type="tel" 
              defaultValue="6367512667"
              className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] text-base"
            />
         </div>

         <div>
            <label className="block text-base font-bold text-gray-900 mb-2">Listing Type</label>
            <div className="flex space-x-3">
               <button className="bg-gray-50 px-6 py-2.5 rounded-xl font-bold uppercase text-sm border border-gray-100">RENT</button>
               <button className="bg-[#4f46e5] text-white px-6 py-2.5 rounded-xl font-bold uppercase text-sm">SALE</button>
               <button className="bg-gray-50 px-6 py-2.5 rounded-xl font-bold uppercase text-sm border border-gray-100">LEASE</button>
            </div>
         </div>

         <div className="space-y-3">
            <label className="block text-base font-bold text-gray-900">Property Highlights</label>
            
            <div className="relative flex items-center">
               <span className="absolute left-4 text-xl">🏠</span>
               <input type="text" placeholder="e.g. 2 BHK" className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none text-base" />
            </div>

            <div className="relative flex items-center">
               <span className="absolute left-4 text-xl">📐</span>
               <input type="text" placeholder="e.g. 1200 sqft" className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none text-base" />
            </div>
            
            <div className="flex space-x-3 overflow-x-auto pb-1 hide-scrollbar">
               <button className="bg-gray-50 px-4 py-2.5 rounded-xl font-medium text-sm flex items-center whitespace-nowrap border border-gray-100"><span className="mr-2">🛋️</span> Unfurnished</button>
               <button className="bg-gray-50 px-4 py-2.5 rounded-xl font-medium text-sm flex items-center whitespace-nowrap border border-gray-100"><span className="mr-2">🛋️</span> Semi Furnished</button>
            </div>
            
            <div className="flex space-x-3 overflow-x-auto pb-1 hide-scrollbar">
               <button className="bg-gray-50 px-4 py-2.5 rounded-xl font-medium text-sm flex items-center whitespace-nowrap border border-gray-100"><span className="mr-2">🧭</span> East</button>
               <button className="bg-gray-50 px-4 py-2.5 rounded-xl font-medium text-sm flex items-center whitespace-nowrap border border-gray-100"><span className="mr-2">🧭</span> West</button>
               <button className="bg-gray-50 px-4 py-2.5 rounded-xl font-medium text-sm flex items-center whitespace-nowrap border border-gray-100"><span className="mr-2">🧭</span> North</button>
               <button className="bg-gray-50 px-4 py-2.5 rounded-xl font-medium text-sm flex items-center whitespace-nowrap border border-gray-100"><span className="mr-2">🧭</span> South</button>
            </div>

            <div className="relative flex items-center">
               <span className="absolute left-4 text-xl">🛣️</span>
               <input type="text" placeholder="Road Size  e.g. 30 ft road" className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none text-base" />
            </div>
         </div>

         <div>
            <label className="block text-base font-bold text-gray-900 mb-2">Description</label>
            <textarea 
              placeholder="Describe your property"
              rows={4}
              className="w-full bg-gray-50/80 border border-gray-100 rounded-2xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-[#4f46e5] resize-none text-base"
            />
         </div>

         <div>
            <label className="block text-base font-bold text-gray-900 mb-2">Property Images</label>
            <motion.div whileTap={{ scale: 0.95 }} className="w-24 h-24 bg-gray-50/80 border border-gray-200 rounded-[20px] flex items-center justify-center cursor-pointer transition-colors">
               <Plus size={32} className="text-gray-900" strokeWidth={1} />
            </motion.div>
         </div>

         <div>
            <label className="block text-base font-bold text-gray-900 mb-2">Property Video (Optional)</label>
            <motion.div whileTap={{ scale: 0.95 }} className="w-24 h-24 bg-gray-50/80 border border-gray-200 rounded-[20px] flex items-center justify-center cursor-pointer transition-colors">
               <Video size={36} className="text-gray-500" strokeWidth={1.5} />
            </motion.div>
         </div>

      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-20 max-w-md mx-auto">
         <motion.button 
           whileTap={{ scale: 0.98 }}
           className="w-full bg-[#4f46e5] text-white font-bold py-3.5 rounded-xl text-[17px] shadow-sm transition-all"
         >
            Submit Property
         </motion.button>
      </div>

    </motion.div>
  );
}
