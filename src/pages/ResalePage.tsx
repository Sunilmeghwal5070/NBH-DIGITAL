import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, Smartphone, Sofa, Car, Bike, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

const categories = [
  { id: 'mobiles', label: 'Mobiles', icon: Smartphone, color: 'text-blue-500' },
  { id: 'furniture', label: 'Furniture', icon: Sofa, color: 'text-orange-500' },
  { id: 'cars', label: 'Cars', icon: Car, color: 'text-red-500' },
  { id: 'bikes', label: 'Bikes', icon: Bike, color: 'text-green-500' }
];

export default function ResalePage() {
  const { goBack, navigate } = useSafeNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'resale') /*, orderBy('createdAt', 'desc')*/);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(dbItems);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans pb-24"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 justify-between shadow-sm">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={24} className="text-gray-800" />
         </motion.button>
         <h1 className="text-xl font-bold absolute left-1/2 -translate-x-1/2">Resale</h1>
         <Link to="/search" className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition inline-block">
            <Search size={24} className="text-gray-800" strokeWidth={2} />
         </Link>
      </div>

      <div className="p-4 mt-2">
        {/* Categories Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-3 mb-8"
        >
           {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                 <motion.div whileTap={{ scale: 0.95 }} key={cat.id} className="flex flex-col items-center bg-white border border-gray-100 rounded-2xl py-4 cursor-pointer hover:bg-blue-50 transition-colors shadow-sm">
                    <Icon size={28} className={`${cat.color} mb-2`} strokeWidth={2} />
                    <span className="text-xs font-bold text-gray-700">{cat.label}</span>
                 </motion.div>
              );
           })}
        </motion.div>

        {/* Banner */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 mb-8 flex justify-between items-center text-white relative overflow-hidden shadow-md"
        >
           <div className="absolute top-[-50%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
           <div className="relative z-10 w-2/3">
             <h2 className="text-xl font-bold mb-2">Sell Unused Items</h2>
             <p className="text-indigo-100 text-sm font-medium">Turn old products into cash nearby.</p>
           </div>
           <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate('/resale/create')} className="bg-white text-indigo-700 font-bold py-2.5 px-5 rounded-xl text-sm hover:bg-gray-50 transition-colors z-10 flex-shrink-0 shadow-sm">
             Sell Now
           </motion.button>
        </motion.div>

        <h3 className="font-bold text-xl text-gray-900 mb-6">Recently posted</h3>

        {/* Grid List */}
        <AnimatePresence>
          {loading ? (
             <div className="flex justify-center p-12"><div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-purple-600 animate-spin"></div></div>
          ) : items.length === 0 ? (
             <div className="text-center p-12 bg-white rounded-3xl border border-gray-100">
               <p className="text-gray-500 font-medium">No items available.</p>
             </div>
          ) : (
             <div className="grid grid-cols-2 gap-4">
                {items.map((item, i) => (
                   <motion.div 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: (i % 4) * 0.05 }}
                       viewport={{ once: true }}
                       key={item.id} 
                       className="flex flex-col cursor-pointer group bg-white border border-gray-100 rounded-2xl p-3 hover:shadow-md transition-shadow"
                   >
                       <div className="w-full aspect-[4/5] overflow-hidden relative mb-3 rounded-xl bg-gray-100 flex items-center justify-center">
                          {item.images && item.images.length > 0 ? (
                            <img src={item.images[0]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <Smartphone size={32} className="text-gray-300" />
                          )}
                          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white font-bold text-sm px-3 py-1.5 rounded-lg">
                             ₹{item.price}
                          </div>
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 text-sm mb-2 leading-tight line-clamp-1">{item.title}</h4>
                          <div className="flex justify-between items-center">
                             <div className="flex items-center">
                                <span className="text-xs font-semibold text-gray-600 line-clamp-1">{item.condition || 'Used'}</span>
                             </div>
                             <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap">Just now</span>
                          </div>
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
