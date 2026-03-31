import { useEffect, useState, useCallback } from 'react';
import api from '@/services/api';

interface Command {
  id: number;
  raw_input: string;
  status: string;
  created_at: string;
  parsed_actions: Array<{ type: string }>;
}

interface UseCommandHistoryReturn {
  commands: Command[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useCommandHistory(): UseCommandHistoryReturn {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/commands/history');
      setCommands(response.data.data.data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    commands,
    loading,
    error,
    refetch: fetchHistory,
  };
}
