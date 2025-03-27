import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import VkIcon from '@mui/icons-material/Instagram';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FooterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#212529',
  color: '#fff',
  padding: theme.spacing(6, 0, 2, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 0, 2, 0),
  },
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(2),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: 40,
    height: 2,
    backgroundColor: theme.palette.primary.main,
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: 20,
    marginRight: theme.spacing(2),
    color: theme.palette.primary.main,
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255,255,255,0.1)',
  color: '#fff',
  margin: theme.spacing(0, 0.5),
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper component="footer">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* О компании */}
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ mb: { xs: 4, md: 0 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img src="/images/logo.png" alt="Чайный Маг" width={40} height={40} style={{ marginRight: 8 }} />
                <Typography variant="h6" component="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Чайный Маг
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                Мы поставляем лучшие сорта чая оптом для ресторанов, кафе и магазинов по всей России. Наши эксперты тщательно отбирают только качественные чаи.
              </Typography>
              <Box sx={{ display: 'flex', mb: 2 }}>
                <SocialIcon aria-label="facebook">
                  <FacebookIcon fontSize="small" />
                </SocialIcon>
                <SocialIcon aria-label="instagram">
                  <InstagramIcon fontSize="small" />
                </SocialIcon>
                <SocialIcon aria-label="telegram">
                  <TelegramIcon fontSize="small" />
                </SocialIcon>
                <SocialIcon aria-label="whatsapp">
                  <WhatsAppIcon fontSize="small" />
                </SocialIcon>
                <SocialIcon aria-label="vkontakte">
                  <VkIcon fontSize="small" />
                </SocialIcon>
              </Box>
            </Box>
          </Grid>

          {/* Быстрые ссылки */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6" component="h5">
              Разделы сайта
            </FooterTitle>
            <List disablePadding>
              <ListItem disableGutters sx={{ pb: 0.5 }}>
                <FooterLink component={RouterLink} to="/">Главная</FooterLink>
              </ListItem>
              <ListItem disableGutters sx={{ pb: 0.5 }}>
                <FooterLink component={RouterLink} to="/catalog">Каталог продукции</FooterLink>
              </ListItem>
              <ListItem disableGutters sx={{ pb: 0.5 }}>
                <FooterLink component={RouterLink} to="/about">О компании</FooterLink>
              </ListItem>
              <ListItem disableGutters sx={{ pb: 0.5 }}>
                <FooterLink component={RouterLink} to="/tea-history">История чая</FooterLink>
              </ListItem>
              <ListItem disableGutters sx={{ pb: 0.5 }}>
                <FooterLink component={RouterLink} to="/ceramics">Чайная керамика</FooterLink>
              </ListItem>
              <ListItem disableGutters sx={{ pb: 0.5 }}>
                <FooterLink component={RouterLink} to="/contact">Контакты</FooterLink>
              </ListItem>
            </List>
          </Grid>

          {/* Контактная информация */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6" component="h5">
              Контактная информация
            </FooterTitle>
            <ContactItem>
              <LocationOnIcon />
              <Typography variant="body2">
                г. Москва, ул. Чайная, д. 123, офис 45
              </Typography>
            </ContactItem>
            <ContactItem>
              <PhoneIcon />
              <FooterLink href="tel:+78001234567" variant="body2">
                8 (800) 123-45-67
              </FooterLink>
            </ContactItem>
            <ContactItem>
              <EmailIcon />
              <FooterLink href="mailto:info@tea-mag.ru" variant="body2">
                info@tea-mag.ru
              </FooterLink>
            </ContactItem>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Режим работы:</strong><br />
              Пн-Пт: 9:00 - 18:00<br />
              Сб-Вс: выходной
            </Typography>
          </Grid>

          {/* Рассылка */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterTitle variant="h6" component="h5">
              Подпишитесь на новости
            </FooterTitle>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Получайте последние новости и специальные предложения по электронной почте.
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                mb: 2
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Ваш email"
                size="small"
                fullWidth
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  input: { color: '#fff' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                  },
                }}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  ml: { sm: 1 },
                  mt: { xs: 1, sm: 0 },
                  minWidth: { xs: '100%', sm: 'auto' }
                }}
              >
                <ArrowForwardIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

        {/* Нижняя часть футера */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: { xs: 1, md: 0 } }}>
            &copy; {currentYear} Чайный Маг. Все права защищены.
          </Typography>
          <Box>
            <FooterLink href="#" sx={{ mx: 1 }}>
              Политика конфиденциальности
            </FooterLink>
            <FooterLink href="#" sx={{ mx: 1 }}>
              Условия использования
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterWrapper>
  );
};

export default Footer; 