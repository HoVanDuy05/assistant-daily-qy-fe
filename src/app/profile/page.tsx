'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Avatar, Button, Grid, IconButton, Tooltip, TextField } from '@mui/material';
import { Person, Facebook, Instagram, LinkedIn, SmartToy, Settings, ExitToApp, Edit, CheckCircle } from '@mui/icons-material';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [profile, setProfile] = useState(user);

  useEffect(() => {
     fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/user');
      setProfile(response.data.data);
    } catch (error) {
       // Not critical if we already have it in store
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
    toast.success('Đã đăng xuất');
  };

  return (
    <main className="min-h-screen bg-slate-900">
      <Header />

      <Container maxWidth="md" className="py-12">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
        >
          <Paper className="p-8 bg-slate-800/40 border border-slate-700/50 rounded-3xl overflow-hidden relative">
             {/* Decorative background glow */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 blur-3xl" />
             
             <Box className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative group"
                >
                   <Avatar 
                      sx={{ width: 120, height: 120, fontSize: '3rem' }} 
                      className="bg-gradient-to-br from-primary-600 to-purple-600 shadow-2xl shadow-primary-500/30"
                   >
                     {profile?.name?.charAt(0) || 'D'}
                   </Avatar>
                   <IconButton className="absolute bottom-1 right-1 bg-white text-slate-900 hover:bg-slate-100 shadow-lg p-1.5 opacity-0 group-hover:opacity-100 transition-all">
                      <Edit sx={{ fontSize: 18 }} />
                   </IconButton>
                </motion.div>

                <div className="text-center md:text-left flex-1">
                   <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                     <Typography variant="h3" className="text-white font-bold leading-tight">
                        {profile?.name || 'Duy Khách'}
                     </Typography>
                     <Tooltip title="Tài khoản đã xác minh">
                        <CheckCircle className="text-primary-400" sx={{ fontSize: 28 }} />
                     </Tooltip>
                   </div>
                   <Typography variant="h6" className="text-gray-400 font-medium mb-4 flex items-center gap-2 justify-center md:justify-start">
                      {profile?.email}
                   </Typography>
                </div>

                <div className="flex flex-col gap-3">
                   <Button 
                      variant="contained" 
                      startIcon={<Settings />}
                      className="bg-slate-700 hover:bg-slate-600 px-6 rounded-xl capitalize"
                   >
                     Thiết lập
                   </Button>
                   <Button 
                      variant="outlined" 
                      color="error" 
                      startIcon={<ExitToApp />}
                      onClick={handleLogout}
                      className="border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white px-6 rounded-xl capitalize"
                   >
                     Đăng xuất
                   </Button>
                </div>
             </Box>

             <Typography variant="h5" className="text-white font-bold mt-12 mb-6">
                Kết nối mạng xã hội
             </Typography>

             <Grid container spacing={3}>
                {[
                  { name: 'Facebook', icon: <Facebook />, color: '#1877F2', connected: true },
                  { name: 'Instagram', icon: <Instagram />, color: '#E4405F', connected: false },
                  { name: 'LinkedIn', icon: <LinkedIn />, color: '#0A66C2', connected: false },
                ].map((social, i) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={i}>
                    <Paper className="p-5 bg-slate-900/60 border border-slate-700/50 rounded-2xl hover:border-slate-500/50 transition-all text-center">
                       <Box className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center text-white" style={{ backgroundColor: social.color }}>
                          {social.icon}
                       </Box>
                       <Typography className="text-white font-bold mb-1">{social.name}</Typography>
                       <Typography className="text-gray-500 text-sm mb-4">{social.connected ? 'Đã kết nối' : 'Chưa kết nối'}</Typography>
                       <Button 
                          fullWidth 
                          variant={social.connected ? "outlined" : "contained"}
                          sx={social.connected ? { borderColor: 'rgba(255,255,255,0.1)', color: 'gray' } : { backgroundColor: social.color }}
                          className="rounded-xl font-bold py-2 shadow-lg"
                       >
                         {social.connected ? "Đã xong" : "Kết nối ngay"}
                       </Button>
                    </Paper>
                  </Grid>
                ))}
             </Grid>

             <Typography variant="h5" className="text-white font-bold mt-12 mb-6">
                Sử dụng AI & Token
             </Typography>

             <Paper className="bg-slate-900/40 p-6 rounded-2xl border border-dashed border-slate-700 flex items-center gap-6">
                <Box className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                   <SmartToy className="text-primary-400 text-3xl" />
                </Box>
                <div className="flex-1">
                   <Typography className="text-white font-bold mb-1">Mô hình AI hiện tại</Typography>
                   <Typography className="text-gray-500 text-sm">Gemini 1.5 Pro - Đang được kích hoạt</Typography>
                </div>
                <div className="text-right">
                   <Typography className="text-primary-500 font-bold mb-1 text-xl">Sẵn sàng</Typography>
                   <Typography className="text-gray-500 text-sm">Mọi dịch vụ</Typography>
                </div>
             </Paper>
          </Paper>
        </motion.div>
      </Container>
    </main>
  );
}
