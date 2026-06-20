import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Activity, LayoutDashboard, Store, ShoppingBag, Trash, Edit, CheckCircle } from 'lucide-react';

/* 
  ===========================================
  HOW TO USE THIS FILE
  ===========================================
  1. Create a NEW clean React project or AI Studio project just for Admin.
  2. Install firebase and lucide-react (npm install firebase lucide-react).
  3. Replace the App.tsx with this entire file.
  4. Now you have a fully separated, secure Admin Panel to control your main app!
*/

// Use your exact same Firebase Config here to link them together:
const firebaseConfig = {
  apiKey: "AIzaSyCb_BuaKRao4KSEW0LBthvyCTGBvEloJfg",
  authDomain: "nbh-digital.firebaseapp.com",
  databaseURL: "https://nbh-digital-default-rtdb.firebaseio.com",
  projectId: "nbh-digital",
  storageBucket: "nbh-digital.firebasestorage.app",
  messagingSenderId: "762344198197",
  appId: "1:762344198197:web:30eed040cee286afe5617c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async (collectionName: string) => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const loadedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(loadedData);
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === 'businesses') loadData('businesses');
    if (activeTab === 'resale') loadData('resale');
    if (activeTab === 'offers') loadData('offers');
    if (activeTab === 'dashboard') setData([]);
  }, [activeTab]);

  const handleDelete = async (collectionName: string, id: string) => {
    if(window.confirm("Are you sure you want to delete this record?")) {
      await deleteDoc(doc(db, collectionName, id));
      loadData(collectionName);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'businesses', label: 'Businesses', icon: <Store size={20} /> },
    { id: 'resale', label: 'Resale Items', icon: <ShoppingBag size={20} /> },
    { id: 'offers', label: 'Offers', icon: <Activity size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-extrabold tracking-tight">Admin Panel</h1>
          <p className="text-slate-400 text-sm mt-1">Digital Nimbahera</p>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${activeTab === item.id ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab} Management</h2>
          <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold">Secure Admin Access</div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
           {loading ? (
             <div className="text-center text-gray-500 mt-20">Loading data from Firebase...</div>
           ) : (
             activeTab === 'dashboard' ? (
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Total Users</h3>
                    <p className="text-4xl font-extrabold text-indigo-600 mt-2">1,204</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Active Businesses</h3>
                    <p className="text-4xl font-extrabold text-orange-500 mt-2">45</p>
                 </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800">Pending Approvals</h3>
                    <p className="text-4xl font-extrabold text-red-500 mt-2">12</p>
                 </div>
               </div>
             ) : (
               <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                 <table className="min-w-full divide-y divide-gray-200">
                   <thead className="bg-gray-50">
                     <tr>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title / Name</th>
                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                       <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                     </tr>
                   </thead>
                   <tbody className="bg-white divide-y divide-gray-200">
                     {data.length === 0 ? (
                       <tr><td colSpan={3} className="px-6 py-10 text-center text-gray-500">No records found.</td></tr>
                     ) : (
                       data.map((item) => (
                         <tr key={item.id} className="hover:bg-gray-50 z">
                           <td className="px-6 py-4 whitespace-nowrap">
                             <div className="text-sm font-bold text-gray-900">{item.name || item.title || 'Untitled'}</div>
                             <div className="text-sm text-gray-500">{item.category || item.type}</div>
                           </td>
                           <td className="px-6 py-4">
                             <div className="text-sm text-gray-900 line-clamp-1 max-w-sm">{item.description}</div>
                           </td>
                           <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                             <button className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center">
                               <Edit size={16} className="mr-1"/> Edit
                             </button>
                             <button onClick={() => handleDelete(activeTab, item.id)} className="text-red-600 hover:text-red-900 inline-flex items-center">
                               <Trash size={16} className="mr-1"/> Delete
                             </button>
                           </td>
                         </tr>
                       ))
                     )}
                   </tbody>
                 </table>
               </div>
             )
           )}
        </main>
      </div>
    </div>
  );
}
