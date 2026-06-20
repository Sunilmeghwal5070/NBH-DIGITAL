import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShareModal from '../components/ShareModal';

export default function Polls() {
  const navigate = useNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareData, setShareData] = useState({ title: '', text: '' });

  const handleShare = async (title: string, text: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShareData({ title, text });
      setShowShareModal(true);
    }
  };

  const [polls, setPolls] = useState([
    {
      id: 1,
      question: 'Agar aap 1 din ke liye Nimbahera ke Collector ban jaayein, sabse pehla kaam kya karenge?',
      totalVotes: 25,
      hasVoted: false,
      options: [
        { id: '1-1', label: 'Roads improve', votes: 9 }, // 36%
        { id: '1-2', label: 'Cleanliness improve', votes: 11 }, // 44%
        { id: '1-3', label: 'Jobs create', votes: 3 }, // 12%
        { id: '1-4', label: 'Tourism promote', votes: 2 }, // 8%
      ]
    },
    {
      id: 2,
      question: '🏆 If Digital Nimbahera introduces a daily quiz at 10 PM, would you play?',
      totalVotes: 59,
      hasVoted: true,
      options: [
        { id: '2-1', label: '🔥 Every day', votes: 41, votedByMe: true }, // 69%
        { id: '2-2', label: 'Occasionally', votes: 13, votedByMe: false }, // 22%
        { id: '2-3', label: '👀 Will try it once', votes: 4, votedByMe: false }, // 7%
        { id: '2-4', label: '❌ Not interested', votes: 1, votedByMe: false }, // 2%
      ]
    }
  ]);

  const handleVote = (pollId: number, optionId: string) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId && !poll.hasVoted) {
        return {
          ...poll,
          hasVoted: true,
          totalVotes: poll.totalVotes + 1,
          options: poll.options.map(opt => {
            if (opt.id === optionId) {
              return { ...opt, votes: opt.votes + 1, votedByMe: true };
            }
            return opt;
          })
        };
      }
      return poll;
    }));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
        <div>
           <h1 className="text-2xl font-bold text-gray-900">Voice of Nimbahera</h1>
           <p className="text-gray-500 text-sm mt-0.5">Your opinion matters. Vote and see live results.</p>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -mr-2 bg-gray-50 rounded-full hover:bg-gray-100 transition absolute right-4 top-4">
          <ArrowLeft size={20} className="text-gray-900 rotate-180" />
        </motion.button>
      </div>

      <div className="p-4 space-y-6 pb-24">
         {polls.map((poll) => (
           <div key={poll.id} className="bg-gray-50 rounded-3xl p-5">
              <h3 className="font-bold text-gray-900 mb-4 leading-snug text-lg">{poll.question}</h3>
              <div className="space-y-3">
                 {poll.options.map((opt) => {
                    const percent = poll.totalVotes === 0 ? 0 : Math.round((opt.votes / poll.totalVotes) * 100);
                    return (
                      <div 
                        key={opt.id} 
                        onClick={() => handleVote(poll.id, opt.id)}
                        className={`relative rounded-xl overflow-hidden flex items-center h-12 cursor-pointer
                           ${poll.hasVoted ? 'bg-[#e0e7ff]' : 'bg-white border border-gray-200 hover:border-blue-400'}
                        `}
                      >
                         {poll.hasVoted && (
                           <div 
                             className="absolute top-0 left-0 bottom-0 bg-[#c7d2fe] transition-all duration-1000" 
                             style={{ width: `${percent}%` }}
                           ></div>
                         )}
                         <span className="relative z-10 px-4 font-semibold text-gray-900 flex items-center">
                            {poll.hasVoted && opt.votedByMe && <span className="mr-2 text-blue-700">✓</span>}
                            {opt.label}
                         </span>
                         {poll.hasVoted && (
                           <span className="relative z-10 ml-auto px-4 font-bold text-gray-900">{percent}%</span>
                         )}
                      </div>
                    );
                 })}
              </div>
              <div className="flex justify-between items-center mt-5">
                 <span className="text-sm text-gray-500 font-medium">{poll.totalVotes} total votes</span>
                 <div className="flex space-x-2">
                   <button 
                     onClick={() => handleShare('Digital Nimbahera Poll', poll.question)}
                     className="bg-gray-200 text-gray-700 p-2 rounded-xl"
                   >
                     <Share2 size={20} />
                   </button>
                   {!poll.hasVoted && (
                     <button className="bg-[#4f46e5] text-white px-5 py-2 rounded-xl font-bold text-sm shadow-sm opacity-50 cursor-not-allowed">
                       Select an option
                     </button>
                   )}
                 </div>
              </div>
           </div>
         ))}
      </div>

      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        title={shareData.title} 
        text={shareData.text} 
        url={window.location.href} 
      />
    </motion.div>
  );
}
