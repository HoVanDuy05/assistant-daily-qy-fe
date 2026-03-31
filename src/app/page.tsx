'use client';

import { useState } from 'react';
import { Container, Box } from '@mui/material';
import SmartInput from './home/components/SmartInput';
import ResultsPanel from './home/components/ResultsPanel';
import Header from '@/components/Header';
import { motion } from 'framer-motion';

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

export default function Home() {
  const [results, setResults] = useState<ResultsData | null>(null);

  return (
    <main className="min-h-screen">
      <Header />

      <Container maxWidth="lg" className="py-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            QY Smart Assistant
          </motion.h1>
          <motion.p
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Một ô input duy nhất. Mọi thao tác. AI tự động hiểu và thực hiện.
          </motion.p>
        </motion.div>

        {/* Smart Input */}
        <Box className="mb-8">
          <SmartInput onResult={setResults} />
        </Box>

        {/* Results Panel */}
        {results && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ResultsPanel results={results} onClose={() => setResults(null)} />
          </motion.div>
        )}
      </Container>
    </main>
  );
}
