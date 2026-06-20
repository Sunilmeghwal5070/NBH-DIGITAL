import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, MapPin, Camera, Mic, MapPinned } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ReportIssue() {
  const { goBack, navigate } = useSafeNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [locationText, setLocationText] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const categories = ['Road', 'Water', 'Electricity', 'Garbage', 'Safety', 'Other'];

  const getLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app we'd reverse-geocode this. Let's just set coordinates for now.
          setLocationText(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
          setIsLocating(false);
        },
        (error) => {
          console.error("Error obtaining location", error);
          alert("Could not get location. Please allow location permissions.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLocating(false);
    }
  };

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      if (images.length < 3) {
        setImages([...images, imgUrl]);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-2xl font-bold text-gray-900">Report Civic Issue</h1>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft size={24} className="text-gray-900 rotate-180" />
        </motion.button>
      </div>
      <div className="px-4 text-sm text-gray-500 mb-4 -mt-2">Help improve your city</div>

      <div className="p-4 space-y-5 pb-24">
        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Photos ({images.length}/3) *</label>
           <div className="flex gap-2 overflow-x-auto pb-2">
             <AnimatePresence>
               {images.map((img, i) => (
                 <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} key={i} className="w-24 h-24 flex-shrink-0 relative rounded-2xl overflow-hidden border border-gray-100">
                    <img src={img} alt="captured" className="w-full h-full object-cover" />
                 </motion.div>
               ))}
             </AnimatePresence>
             {images.length < 3 && (
               <button onClick={() => fileInputRef.current?.click()} className="w-24 h-24 flex-shrink-0 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-[#4f46e5] bg-blue-50/50 hover:bg-blue-50 transition">
                 <Camera size={24} className="mb-1" />
                 <span className="text-[10px] font-bold">Add Photo</span>
               </button>
             )}
             <input type="file" accept="image/*" capture="environment" className="hidden" ref={fileInputRef} onChange={handleImageCapture} />
           </div>
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Category *</label>
           <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                 <button 
                   key={cat}
                   onClick={() => setSelectedCategory(cat)}
                   className={`px-4 py-2 border rounded-full text-sm font-medium transition ${selectedCategory === cat ? 'bg-gray-900 text-white border-gray-900' : 'bg-white border-gray-200 text-gray-800'}`}
                 >
                   {cat}
                 </button>
              ))}
           </div>
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Title *</label>
           <input type="text" placeholder="Example: Pothole near bus stand" className="w-full bg-gray-50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:bg-white border border-transparent focus:border-[#4f46e5]/20 transition" />
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Description *</label>
           <div className="relative">
             <textarea rows={4} placeholder="Describe the issue clearly" className="w-full bg-gray-50 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:bg-white border border-transparent focus:border-[#4f46e5]/20 transition"></textarea>
             <button className="absolute bottom-3 right-3 p-1.5 bg-white shadow-sm rounded-lg text-gray-500 hover:text-[#4f46e5] transition">
                <Mic size={18} />
             </button>
           </div>
           <div className="text-right text-xs text-gray-400 mt-1">0/400</div>
        </div>

        <div>
           <label className="font-bold text-gray-900 mb-2 block text-sm">Location *</label>
           <div className="relative">
             <input value={locationText} onChange={(e) => setLocationText(e.target.value)} type="text" placeholder="Area / Landmark" className="w-full bg-gray-50 rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#4f46e5]/20 focus:bg-white border border-transparent focus:border-[#4f46e5]/20 transition" />
             <button onClick={getLocation} className={`absolute right-2 top-2 p-2 rounded-lg transition ${isLocating ? 'text-[#4f46e5] animate-pulse' : 'text-gray-400 hover:text-[#4f46e5] bg-white shadow-sm'}`}>
               <MapPinned size={18} />
             </button>
           </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-safe z-30 max-w-md mx-auto">
         <motion.button onClick={() => { alert('In full version, this will submit the image and location to the database.'); navigate('/home'); }} whileTap={{ scale: 0.98 }} className="w-full bg-[#4f46e5] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#4f46e5]/25">
            Submit Issue
         </motion.button>
      </div>
    </motion.div>
  );
}
