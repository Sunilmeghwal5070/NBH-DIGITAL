import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Plus } from 'lucide-react';
import { motion } from 'motion/react';

const events = [
  {
    id: 1,
    status: 'UPCOMING',
    title: 'Chittorgarh District open Badminton championships 2...',
    date: '22 Jun - 25 Jun',
    location: 'District club chittorgarh',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&q=80',
  },
  {
    id: 2,
    status: 'UPCOMING',
    title: 'KEYCHAIN MAKING WORKSHOP',
    date: '20 Jun - 20 Jun',
    location: 'HOTEL PADMINI',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&q=80',
  },
  {
    id: 3,
    status: 'COMPLETED',
    title: 'PAINTING WORKSHOP',
    date: '18 Jun - 18 Jun',
    location: 'Rawal kothi Chittorgarh fo...',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
  }
];

export default function EventsPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col bg-white min-h-screen font-sans pb-24"
    >
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-20">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 bg-gray-50 rounded-full hover:bg-gray-100 transition">
          <ArrowLeft size={24} className="text-gray-900" />
        </motion.button>
        <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Events</h1>
      </div>

      <div className="p-4 space-y-4">
        {events.map((evt) => (
          <motion.div 
            whileTap={{ scale: 0.98 }}
            key={evt.id} 
            onClick={() => navigate(`/event/${evt.id}`)}
            className="w-full relative rounded-[2rem] overflow-hidden aspect-[4/3] cursor-pointer shadow-sm border border-gray-100 group"
          >
            <img src={evt.image} alt={evt.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10"></div>
            
            <div className="absolute top-4 left-4 z-10">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${evt.status === 'UPCOMING' ? 'bg-[#4f46e5] text-white' : 'bg-gray-500/80 text-white backdrop-blur-sm'}`}>
                {evt.status}
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
              <h2 className="text-white text-xl font-bold leading-tight mb-3 drop-shadow-md">
                {evt.title}
              </h2>
              <div className="space-y-1.5">
                 <div className="flex items-center text-gray-200 text-sm font-medium">
                   <Clock size={16} className="text-[#6366f1] mr-2" />
                   {evt.date}
                 </div>
                 <div className="flex items-center text-gray-200 text-sm font-medium truncate">
                   <MapPin size={16} className="text-[#6366f1] mr-2 shrink-0" />
                   <span className="truncate">{evt.location}</span>
                 </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="fixed bottom-6 right-4 z-20">
         <Link to="/events/request">
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.9 }}
             className="bg-[#4f46e5] text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center space-x-2"
           >
             <Plus size={20} />
             <span>List Your Event</span>
           </motion.button>
         </Link>
      </div>

    </motion.div>
  );
}
