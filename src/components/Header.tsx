'use client';

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { SmartToy, Person } from '@mui/icons-material';
import Link from 'next/link';

export default function Header() {
  return (
    <AppBar position="static" elevation={0} className="bg-slate-800/50 backdrop-blur-md">
      <Toolbar className="flex justify-between">
        <Box className="flex items-center gap-2">
          <SmartToy className="text-primary-500" />
          <Typography variant="h6" className="font-bold text-white">
            QY Smart Assistant
          </Typography>
        </Box>
        
        <Box className="flex items-center gap-4">
          <Link href="/history" passHref>
            <Button color="inherit" className="text-gray-300">
              Lịch sử
            </Button>
          </Link>
          <Link href="/reminders" passHref>
            <Button color="inherit" className="text-gray-300">
              Nhắc việc
            </Button>
          </Link>
          <Link href="/profile" passHref>
            <Button 
              variant="outlined" 
              startIcon={<Person />}
              className="border-primary-500 text-primary-400"
            >
              Tài khoản
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
