import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState, ChangeEvent } from 'react';
import { ArrowLeft, Upload, FileVideo, Image as ImageIcon, Type, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

export default function CreateNews() {
  const { goBack } = useSafeNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [newsType, setNewsType] = useState<'text' | 'image' | 'video'>('text');
  const [mediaUrl, setMediaUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'updates'), {
        title,
        content,
        type: newsType,
        mediaUrl: newsType !== 'text' ? mediaUrl : '',
        source: 'User Contributor',
        createdAt: serverTimestamp(),
      });
      goBack();
    } catch (error) {
       console.error("Error adding news: ", error);
       alert("Failed to post news");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMediaUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imgUrl = URL.createObjectURL(e.target.files[0]);
      setMediaUrl(imgUrl);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm sticky top-0 z-20">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition">
           <ArrowLeft size={24} className="text-gray-800" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900 ml-2">Post Update</h1>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-6 max-w-md mx-auto w-full pb-24">
         <div className="bg-white p-5 text-center flex flex-col items-center justify-center rounded-3xl shadow-sm border border-gray-100">
             <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                 <Sparkles size={32} />
             </div>
             <h2 className="text-lg font-bold text-gray-900 leading-tight">Share City News</h2>
             <p className="text-sm text-gray-500 mt-1">Post public updates, alerts, or media.</p>
         </div>

         <div className="grid grid-cols-3 gap-3">
            <button type="button" onClick={() => setNewsType('text')} className={`p-4 rounded-2xl flex flex-col items-center border transition-all ${newsType === 'text' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                <Type size={24} className="mb-2" />
                <span className="text-xs font-bold">Text</span>
            </button>
            <button type="button" onClick={() => setNewsType('image')} className={`p-4 rounded-2xl flex flex-col items-center border transition-all ${newsType === 'image' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                <ImageIcon size={24} className="mb-2" />
                <span className="text-xs font-bold">Photo</span>
            </button>
            <button type="button" onClick={() => setNewsType('video')} className={`p-4 rounded-2xl flex flex-col items-center border transition-all ${newsType === 'video' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>
                <FileVideo size={24} className="mb-2" />
                <span className="text-xs font-bold">Video</span>
            </button>
         </div>

         <div className="space-y-4 bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 focus:text-blue-600">Headline</label>
                <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter headline..." className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3.5 outline-none transition-all" />
             </div>
             
             <div>
                <label className="block text-sm font-bold text-gray-700 mb-1.5 focus:text-blue-600">Details (Optional)</label>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Provide more details..." className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3.5 outline-none transition-all h-24 resize-none" />
             </div>

             {newsType !== 'text' && (
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Upload {newsType === 'video' ? 'Video Mock' : 'Photo'}</label>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-500 bg-gray-50 relative overflow-hidden">
                       {mediaUrl ? (
                          newsType === 'video' ? (
                             <div className="flex items-center text-blue-600 font-bold max-h-32 p-4 text-center z-10"><FileVideo size={20} className="mr-2"/> Video Selected</div>
                          ) : (
                             <img src={mediaUrl} className="absolute inset-0 w-full h-full object-cover" />
                          )
                       ) : (
                          <>
                             <Upload size={28} className="mb-2 text-gray-400" />
                             <span className="text-sm font-medium">Tap to select {newsType}</span>
                          </>
                       )}
                       <input type="file" accept={newsType === 'video' ? "video/*" : "image/*"} onChange={handleMediaUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                    </div>
                 </div>
             )}
         </div>

         <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={submitting} className={`w-full py-4 text-white rounded-xl font-bold text-lg shadow-md transition-all ${submitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/30'}`}>
            {submitting ? 'Posting...' : 'Post News'}
         </motion.button>
      </form>
    </motion.div>
  );
}
