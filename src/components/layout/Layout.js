import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { AnimatePresence } from 'framer-motion';

// Компоненты макета
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import Loader from '../common/Loader';

const Layout = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <Header />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 