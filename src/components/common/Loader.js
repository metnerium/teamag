import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import getImagePath from '../../utils/imageHelper';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const LogoWrapper = styled('div')`
  animation: ${float} 3s ease-in-out infinite;
`;

const Container = styled('div')`
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const Logo = styled('div')`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #038734;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(3, 135, 52, 0.3);
`;

const Loader = () => {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          backgroundColor: '#f8f9fa',
        }}
      >
        <LogoWrapper>
          <Logo>
            <img src={getImagePath('/images/logo.png')} alt="Чайный Маг" width={50} height={50}/>
          </Logo>
        </LogoWrapper>
        <CircularProgress 
          size={40} 
          thickness={4} 
          sx={{ 
            color: '#038734',
            mb: 2
          }}
        />
        <Typography
          variant="h6"
          sx={{
            color: '#333',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Загружаем мир чая...
        </Typography>
      </Box>
    </Container>
  );
};

export default Loader; 