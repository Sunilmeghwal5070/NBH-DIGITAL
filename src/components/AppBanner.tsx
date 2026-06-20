import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AppBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
       return;
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Only show banner if dismissed before is not set
      if (!localStorage.getItem('dismissedAppBanner')) {
         setShowBanner(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // For iOS fallback or if beforeinstallprompt is not firing, still show banner occasionally
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && !window.matchMedia('(display-mode: standalone)').matches && !localStorage.getItem('dismissedAppBanner')) {
        setTimeout(() => setShowBanner(true), 2000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setShowBanner(false);
      }
      setDeferredPrompt(null);
    } else {
      // Show fallback instruction if no prompt (e.g., iOS)
      alert('To install the app: Tap the share button in your browser and select "Add to Home Screen". This lets links open directly in our App!');
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('dismissedAppBanner', 'true');
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[200] bg-white border-b border-gray-200 shadow-lg px-4 py-3 flex items-center justify-between"
        >
          <div className="flex items-center flex-1">
            <div className="w-10 h-10 bg-[#4f46e5] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm mr-3">
              DN
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 leading-tight">Digital Nimbahera</h4>
              <p className="text-[11px] text-gray-500">Fast, Simple & Native Experience</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleInstall}
              className="bg-[#4f46e5] hover:bg-[#4338ca] text-white text-xs font-bold px-4 py-2 rounded-full shadow-md transition-transform active:scale-95 flex items-center"
            >
              <Download size={14} className="mr-1" />
              Open App
            </button>
            <button onClick={handleDismiss} className="p-1 rounded-full text-gray-400 hover:bg-gray-100">
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
