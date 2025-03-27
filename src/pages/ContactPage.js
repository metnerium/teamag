import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  TextField, 
  Button, 
  Snackbar,
  Alert,
  InputAdornment,
  Breadcrumbs,
  Link,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Стилизованные компоненты
const ContactHero = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 40, 10, 0.8), rgba(0, 40, 10, 0.8)), url("/images/contact-hero.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(10, 0),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

const ContactCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: 50,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
  },
}));

const ContactPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // Состояние для формы
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });
  
  // Состояние для ошибок
  const [errors, setErrors] = useState({});
  
  // Состояние для уведомления
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  
  // Обработка изменений в форме
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Сброс ошибки при изменении поля
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };
  
  // Валидация формы
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Пожалуйста, укажите ваше имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Пожалуйста, укажите ваш email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, укажите корректный email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Пожалуйста, введите сообщение';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Здесь будет логика отправки формы на сервер
      console.log('Отправка формы:', formData);
      
      // Сброс формы
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: '',
      });
      
      // Показ уведомления об успешной отправке
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.',
      });
    }
  };
  
  // Закрытие уведомления
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // Информация о контактах
  const contactInfo = [
    {
      icon: <PhoneIcon />,
      title: 'Телефон',
      content: '+7 (999) 123-45-67',
      description: 'Пн-Пт с 9:00 до 18:00',
    },
    {
      icon: <EmailIcon />,
      title: 'Email',
      content: 'info@chainymag.ru',
      description: 'Отвечаем в течение 24 часов',
    },
    {
      icon: <LocationOnIcon />,
      title: 'Адрес',
      content: 'г. Казань, ул. Чайная, 123',
      description: 'Офис и шоу-рум',
    },
    {
      icon: <AccessTimeIcon />,
      title: 'Часы работы',
      content: 'Пн-Пт: 9:00 - 18:00',
      description: 'Сб: 10:00 - 16:00, Вс: выходной',
    },
  ];

  return (
    <Box component="div">
      {/* Хлебные крошки */}
      <Container maxWidth="xl" sx={{ pt: 3 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" href="/">
            Главная
          </Link>
          <Typography color="text.primary">Контакты</Typography>
        </Breadcrumbs>
      </Container>

      {/* Герой-секция */}
      <ContactHero>
        <Container maxWidth="xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              align="center"
              sx={{ 
                fontWeight: 800,
                mb: 3
              }}
            >
              Свяжитесь с нами
            </Typography>
            <Typography 
              variant="h5" 
              align="center"
              sx={{ 
                maxWidth: 800, 
                mx: 'auto', 
                mb: 2,
                opacity: 0.9
              }}
            >
              Мы всегда рады ответить на ваши вопросы и помочь выбрать оптимальные решения для вашего бизнеса
            </Typography>
          </motion.div>
        </Container>
      </ContactHero>

      {/* Контактная информация */}
      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {contactInfo.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ContactCard>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {item.icon}
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                      {item.content}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </ContactCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Форма обратной связи и карта */}
      <Box sx={{ backgroundColor: 'background.default', py: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Оставьте заявку
              </Typography>
              <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
                Заполните форму ниже, и наш менеджер свяжется с вами для обсуждения условий сотрудничества. Мы подберем оптимальное решение для вашего бизнеса.
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Ваше имя"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      required
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Компания"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Телефон"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="action" fontSize="small" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Сообщение"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message}
                      required
                      multiline
                      rows={5}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      sx={{ py: 1.5, px: 4 }}
                    >
                      Отправить заявку
                    </Button>
                  </Grid>
                </Grid>
              </form>
              
              <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              >
                <Alert 
                  onClose={handleCloseSnackbar} 
                  severity={snackbar.severity}
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={3} 
                sx={{ 
                  borderRadius: 2, 
                  overflow: 'hidden', 
                  height: '100%', 
                  minHeight: 450,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              >
                {/* Заглушка для карты - в реальном проекте здесь была бы Google Maps или Яндекс.Карты */}
                <Box 
                  sx={{ 
                    width: '100%', 
                    height: '100%',
                    backgroundColor: '#f0f0f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="body1" color="text.secondary">
                    Здесь будет карта с расположением офиса
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Раздел для оптовых клиентов */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Для оптовых клиентов
              </Typography>
              <Typography variant="body1" paragraph>
                Мы предлагаем специальные условия для оптовых закупок. Наша команда профессионалов поможет вам подобрать оптимальный ассортимент, соответствующий вашим требованиям и бюджету.
              </Typography>
              <Typography variant="body1" paragraph>
                Преимущества оптового сотрудничества:
              </Typography>
              <ul>
                <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                  Специальные цены на крупные заказы
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                  Бесплатная доставка от определенной суммы заказа
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                  Индивидуальный подход и гибкие условия сотрудничества
                </Typography>
                <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                  Возможность создания индивидуальных чайных купажей
                </Typography>
                <Typography component="li" variant="body1">
                  Консультационная поддержка от чайных экспертов
                </Typography>
              </ul>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ mt: 3, py: 1.5, px: 4 }}
              >
                Запросить оптовый прайс-лист
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/images/wholesale.jpg"
                alt="Оптовые поставки"
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: '0 15px 40px rgba(0,0,0,0.15)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactPage; 