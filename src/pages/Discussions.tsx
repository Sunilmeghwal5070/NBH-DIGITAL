import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Discussions() {
  const { goBack, navigate } = useSafeNavigate();

  const [discussions, setDiscussions] = useState([
    { id: 1, name: 'Kamlesh kumhar', date: '6/12/2026', text: 'If there is any school looking for an English teacher for part time for class 9-12th . Cont...', tag: 'General', replies: [{name: 'Vinod', text: 'Please contact Sunrise Academy.'}] },
    { id: 2, name: 'Sachin Ameriya', date: '6/11/2026', text: 'All marriage program function kon karwate he events planer..', tag: 'General', replies: [] },
    { id: 3, name: 'Ravi', date: '6/9/2026', text: 'Wanted to get a nice budget friendly tripod 📸. Where can I and what min price I can ge...', tag: 'General', replies: [{name: 'Rahul Electronics', text: 'We have Digitek tripods starting from Rs 800.'}] },
    { id: 4, name: 'RAJENDRA SHARMA', date: '6/10/2026', text: 'Any Motor driving school at Nimbhera..', tag: 'General', replies: [] },
  ]);

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = (id: number) => {
    if (!replyText.trim()) return;
    setDiscussions(discussions.map(d => {
      if (d.id === id) {
        return {
          ...d,
          replies: [...d.replies, { name: 'You', text: replyText }]
        };
      }
      return d;
    }));
    setReplyText('');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -mr-2 bg-gray-50 rounded-full hover:bg-gray-100 transition absolute left-4">
           <ArrowLeft size={20} className="text-gray-900" />
         </motion.button>
         <h1 className="text-2xl font-bold text-gray-900 mx-auto">Discussions</h1>
      </div>

      <div className="p-4 space-y-4 pb-24 mt-2">
         {discussions.map((d) => (
            <div key={d.id} className="border border-gray-100 rounded-3xl p-5 shadow-sm bg-white">
               <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                     <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                        <img src={`https://ui-avatars.com/api/?name=${d.name}&background=random`} className="w-full h-full" alt="avatar" />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900 text-sm">{d.name}</p>
                        <p className="text-xs text-gray-500 font-medium">{d.date}</p>
                     </div>
                  </div>
                  <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold">
                     {d.tag}
                  </div>
               </div>
               <p className="font-bold text-gray-900 text-base leading-snug mb-4">{d.text}</p>
               
               <button 
                 onClick={() => setExpandedId(expandedId === d.id ? null : d.id)}
                 className="flex items-center text-gray-500 text-sm font-medium hover:text-gray-900 transition-colors"
               >
                  <span className="mr-1.5 flex align-middle">💬</span> {d.replies.length} answers
               </button>

               <AnimatePresence>
                 {expandedId === d.id && (
                   <motion.div 
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     className="overflow-hidden mt-4 pt-4 border-t border-gray-100 space-y-4"
                   >
                      {d.replies.map((reply, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-2xl p-4">
                           <p className="font-bold text-gray-900 text-xs mb-1">{reply.name}</p>
                           <p className="text-gray-700 text-sm leading-snug">{reply.text}</p>
                        </div>
                      ))}
                      
                      {d.replies.length === 0 && (
                        <p className="text-sm text-gray-500 italic">No answers yet. Be the first to answer!</p>
                      )}

                      <div className="flex items-center space-x-2 mt-4">
                        <input 
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write your answer..."
                          className="flex-1 bg-gray-100 text-gray-900 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleReplySubmit(d.id);
                          }}
                        />
                        <motion.button 
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleReplySubmit(d.id)}
                          className="bg-[#4f46e5] text-white p-2.5 rounded-full"
                        >
                          <Send size={16} />
                        </motion.button>
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
         ))}
      </div>

      <div className="fixed bottom-0 right-0 p-4 pb-safe z-30">
         <motion.button onClick={() => navigate('/ask-city')} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-[#4f46e5] text-white font-bold py-3.5 px-6 rounded-full shadow-lg flex items-center text-sm">
            <span className="text-lg mr-2">+</span> Ask Question
         </motion.button>
      </div>
    </motion.div>
  );
}
