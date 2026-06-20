import { Search, Bell, Menu, User, MapPin, Search as SearchIcon, ArrowRight, ThumbsUp, MessageCircle, Store, Briefcase, Activity, Calendar, Wrench, Play } from 'lucide-react';
import { homeData } from '../data/mockData';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export default function HomePage() {
  return (
    <motion.div 
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -10 }}
       className="flex flex-col bg-gray-50 min-h-screen pb-10 font-sans"
    >
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-600 p-2.5 rounded-full flex items-center justify-center shadow-md shadow-blue-200">
            <User size={22} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Good Morning</p>
            <p className="text-lg font-bold text-gray-900 leading-tight">Welcome Back</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/search">
            <motion.div whileTap={{ scale: 0.9 }} className="bg-gray-100 p-2.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
              <SearchIcon size={20} className="text-gray-700" strokeWidth={2} />
            </motion.div>
          </Link>
          <Link to="/notifications">
            <motion.div whileTap={{ scale: 0.9 }} className="relative bg-gray-100 p-2.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
               <Bell size={20} className="text-gray-700" strokeWidth={2} />
               <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></div>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white py-6 px-4 grid grid-cols-5 gap-2 shadow-sm mb-2"
      >
        {[
          { icon: <Store className="text-orange-500" size={24}/>, label: "Businesses", to: "/business" },
          { icon: <Briefcase className="text-blue-500" size={24}/>, label: "Jobs", to: "#" },
          { icon: <Activity className="text-pink-500" size={24}/>, label: "Activities", to: "/activities" },
          { icon: <Calendar className="text-yellow-500" size={24}/>, label: "Events", to: "/events" },
          { icon: <Wrench className="text-indigo-500" size={24}/>, label: "Services", to: "/home-services" },
        ].map((item, idx) => (
          <Link key={idx} to={item.to} className="flex flex-col items-center group outline-none">
            <motion.div whileTap={{ scale: 0.9 }} className="bg-gray-50 p-3 rounded-2xl border border-gray-100 group-hover:bg-blue-50 transition-colors shadow-sm mb-2 flex items-center justify-center aspect-square w-full max-w-[56px]">
              {item.icon}
            </motion.div>
            <span className="text-[10px] font-bold tracking-wide text-gray-600 truncate w-full text-center">{item.label}</span>
          </Link>
        ))}
      </motion.div>

      <div className="p-4 space-y-8">
        
        {/* City Updates */}
        <section>
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-xl font-bold text-gray-900">Latest News</h3>
            <Link to="/updates" className="text-blue-600 text-sm font-bold hover:text-blue-700 transition-colors">See All</Link>
          </div>
          <div className="flex overflow-x-auto space-x-4 hide-scrollbar -mx-4 px-4 pb-4">
            {homeData.updates.map((update, i) => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                key={update.id} 
                className="min-w-[260px] max-w-[260px] bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex-shrink-0 cursor-pointer"
              >
                <div className="h-40 bg-gray-200 relative">
                  <img src={update.image} className="w-full h-full object-cover" alt="" />
                  {update.video && (
                    <Link to="/news/1" className="absolute inset-0 flex items-center justify-center">
                       <div className="bg-black/40 p-3 rounded-full backdrop-blur-md cursor-pointer hover:bg-black/50 transition">
                           <Play className="text-white" fill="white" size={20} />
                       </div>
                    </Link>
                  )}
                </div>
                <Link to="/news/1" className="p-4 block hover:bg-gray-50 transition">
                  <div className="flex items-center space-x-2 mb-2">
                    <img src={`https://ui-avatars.com/api/?name=${update.source}&background=random`} className="w-5 h-5 rounded-md border border-gray-100" />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{update.source} • {update.time}</span>
                  </div>
                  <h4 className="text-sm font-bold leading-snug line-clamp-2 text-gray-900">{update.title}</h4>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Public Poll */}
        <section>
           <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-xl font-bold text-gray-900">Public Poll</h3>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
          >
            <h4 className="font-bold text-base text-gray-900 mb-5 leading-snug">{homeData.polls.question}</h4>
            <div className="space-y-3 mb-6">
                {homeData.polls.options.map((opt) => (
                    <motion.div 
                         whileTap={{ scale: 0.98 }}
                         key={opt.id} 
                         className="relative bg-gray-50 border border-gray-100 rounded-xl overflow-hidden px-4 py-3.5 flex justify-between items-center cursor-pointer hover:border-blue-300 transition-colors"
                    >
                        <div className="absolute left-0 top-0 bottom-0 bg-blue-100 -z-10 transition-all rounded-xl" style={{width: `${opt.percentage}%`}}></div>
                        <span className="text-sm font-semibold text-gray-800 z-10">{opt.text}</span>
                        <span className="text-sm font-bold text-blue-700 z-10">{opt.percentage}%</span>
                    </motion.div>
                ))}
            </div>
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">{homeData.polls.totalVotes} Votes Recorded</span>
                <Link to="/polls">
                  <motion.button whileTap={{ scale: 0.95 }} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-sm">Vote Now</motion.button>
                </Link>
            </div>
          </motion.div>
        </section>
        
        {/* Civic Issues */}
        <section>
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-xl font-bold text-gray-900">Civic Issues</h3>
            <Link to="/report-issue" className="text-red-500 hover:text-red-600 text-sm font-bold transition-colors">Report Issue</Link>
          </div>
          <div className="flex overflow-x-auto space-x-4 hide-scrollbar -mx-4 px-4 pb-4">
             {homeData.issues.map((issue, i) => (
                 <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    key={issue.id} 
                    className="min-w-[240px] bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex-shrink-0 cursor-pointer"
                 >
                    <div className="h-32 bg-gray-200 relative">
                        <img src={issue.image} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded w-fit text-[10px] font-bold uppercase">
                           {issue.status || 'Active'}
                        </div>
                    </div>
                    <div className="p-4">
                        <h4 className="text-sm font-bold mb-3 text-gray-900 line-clamp-1">{issue.title}</h4>
                        <div className="flex justify-between items-center">
                           <span className="flex items-center text-xs font-semibold text-gray-600"><ThumbsUp size={14} className="mr-1.5 text-blue-500" /> {issue.supporters}</span>
                           <span className="flex items-center text-xs font-semibold text-red-500">⚠️ {issue.affected} affected</span>
                        </div>
                    </div>
                 </motion.div>
             ))}
          </div>
        </section>

        {/* Community Hub */}
        <section>
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-xl font-bold text-gray-900">Community Hub</h3>
            <Link to="/ask-city" className="text-blue-600 text-sm font-bold transition-colors">Ask Question</Link>
          </div>
          
          <div className="space-y-4">
            {homeData.questions.map((q, i) => (
              <Link to="/discussions" key={q.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 relative cursor-pointer hover:border-blue-200 transition-colors mb-4"
                >
                  <span className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">{q.category}</span>
                  <div className="flex justify-between items-start mb-3 pr-16">
                    <div className="flex items-center space-x-3">
                      {q.avatar ? (
                         <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full text-white flex items-center justify-center font-bold text-sm shadow-sm">{q.avatar}</div>
                      ) : (
                         <img src={`https://ui-avatars.com/api/?name=${q.user}&background=random`} className="w-10 h-10 rounded-full border border-gray-100" />
                      )}
                      <div>
                        <p className="text-sm font-bold text-gray-900">{q.user}</p>
                        <p className="text-[10px] font-medium text-gray-500 mt-0.5">{q.date}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4 line-clamp-2">{q.content}</p>
                  <div className="flex items-center text-xs font-medium text-gray-500">
                    <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-1 rounded-md font-semibold mr-3">
                       <MessageCircle size={14} className="mr-1.5" />
                       {q.answers} Answers
                    </span>
                    <span className="flex items-center hover:text-gray-700 transition">
                       <ThumbsUp size={14} className="mr-1.5" />
                       Like
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </motion.div>
  );
}
