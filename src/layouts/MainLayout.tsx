import { Outlet, NavLink } from 'react-router-dom';
import { Home, Store, MapPin, Newspaper, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function MainLayout() {
  const navItems = [
    { to: "/home", icon: Home, label: "Home" },
    { to: "/market", icon: Store, label: "Offers" },
    { to: "/business", icon: MapPin, label: "Directory" },
    { to: "/updates", icon: Newspaper, label: "News" },
    { to: "/profile", icon: User, label: "Menu" },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 max-w-md mx-auto relative overflow-hidden font-sans shadow-xl">
      <div className="flex-grow overflow-y-auto pb-24 hide-scrollbar scroll-smooth">
        <Outlet />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 px-1 z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all ${
                isActive ? 'text-blue-600 font-bold bg-blue-50' : 'text-gray-500 hover:text-blue-500 hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <motion.div whileTap={{ scale: 0.9 }} className="flex flex-col items-center justify-center">
                <item.icon size={22} className="mb-1" strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] tracking-wide">{item.label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
