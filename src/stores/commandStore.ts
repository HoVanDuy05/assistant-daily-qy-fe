import { create } from 'zustand';

interface Command {
  id: number;
  raw_input: string;
  status: string;
  results: unknown;
  created_at: string;
}

interface CommandState {
  currentCommand: Command | null;
  commandHistory: Command[];
  isProcessing: boolean;
  setCurrentCommand: (command: Command | null) => void;
  addToHistory: (command: Command) => void;
  setIsProcessing: (isProcessing: boolean) => void;
}

export const useCommandStore = create<CommandState>((set) => ({
  currentCommand: null,
  commandHistory: [],
  isProcessing: false,

  setCurrentCommand: (command) => set({ currentCommand: command }),

  addToHistory: (command) => set((state) => ({
    commandHistory: [command, ...state.commandHistory],
  })),

  setIsProcessing: (isProcessing) => set({ isProcessing }),
}));
