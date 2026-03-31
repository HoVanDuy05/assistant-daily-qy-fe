'use client';

import { useState } from 'react';
import { TextField, Button, Paper, CircularProgress, Box, Chip } from '@mui/material';
import { Send, AutoAwesome } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '@/services/api';

interface SmartInputProps {
  onResult: (results: unknown) => void;
}

const EXAMPLES = [
  'Nhắc tôi 3h chiều họp team',
  'Viết bài giới thiệu sản phẩm mới đăng Facebook',
  'Tạo lịch nhắc uống thuốc 8h sáng mỗi ngày',
  'Viết email xin nghỉ phép gửi sếp',
];

export default function SmartInput({ onResult }: SmartInputProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await api.post('/commands/execute', { input });
      onResult(response.data.data);
      toast.success('Lệnh đã được xử lý!');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  return (
    <Paper
      elevation={0}
      className="p-6 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl"
    >
      <form onSubmit={handleSubmit}>
        <Box className="relative">
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Nhập lệnh của bạn... Ví dụ: Nhắc tôi 3h chiều họp team và viết bài giới thiệu sản phẩm đăng Facebook"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mb-4"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                borderRadius: '12px',
                color: 'white',
                '& fieldset': {
                  borderColor: 'rgba(99, 102, 241, 0.3)',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(99, 102, 241, 0.5)',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6366f1',
                  boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)',
                },
              },
            }}
          />

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-xl"
              >
                <CircularProgress className="text-primary-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        <Box className="flex justify-between items-center">
          <Box className="flex gap-2 flex-wrap">
            {EXAMPLES.map((example) => (
              <Chip
                key={example}
                label={example}
                size="small"
                onClick={() => handleExampleClick(example)}
                className="bg-slate-700 text-gray-300 cursor-pointer hover:bg-slate-600"
              />
            ))}
          </Box>

          <Button
            type="submit"
            variant="contained"
            disabled={loading || !input.trim()}
            endIcon={loading ? <CircularProgress size={20} /> : <Send />}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl"
          >
            {loading ? 'Đang xử lý...' : 'Thực hiện'}
          </Button>
        </Box>
      </form>

      <Box className="mt-4 flex gap-2 text-sm text-gray-400">
        <AutoAwesome fontSize="small" className="text-yellow-500" />
        <span>AI sẽ tự động phân tích và thực hiện: nhắc việc, tạo nội dung, đăng bài...</span>
      </Box>
    </Paper>
  );
}
