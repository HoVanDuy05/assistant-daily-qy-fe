'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
  Container,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import api from '@/services/api';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/auth/login', formData);
      const { user, token } = response.data.data;
      login(user, token);
      toast.success('Đăng nhập thành công!');
      router.push('/');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Đăng nhập thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      {/* Animated background circles */}
      <motion.div
        className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
      />

      <Container maxWidth="sm" className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper className="p-8 w-full bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl shadow-indigo-500/10">
            {/* Logo Section */}
            <Box className="text-center mb-8">
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src="/icons/icon-72x72.png"
                  alt="QY Assistant"
                  className="w-14 h-14"
                />
              </motion.div>
              <Typography variant="h4" className="text-white font-bold tracking-tight">
                Chào mừng trở lại
              </Typography>
              <Typography className="text-slate-400 mt-2 text-sm">
                Đăng nhập để tiếp tục với QY Smart Assistant
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-5"
              >
                <TextField
                  fullWidth
                  placeholder="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email className="text-slate-400" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(30, 41, 59, 0.5)',
                      '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(99, 102, 241, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                    },
                    '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.4)' },
                  }}
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6"
              >
                <TextField
                  fullWidth
                  placeholder="Mật khẩu"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="text-slate-400" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          className="text-slate-400 hover:text-white"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: 'white',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(30, 41, 59, 0.5)',
                      '& fieldset': { borderColor: 'rgba(99, 102, 241, 0.3)' },
                      '&:hover fieldset': { borderColor: 'rgba(99, 102, 241, 0.5)' },
                      '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                    },
                    '& .MuiInputBase-input::placeholder': { color: 'rgba(255,255,255,0.4)' },
                  }}
                />
              </motion.div>

              {/* Login Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={loading}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3 rounded-xl font-semibold text-base shadow-lg shadow-indigo-500/30 transition-all duration-300"
                >
                  {loading ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Đang đăng nhập...
                    </motion.span>
                  ) : (
                    'Đăng nhập'
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Register Link */}
            <motion.div
              className="text-center mt-6 pt-6 border-t border-slate-700/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Typography className="text-slate-400 text-sm">
                Chưa có tài khoản?{' '}
                <Link
                  href="/register"
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Đăng ký ngay
                </Link>
              </Typography>
            </motion.div>
          </Paper>
        </motion.div>
      </Container>
    </div>
  );
}
