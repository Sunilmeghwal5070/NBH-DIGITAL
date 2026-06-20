import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { ArrowLeft, Search as SearchIcon, Image, ShoppingBag, Store, Tag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { jobsData } from '../data/jobsData';

type SearchResultItem = {
  id: string;
  title: string;
  type: 'resale' | 'job' | 'business' | 'offer';
  subtitle: string;
  route: string;
};

export default function SearchPage() {
  const { goBack, navigate } = useSafeNavigate();
  const [query, setQuery] = useState('');
  const [allData, setAllData] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    // 1. Setup listeners for real-time admin sync
    const unsubscribeBusinesses = onSnapshot(collection(db, 'businesses'), (snap) => {
      const b: SearchResultItem[] = snap.docs.map(doc => ({
        id: doc.id,
        title: doc.data().name || 'Unnamed Business',
        type: 'business',
        subtitle: doc.data().category || 'Business',
        route: `/business/category/${doc.data().category}` // temporary redirect
      }));
      updateData('businesses', b);
    });

    const unsubscribeResale = onSnapshot(collection(db, 'resale'), (snap) => {
      const r: SearchResultItem[] = snap.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Unnamed Item',
        type: 'resale',
        subtitle: doc.data().price ? `₹${doc.data().price}` : 'Resale Item',
        route: `/resale` 
      }));
      updateData('resale', r);
    });

    const unsubscribeOffers = onSnapshot(collection(db, 'offers'), (snap) => {
      const o: SearchResultItem[] = snap.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title || 'Special Offer',
        type: 'offer',
        subtitle: doc.data().discount || 'Offer',
        route: `/offers` 
      }));
      updateData('offers', o);
    });

    // We keep jobsData as they were provided locally but format them
    const j: SearchResultItem[] = jobsData.map(job => ({
       id: job.id,
       title: job.title,
       type: 'job',
       subtitle: job.company,
       route: `/jobs/${job.id}`
    }));
    updateData('jobs', j);

    return () => {
      unsubscribeBusinesses();
      unsubscribeResale();
      unsubscribeOffers();
    };
  }, []);

  // Helper maps to hold partial collections
  const dataStore = new Map<string, SearchResultItem[]>();
  const updateData = (key: string, arr: SearchResultItem[]) => {
    dataStore.set(key, arr);
    let combined: SearchResultItem[] = [];
    dataStore.forEach(val => combined = [...combined, ...val]);
    setAllData(combined);
  };

  const filteredResults = query 
    ? allData.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.subtitle.toLowerCase().includes(query.toLowerCase()))
    : [];

  const getIcon = (type: string) => {
     switch(type) {
       case 'job': return <ShoppingBag size={20} className="text-gray-500" />;
       case 'business': return <Store size={20} className="text-gray-500" />;
       case 'offer': return <Tag size={20} className="text-gray-500" />;
       default: return <Image size={20} className="text-gray-500" />; // resale
     }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 justify-between shadow-sm">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={24} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Search</h1>
         <div className="w-10"></div>
      </div>

      <div className="p-4">
         <motion.div 
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className="relative bg-white rounded-2xl shadow-sm border border-gray-100"
         >
             <SearchIcon size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" strokeWidth={2}/>
             <input 
                autoFocus 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, jobs, businesses..." 
                className="w-full bg-transparent py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] rounded-2xl transition-all" 
             />
         </motion.div>

         <div className="mt-6">
           <AnimatePresence>
             {query && filteredResults.length > 0 && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
                 <h3 className="text-sm font-bold text-gray-500 px-1 mb-2">Search Results</h3>
                 {filteredResults.map(res => (
                   <div key={`${res.type}-${res.id}`} onClick={() => navigate(res.route)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center cursor-pointer hover:bg-gray-50 transition">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mr-4">
                        {getIcon(res.type)}
                      </div>
                      <div>
                         <h4 className="font-bold text-gray-900 leading-tight">{res.title}</h4>
                         <p className="text-xs text-gray-500 font-medium">
                           {res.type.charAt(0).toUpperCase() + res.type.slice(1)} • {res.subtitle}
                         </p>
                      </div>
                   </div>
                 ))}
               </motion.div>
             )}

             {query && filteredResults.length === 0 && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
                  <p className="text-gray-500 font-medium">No results found for "{query}"</p>
               </motion.div>
             )}
             
             {!query && (
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
               >
                  <div className="w-32 h-32 mb-6 relative">
                     <div className="absolute inset-0 bg-[#4f46e5]/10 rounded-full blur-xl"></div>
                     <SearchIcon size={80} className="text-[#4f46e5]/30 relative z-10 mx-auto mt-6" />
                  </div>
                  <p className="text-lg font-bold text-gray-500">Live search enabled</p>
                  <p className="text-sm text-gray-400 mt-2">Find updates exactly as they happen.</p>
               </motion.div>
             )}
           </AnimatePresence>
         </div>
      </div>
    </motion.div>
  );
}
