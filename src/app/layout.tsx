'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ProtectedRoute } from '@/hooks/auth/ProtectedRoute';
import './globals.css';

// Extend WindowEventMap for PWA beforeinstallprompt event
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

// PWA Install Prompt Event interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

const queryClient = new QueryClient();

// PWA Install Prompt Component
function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if already installed - use setTimeout to avoid setState in render phase
    setTimeout(() => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setShowPrompt(false);
      }
    }, 0);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed bottom-4 left-4 right-4 bg-slate-800 border border-slate-700 p-4 rounded-2xl z-50 shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* App Icon */}
          <img
            src="/icons/icon-72x72.png"
            alt="QY Assistant"
            className="w-14 h-14 rounded-xl"
          />
          <div>
            <h3 className="text-white font-semibold text-lg">QY Smart Assistant</h3>
            <p className="text-gray-400 text-sm">Thêm vào màn hình chính để truy cập nhanh</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPrompt(false)}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Để sau
          </button>
          <button
            onClick={handleInstall}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium"
          >
            Cài đặt
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Register Service Worker
function useServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered:', registration);
        })
        .catch((error) => {
          console.log('SW registration failed:', error);
        });
    }
  }, []);
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useServiceWorker();

  return (
    <html lang="vi">
      <head>
        <title>QY Smart Assistant</title>
        <meta name="description" content="AI-powered smart assistant" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#6366f1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="QY Assistant" />

        {/* PWA manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Icons */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* Preconnect to API */}
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_API_URL} />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-slate-900 to-black antialiased">
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <ProtectedRoute>
              <AnimatePresence mode="wait">
                {children}
              </AnimatePresence>
            </ProtectedRoute>
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1e293b',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.1)',
                },
              }}
            />
            <PWAInstallPrompt />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
