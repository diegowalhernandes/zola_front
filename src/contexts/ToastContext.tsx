import { AnimatePresence, motion } from 'framer-motion';
import { createContext, ReactNode, useContext, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

type ToastContextValue = { toast: (message: string) => void };
const ToastContext = createContext({} as ToastContextValue);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');

  function toast(value: string) {
    setMessage(value);
    window.setTimeout(() => setMessage(''), 2600);
  }

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <AnimatePresence>
        {message && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-graphite-700/50 bg-navy-900 px-5 py-4 text-sm font-medium text-white shadow-premium dark:border-graphite-600/50 dark:bg-white dark:text-navy-950">
            <FiCheckCircle className="text-brand-500" /> {message}
          </motion.div>
        )}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
