import { useState } from 'react';
import { Trophy, Clock, Play, Award, Zap, ThumbsUp, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function ActivitiesPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-gray-50 min-h-screen pb-24 font-sans text-gray-900"
    >
      {/* Header */}
      <div className="bg-white px-6 py-5 sticky top-0 z-10 border-b border-gray-100 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Engage</h1>
        <p className="text-xs text-gray-500 font-medium tracking-wide mt-0.5">Quizzes, Contests & Challenges</p>
      </div>

      <div className="p-4 space-y-8">
        
        {/* Daily Quiz */}
        <section>
          <motion.div 
             initial={{ opacity: 0, y: 10 }}
             animate={{ opacity: 1, y: 0 }}
             className="bg-gradient-to-br from-indigo-700 to-indigo-900 text-white rounded-3xl p-6 relative overflow-hidden shadow-md"
          >
             <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl"></div>
             
             <div className="relative z-10">
               <div className="flex justify-between items-center mb-2">
                 <h2 className="text-2xl font-bold text-white">Daily Quiz</h2>
                 <div className="bg-white/20 backdrop-blur-md text-indigo-50 text-xs font-bold px-3 py-1.5 rounded-full flex items-center border border-white/10">
                   <Clock size={12} className="mr-1.5" /> 21h 32m
                 </div>
               </div>
               <p className="text-sm text-indigo-100 mb-6 font-medium max-w-[200px]">Compete live with the city every night at 10 PM.</p>
               
               <div className="flex items-end justify-center space-x-6 mb-8 mt-4">
                  <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-800 rounded-full border-2 border-indigo-500 flex items-center justify-center mb-2 relative shadow-inner">
                       <div className="absolute -top-2 bg-slate-300 text-slate-800 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">2</div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -4 }} className="flex flex-col items-center">
                    <Trophy size={24} className="text-yellow-400 mb-1 drop-shadow-md" />
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full border-4 border-white/20 flex items-center justify-center mb-2 shadow-lg z-10">
                       <span className="text-xl font-bold text-white">H</span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-50 uppercase truncate w-20 text-center">Harshvardh...</span>
                    <div className="flex items-center justify-center text-yellow-300 text-[10px] font-bold mt-0.5 w-full bg-black/20 rounded-full py-0.5 px-2 mt-1">
                       <Star size={10} className="mr-1" fill="currentColor" /> 1101
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ y: -2 }} className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-indigo-800 rounded-full border-2 border-indigo-500 flex items-center justify-center mb-2 relative shadow-inner">
                       <div className="absolute -top-2 bg-orange-400 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-sm">3</div>
                    </div>
                  </motion.div>
               </div>

               <p className="text-center text-xs font-semibold text-indigo-200 mb-5">1,245 players participated yesterday</p>

               <motion.button whileTap={{ scale: 0.98 }} className="w-full bg-white text-indigo-900 font-bold py-3.5 rounded-xl hover:bg-gray-50 shadow-sm transition-all">
                 View Quiz Results
               </motion.button>
             </div>
          </motion.div>
        </section>

        {/* Daily Challenges */}
        <section>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
             <h3 className="text-lg font-bold text-gray-900 mb-3 px-1">Daily Challenges</h3>
             <div className="flex space-x-3 overflow-x-auto hide-scrollbar pb-4 px-1">
               <motion.div whileTap={{ scale: 0.95 }} className="min-w-[140px] bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 rounded-2xl flex flex-col justify-between aspect-[4/5] shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                  <div className="absolute top-[-10%] right-[-10%] w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-lg mb-1">Flip It</h4>
                    <p className="text-xs text-emerald-50 leading-tight">Match pairs with minimum moves</p>
                  </div>
                  <div className="relative z-10 self-end bg-white/20 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                    <Zap size={20} className="text-white" />
                  </div>
               </motion.div>
               
               <motion.div whileTap={{ scale: 0.95 }} className="min-w-[140px] bg-gradient-to-br from-rose-500 to-pink-600 text-white p-5 rounded-2xl flex flex-col justify-between aspect-[4/5] shadow-sm hover:shadow-md transition-all relative overflow-hidden">
                  <div className="absolute top-[-10%] right-[-10%] w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-lg mb-1">Puzzle</h4>
                    <p className="text-xs text-rose-50 leading-tight">Arrange tiles before time runs out</p>
                  </div>
                  <div className="relative z-10 self-end bg-white/20 backdrop-blur-sm p-2.5 rounded-xl border border-white/10">
                    <Award size={20} className="text-white" />
                  </div>
               </motion.div>
             </div>
          </motion.div>
        </section>

        {/* Vote For Best */}
        <section>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex justify-between items-end mb-3 px-1">
              <h3 className="text-lg font-bold text-gray-900">Vote For Best</h3>
            </div>
            <div className="flex overflow-x-auto space-x-4 hide-scrollbar pb-4 px-1">
              <motion.div whileTap={{ scale: 0.98 }} className="min-w-[280px] bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                 <div className="flex items-center text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
                   <ThumbsUp size={14} className="mr-1.5" strokeWidth={2.5} /> Results
                 </div>
                 <h4 className="font-bold text-gray-900 text-base leading-snug mb-6">Would you like Digital Nimbahera to introduce a daily quiz every night at 10 PM?</h4>
                 <div className="flex justify-between items-center pt-2 border-t border-gray-50">
                   <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">Ended</span>
                   <button className="text-blue-600 font-bold text-xs uppercase tracking-wide hover:underline">View Results</button>
                 </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}
