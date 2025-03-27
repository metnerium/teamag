import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent,
  Paper,
  useTheme,
  useMediaQuery,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import getImagePath from '../utils/imageHelper';

// Иконки
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';

// Стилизованные компоненты
const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 40, 10, 0.7), rgba(0, 40, 10, 0.7)), url("/images/hero-bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: '#fff',
  padding: theme.spacing(15, 0),
  textAlign: 'center',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 240,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))',
  },
}));

const FeatureBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(3, 135, 52, 0.1)',
  },
  '& svg': {
    fontSize: 50,
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(6),
  paddingBottom: theme.spacing(2),
  display: 'inline-block',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 80,
    height: 3,
    backgroundColor: theme.palette.secondary.main,
  },
}));

// Анимационные варианты
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Главная страница
const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // Добавление наблюдателя за пересечением для анимаций
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.hidden').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Данные для карточек категорий
  const categories = [
    { 
      id: 1, 
      title: 'Чёрный чай', 
      description: 'Классические и ароматизированные купажи из разных стран', 
      image: '/images/black-tea.jpg',
      path: '/catalog?category=black'
    },
    { 
      id: 2, 
      title: 'Зелёный чай', 
      description: 'Свежие и легкие сорта для бодрости и здоровья', 
      image: '/images/green-tea.jpg',
      path: '/catalog?category=green'
    },
    { 
      id: 3, 
      title: 'Улуны', 
      description: 'Полуферментированные чаи с богатым вкусовым профилем', 
      image: '/images/oolong-tea.jpg',
      path: '/catalog?category=oolong'
    },
    { 
      id: 4, 
      title: 'Керамика', 
      description: 'Посуда ручной работы для чайной церемонии', 
      image: '/images/ceramics.jpg',
      path: '/ceramics'
    }
  ];

  // Данные для раздела преимуществ
  const features = [
    {
      id: 1,
      icon: <LocalShippingOutlinedIcon />,
      title: 'Доставка по всей России',
      description: 'Быстрая и надежная доставка во все регионы страны'
    },
    {
      id: 2,
      icon: <VerifiedOutlinedIcon />,
      title: 'Гарантия качества',
      description: 'Все наши продукты проходят строгий контроль качества'
    },
    {
      id: 3,
      icon: <SupportAgentOutlinedIcon />,
      title: 'Персональный менеджер',
      description: 'Индивидуальный подход к каждому клиенту'
    },
    {
      id: 4,
      icon: <PriceCheckOutlinedIcon />,
      title: 'Выгодные условия',
      description: 'Специальные цены для оптовых и постоянных клиентов'
    },
  ];

  return (
    <Box component="div">
      {/* Героический баннер */}
      <HeroSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                mb: 3
              }}
            >
              Премиальный чай для вашего бизнеса
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                maxWidth: '800px', 
                mx: 'auto', 
                mb: 5,
                opacity: 0.9
              }}
            >
              Поставки отборных сортов чая и авторской керамики для ресторанов, кафе и магазинов
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Button 
                variant="contained" 
                color="secondary" 
                size="large"
                component={Link}
                to="/catalog"
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Смотреть каталог
              </Button>
              <Button 
                variant="outlined"
                size="large" 
                sx={{ 
                  px: 4, 
                  py: 1.5,
                  fontSize: '1.1rem',
                  color: 'white',
                  borderColor: 'white',
                  '&:hover': {
                    borderColor: theme.palette.secondary.main,
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
                component={Link}
                to="/contact"
              >
                Связаться с нами
              </Button>
            </Box>
          </motion.div>
        </Container>
      </HeroSection>

      {/* Раздел категорий */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.default' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <SectionTitle variant="h2" component="h2">
              Наш ассортимент
            </SectionTitle>
            <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', mt: 2, mb: 4, color: 'text.secondary' }}>
              Мы предлагаем широкий выбор чая со всего мира: от классических черных сортов до изысканных улунов и натуральной керамики ручной работы.
            </Typography>
          </Box>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={4}>
              {categories.map((category) => (
                <Grid item xs={12} sm={6} md={3} key={category.id}>
                  <motion.div variants={fadeInUp}>
                    <CategoryCard component={Link} to={category.path} sx={{ textDecoration: 'none' }}>
                      <StyledCardMedia
                        image={getImagePath(category.image)}
                        title={category.title}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                          {category.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {category.description}
                        </Typography>
                      </CardContent>
                    </CategoryCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={Link}
              to="/catalog"
              sx={{ px: 4 }}
            >
              Весь каталог
            </Button>
          </Box>
        </Container>
      </Box>
      
      {/* Промо-блок */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 }, 
          backgroundColor: theme.palette.primary.main,
          color: 'white'
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box className="hidden">
                <Typography 
                  variant="h3" 
                  component="h2" 
                  gutterBottom
                  sx={{ fontWeight: 700 }}
                >
                  Чай высочайшего качества для вашего бизнеса
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, opacity: 0.9 }}>
                  Наша компания специализируется на оптовых поставках премиального чая для ресторанов, кафе, чайных магазинов и отелей. Мы сотрудничаем напрямую с плантациями и обеспечиваем стабильные поставки по всей России.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    size="large"
                    component={Link}
                    to="/about"
                  >
                    О нашей компании
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large"
                    sx={{ 
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: theme.palette.secondary.main
                      }
                    }}
                    component={Link}
                    to="/tea-history"
                  >
                    Чайные истории
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box 
                className="hidden"
                component="img"
                src="/images/tea-ceremony.jpg"
                alt="Чайная церемония"
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Преимущества */}
      <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'background.paper' }}>
        <Container>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <SectionTitle variant="h2" component="h2">
              Наши преимущества
            </SectionTitle>
            <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', color: 'text.secondary' }}>
              Мы создаем комфортные условия для сотрудничества и предлагаем лучший сервис для наших клиентов
            </Typography>
          </Box>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={3}>
              {features.map((feature) => (
                <Grid item xs={12} sm={6} md={3} key={feature.id}>
                  <motion.div variants={fadeInUp}>
                    <FeatureBox elevation={1}>
                      {feature.icon}
                      <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </FeatureBox>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Призыв к действию */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 10 }, 
          backgroundImage: 'linear-gradient(rgba(0, 40, 10, 0.8), rgba(0, 40, 10, 0.8)), url("/images/cta-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container>
          <Box sx={{ maxWidth: 800, mx: 'auto' }} className="hidden">
            <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Начните сотрудничество уже сегодня
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 'normal' }}>
              Оставьте заявку и наш менеджер свяжется с вами для обсуждения условий сотрудничества
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              component={Link}
              to="/contact"
              sx={{ 
                px: 5, 
                py: 1.5,
                fontSize: '1.1rem'
              }}
            >
              Оставить заявку
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 