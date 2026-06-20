import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Share2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShareModal from '../components/ShareModal';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function NewsDetail() {
  const { id } = useParams();
  const { goBack } = useSafeNavigate();
  const [showShareModal, setShowShareModal] = useState(false);
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      if (!id) return;
      try {
        const docSnap = await getDoc(doc(db, 'updates', id));
        if (docSnap.exists()) {
          setNews({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (e) {
        console.error("Error fetching news:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [id]);

  const handleShare = async () => {
    const title = news?.title || 'City News';
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: 'Check out this news on Digital Nimbahera!',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setShowShareModal(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-white min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20">
         <div className="flex items-center">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 bg-gray-50 rounded-full hover:bg-gray-100 transition mr-4">
              <ArrowLeft size={20} className="text-gray-900" />
            </motion.button>
            <h1 className="text-xl font-bold text-gray-900">News</h1>
         </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12"><div className="w-8 h-8 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div></div>
      ) : !news ? (
        <div className="p-8 text-center text-gray-500 font-medium">News not found.</div>
      ) : (
        <>
          {(news.mediaUrl || news.type === 'video' || news.type === 'image') && (
              <div className="w-full bg-gray-900 relative aspect-video flex flex-col items-center justify-center">
                 {news.mediaUrl ? (
                    <img src={news.mediaUrl} className="w-full h-full object-cover" />
                 ) : (
                    <div className="text-gray-400 font-medium pb-2 text-sm">Media Content</div>
                 )}
                 {news.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur shadow-lg cursor-pointer">
                           <Play size={32} className="ml-1" fill="white" />
                        </div>
                    </div>
                 )}
              </div>
          )}

          <div className="p-4 pt-6">
             <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-snug">
                {news.title}
             </h1>

             <div className="flex items-center text-sm font-medium text-gray-500 mb-6 pb-6 border-b border-gray-100">
                <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-full flex justify-center items-center overflow-hidden mr-3">
                   <img src={`https://ui-avatars.com/api/?name=${news.source || 'User'}&background=random`} className="w-full h-full object-cover" />
                </div>
                <span>{news.source || "Anonymous"} • Just now</span>
                <button onClick={handleShare} className="ml-auto bg-gray-50 px-3 py-1.5 rounded-lg flex items-center text-gray-700 font-bold hover:bg-gray-100 transition">
                   <Share2 size={14} className="mr-1.5" /> Share
                </button>
             </div>

             {news.content && (
                <div className="prose prose-sm text-gray-700 font-medium leading-relaxed max-w-none">
                   {news.content.split('\n').map((line: string, i: number) => (
                      <p key={i} className="mb-4">{line}</p>
                   ))}
                </div>
             )}

             {/* Ad Placeholder copied exactly */}
             <div className="bg-white border text-center p-6 border-gray-100 rounded-3xl shadow-sm my-8 flex items-center flex-col justify-center">
                 <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-3">
                    <span className="text-3xl">AI</span>
                 </div>
                 <h3 className="font-bold text-gray-900 mb-1">Manus AI</h3>
                 <p className="text-xs text-gray-500 mb-4 font-medium">4.7 ★ • Google Play</p>
                 <button className="bg-[#1a73e8] text-white px-8 py-2 rounded-full font-bold text-sm w-full">Install</button>
             </div>
          </div>
        </>
      )}

      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        title={news?.title || "News"}
        text="Check out this news on Digital Nimbahera!" 
        url={window.location.href} 
      />
    </motion.div>
  );
}
