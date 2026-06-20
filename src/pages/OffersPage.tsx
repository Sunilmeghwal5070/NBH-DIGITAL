import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Flame, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

const categories = ['All', 'Shopping', 'Food', 'Salon', 'Gym', 'Other'];

export default function OffersPage() {
  const { goBack, navigate } = useSafeNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [offersData, setOffersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'offers'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbOffers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOffersData(dbOffers);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 flex-shrink-0 transition">
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
        <AnimatePresence>
          {loading ? (
             <div className="flex justify-center p-12"><div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div></div>
          ) : filteredOffers.length === 0 ? (
             <div className="text-center p-12 bg-white rounded-3xl border border-gray-100">
               <p className="text-gray-500 font-medium">No offers found.</p>
             </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 mt-4">
               {filteredOffers.map((offer, i) => (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: (i % 4) * 0.05 }}
                     whileTap={{ scale: 0.98 }}
                     key={offer.id} 
                     className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col cursor-pointer hover:shadow-md transition group"
                  >
                     <div className="h-36 w-full relative bg-gray-100 overflow-hidden flex items-center justify-center">
                        {offer.images && offer.images.length > 0 ? (
                           <img src={offer.images[0]} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : offer.image ? (
                           <img src={offer.image} alt={offer.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                           <Flame size={32} className="text-gray-300" />
                        )}
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center">
                           <Flame size={12} className="mr-1 text-yellow-300" fill="currentColor" /> OFFER
                        </div>
                     </div>
                     <div className="p-3">
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-2 min-h-[40px]">{offer.title}</h3>
                        <p className="text-gray-500 font-medium text-[11px]">{offer.business || offer.company || 'Local Business'}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
