import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Share2, MapPin, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { jobsData } from '../data/jobsData';

export default function JobDetail() {
  const { goBack } = useSafeNavigate();
  const { id } = useParams();
  const job = jobsData.find((j) => j.id === id) || jobsData[0];
  const [showModal, setShowModal] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-gray-50 min-h-screen font-sans">
      <div className="bg-gray-50 px-4 py-4 flex items-center justify-center sticky top-0 z-20">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition absolute left-4">
           <ArrowLeft size={20} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900">Job Details</h1>
      </div>

      <div className="p-5 pb-32 flex-grow">
         <h2 className="text-[28px] font-extrabold text-black leading-tight mb-2 uppercase">{job.title}</h2>
         <p className="text-gray-500 text-lg mb-4">{job.company}</p>

         <div className="space-y-3 mb-6">
           <div className="flex items-center text-gray-700">
             <MapPin size={20} className="text-[#4f46e5] mr-2" />
             <span className="text-[15px]">{job.location}</span>
           </div>
           <div className="flex items-center">
             <span className="text-xl mr-2">💰</span>
             <span className="text-[#4f46e5] font-bold text-lg">{job.salary}</span>
           </div>
         </div>

         <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
           <p className="text-gray-800 text-[15px]">Experience: {job.experience}</p>
           <button className="flex items-center text-gray-700 px-4 py-2 bg-gray-200/50 rounded-xl font-bold text-sm">
             <Share2 size={16} className="mr-2" />
             Share
           </button>
         </div>

         <h3 className="text-xl font-bold text-black mb-4">Job Description</h3>
         <div className="space-y-2.5 outline-none">
            {job.description.map((desc, i) => {
              // check if it starts with '✅' in the original but if not we can add it
              const isMatch = desc.includes("✅") ? desc : `✅ ${desc}`;
              // Wait, the screenshot uses a real unicode checkmark or custom icon. I'll use a span to render checked box or text.
              return (
                <div key={i} className="flex items-start">
                   {desc.includes("योग्यता") || desc.includes("आयु") || desc.includes("फ्रेशर") || desc.includes("ड्यूटी") || desc.includes("GNM / ANM Nurse की आवश्यकता") || desc.includes("9001252012") ? (
                      <span className="text-gray-800 text-[16px]">{desc}</span>
                   ) : (
                      <>
                        <span className="bg-[#86efac] text-[#166534] rounded mr-2 mt-0.5 flex-shrink-0 flex items-center justify-center p-0.5" style={{width: '20px', height: '20px'}}>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        </span>
                        <span className="text-gray-800 text-[16px]">{desc}</span>
                      </>
                   )}
                </div>
              );
            })}
         </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white">
        {job.isThirdParty && (
          <div className="bg-blue-50 p-3 mx-4 mb-2 rounded-xl flex items-start text-blue-800 text-sm">
             <Info size={18} className="text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
             <p>This job is posted by a third party. Please verify details before applying.</p>
          </div>
        )}
        <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
           <div className="flex items-center">
              <div className="w-12 h-12 bg-black rounded-full overflow-hidden mr-3">
                 {job.avatar ? (
                    <img src={job.avatar} alt="logo" className="w-full h-full object-cover" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center text-white font-bold bg-[#ef4444]">{job.company.charAt(0)}</div>
                 )}
              </div>
              <div>
                 <h4 className="font-extrabold text-black leading-none uppercase text-sm mb-1">{job.company}</h4>
                 <p className="text-gray-500 text-xs">{job.postedAt}</p>
              </div>
           </div>
           <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="bg-[#4f46e5] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md shadow-[#4f46e5]/30">
             Contact
           </motion.button>
        </div>
      </div>

      {/* Contact Modal Layer */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setShowModal(false)}
               className="fixed inset-0 bg-black/60 z-50 max-w-md mx-auto" 
            />
            
            <motion.div 
               initial={{ y: "100%" }} 
               animate={{ y: 0 }} 
               exit={{ y: "100%" }}
               transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white rounded-t-[2.5rem] z-[60] flex flex-col"
            >
               <div className="flex justify-center p-4">
                  <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
               </div>
               
               <div className="flex items-center px-6 mb-6">
                  <div className="w-14 h-14 bg-black rounded-full overflow-hidden mr-4 shadow-sm">
                     {job.avatar ? (
                        <img src={job.avatar} alt="logo" className="w-full h-full object-cover" />
                     ) : (
                       <div className="w-full h-full flex items-center justify-center text-white font-bold bg-[#ef4444] text-xl">{job.company.charAt(0)}</div>
                     )}
                  </div>
                  <div className="flex-1">
                     <h4 className="font-extrabold text-black uppercase text-lg leading-tight">{job.company}</h4>
                     <p className="text-gray-600 text-sm">Usually responds quickly</p>
                  </div>
                  <button onClick={() => setShowModal(false)} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition">
                     <X size={20} />
                  </button>
               </div>

               <div className="p-8 pb-32 flex flex-col items-center justify-center bg-gray-50 mx-4 rounded-3xl mb-4 border border-gray-100">
                   {/* Placeholder for center content ad/promo */}
                   <div className="w-20 h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center mb-3">
                     <span className="text-3xl">🫱🏼‍🫲🏾</span>
                   </div>
                   <h3 className="font-bold text-gray-900 mb-1">Direct Contact</h3>
                   <p className="text-gray-500 text-sm text-center">Get in touch directly with the employer via Phone or WhatsApp.</p>
               </div>

               <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-4 pb-safe border-t border-gray-100 space-y-3 z-[70]">
                  <motion.button 
                     whileTap={{ scale: 0.98 }}
                     className="w-full bg-[#4f46e5] text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-md shadow-[#4f46e5]/20"
                  >
                     <PhoneIcon className="mr-2" size={20} />
                     Call Now
                  </motion.button>
                  <motion.button 
                     whileTap={{ scale: 0.98 }}
                     className="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl flex items-center justify-center shadow-md shadow-[#25D366]/20"
                  >
                     <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-5 h-5 mr-2 invert brightness-200" />
                     WhatsApp
                  </motion.button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PhoneIcon({ className, size }: { className?: string; size: number }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  );
}
