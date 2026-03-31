'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AccessTime,
  Create,
  Share,
  CheckCircle,
  Error,
  ExpandMore,
  Notifications,
} from '@mui/icons-material';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Collapse,
  Button,
} from '@mui/material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface ResultsPanelProps {
  results: {
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
  };
  onClose?: () => void;
}

const ACTION_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string; fontSize?: 'small' | 'medium' | 'large' }>; color: string; label: string }> = {
  create_reminder: { icon: AccessTime, color: 'from-blue-500 to-cyan-500', label: 'Tạo nhắc việc' },
  generate_content: { icon: Create, color: 'from-green-500 to-emerald-500', label: 'Tạo nội dung' },
  schedule_post: { icon: Share, color: 'from-purple-500 to-pink-500', label: 'Đăng bài' },
};

const STATUS_CONFIG: Record<string, { color: string; icon: React.ComponentType<{ className?: string; fontSize?: 'small' | 'medium' | 'large' }>; label: string }> = {
  success: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle, label: 'Thành công' },
  error: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: Error, label: 'Lỗi' },
  pending: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Notifications, label: 'Đang xử lý' },
};

export default function ResultsPanel({ results, onClose }: ResultsPanelProps) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const allSuccess = results.results.every(r => r.result.status === 'success');
    if (allSuccess) {
      setTimeout(() => setShowConfetti(true), 0);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [results]);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  // Generate confetti particles with stable values
  const confettiParticles = useMemo(() => {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'];
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      color: colors[i % 4],
      x: (i * 17) % 100,
      xOffset: ((i * 13) % 200) - 100,
      rotation: (i * 37) % 720,
      duration: 2 + (i % 3),
      delay: (i % 10) * 0.1,
    }));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Paper
        elevation={0}
        className="p-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden relative"
      >
        {/* Success confetti effect */}
        <AnimatePresence>
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {confettiParticles.map((particle: { id: number; color: string; x: number; xOffset: number; rotation: number; duration: number; delay: number }) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: particle.color,
                    left: `${particle.x}%`,
                    top: -10,
                  }}
                  initial={{ y: 0, opacity: 1, scale: 0 }}
                  animate={{
                    y: 400,
                    opacity: 0,
                    scale: [0, 1, 0],
                    x: particle.xOffset,
                    rotate: particle.rotation,
                  }}
                  transition={{
                    duration: particle.duration,
                    ease: 'easeOut',
                    delay: particle.delay,
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="p-2 bg-green-500/20 rounded-xl"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <CheckCircle className="text-green-400" />
            </motion.div>
            <div>
              <Typography variant="h6" className="text-white font-bold">
                Kết quả xử lý
              </Typography>
              <Typography className="text-gray-400 text-sm">
                {results.results.length} hành động đã được thực hiện
              </Typography>
            </div>
          </div>
          {onClose && (
            <Button
              variant="outlined"
              size="small"
              onClick={onClose}
              className="border-slate-600 text-gray-400 hover:text-white"
            >
              Đóng
            </Button>
          )}
        </motion.div>

        {/* Results list */}
        <motion.div
          className="space-y-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {results.results.map((item, index) => {
            const config = ACTION_CONFIG[item.action] || {
              icon: Notifications,
              color: 'from-gray-500 to-gray-600',
              label: item.action,
            };
            const Icon = config.icon;
            const isSuccess = item.result.status === 'success';
            const statusConfig = STATUS_CONFIG[item.result.status] || STATUS_CONFIG.pending;
            const StatusIcon = statusConfig.icon;

            return (
              <motion.div key={index} variants={staggerItem}>
                <Card className="bg-slate-700/30 border-slate-600/30 hover:bg-slate-700/50 transition-all duration-300">
                  <CardContent className="p-4">
                    <Box className="flex items-center justify-between">
                      <Box className="flex items-center gap-4">
                        {/* Action icon */}
                        <motion.div
                          className={`p-3 rounded-xl bg-gradient-to-br ${config.color} shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Icon className="text-white" fontSize="small" />
                        </motion.div>

                        {/* Action info */}
                        <Box>
                          <Typography className="text-white font-semibold">
                            {config.label}
                          </Typography>
                          <Chip
                            size="small"
                            label={statusConfig.label}
                            className={`${statusConfig.color} text-xs mt-1`}
                            icon={<StatusIcon fontSize="small" />}
                          />
                        </Box>
                      </Box>

                      {/* Expand button */}
                      <IconButton
                        onClick={() => toggleExpand(index)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <motion.div
                          animate={{ rotate: expanded === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ExpandMore />
                        </motion.div>
                      </IconButton>
                    </Box>

                    {/* Expanded details */}
                    <Collapse in={expanded === index} timeout="auto" unmountOnExit>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-slate-600/30"
                      >
                        <Box className="bg-slate-800/50 rounded-xl p-4">
                          {item.action === 'create_reminder' && isSuccess && (
                            <Box className="space-y-2">
                              <div>
                                <Typography className="text-gray-400 text-sm">Nội dung nhắc:</Typography>
                                <Typography className="text-white font-medium">{item.result.content as string}</Typography>
                              </div>
                              <div>
                                <Typography className="text-gray-400 text-sm">Thời gian:</Typography>
                                <Typography className="text-primary-400 font-medium">
                                  {format(new Date(item.result.remind_at as string), 'PPpp', { locale: vi })}
                                </Typography>
                              </div>
                            </Box>
                          )}

                          {item.action === 'generate_content' && isSuccess && (
                            <Box>
                              <Typography className="text-gray-400 text-sm mb-2">Nội dung đã tạo:</Typography>
                              <Paper className="p-4 bg-slate-900/50 border border-slate-700/50">
                                <Typography className="text-white whitespace-pre-wrap leading-relaxed">
                                  {item.result.content as string}
                                </Typography>
                              </Paper>
                              <Box className="mt-3 flex gap-2">
                                <Button
                                  variant="outlined"
                                  size="small"
                                  className="border-slate-600 text-gray-300"
                                  onClick={() => navigator.clipboard.writeText(item.result.content as string)}
                                >
                                  Sao chép
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  className="border-slate-600 text-gray-300"
                                >
                                  Chỉnh sửa
                                </Button>
                              </Box>
                            </Box>
                          )}

                          {item.action === 'schedule_post' && isSuccess && (
                            <Box className="space-y-2">
                              <div>
                                <Typography className="text-gray-400 text-sm">Nền tảng:</Typography>
                                <Typography className="text-white font-medium capitalize">
                                  {item.result.platform as string}
                                </Typography>
                              </div>
                              {item.result.scheduled_at !== null && (
                                <div>
                                  <Typography className="text-gray-400 text-sm">Lên lịch đăng:</Typography>
                                  <Typography className="text-primary-400 font-medium">
                                    {format(new Date(item.result.scheduled_at as string), 'PPpp', { locale: vi })}
                                  </Typography>
                                </div>
                              )}
                              {item.result.scheduled_at === null && (
                                <div>
                                  <Typography className="text-green-400 font-medium">
                                    Sẽ được đăng ngay lập tức
                                  </Typography>
                                </div>
                              )}
                            </Box>
                          )}

                          {!isSuccess && (
                            <Box>
                              <Typography className="text-red-400">
                                {item.result.message as string || 'Có lỗi xảy ra'}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </motion.div>
                    </Collapse>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </Paper>
    </motion.div>
  );
}
