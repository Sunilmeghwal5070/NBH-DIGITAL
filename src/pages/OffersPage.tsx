import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Flame, Search } from 'lucide-react';
import { motion } from 'motion/react';

const categories = ['All', 'Shopping', 'Food', 'Salon', 'Gym', 'Other'];

const offersData = [
  {
    id: '1',
    title: '20% off On First Purchase',
    business: 'Pareek Sarees',
    category: 'Shopping',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d61180' // just a placeholder
  },
  {
    id: '2',
    title: 'AC OFFER',
    business: 'VOLTAS',
    category: 'Shopping',
    image: 'https://images.unsplash.com/photo-1541336032412-2048f7663d21' // placeholder
  },
  {
    id: '3',
    title: 'Vivah package available contact f...',
    business: 'Paras furniture',
    category: 'Shopping',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc' // placeholder
  },
  {
    id: '4',
    title: 'Food Prices Slashed Upto 40%',
    business: 'Rawal Kothi',
    category: 'Food',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4' // placeholder
  }
];

export default function OffersPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredOffers = selectedCategory === 'All' 
    ? offersData 
    : offersData.filter(o => o.category === selectedCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-gray-50 min-h-screen pb-20 font-sans"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white shadow-sm sticky top-0 z-10 border-b border-gray-100 justify-between">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 flex-shrink-0 transition">
            <ArrowLeft size={24} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Deals & Offers</h1>
         <Link to="/search" className="p-2 -mr-2 rounded-full hover:bg-gray-100 flex-shrink-0 transition">
            <Search size={24} className="text-gray-900" />
         </Link>
      </div>

      <div className="p-4 mt-2">
        {/* Banner */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 mb-6 flex justify-between items-center"
        >
           <div>
             <h2 className="text-lg font-bold text-gray-900 mb-1">Promote Your Business</h2>
             <p className="text-gray-500 text-sm max-w-[200px] leading-relaxed font-medium">Reach more local customers by publishing your own offers and deals.</p>
           </div>
           <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={() => navigate('/offers/create')}
             className="bg-blue-600 text-white font-bold py-2.5 px-5 rounded-xl shadow-sm hover:bg-blue-700 transition flex-shrink-0"
           >
             Create
           </motion.button>
        </motion.div>

        {/* Categories */}
        <div className="flex overflow-x-auto hide-scrollbar mb-4 pb-2 border-b border-gray-200 space-x-6">
          {categories.map((cat, i) => (
             <motion.button 
               whileTap={{ scale: 0.95 }}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.05 }}
               key={cat}
               onClick={() => setSelectedCategory(cat)}
               className={`font-bold pb-3 border-b-2 whitespace-nowrap transition-colors relative ${selectedCategory === cat ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
             >
               {cat}
               {selectedCategory === cat && (
                  <motion.div layoutId="offers-category" className="absolute bottom-[-2px] left-0 right-0 h-0.5 bg-blue-600" />
               )}
             </motion.button>
          ))}
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4">
           {filteredOffers.map((offer, i) => (
              <motion.div 
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.05 }}
                 whileTap={{ scale: 0.98 }}
                 key={offer.id} 
                 className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer hover:shadow-md transition group"
              >
                 <div className="h-36 w-full relative bg-gray-100 overflow-hidden">
                    <img src={offer.image + "?auto=format&fit=crop&q=80&w=300&h=200"} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center">
                       <Flame size={12} className="mr-1 text-yellow-300" fill="currentColor" /> OFFER
                    </div>
                 </div>
                 <div className="p-3">
                    <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 min-h-[40px]">{offer.title}</h3>
                    <p className="text-gray-500 font-medium text-[11px]">{offer.business}</p>
                 </div>
              </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
