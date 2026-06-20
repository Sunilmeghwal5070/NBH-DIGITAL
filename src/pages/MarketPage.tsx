import { Search, Store, Percent, Home, RefreshCw, Wrench, Menu, MapPin } from 'lucide-react';
import { marketData } from '../data/mockData';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function MarketPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-gray-50 min-h-screen pb-10 font-sans"
    >
      {/* Header */}
      <div className="bg-white px-6 py-4 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
           <div>
             <h1 className="text-2xl font-bold text-gray-900">Market</h1>
             <p className="text-xs text-gray-500 font-medium tracking-wide">Offers, Resale & Properties</p>
           </div>
           <Link to="/search">
             <motion.div whileTap={{ scale: 0.9 }} className="bg-gray-100 p-2 rounded-full cursor-pointer hover:bg-gray-200 transition-colors">
               <Search size={22} className="text-gray-700" />
             </motion.div>
           </Link>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto space-x-3 hide-scrollbar pb-1">
          {[
            { tag: "Business", icon: Store, color: "text-orange-500", to: "/business" },
            { tag: "Offers", icon: Percent, color: "text-emerald-500", to: "/offers" },
            { tag: "Properties", icon: Home, color: "text-rose-500", to: "/properties" },
            { tag: "Resale", icon: RefreshCw, color: "text-indigo-500", to: "/resale" },
            { tag: "Services", icon: Wrench, color: "text-gray-700", to: "#" }
          ].map((item, i) => (
             <motion.div 
                 initial={{ opacity: 0, x: -10 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 transition={{ delay: i * 0.05 }} 
                 key={item.tag}
             >
                 <Link to={item.to} className="flex flex-col items-center justify-center p-3 w-16 bg-white border border-gray-100 rounded-2xl hover:shadow-sm hover:border-gray-200 transition-all group">
                   <div className="bg-gray-50 p-2 rounded-xl mb-2 group-hover:bg-gray-100 transition-colors">
                     <item.icon size={20} className={item.color}/>
                   </div>
                   <span className="text-[10px] font-semibold text-gray-600 truncate w-full text-center">{item.tag}</span>
                 </Link>
             </motion.div>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-10 mt-4">
        
        {/* Ongoing Offers */}
        <section>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-between items-end mb-4 px-1">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Ongoing Offers</h3>
              <p className="text-[11px] text-gray-500 font-medium">Latest retail discounts</p>
            </div>
            <Link to="/offers" className="text-blue-600 text-xs font-bold hover:underline">See All</Link>
          </motion.div>
          
          <div className="flex overflow-x-auto space-x-4 hide-scrollbar -mx-4 px-4 pb-4">
            {marketData.offers.map((offer, i) => (
              <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                 key={offer.id} 
                 className="min-w-[260px] max-w-[260px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex-shrink-0 relative group"
              >
                <div className="h-36 bg-gray-100 relative">
                  <img src={offer.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    🔥 {offer.tag}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-1 truncate text-base">{offer.title}</h4>
                  <div className="flex justify-between items-center mt-2">
                     <p className="text-[11px] text-gray-500 font-medium">{offer.store}</p>
                     <motion.button whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">Claim</motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Resale Market */}
        <section>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-between items-end mb-4 px-1">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Resale Market</h3>
              <p className="text-[11px] text-gray-500 font-medium">Locally listed items</p>
            </div>
            <Link to="/resale" className="text-blue-600 text-xs font-bold hover:underline">See All</Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-3">
             {marketData.resale.map((item, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  key={item.id} 
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
                >
                   <div className="h-32 relative bg-gray-100">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur text-gray-900 text-[11px] font-bold px-2 py-1 rounded shadow-sm">
                        {item.price}
                      </div>
                   </div>
                   <div className="p-3">
                     <h4 className="font-semibold text-gray-900 text-sm mb-3 truncate">{item.title}</h4>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <div className="w-6 h-6 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full text-white flex justify-center items-center text-[10px] font-bold shadow-sm">{item.initial}</div>
                           <span className="text-[10px] text-gray-500 font-medium truncate max-w-[50px]">{item.seller}</span>
                        </div>
                     </div>
                   </div>
                </motion.div>
             ))}
          </div>
        </section>

        {/* Properties */}
        <section>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-between items-end mb-4 px-1">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Properties</h3>
              <p className="text-[11px] text-gray-500 font-medium">Real estate</p>
            </div>
            <Link to="/properties" className="text-blue-600 text-xs font-bold hover:underline">See All</Link>
          </motion.div>
          
          <div className="flex overflow-x-auto space-x-4 hide-scrollbar -mx-4 px-4 pb-4">
            {marketData.properties.map((item, i) => (
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                 key={item.id} 
                 className="min-w-[200px] bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 group relative hover:shadow-md transition-shadow"
               >
                  <div className="h-32 relative">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                        {item.type}
                      </div>
                      <div className="absolute bottom-2 left-3 text-white font-bold text-base drop-shadow-md">
                        {item.price}
                      </div>
                  </div>
                  <div className="p-3">
                     <h4 className="font-semibold text-gray-900 text-sm truncate">{item.title}</h4>
                     <div className="flex items-center text-[10px] text-gray-500 mt-1">
                        <MapPin size={12} className="mr-1 text-gray-400" />
                        <span className="truncate">{item.location}</span>
                     </div>
                  </div>
               </motion.div>
            ))}
          </div>
        </section>

        {/* Trending / Recently added products */}
        <section>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-between items-end mb-4 px-1">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Products</h3>
              <p className="text-[11px] text-gray-500 font-medium">Local catalog</p>
            </div>
            <Link to="/search" className="text-blue-600 text-xs font-bold hover:underline">See All</Link>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-3">
             {marketData.products.map((item, i) => (
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.05 }}
                   viewport={{ once: true }}
                   whileTap={{ scale: 0.98 }}
                   key={item.id} 
                   onClick={() => navigate(`/product/${item.id}`)} 
                   className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow group"
                >
                   <div className="h-36 relative bg-gray-100 overflow-hidden">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   </div>
                   <div className="p-3">
                     <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">{item.title}</h4>
                     <div className="flex items-end justify-between mt-2">
                       <p className="text-[10px] text-gray-400 font-medium">{item.views} Views</p>
                       {item.price && <p className="text-sm font-bold text-blue-600">{item.price}</p>}
                     </div>
                   </div>
                </motion.div>
             ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
}
