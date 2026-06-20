import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, MessageCircle, Facebook, Twitter, Link } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
  url: string;
}

export default function ShareModal({ isOpen, onClose, title, text, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const shareViaWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${text} ${url}`)}`, '_blank');
  };

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-white/95 to-white/95 backdrop-blur-xl rounded-t-[2.5rem] p-6 pb-10 z-[110] max-w-md mx-auto shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)] border-t border-white/40"
          >
            <div className="w-12 h-1.5 bg-gray-300/80 rounded-full mx-auto mb-6"></div>
            
            <div className="flex justify-between items-center mb-6">
               <div>
                 <h3 className="text-2xl font-black text-gray-900 tracking-tight">Share to</h3>
                 <p className="text-gray-500 text-sm font-medium mt-0.5">Spread the word with your friends</p>
               </div>
               <motion.button 
                 whileTap={{ scale: 0.9 }}
                 onClick={onClose} 
                 className="p-3 bg-gray-100/80 rounded-full hover:bg-gray-200 transition text-gray-600"
               >
                  <X size={20} className="text-gray-900" />
               </motion.button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8">
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={shareViaWhatsApp} className="flex flex-col items-center group">
                   <div className="w-16 h-16 bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white rounded-[1.2rem] flex items-center justify-center mb-2 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/40 transition-all">
                      <MessageCircle size={28} />
                   </div>
                   <span className="text-xs font-bold text-gray-700">WhatsApp</span>
                </motion.button>
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={shareViaFacebook} className="flex flex-col items-center group">
                   <div className="w-16 h-16 bg-gradient-to-tr from-[#1877F2] to-[#0A5BC4] text-white rounded-[1.2rem] flex items-center justify-center mb-2 shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/40 transition-all">
                      <Facebook size={28} />
                   </div>
                   <span className="text-xs font-bold text-gray-700">Facebook</span>
                </motion.button>
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={shareViaTwitter} className="flex flex-col items-center group">
                   <div className="w-16 h-16 bg-gradient-to-tr from-[#1DA1F2] to-[#0C8DE0] text-white rounded-[1.2rem] flex items-center justify-center mb-2 shadow-lg shadow-sky-500/30 group-hover:shadow-sky-500/40 transition-all">
                      <Twitter size={28} />
                   </div>
                   <span className="text-xs font-bold text-gray-700">Twitter</span>
                </motion.button>
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }} onClick={handleCopy} className="flex flex-col items-center group">
                   <div className="w-16 h-16 bg-gradient-to-tr from-gray-800 to-gray-900 text-white rounded-[1.2rem] flex items-center justify-center mb-2 shadow-lg shadow-gray-900/30 group-hover:shadow-gray-900/40 transition-all">
                      {copied ? <Check size={28} className="text-green-400" /> : <Link size={28} className="text-white" />}
                   </div>
                   <span className="text-xs font-bold text-gray-700">{copied ? 'Copied!' : 'Copy Link'}</span>
                </motion.button>
            </div>
            
            <div className="bg-gray-100/80 p-1.5 rounded-2xl flex items-center justify-between border border-gray-200/60 overflow-hidden shadow-inner">
               <div className="px-4 py-2 truncate flex-1">
                 <span className="text-sm text-gray-600 font-medium truncate tracking-tight">{url}</span>
               </div>
               <motion.button 
                 whileTap={{ scale: 0.97 }}
                 onClick={handleCopy} 
                 className="bg-white text-gray-900 font-bold text-sm px-5 py-3 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-50 flex items-center"
               >
                 {copied ? 'Copied' : 'Copy'}
               </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
