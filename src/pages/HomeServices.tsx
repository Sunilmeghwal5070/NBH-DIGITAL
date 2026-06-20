import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Droplets, Hammer, PaintRoller, AirVent, Pipette, Webcam, Sparkles, CarIcon, Truck, 
   Bike, Wrench, Shield, Home, Palette, HardHat, CarFront, Users, Droplet, MonitorIcon, Recycle, Star, Hand, HeartPulse, GraduationCap, Grid, Box } from 'lucide-react';
import { motion } from 'motion/react';

const homeServices = [
  { id: 1, name: 'Electrician', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 2, name: 'Plumber', icon: Droplet, color: 'text-blue-400', bg: 'bg-blue-50' },
  { id: 3, name: 'Carpenter', icon: Hammer, color: 'text-amber-700', bg: 'bg-amber-50' },
  { id: 4, name: 'Painter', icon: PaintRoller, color: 'text-teal-500', bg: 'bg-teal-50' },
  
  { id: 5, name: 'AC Repair', icon: AirVent, color: 'text-indigo-400', bg: 'bg-indigo-50' },
  { id: 6, name: 'RO / Water Purifier Service', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 7, name: 'CCTV Installation', icon: Webcam, color: 'text-slate-600', bg: 'bg-slate-50' },
  { id: 8, name: 'House Cleaning', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-50' },
  
  { id: 9, name: 'Taxi Service', icon: CarIcon, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { id: 10, name: 'Autoriksha w', icon: Truck, color: 'text-green-600', bg: 'bg-green-50' },
  { id: 11, name: 'Pickup', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 12, name: 'Bike Mechanic', icon: Bike, color: 'text-red-500', bg: 'bg-red-50' },
  
  { id: 13, name: 'Car Mechanic', icon: Wrench, color: 'text-blue-700', bg: 'bg-blue-50' },
  { id: 14, name: 'Car Wash', icon: CarFront, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  { id: 15, name: 'Towing Service', icon: Truck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 16, name: 'Driver on Call', icon: Users, color: 'text-teal-600', bg: 'bg-teal-50' },
  
  { id: 17, name: 'Internet & D2H', icon: MonitorIcon, color: 'text-gray-600', bg: 'bg-gray-50' },
  { id: 18, name: 'Scrap', icon: Recycle, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 19, name: 'Event Planners', icon: Star, color: 'text-orange-400', bg: 'bg-orange-50' },
  { id: 20, name: 'Mehendi Artist', icon: Hand, color: 'text-rose-500', bg: 'bg-rose-50' },
  
  { id: 21, name: 'Nursing Staff', icon: HeartPulse, color: 'text-red-400', bg: 'bg-red-50' },
  { id: 22, name: 'Home Tutors', icon: GraduationCap, color: 'text-orange-500', bg: 'bg-orange-50' },
  { id: 23, name: 'Interior designers', icon: Grid, color: 'text-yellow-400', bg: 'bg-yellow-50' },
  { id: 24, name: 'Contractors', icon: HardHat, color: 'text-amber-500', bg: 'bg-amber-50' },
  
  { id: 25, name: 'Tiffin Service', icon: Box, color: 'text-orange-600', bg: 'bg-orange-50' }
];

export default function HomeServices() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col bg-white min-h-screen font-sans pb-24"
    >
      <div className="px-4 py-4 flex items-center justify-between sticky top-0 z-20 bg-white border-b border-gray-100">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={24} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Home Services</h1>
         <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Banner */}
        <div className="bg-[#111827] rounded-3xl p-6 relative overflow-hidden text-white flex justify-between items-center shadow-md">
           <div className="max-w-[180px] z-10">
              <h2 className="text-xl font-bold leading-tight mb-2">Are you a service provider?</h2>
              <p className="text-xs text-gray-400 font-medium leading-relaxed">List your business and reach nearby customers.</p>
           </div>
           <button className="bg-[#10b981] hover:bg-[#059669] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition shadow-sm z-10">
              Get Listed
           </button>
           <div className="absolute top-[-50px] right-[-20px] w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>

        {/* Grid Categories */}
        <div className="grid grid-cols-4 gap-y-6 gap-x-2">
           {homeServices.map((service, i) => {
              const Icon = service.icon;
              return (
                 <motion.div 
                   whileTap={{ scale: 0.9 }}
                   key={service.id} 
                   className="flex flex-col items-center cursor-pointer group"
                 >
                    <div className={`w-12 h-12 rounded-full ${service.bg} flex justify-center items-center mb-2 shadow-sm border border-gray-100 group-hover:shadow-md transition-all`}>
                       <Icon size={22} className={service.color} strokeWidth={2} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-800 text-center leading-tight mx-auto px-1 w-full overflow-hidden text-ellipsis line-clamp-2" style={{wordBreak: "break-word"}}>{service.name}</p>
                 </motion.div>
              )
           })}
        </div>

      </div>
    </motion.div>
  );
}
