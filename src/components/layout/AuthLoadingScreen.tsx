'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartToy, CheckCircle, Error as ErrorIcon } from '@mui/icons-material';

interface AuthLoadingScreenProps {
  children: React.ReactNode;
}

type LoadingState = 'checking' | 'valid' | 'invalid' | 'error';

export default function AuthLoadingScreen({ children }: AuthLoadingScreenProps) {
  const [state, setState] = useState<LoadingState>('checking');
  const [message, setMessage] = useState('Đang kiểm tra phiên đăng nhập...');

  // Generate particles with stable random values
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (i * 137.5) % 100, // Use golden angle for distribution
      y: (i * 73.2) % 100,
      duration: 2 + (i % 3),
      delay: (i % 5) * 0.4,
    }));
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setState('invalid');
      setMessage('Chưa đăng nhập');
      setTimeout(() => {
        window.location.href = '/login';
      }, 0);
      return;
    }

    try {
      // Check if token is expired
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp * 1000 < Date.now()) {
        setState('invalid');
        setMessage('Phiên đăng nhập đã hết hạn');
        localStorage.removeItem('token');
        setTimeout(() => {
          setTimeout(() => {
            window.location.href = '/login';
          }, 0);
        }, 1500);
        return;
      }

      // Verify with API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setState('valid');
        setMessage('Xác thực thành công!');
      } else {
        setState('invalid');
        setMessage('Phiên đăng nhập không hợp lệ');
        localStorage.removeItem('token');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
    } catch {
      setState('error');
      setMessage('Lỗi kết nối. Đang thử lại...');
      setTimeout(checkAuth, 3000);
    }
  };

  useEffect(() => {
    void checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animation variants
  const containerVariants = {
    checking: {
      scale: [1, 1.1, 1],
      rotate: [0, 360],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear' as const,
      },
    },
    valid: {
      scale: 1,
      rotate: 0,
    },
    invalid: {
      scale: 0.9,
      rotate: 0,
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut' as const,
      },
    },
  };

  if (state === 'valid') {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-black flex items-center justify-center z-50">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-primary-500/30 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="text-center z-10">
        {/* Logo with animations */}
        <div className="relative mb-8">
          {/* Pulse rings */}
          {state === 'checking' && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full bg-primary-500/20"
                variants={pulseVariants}
                animate="animate"
                style={{ width: 120, height: 120, margin: -10 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-primary-500/10"
                variants={pulseVariants}
                animate="animate"
                transition={{ delay: 0.5 }}
                style={{ width: 140, height: 140, margin: -20 }}
              />
            </>
          )}

          {/* Logo container */}
          <motion.div
            className="relative w-24 h-24 mx-auto"
            variants={containerVariants}
            animate={state}
          >
            <div className={`
              w-full h-full rounded-2xl flex items-center justify-center
              ${state === 'checking' ? 'bg-primary-500/20' : ''}
              ${state === 'invalid' ? 'bg-red-500/20' : ''}
              ${state === 'error' ? 'bg-yellow-500/20' : ''}
              backdrop-blur-md border border-white/10
            `}>
              <AnimatePresence mode="wait">
                <motion.div
                  key="icon"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <span className={`
                    text-5xl
                    ${state === 'checking' ? 'text-primary-400' : ''}
                    ${state === 'invalid' ? 'text-red-400' : ''}
                    ${state === 'error' ? 'text-yellow-400' : ''}
                  `}>
                    <SmartToy fontSize="inherit" />
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* App name */}
        <motion.h1
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          QY Smart Assistant
        </motion.h1>

        {/* Loading text */}
        <motion.p
          className={`
            text-lg
            ${state === 'checking' ? 'text-primary-300' : ''}
            ${state === 'invalid' ? 'text-red-300' : ''}
            ${state === 'error' ? 'text-yellow-300' : ''}
          `}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={message}
        >
          {message}
        </motion.p>

        {/* Progress bar */}
        {state === 'checking' && (
          <div className="mt-8 w-64 h-1 bg-slate-700 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-primary-500"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>
        )}

        {/* Loading dots */}
        {state === 'checking' && (
          <div className="mt-4 flex justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary-400 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
