'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextField, Button, Paper, Box, Chip, IconButton, Tooltip } from '@mui/material';
import { Send, AutoAwesome, Mic, History } from '@mui/icons-material';
import toast from 'react-hot-toast';
import api from '@/services/api';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface SmartInputProps {
  onResult: (results: ResultsData) => void;
  onHistoryClick?: () => void;
}

interface ResultsData {
  command_id: number;
  status: string;
  results: Array<{
    action: string;
    result: {
      status: 'success' | 'error';
      [key: string]: unknown;
    };
  }>;
  parsed_actions: Array<{
    type: string;
    params: unknown;
  }>;
}

const EXAMPLES = [
  { icon: '⏰', text: 'Nhắc tôi 3h chiều họp team' },
  { icon: '✍️', text: 'Viết bài giới thiệu sản phẩm đăng Facebook' },
  { icon: '💊', text: 'Tạo lịch nhắc uống thuốc 8h sáng' },
  { icon: '📧', text: 'Viết email xin nghỉ phép gửi sếp' },
];

export default function SmartInput({ onResult, onHistoryClick }: SmartInputProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error('Vui lòng nhập lệnh');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/commands/execute', { input });
      onResult(response.data.data);
      toast.success('Lệnh đã được xử lý thành công!');
      setInput('');
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      toast.error(err.response?.data?.message || 'Có lỗi xảy ra khi xử lý lệnh');
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Paper
        elevation={0}
        className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden relative"
      >
        {/* Animated background glow */}
        <AnimatePresence>
          {isFocused && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-purple-500/10 to-primary-500/10 blur-3xl"
            />
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="relative z-10">
          {/* Header */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="p-2 bg-primary-500/20 rounded-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <AutoAwesome className="text-primary-400" />
            </motion.div>
            <div>
              <h3 className="text-white font-semibold">Smart Input</h3>
              <p className="text-gray-400 text-sm">AI sẽ tự động hiểu và thực hiện</p>
            </div>
            {onHistoryClick && (
              <Tooltip title="Lịch sử lệnh">
                <IconButton
                  onClick={onHistoryClick}
                  className="ml-auto text-gray-400 hover:text-white"
                >
                  <History />
                </IconButton>
              </Tooltip>
            )}
          </motion.div>

          {/* Input field */}
          <motion.div
            className="relative mb-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Nhập lệnh của bạn... Ví dụ: Nhắc tôi 3h chiều họp team và viết bài giới thiệu sản phẩm đăng Facebook"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              disabled={loading}
              className="relative"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  borderRadius: '16px',
                  color: 'white',
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  transition: 'all 0.3s ease',
                  '& fieldset': {
                    borderColor: isFocused ? 'rgba(99, 102, 241, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                    borderWidth: '2px',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(99, 102, 241, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1',
                    boxShadow: '0 0 30px rgba(99, 102, 241, 0.2)',
                  },
                },
              }}
            />

            {/* Character count */}
            <motion.div
              className="absolute bottom-2 right-3 text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: input.length > 0 ? 1 : 0 }}
            >
              {input.length}/2000
            </motion.div>
          </motion.div>

          {/* Example chips */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {EXAMPLES.map((example, index) => (
              <motion.div key={index} variants={staggerItem}>
                <Tooltip title="Nhấn để sử dụng">
                  <Chip
                    icon={<span className="text-lg">{example.icon}</span>}
                    label={example.text}
                    size="small"
                    onClick={() => handleExampleClick(example.text)}
                    className="bg-slate-700/50 text-gray-300 hover:bg-primary-500/20 hover:text-primary-300 cursor-pointer transition-all duration-300 border border-transparent hover:border-primary-500/30"
                  />
                </Tooltip>
              </motion.div>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Box className="flex gap-2">
              <Tooltip title="Đang phát triển">
                <span>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Mic />}
                    disabled
                    className="border-slate-600 text-gray-400"
                  >
                    Giọng nói
                  </Button>
                </span>
              </Tooltip>
            </Box>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                variant="contained"
                disabled={loading || !input.trim()}
                endIcon={
                  loading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <AutoAwesome className="text-white/70" />
                    </motion.div>
                  ) : (
                    <Send />
                  )
                }
                className={`
                  px-8 py-3 rounded-xl font-semibold text-white
                  ${loading || !input.trim()
                    ? 'bg-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-500 hover:to-purple-500 shadow-lg shadow-primary-500/25'
                  }
                  transition-all duration-300
                `}
              >
                {loading ? 'AI đang xử lý...' : 'Thực hiện'}
              </Button>
            </motion.div>
          </motion.div>
        </form>

        {/* AI status indicator */}
        <motion.div
          className="mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-green-500"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="text-sm text-gray-400">
            AI đang sẵn sàng • Hỗ trợ: nhắc việc, tạo nội dung, đăng bài
          </span>
        </motion.div>
      </Paper>
    </motion.div>
  );
}
