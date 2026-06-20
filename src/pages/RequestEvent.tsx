import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

export default function RequestEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    tag: '',
    location: '',
    description: '',
    registrationRequired: false,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    organizerName: '',
    organizerContact: ''
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="flex flex-col bg-white min-h-screen font-sans pb-24"
    >
      <div className="px-4 py-4 flex items-center bg-white sticky top-0 z-20">
         <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate(-1)} className="p-2 -ml-2 bg-gray-50 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={24} className="text-gray-900" />
         </motion.button>
         <h1 className="text-lg font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">Request Event</h1>
      </div>

      <div className="p-4 space-y-8">
        
        {/* Event Details */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Event Details</h2>
          <div className="space-y-3">
            <input name="title" value={formData.title} onChange={handleChange} type="text" placeholder="Event title *" className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" />
            <input name="tag" value={formData.tag} onChange={handleChange} type="text" placeholder="Tag *" className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" />
            <input name="location" value={formData.location} onChange={handleChange} type="text" placeholder="Location *" className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" rows={3} className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5] resize-none"></textarea>
          </div>
        </section>

        {/* Registration */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Registration</h2>
          <div className="flex items-center justify-between">
             <span className="text-sm font-bold text-gray-900">Registration Required</span>
             <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" name="registrationRequired" checked={formData.registrationRequired} onChange={handleChange} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4f46e5]"></div>
            </label>
          </div>
        </section>

        {/* Schedule */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Schedule</h2>
          <div className="space-y-3">
             <input name="startDate" value={formData.startDate} onChange={handleChange} type="text" placeholder="Start Date *" className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" />
             <input name="startTime" value={formData.startTime} onChange={handleChange} type="text" placeholder="Start Time *" className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" />
             <input name="endDate" value={formData.endDate} onChange={handleChange} type="text" placeholder="End Date (optional)" className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" />
             <input name="endTime" value={formData.endTime} onChange={handleChange} type="text" placeholder="End Time (optional)" className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" />
          </div>
        </section>

        {/* Ad block similar to image */}
        <div className="bg-white border text-sm border-gray-100 rounded-xl overflow-hidden flex">
            <div className="w-1/3 bg-gray-100 p-2 flex items-center justify-center relative">
               <span className="absolute top-1 left-1 text-[8px] bg-white px-1 font-bold">Ad</span>
               <div className="text-xs text-center font-medium opacity-50">App Mockup</div>
            </div>
            <div className="p-3 w-2/3 flex flex-col justify-center">
               <div className="flex justify-between items-start mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded text-blue-600 flex items-center justify-center font-bold text-lg mr-2 shrink-0">M</div>
                  <div>
                    <h4 className="font-bold">Manus AI</h4>
                    <p className="text-[10px] text-gray-500">4.7 <span className="text-yellow-500">★</span> Google Play</p>
                  </div>
                  <MoreVertical size={16} className="text-gray-400" />
               </div>
               <button className="bg-[#0b57d0] text-white py-1.5 rounded-full text-xs font-bold mt-auto">Install</button>
            </div>
        </div>

        {/* Organizer */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Organizer</h2>
          <div className="space-y-3">
             <input name="organizerName" value={formData.organizerName} onChange={handleChange} type="text" placeholder="Organizer name *" className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" />
             <input name="organizerContact" value={formData.organizerContact} onChange={handleChange} type="text" placeholder="Organizer contact *" className="w-full bg-gray-50 p-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4f46e5]" />
          </div>
        </section>

        {/* Cover Image */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Cover Image</h2>
          <div className="w-full h-40 bg-gray-50 rounded-xl flex items-center justify-center cursor-pointer border border-dashed border-gray-300 hover:bg-gray-100 transition">
             <span className="text-sm font-bold text-gray-900">Add cover image</span>
          </div>
        </section>

        {/* Preview */}
        <section>
          <h2 className="text-sm font-bold text-gray-900 mb-3">Preview</h2>
          <div className="bg-[#2e2b7a] w-full rounded-2xl p-6 text-white aspect-[4/3] flex flex-col">
             <div className="mt-auto">
               <h3 className="font-bold text-lg mb-1">{formData.title || 'Event title'}</h3>
               <p className="text-xs mb-1 text-[#e0e7ff]">{formData.startDate || 'Date'} & {formData.startTime || 'time'}</p>
               <p className="text-xs text-[#e0e7ff]">{formData.location || 'Location'}</p>
             </div>
          </div>
        </section>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full bg-[#4f46e5] text-white font-bold py-4 rounded-xl shadow-md mt-6"
        >
          Submit Event Request
        </motion.button>
      </div>
    </motion.div>
  );
}
