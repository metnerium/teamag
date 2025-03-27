import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button,
  Paper,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 200px)',
        py: 10,
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 4, md: 6 },
              borderRadius: 3,
              backgroundColor: 'background.paper',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box 
              sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '8px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`
              }}
            />
            
            <Typography 
              variant="h1" 
              component="h1" 
              color="primary"
              sx={{ 
                fontSize: { xs: '5rem', md: '8rem' },
                fontWeight: 800,
                mb: 2,
                mt: 2
              }}
            >
              404
            </Typography>
            
            <Typography 
              variant="h3" 
              component="h2"
              sx={{ 
                fontWeight: 600,
                mb: 3
              }}
            >
              Страница не найдена
            </Typography>
            
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                color: 'text.secondary'
              }}
            >
              Возможно, она была перемещена или удалена. Проверьте правильность введенного адреса или вернитесь на главную страницу.
            </Typography>
            
            <Button 
              component={Link} 
              to="/"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mr: 2, mb: { xs: 2, sm: 0 } }}
            >
              На главную
            </Button>
            
            <Button 
              component={Link} 
              to="/catalog"
              variant="outlined"
              color="primary"
              size="large"
            >
              Перейти в каталог
            </Button>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default NotFoundPage; 