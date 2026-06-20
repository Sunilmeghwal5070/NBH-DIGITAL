import { motion } from 'motion/react';
import { WifiOff } from 'lucide-react';

export default function NoInternetConnection() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen bg-white px-6 text-center font-sans"
    >
      <div className="relative mb-8">
         <div className="absolute inset-0 bg-orange-50 rounded-full blur-3xl opacity-50"></div>
         <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Simple representation of the antenna SVG */}
            <svg width="150" height="150" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 60C70 60 45 85 45 115M100 40C55 40 20 75 20 120M100 80C80 80 65 95 65 115M100 115V170M80 170L100 115L120 170M90 145H110" stroke="#f97316" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" className="opacity-40" />
              <path d="M100 115C108.284 115 115 108.284 115 100C115 91.7157 108.284 85 100 85C91.7157 85 85 91.7157 85 100C85 108.284 91.7157 115 100 115Z" fill="#f97316" />
              <path d="M100 115L70 180H130L100 115Z" stroke="#374151" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <path d="M85 145H115" stroke="#374151" strokeWidth="6" strokeLinecap="round"/>
              <path d="M78 160H122" stroke="#374151" strokeWidth="6" strokeLinecap="round"/>
            </svg>
            <div className="absolute top-10 left-10 w-2 h-2 rounded-full border-2 border-orange-200"></div>
            <div className="absolute top-5 right-10 flex space-x-1">
               <div className="w-1.5 h-1.5 bg-orange-300 rounded-full"></div>
            </div>
            <div className="absolute bottom-10 left-5 w-2 h-2 rounded-full border-2 border-orange-200"></div>
         </div>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-3">No Internet Connection</h1>
      <p className="text-gray-500 text-lg">
        You appear to be offline. Please check<br/>your connection and try again.
      </p>
    </motion.div>
  );
}
