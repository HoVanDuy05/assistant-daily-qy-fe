'use client';

import { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { SmartToy, Person, History, Alarm, Menu as MenuIcon, Close } from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Trang chủ', path: '/', icon: <SmartToy /> },
    { label: 'Lịch sử', path: '/history', icon: <History /> },
    { label: 'Nhắc việc', path: '/reminders', icon: <Alarm /> },
  ];

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  return (
    <>
      <AppBar position="sticky" elevation={0} className="bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
        <Toolbar className="max-w-7xl mx-auto w-full flex justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="no-underline flex items-center gap-2.5">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="p-1.5 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20"
            >
              <SmartToy className="text-white" />
            </motion.div>
            <Typography variant="h6" className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 hidden sm:block">
              QY Assistant
            </Typography>
          </Link>
          
          {/* Desktop Nav */}
          <Box className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} passHref>
                <Button 
                  className={`px-4 py-2 rounded-xl transition-all ${
                    pathname === item.path 
                    ? 'bg-white/10 text-white font-bold' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
            <Divider orientation="vertical" flexItem className="h-6 self-center mx-2 border-white/10" />
            <Link href="/profile" passHref>
              <Button 
                variant="contained" 
                startIcon={<Person />}
                className="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-5 shadow-lg shadow-indigo-500/20 ml-2"
              >
                Tài khoản
              </Button>
            </Link>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton 
            className="md:hidden text-white bg-white/5 hover:bg-white/10 rounded-xl"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          className: "w-72 bg-slate-900 border-l border-white/5 shadow-2xl"
        }}
      >
        <Box className="flex flex-col h-full py-6">
          <Box className="flex items-center justify-between px-6 mb-8">
            <Typography variant="h6" className="font-bold text-white">Menu</Typography>
            <IconButton onClick={toggleDrawer(false)} className="text-gray-400">
              <Close />
            </IconButton>
          </Box>

          <List className="px-3 flex-1">
            {navItems.map((item) => (
              <ListItem key={item.path} disablePadding className="mb-2">
                <Link href={item.path} className="w-full no-underline" onClick={() => setIsDrawerOpen(false)}>
                  <ListItemButton className={`rounded-xl py-3 ${pathname === item.path ? 'bg-indigo-600/10 text-indigo-400' : 'text-gray-400'}`}>
                    <ListItemIcon className={pathname === item.path ? 'text-indigo-400' : 'text-gray-400'}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} primaryTypographyProps={{ className: "font-bold" }} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>

          <Box className="px-6 mt-auto">
            <Link href="/profile" onClick={() => setIsDrawerOpen(false)} className="no-underline">
              <Button 
                fullWidth 
                variant="contained" 
                startIcon={<Person />}
                className="bg-indigo-600 hover:bg-indigo-500 py-4 rounded-2xl shadow-xl shadow-indigo-500/20 font-bold"
              >
                Tài khoản của tôi
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
