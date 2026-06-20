import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, MessageCircle, Facebook, Twitter } from 'lucide-react';

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
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] p-6 z-[110] max-w-md mx-auto"
          >
            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
            
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-gray-900">Share to</h3>
               <button onClick={onClose} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition">
                  <X size={20} className="text-gray-500" />
               </button>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
                <button onClick={shareViaWhatsApp} className="flex flex-col items-center">
                   <div className="w-14 h-14 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2 shadow-sm border border-green-100">
                      <MessageCircle size={24} />
                   </div>
                   <span className="text-xs font-semibold text-gray-700">WhatsApp</span>
                </button>
                <button onClick={shareViaFacebook} className="flex flex-col items-center">
                   <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2 shadow-sm border border-blue-100">
                      <Facebook size={24} />
                   </div>
                   <span className="text-xs font-semibold text-gray-700">Facebook</span>
                </button>
                <button onClick={shareViaTwitter} className="flex flex-col items-center">
                   <div className="w-14 h-14 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mb-2 shadow-sm border border-sky-100">
                      <Twitter size={24} />
                   </div>
                   <span className="text-xs font-semibold text-gray-700">Twitter</span>
                </button>
                <button onClick={handleCopy} className="flex flex-col items-center">
                   <div className="w-14 h-14 bg-gray-50 text-gray-700 rounded-full flex items-center justify-center mb-2 shadow-sm border border-gray-100">
                      {copied ? <Check size={24} className="text-green-500" /> : <Copy size={24} className="text-gray-700" />}
                   </div>
                   <span className="text-xs font-semibold text-gray-700">{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-xl flex items-center justify-between border border-gray-100">
               <span className="text-sm text-gray-600 truncate mr-3 font-medium">{url}</span>
               <button onClick={handleCopy} className="text-[#4f46e5] font-bold text-sm shrink-0 hover:underline">
                 Copy
               </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
