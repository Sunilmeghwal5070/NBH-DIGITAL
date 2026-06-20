import { useSafeNavigate } from '../hooks/useSafeNavigate';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { jobsData } from '../data/jobsData';

export default function JobsPage() {
  const { goBack, navigate } = useSafeNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col bg-gray-50 min-h-screen font-sans">
      <div className="bg-white px-4 py-4 flex items-center justify-center sticky top-0 z-20 border-b border-gray-100">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => goBack()} className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition absolute left-4">
           <ArrowLeft size={20} className="text-gray-900" />
         </motion.button>
         <h1 className="text-xl font-bold text-gray-900">Jobs</h1>
      </div>

      <div className="p-4 space-y-4 pb-20">
        {jobsData.map((job) => (
          <motion.div
            whileTap={{ scale: 0.98 }}
            key={job.id}
            onClick={() => navigate(`/jobs/${job.id}`)}
            className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 relative cursor-pointer"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-teal-500 text-white flex items-center justify-center text-3xl font-bold overflow-hidden flex-shrink-0">
                {job.avatar ? (
                  <img src={job.avatar} alt={job.company} className="w-full h-full object-cover" />
                ) : (
                  job.company.charAt(0).toUpperCase()
                )}
              </div>
              <div className="flex-1 mt-1">
                <h3 className="text-xl font-bold text-black leading-tight mb-1">{job.title}</h3>
                <p className="text-gray-600 font-medium mb-3">{job.company}</p>
                <div className="flex gap-2 items-center">
                   <span className="bg-[#eef2ff] text-[#4f46e5] text-xs font-bold px-3 py-1.5 rounded-full">{job.type}</span>
                   <span className="flex items-center text-[#10b981] text-xs font-bold px-2">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] mr-1.5"></span>
                     {job.status}
                   </span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between mt-6">
               <div>
                  <p className="text-gray-500 text-sm mb-1">Salary</p>
                  <p className="text-[#10b981] font-bold text-lg">{job.salary}</p>
               </div>
               <div className="p-2 text-[#4f46e5]">
                 <ArrowRight size={24} />
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
