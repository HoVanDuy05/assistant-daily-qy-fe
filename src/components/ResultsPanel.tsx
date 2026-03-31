'use client';

import { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Chip,
  IconButton,
  Collapse
} from '@mui/material';
import {
  AccessTime,
  Create,
  Share,
  ExpandMore,
  ExpandLess,
  Notifications,
  CheckCircle,
  Error
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

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
}

const ACTION_ICONS: Record<string, React.ComponentType<{ fontSize?: 'small' | 'medium' | 'large' }>> = {
  create_reminder: AccessTime,
  generate_content: Create,
  schedule_post: Share,
};

const ACTION_COLORS: Record<string, string> = {
  create_reminder: 'bg-blue-500',
  generate_content: 'bg-green-500',
  schedule_post: 'bg-purple-500',
};

const ACTION_LABELS: Record<string, string> = {
  create_reminder: 'Tạo nhắc việc',
  generate_content: 'Tạo nội dung',
  schedule_post: 'Đăng bài',
};

export default function ResultsPanel({ results }: ResultsPanelProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <Paper
      elevation={0}
      className="p-6 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl"
    >
      <Typography variant="h6" className="text-white mb-4 flex items-center gap-2">
        <CheckCircle className="text-green-500" />
        Kết quả xử lý
      </Typography>

      <Box className="space-y-3">
        {results.results.map((item, index) => {
          const Icon = ACTION_ICONS[item.action] || Notifications;
          const colorClass = ACTION_COLORS[item.action] || 'bg-gray-500';
          const label = ACTION_LABELS[item.action] || item.action;
          const isSuccess = item.result.status === 'success';

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-slate-700/50 border-slate-600">
                <CardContent className="p-4">
                  <Box className="flex items-center justify-between">
                    <Box className="flex items-center gap-3">
                      <Box className={`p-2 rounded-lg ${colorClass}`}>
                        <Icon className="text-white" fontSize="small" />
                      </Box>
                      <Box>
                        <Typography className="text-white font-medium">
                          {label}
                        </Typography>
                        <Chip
                          size="small"
                          label={isSuccess ? 'Thành công' : 'Lỗi'}
                          className={isSuccess ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                          icon={isSuccess ? <CheckCircle fontSize="small" /> : <Error fontSize="small" />}
                        />
                      </Box>
                    </Box>

                    <IconButton onClick={() => toggleExpand(index)} className="text-gray-400">
                      {expanded === index ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>

                  <Collapse in={expanded === index}>
                    <Box className="mt-4 p-3 bg-slate-900/50 rounded-lg">
                      {item.action === 'create_reminder' && (
                        <Box>
                          <Typography className="text-gray-400 text-sm">Nội dung:</Typography>
                          <Typography className="text-white">{item.result.content}</Typography>
                          <Typography className="text-gray-400 text-sm mt-2">Thời gian:</Typography>
                          <Typography className="text-primary-400">
                            {format(new Date(item.result.remind_at), 'PPpp', { locale: vi })}
                          </Typography>
                        </Box>
                      )}

                      {item.action === 'generate_content' && (
                        <Box>
                          <Typography className="text-gray-400 text-sm">Nội dung đã tạo:</Typography>
                          <Typography className="text-white whitespace-pre-wrap mt-2">
                            {item.result.content}
                          </Typography>
                        </Box>
                      )}

                      {item.action === 'schedule_post' && (
                        <Box>
                          <Typography className="text-gray-400 text-sm">Nền tảng:</Typography>
                          <Typography className="text-white capitalize">{item.result.platform}</Typography>
                          {item.result.scheduled_at && (
                            <>
                              <Typography className="text-gray-400 text-sm mt-2">Lên lịch:</Typography>
                              <Typography className="text-primary-400">
                                {format(new Date(item.result.scheduled_at), 'PPpp', { locale: vi })}
                              </Typography>
                            </>
                          )}
                        </Box>
                      )}
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Box>
    </Paper>
  );
}
