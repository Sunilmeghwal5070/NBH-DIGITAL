import { Link, useNavigate } from 'react-router-dom';
import { Play, ExternalLink, ArrowLeft, MoreVertical, Star, Edit } from 'lucide-react';
import { motion } from 'motion/react';

const newsItems = [
  {
    id: 1,
    source: 'First India',
    time: '1 day ago',
    title: 'Chittorgarh । हल्दीघाटी से फिर उठा राष्ट्र गौरव का संदेश, मेवाड़ में गूंजा महाराणा प्रताप का गौरवगान...',
    image: 'https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?auto=format&fit=crop&q=80',
    isVideo: true
  },
  {
    id: 2,
    source: 'First India',
    time: '1 day ago',
    title: 'Chittorgarh । चित्तौड़गढ़ में शहरी और ग्रामीण सेवा शिविरों को मिल रहा बड़ा प्रतिसाद, आमजन ...',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&q=80',
    isVideo: true
  },
  {
    id: 3,
    source: 'First India',
    time: '1 day ago',
    title: 'Chittorgarh । महाराणा प्रताप जयंती पर भूपालसागर में \'एक शाम महाराणा प्रताप के नाम\' ...',
    image: 'https://images.unsplash.com/photo-1605389647247-fa2f27dd9177?auto=format&fit=crop&q=80',
    isVideo: true
  },
  {
    id: 4,
    source: 'Zee Rajasthan',
    time: '1 day ago',
    title: '*#Chittorgarh : होलसेल सब्जी मंडी में लगी भीषण आग*',
    image: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80',
    isVideo: true
  },
  {
    id: 5,
    source: 'Facebook',
    isAd: true,
    title: 'Facebook',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80',
    stars: 4.1
  }
];

export default function UpdatesPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans pb-24"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 justify-between border-b border-gray-100 shadow-sm">
         <div className="flex items-center space-x-2">
           <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition lg:hidden">
              <ArrowLeft size={24} className="text-gray-800" />
           </motion.button>
           <div>
             <h1 className="text-xl font-bold leading-tight text-gray-900">City Updates</h1>
             <p className="text-[12px] font-medium text-gray-500 mt-0.5">Stay informed with the latest updates</p>
           </div>
         </div>
         <motion.button whileTap={{ scale: 0.9 }} className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition">
            <Edit size={22} className="text-gray-800" />
         </motion.button>
      </div>

      <div className="p-4 space-y-5">
        {newsItems.map((item, i) => (
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              key={item.id} 
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
           >
              
              {item.isAd ? (
                 <div className="flex flex-col space-y-4 p-5">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                       <div className="flex space-x-4 items-center">
                          <img src={item.image} className="w-12 h-12 object-cover rounded-xl shadow-sm bg-gray-100" />
                          <div>
                            <h4 className="font-bold text-base text-gray-900 leading-tight mb-1">{item.title}</h4>
                            <div className="flex items-center text-xs font-medium text-gray-600">
                              <span className="flex items-center text-orange-500 mr-2">{item.stars} <Star size={12} fill="currentColor" className="ml-1" /></span>
                              Google Play
                            </div>
                          </div>
                       </div>
                       <motion.button whileTap={{ scale: 0.9 }} className="p-2 -mr-2 rounded-full hover:bg-gray-100">
                          <MoreVertical size={20} className="text-gray-400" />
                       </motion.button>
                    </div>
                    <motion.button whileTap={{ scale: 0.98 }} className="bg-[#1877F2] text-white font-bold py-3.5 px-4 rounded-xl text-sm hover:bg-blue-600 shadow-sm transition-colors w-full text-center">
                        Open
                    </motion.button>
                 </div>
              ) : (
                 <>
                    <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100">
                       <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-full flex justify-center items-center overflow-hidden">
                             <img src={`https://ui-avatars.com/api/?name=${item.source}&background=random`} className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <p className="text-sm font-bold text-gray-900">{item.source}</p>
                             <p className="text-[10px] font-medium text-gray-500">{item.time}</p>
                          </div>
                       </div>
                       <motion.button whileTap={{ scale: 0.9 }} className="p-2 -mr-2 rounded-full hover:bg-gray-100">
                          <ExternalLink size={18} className="text-gray-400" />
                       </motion.button>
                    </div>
                    <Link to="/news/1" className="relative w-full aspect-video bg-gray-100 block">
                       <img src={item.image} className="w-full h-full object-cover" />
                       {item.isVideo && (
                          <div className="absolute inset-0 flex items-center justify-center">
                             <motion.div whileTap={{ scale: 0.9 }} className="bg-black/40 backdrop-blur-md p-4 rounded-full hover:bg-black/50 transition-colors cursor-pointer shadow-lg">
                                <Play size={24} className="text-white ml-1" fill="white" />
                             </motion.div>
                          </div>
                       )}
                    </Link>
                    <Link to="/news/1" className="p-5 bg-white block hover:bg-gray-50 transition">
                       <h3 className="font-bold text-base text-gray-900 leading-snug">{item.title}</h3>
                    </Link>
                 </>
              )}
           </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
