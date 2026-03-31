'use client';

import { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Chip, Divider, IconButton, Tooltip } from '@mui/material';
import { History, AutoAwesome, CheckCircle, Error, AccessTime } from '@mui/icons-material';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import api from '@/services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Command {
  id: number;
  raw_input: string;
  status: string;
  results: any[];
  executed_at: string;
  created_at: string;
}

export default function HistoryPage() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/commands/history'); // Note: I need to add this to backend!
      setCommands(response.data.data);
    } catch (error) {
      toast.error('Không thể tải lịch sử lệnh');
    } finally {
      setLoading(false);
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
            className="p-3 bg-primary-500/20 rounded-2xl"
            whileHover={{ rotate: 15 }}
          >
            <History className="text-primary-400 text-3xl" />
          </motion.div>
          <div>
            <Typography variant="h4" className="text-white font-bold">
              Lịch sử lệnh
            </Typography>
            <Typography className="text-gray-400">
              Các yêu cầu Duy đã ra lệnh cho AI xử lý
            </Typography>
          </div>
        </motion.div>

        <div className="grid gap-4">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <Paper key={i} className="p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl animate-pulse h-32" />
            ))
          ) : commands.length === 0 ? (
            <Paper className="p-12 text-center bg-slate-800/30 border border-slate-700/50 rounded-3xl">
              <History className="text-slate-600 text-6xl mb-4" />
              <Typography className="text-gray-500">Chưa có lệnh nào được thực hiện</Typography>
            </Paper>
          ) : (
            commands.map((cmd) => (
              <motion.div
                key={cmd.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Paper className="p-6 bg-slate-800/40 border border-slate-700/50 rounded-2xl hover:bg-slate-800/60 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <Typography className="text-white text-lg font-medium mb-1">
                        "{cmd.raw_input}"
                      </Typography>
                      <div className="flex gap-4 text-xs text-gray-500 items-center">
                        <span className="flex items-center gap-1">
                          <AccessTime sx={{ fontSize: 14 }} />
                          {format(new Date(cmd.created_at), 'HH:mm - dd MMMM yyyy', { locale: vi })}
                        </span>
                        <Divider orientation="vertical" flexItem sx={{ height: 12, borderColor: 'rgba(255,255,255,0.1)' }} />
                        <span className="flex items-center gap-1">
                          {cmd.status === 'completed' ? (
                            <Chip 
                              label="Thành công" 
                              size="small" 
                              icon={<CheckCircle sx={{ color: '#10b981 !important' }} />} 
                              className="bg-green-500/10 text-green-400 border border-green-500/20"
                            />
                          ) : cmd.status === 'failed' ? (
                            <Chip 
                              label="Lỗi" 
                              size="small" 
                              icon={<Error sx={{ color: '#ef4444 !important' }} />} 
                              className="bg-red-500/10 text-red-500 border border-red-500/20"
                            />
                          ) : (
                            <Chip 
                              label="Đang xử lý" 
                              size="small" 
                              className="bg-primary-500/10 text-primary-400 border border-primary-500/20"
                            />
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {cmd.results && cmd.results.length > 0 && (
                    <Box className="mt-4 pt-4 border-t border-slate-700/50 bg-slate-900/40 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2 text-xs text-primary-400 font-semibold uppercase tracking-wider">
                        <AutoAwesome sx={{ fontSize: 16 }} />
                        Kết quả thực hiện
                      </div>
                      <div className="grid gap-2">
                        {cmd.results.map((res: any, idx: number) => (
                          <Typography key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                            {res.action === 'create_reminder' && "Đã tạo lịch nhắc mới"}
                            {res.action === 'generate_content' && "Đã soạn nội dung AI"}
                            {res.action === 'schedule_post' && "Đã lên lịch đăng bài"}
                            {res.error && `Lỗi: ${res.error}`}
                          </Typography>
                        ))}
                      </div>
                    </Box>
                  )}
                </Paper>
              </motion.div>
            ))
          )}
        </div>
      </Container>
    </main>
  );
}
