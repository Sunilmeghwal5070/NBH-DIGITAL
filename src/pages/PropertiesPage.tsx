import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Sparkles, Home, ShoppingCart, FileText } from 'lucide-react';
import { motion } from 'motion/react';

const propertyCategories = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'rent', label: 'Rent', icon: Home },
  { id: 'sell', label: 'Sell', icon: ShoppingCart },
  { id: 'lease', label: 'Lease', icon: FileText }
];

const propertiesData = [
  {
    id: '1',
    type: 'rent',
    title: '2BHK',
    price: '10000',
    priceUnit: '',
    location: 'Maheshpuram road vidhya vihar sr.sec.school ke pass Prem ...',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6' // placeholder
  },
  {
    id: '2',
    type: 'sell',
    title: '2 joint shops',
    price: '32 lac',
    priceUnit: '',
    location: 'Riico industrial area',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca' // placeholder
  },
  {
    id: '3',
    type: 'sell',
    title: 'Best residential Plot for sell near shekhawati ...',
    price: '1831000',
    priceUnit: '',
    location: 'Bhandaria 80ft road from walking distance',
    image: 'https://plus.unsplash.com/premium_photo-1661915661139-5b6a4e4a6fcc' // placeholder
  },
  {
    id: '4',
    type: 'rent',
    title: 'Commercial hall',
    price: '40000',
    priceUnit: '/ month',
    location: 'Rajeev colony meera nagar',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c' // placeholder
  }
];

export default function PropertiesPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProperties = selectedCategory === 'all' 
    ? propertiesData 
    : propertiesData.filter(p => p.type === selectedCategory);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-gray-50 min-h-screen text-gray-900 font-sans pb-10"
    >
      {/* Header */}
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-10 justify-between shadow-sm border-b border-gray-100">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={24} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Properties</h1>
         <div className="w-10"></div>
      </div>

      <div className="p-4 space-y-6 mt-2">
        {/* Categories */}
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar -mx-4 px-4 pb-1">
           {propertyCategories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                 <motion.button 
                   whileTap={{ scale: 0.95 }}
                   key={cat.id}
                   onClick={() => setSelectedCategory(cat.id)}
                   className={`flex items-center px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-colors shadow-sm ${
                     isSelected 
                       ? 'bg-blue-600 text-white' 
                       : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                   }`}
                 >
                    {Icon && <Icon size={16} className={`mr-2 ${isSelected ? 'text-yellow-300' : 'text-gray-500'}`} fill={isSelected ? 'currentColor' : 'none'} />}
                    {cat.label}
                 </motion.button>
              );
           })}
        </div>

        {/* Banner */}
        <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 flex justify-between items-center text-white relative overflow-hidden shadow-md"
        >
           <div className="relative z-10 w-2/3">
             <h2 className="text-lg font-bold mb-1">Sell or Rent Property</h2>
             <p className="text-blue-100 text-xs max-w-[200px] leading-relaxed font-medium">Reach local buyers and tenants across Nimbahera.</p>
           </div>
           <motion.button 
             whileTap={{ scale: 0.95 }}
             onClick={() => navigate('/properties/create')}
             className="bg-white text-blue-700 font-bold py-2.5 px-4 rounded-xl hover:bg-gray-50 transition flex-shrink-0 relative z-10 shadow-sm border text-sm"
           >
             List Now
           </motion.button>
           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Property List */}
        <div className="space-y-5">
           {filteredProperties.map((prop, i) => (
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.05 }}
                 viewport={{ once: true }}
                 whileTap={{ scale: 0.98 }}
                 key={prop.id} 
                 onClick={() => navigate(`/property/${prop.id}`)} 
                 className="flex flex-col cursor-pointer group bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                  <div className="w-full h-56 rounded-xl overflow-hidden relative mb-3 bg-gray-100">
                     <img src={prop.image + "?auto=format&fit=crop&q=80&w=600&h=400"} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                     
                     <div className="absolute top-3 left-3 bg-black/50 backdrop-blur text-white font-bold text-[10px] px-2 py-1 rounded-lg uppercase tracking-wider">
                        {prop.type}
                     </div>
                     
                     <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur text-gray-900 font-bold text-base px-3 py-1.5 rounded-xl shadow-sm">
                        {prop.price}{prop.priceUnit}
                     </div>
                  </div>
                  <div className="px-1">
                     <h3 className="font-bold text-gray-900 text-lg mb-1.5 leading-tight truncate">{prop.title}</h3>
                     <div className="flex items-start text-gray-500">
                        <MapPin size={14} className="text-blue-500 mr-1.5 mt-0.5 flex-shrink-0" />
                        <p className="text-xs font-medium line-clamp-1">{prop.location}</p>
                     </div>
                  </div>
              </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}
