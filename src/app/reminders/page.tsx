'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Chip, IconButton, Tooltip, Grid } from '@mui/material';
import { Alarm, AccessTime, PushPin, Delete, Done, EventNote, Telegram, Email } from '@mui/icons-material';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Reminder {
  id: number;
  content: string;
  remind_at: string;
  type: 'push' | 'telegram' | 'email';
  status: 'pending' | 'sent' | 'cancelled';
  created_at: string;
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await api.get('/reminders'); // Note: I need to add this to backend!
      setReminders(response.data.data);
    } catch (error) {
      toast.error('Không thể tải lịch nhắc');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: number) => {
    try {
      await api.delete(`/reminders/${id}`);
      setReminders(reminders.filter(r => r.id !== id));
      toast.success('Đã hủy lịch nhắc');
    } catch (error) {
      toast.error('Không thể hủy lịch nhắc');
    }
  };

  return (
    <main className="min-h-screen bg-slate-900">
      <Header />

      <Container maxWidth="lg" className="py-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8 flex items-center gap-4"
        >
          <motion.div
            className="p-3 bg-purple-500/20 rounded-2xl"
            whileHover={{ rotate: 15 }}
          >
            <Alarm className="text-purple-400 text-3xl" />
          </motion.div>
          <div>
            <Typography variant="h4" className="text-white font-bold">
              Lịch nhắc việc
            </Typography>
            <Typography className="text-gray-400">
              Quản lý tất cả các thông báo nhắc nhở của Duy
            </Typography>
          </div>
        </motion.div>

        <Grid container spacing={3}>
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <Grid size={{ xs: 12, md: 6 }} key={i}>
                <Paper className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl animate-pulse h-40" />
              </Grid>
            ))
          ) : reminders.length === 0 ? (
            <Grid size={{ xs: 12 }}>
              <Paper className="p-16 text-center bg-slate-800/20 border border-slate-700/30 rounded-3xl">
                <EventNote className="text-slate-600 text-6xl mb-4" />
                <Typography className="text-gray-500 text-lg">Hệ thống chưa có lịch nhắc nào đang chờ</Typography>
              </Paper>
            </Grid>
          ) : (
            reminders.map((reminder) => (
              <Grid size={{ xs: 12, md: 6 }} key={reminder.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                >
                  <Paper className="p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl relative overflow-hidden group">
                    {/* Background icon decoration */}
                    <Alarm className="absolute -bottom-4 -right-4 text-slate-700/10 text-8xl" />

                    <Box className="flex justify-between items-start relative z-10">
                      <Box className="flex-1">
                        <Box className="flex items-center gap-2 mb-3">
                          {reminder.type === 'telegram' ? <Telegram className="text-primary-400" /> : <Alarm className="text-purple-400" />}
                          <Chip
                            label={reminder.status === 'pending' ? 'Chưa gửi' : 'Đã xong'}
                            size="small"
                            className={`${reminder.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-green-500/10 text-green-500'} border border-current opacity-70`}
                          />
                        </Box>

                        <Typography className="text-white text-xl font-bold mb-4 line-clamp-2">
                          {reminder.content}
                        </Typography>

                        <Box className="flex items-center gap-4 text-sm text-gray-400 bg-slate-900/40 p-3 rounded-xl border border-slate-700/30">
                          <Box className="flex items-center gap-1.5">
                            <AccessTime sx={{ fontSize: 16 }} className="text-primary-500" />
                            <span className="font-semibold text-gray-200">
                              {format(new Date(reminder.remind_at), 'HH:mm', { locale: vi })}
                            </span>
                          </Box>
                          <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />
                          <Box className="flex items-center gap-1.5">
                            <PushPin sx={{ fontSize: 16 }} className="text-primary-500" />
                            <span>{format(new Date(reminder.remind_at), 'dd/MM/yyyy', { locale: vi })}</span>
                          </Box>
                        </Box>
                      </Box>

                      <Box className="ml-4 flex flex-col gap-2">
                        {reminder.status === 'pending' && (
                          <Tooltip title="Xóa lịch nhắc">
                            <IconButton
                              onClick={() => handleCancel(reminder.id)}
                              className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        )}
                        <Tooltip title="Đánh dấu đã xong">
                          <IconButton className="bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all">
                            <Done />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </main>
  );
}

// Minimalist Divider helper since MUI one is basic
function Divider({ orientation = "vertical", flexItem = false, sx = {} }) {
  return <div style={{ borderRight: orientation === "vertical" ? "1px solid rgba(255,255,255,0.1)" : "none", borderBottom: orientation === "horizontal" ? "1px solid" : "none", ...sx }} />;
}
