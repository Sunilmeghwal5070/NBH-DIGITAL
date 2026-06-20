import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, Smartphone, Sofa, Car, Bike } from 'lucide-react';
import { motion } from 'motion/react';

const categories = [
  { id: 'mobiles', label: 'Mobiles', icon: Smartphone, color: 'text-blue-500' },
  { id: 'furniture', label: 'Furniture', icon: Sofa, color: 'text-orange-500' },
  { id: 'cars', label: 'Cars', icon: Car, color: 'text-red-500' },
  { id: 'bikes', label: 'Bikes', icon: Bike, color: 'text-green-500' }
];

const items = [
  { id: '1', title: 'OLAX1S', price: '₹ 60,000', seller: 'RAHUL SINGH RA...', time: '1 day ago', avatar: 'R', color: 'bg-orange-500', image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc' },
  { id: '2', title: 'Activa 2012', price: '₹ 25,000', seller: 'Vaibhav', time: '4 days ago', avatar: 'V', color: 'bg-indigo-500', image: 'https://images.unsplash.com/photo-1620882313653-62bda5667104' },
  { id: '3', title: 'Ktm rc200', price: '₹ 95,000', seller: 'Ayyan chippa', time: '1 week ago', avatar: 'A', color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87' },
  { id: '4', title: 'Renault duster 2013 ...', price: '₹ 2,50,000', seller: 'Ayyan chippa', time: '1 week ago', avatar: 'A', color: 'bg-red-500', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf' },
  { id: '5', title: 'TVs sports bike', price: '₹ 23,000', seller: 'Bhavesh Bareth', time: '2 weeks ago', avatar: 'B', color: 'bg-blue-500', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f' },
  { id: '6', title: 'Vivo V60 12/256', price: '₹ 32,000', seller: 'Madan Bairwa', time: '2 weeks ago', avatar: 'M', color: 'bg-pink-500', image: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b' },
];

export default function ResalePage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans pb-24"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 justify-between shadow-sm">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
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
        <div className="grid grid-cols-2 gap-4">
           {items.map((item, i) => (
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  key={item.id} 
                  className="flex flex-col cursor-pointer group bg-white border border-gray-100 rounded-2xl p-3 hover:shadow-md transition-shadow"
              >
                  <div className="w-full aspect-[4/5] overflow-hidden relative mb-3 rounded-xl bg-gray-100">
                     <img src={item.image + "?auto=format&fit=crop&q=80&w=400"} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                     <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm text-white font-bold text-sm px-3 py-1.5 rounded-lg">
                        {item.price}
                     </div>
                  </div>
                  <div>
                     <h4 className="font-bold text-gray-900 text-sm mb-2 leading-tight line-clamp-1">{item.title}</h4>
                     <div className="flex justify-between items-center">
                        <div className="flex items-center">
                           <div className={`w-6 h-6 flex items-center justify-center text-[10px] rounded-full font-bold text-white mr-2 ${item.color} flex-shrink-0`}>
                              {item.avatar}
                           </div>
                           <span className="text-[10px] font-semibold text-gray-600 line-clamp-1 max-w-[60px]">{item.seller}</span>
                        </div>
                        <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap">{item.time}</span>
                     </div>
                  </div>
              </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
