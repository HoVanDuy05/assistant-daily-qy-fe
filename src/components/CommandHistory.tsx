'use client';

import { useCommandHistory } from '@/hooks/useCommandHistory';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Chip,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  History,
  Replay,
  AccessTime,
  Create,
  Share,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { SvgIconProps } from '@mui/material';

const ACTION_ICONS: Record<string, React.ComponentType<SvgIconProps>> = {
  create_reminder: AccessTime,
  generate_content: Create,
  schedule_post: Share,
};

const STATUS_COLORS: Record<string, 'default' | 'success' | 'error' | 'warning'> = {
  pending: 'warning',
  processing: 'default',
  completed: 'success',
  failed: 'error',
};

export default function CommandHistory() {
  const { commands, loading, refetch } = useCommandHistory();

  const handleRetry = (command: { id: number; raw_input: string }) => {
    // Retry logic here
    console.log('Retrying command:', command.raw_input);
  };

  if (loading) {
    return (
      <Paper className="p-6 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl">
        <Box className="flex justify-center py-8">
          <CircularProgress />
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={0}
      className="p-6 bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-2xl"
    >
      <Typography variant="h6" className="text-white mb-4 flex items-center gap-2">
        <History className="text-primary-500" />
        Lịch sử lệnh
      </Typography>

      {commands.length === 0 ? (
        <Typography className="text-gray-400 text-center py-8">
          Chưa có lệnh nào. Hãy thử nhập lệnh đầu tiên!
        </Typography>
      ) : (
        <List className="space-y-2">
          {commands.map((command) => (
            <ListItem
              key={command.id}
              className="bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <ListItemIcon>
                {command.parsed_actions?.map((action, idx) => {
                  const Icon = ACTION_ICONS[action.type] || History;
                  return <Icon key={idx} className="text-gray-400" fontSize="small" />;
                })}
              </ListItemIcon>
              <ListItemText
                primary={<Typography className="text-white truncate">{command.raw_input}</Typography>}
                secondary={
                  <Box className="flex items-center gap-2 mt-1">
                    <Typography className="text-gray-400 text-sm">
                      {format(new Date(command.created_at), 'PPp', { locale: vi })}
                    </Typography>
                    <Chip
                      size="small"
                      label={command.status}
                      color={STATUS_COLORS[command.status] || 'default'}
                      className="text-xs"
                    />
                  </Box>
                }
              />
              <IconButton
                edge="end"
                onClick={() => handleRetry(command)}
                className="text-gray-400 hover:text-white"
              >
                <Replay />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
