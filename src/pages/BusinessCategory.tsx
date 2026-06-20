import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { businesses, businessCategories } from '../data/mockData';
import { ArrowLeft, Star, MapPin, Zap, Droplets, Hammer, PaintRoller, Waves, Video, Car, Bus, Truck, Wrench, Sparkles, PhoneCall, Globe, Recycle, PartyPopper, HandHeart, Stethoscope, BookOpen, PenTool, HardHat, ChefHat } from 'lucide-react';
import { motion } from 'motion/react';

const homeServicesList = [
  { id: 'electrician', name: 'Electrician', icon: Zap, color: 'text-yellow-500' },
  { id: 'plumber', name: 'Plumber', icon: Droplets, color: 'text-blue-500' },
  { id: 'carpenter', name: 'Carpenter', icon: Hammer, color: 'text-orange-600' },
  { id: 'painter', name: 'Painter', icon: PaintRoller, color: 'text-indigo-500' },
  { id: 'ac_repair', name: 'AC Repair', icon: Waves, color: 'text-cyan-500' },
  { id: 'ro_water', name: 'RO / Water Purifier', icon: Droplets, color: 'text-blue-400' },
  { id: 'cctv', name: 'CCTV Installation', icon: Video, color: 'text-gray-600' },
  { id: 'cleaning', name: 'House Cleaning', icon: Sparkles, color: 'text-emerald-500' },
  { id: 'taxi', name: 'Taxi Service', icon: Car, color: 'text-yellow-500' },
  { id: 'auto', name: 'Autorikshaw', icon: Bus, color: 'text-green-500' },
  { id: 'pickup', name: 'Pickup', icon: Truck, color: 'text-blue-600' },
  { id: 'bike_mechanic', name: 'Bike Mechanic', icon: Wrench, color: 'text-red-500' },
  { id: 'car_mechanic', name: 'Car Mechanic', icon: Wrench, color: 'text-blue-700' },
  { id: 'car_wash', name: 'Car Wash', icon: Sparkles, color: 'text-cyan-400' },
  { id: 'towing', name: 'Towing Service', icon: Truck, color: 'text-indigo-500' },
  { id: 'driver', name: 'Driver on Call', icon: PhoneCall, color: 'text-teal-500' },
  { id: 'internet', name: 'Internet & D2H', icon: Globe, color: 'text-sky-500' },
  { id: 'scrap', name: 'Scrap', icon: Recycle, color: 'text-emerald-600' },
  { id: 'event', name: 'Event Planners', icon: PartyPopper, color: 'text-pink-500' },
  { id: 'mehendi', name: 'Mehendi Artist', icon: HandHeart, color: 'text-purple-500' },
  { id: 'nursing', name: 'Nursing Staff', icon: Stethoscope, color: 'text-rose-500' },
  { id: 'tutors', name: 'Home Tutors', icon: BookOpen, color: 'text-indigo-500' },
  { id: 'interior', name: 'Interior designers', icon: PenTool, color: 'text-orange-500' },
  { id: 'contractors', name: 'Contractors', icon: HardHat, color: 'text-yellow-600' },
  { id: 'tiffin', name: 'Tiffin Service', icon: ChefHat, color: 'text-orange-600' },
];

export default function BusinessCategory() {
  const { id } = useParams();
  const { goBack, navigate } = useSafeNavigate();
  const [nearbyFilter, setNearbyFilter] = useState(false);

  const category = businessCategories.find(c => c.id === id);
  const items = businesses[id as keyof typeof businesses] || [];

  if (id === 'home-services') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans pb-24"
      >
        {/* Header */}
        <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 justify-between shadow-sm">
           <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
              <ArrowLeft size={24} className="text-gray-800" />
           </motion.button>
           <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Home Services</h1>
           <div className="w-10"></div> {/* Spacer */}
        </div>

        <div className="p-4 space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-md relative overflow-hidden flex justify-between items-center"
           >
              <div className="absolute left-[-10%] top-[-50%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 w-2/3 pr-4">
                <h2 className="text-xl font-bold mb-1 text-white leading-tight">Are you a service provider?</h2>
                <p className="text-sm text-blue-100 mb-0 leading-snug">List your business and reach nearby customers.</p>
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/business/register')} className="bg-white text-blue-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors z-10 whitespace-nowrap">Get Listed</motion.button>
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="grid grid-cols-4 gap-y-6 gap-x-2 bg-white p-4 rounded-2xl shadow-sm border border-gray-100"
           >
              {homeServicesList.map((service, i) => (
                 <motion.div 
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    key={service.id} 
                    className="flex flex-col items-center cursor-pointer group px-1" 
                    onClick={() => navigate(`/business/category/electrician`)}
                 >
                    <div className="w-12 h-12 mb-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                       <service.icon size={24} className={service.color} strokeWidth={2}/>
                    </div>
                    <span className="text-[10px] font-semibold text-gray-700 text-center leading-tight">
                       {service.name}
                    </span>
                 </motion.div>
              ))}
           </motion.div>
        </div>
      </motion.div>
    );
  }

  // STANDARD CATEGORY LAYOUT
  const isElectrician = id === 'electrician';
  let displayItems: any[] = isElectrician ? [
    { id: 1, name: 'Mithu Lal', location: 'Electrician', rating: 5.0, reviews: 1, verified: true, isPerson: true, avatar: 'M', distance: 1.5 },
    { id: 2, name: 'Gourav Pandit', location: 'Electrician', rating: 5.0, reviews: 2, verified: true, isPerson: true, avatar: 'G', distance: 3.2 },
    { id: 3, name: 'Mateshwari electrical', location: 'Electrician', rating: 5.0, reviews: 2, verified: true, isPerson: false, image: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=400', distance: 0.8 },
    { id: 4, name: 'Sunil Soni', location: 'Electrician', rating: 0, reviews: 0, verified: false, isPerson: true, avatar: 'S', distance: 5.4 },
  ] : items;

  if (nearbyFilter) {
    displayItems = [...displayItems].sort((a: any, b: any) => (a.distance || 0) - (b.distance || 0));
  } else {
    displayItems = [...displayItems].sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));
  }

  return (
    <motion.div 
       initial={{ opacity: 0, x: 20 }}
       animate={{ opacity: 1, x: 0 }}
       exit={{ opacity: 0, x: -20 }}
       className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans pb-24"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 justify-between shadow-sm">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={24} className="text-gray-800" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900 text-center flex-grow capitalize">{isElectrician ? 'Electrician' : category?.name || "Category"}</h1>
         <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="p-4 mt-2">
        {!isElectrician && (
            <motion.div 
               initial={{ opacity: 0, y: -10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex bg-white rounded-xl mb-6 shadow-sm border border-gray-100 overflow-hidden p-1"
            >
               <motion.button 
                 onClick={() => setNearbyFilter(false)} 
                 whileTap={{ scale: 0.98 }} 
                 className={`flex-1 rounded-lg py-2 font-bold text-xs flex items-center justify-center ${!nearbyFilter ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
               >
                 <Star size={14} className={`${!nearbyFilter ? 'text-blue-500' : 'text-gray-400'} mr-2`} fill="currentColor" /> Top Rated
               </motion.button>
               <motion.button 
                 onClick={() => setNearbyFilter(true)} 
                 whileTap={{ scale: 0.98 }} 
                 className={`flex-1 rounded-lg py-2 font-semibold text-xs flex items-center justify-center transition-colors ${nearbyFilter ? 'bg-orange-50 text-orange-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
               >
                 <MapPin size={14} className={`${nearbyFilter ? 'text-orange-500' : 'text-gray-400'} mr-2`} fill="currentColor" /> Nearby
               </motion.button>
            </motion.div>
        )}

        {/* List */}
        <div className="space-y-4">
           {displayItems.length > 0 ? displayItems.map((biz: any, i) => (
               <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.05 }}
                   viewport={{ once: true }}
                   whileTap={{ scale: 0.98 }}
                   key={biz.id} 
                   className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex hover:border-blue-200 transition-colors cursor-pointer group" 
                   onClick={() => navigate(`/product/${biz.id}`)}
               >
                   <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 mr-4 bg-gray-50 flex items-center justify-center border border-gray-100">
                      {biz.isPerson ? (
                          <div className="w-full h-full bg-blue-50 flex items-end justify-center pt-2">
                             <div className="w-12 h-12 bg-blue-500 rounded-t-full relative border-2 border-white flex justify-center">
                               <div className="absolute -top-3 w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center font-bold text-xs text-blue-700 shadow-sm">
                                 {biz.avatar}
                               </div>
                               <Zap size={10} className="text-white mt-1" />
                             </div>
                          </div>
                      ) : (
                          <img src={biz.image || "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                   </div>
                   <div className="flex flex-col justify-center flex-grow">
                      <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">{biz.name}</h3>
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-widest leading-tight mb-2">{biz.location} {biz.distance && `• ${biz.distance} km`}</p>
                      <div className="flex items-center space-x-3">
                        {biz.rating > 0 ? (
                           <div className="flex items-center text-gray-900 font-bold text-sm">
                              <span className="flex text-amber-400 mr-1.5 align-middle">
                                 <Star size={14} fill="currentColor" />
                              </span>
                              {biz.rating.toFixed(1)} <span className="text-gray-400 font-medium ml-1 text-xs">({biz.reviews})</span>
                           </div>
                        ) : (
                           <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider bg-gray-50 px-2 py-0.5 rounded">
                              Not rated yet
                           </div>
                        )}
                        
                        {biz.verified && (
                            <div className="flex items-center text-[10px] font-bold text-green-700 uppercase tracking-widest">
                                <div className="bg-green-100 rounded-full p-0.5 mr-1">
                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                </div>
                                Verified
                            </div>
                        )}
                      </div>
                   </div>
               </motion.div>
           )) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-2 border-dashed border-gray-200 rounded-2xl py-12 text-center text-gray-400 font-medium text-sm mt-8">
                 No listings yet.
              </motion.div>
           )}
        </div>
      </div>
    </motion.div>
  );
}
