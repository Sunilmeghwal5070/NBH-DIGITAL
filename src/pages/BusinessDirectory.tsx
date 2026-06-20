import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, ArrowRight, Store } from 'lucide-react';
import { businessCategories } from '../data/mockData';
import { motion } from 'motion/react';

export default function BusinessDirectory() {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans"
    >
      {/* Header */}
      <div className="bg-white px-4 py-4 flex justify-between items-center border-b border-gray-100 shadow-sm sticky top-0 z-10 pb-4">
         <div className="flex items-center">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
              <ArrowLeft size={24} className="text-gray-900" />
            </motion.button>
            <h1 className="text-xl font-bold text-gray-900 ml-2">Business Directory</h1>
         </div>
      </div>

      <div className="p-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white rounded-xl shadow-sm border border-gray-100"
          >
             <Search size={22} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={2}/>
             <input type="text" placeholder="Search businesses, products..." className="w-full bg-transparent py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl transition-all" />
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 shadow-md flex flex-col justify-center relative overflow-hidden"
          >
             <div className="absolute right-[-10%] top-[-50%] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
             <h2 className="text-xl font-bold mb-2 z-10 leading-none">Own a local store?</h2>
             <p className="text-sm text-blue-100 max-w-[200px] mb-5 z-10 leading-snug">Reach more customers by listing in the city app.</p>
             <motion.button whileTap={{ scale: 0.95 }} onClick={() => navigate('/business/register')} className="bg-white self-start text-blue-700 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors z-10">Get Listed</motion.button>
          </motion.div>
      </div>

      <div className="p-4 mt-2 flex-grow">
          <div className="flex justify-between items-end mb-6 px-1">
             <h3 className="text-xl font-bold text-gray-900">Explore Categories</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
             <motion.div whileTap={{ scale: 0.95 }}>
               <Link to={`/business/category/home-services`} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex flex-col items-center justify-center p-5 aspect-square hover:shadow-md transition-all group">
                  <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">🛠️</span>
                  <span className="text-xs font-bold text-blue-900 text-center">Home Services</span>
               </Link>
             </motion.div>
             
             {businessCategories.map((cat, i) => (
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    whileTap={{ scale: 0.95 }}
                    key={cat.id}
                 >
                   <Link to={`/business/category/${cat.id}`} className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col items-center justify-center p-5 aspect-square hover:border-blue-200 hover:shadow-md transition-all group">
                      <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                      <span className="text-[11px] font-bold text-gray-700 text-center">{cat.name}</span>
                   </Link>
                 </motion.div>
             ))}
             
             <motion.div whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
               <Link to="#" className="bg-gray-100 border border-gray-200 rounded-2xl flex flex-col items-center justify-center p-5 aspect-square hover:bg-gray-200 transition-all">
                  <ArrowRight size={28} className="mb-3 text-gray-600" />
                  <span className="text-xs font-bold text-gray-600 text-center">View All</span>
               </Link>
             </motion.div>
          </div>
      </div>

    </motion.div>
  );
}
