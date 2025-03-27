import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Card, 
  CardContent,
  Breadcrumbs,
  Link,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedIcon from '@mui/icons-material/Verified';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

// Стилизованные компоненты
const AboutHero = styled(Box)(({ theme }) => ({
  backgroundImage: 'linear-gradient(rgba(0, 40, 10, 0.8), rgba(0, 40, 10, 0.8)), url("/images/about-hero.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(12, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 0),
  },
}));

const ValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
}));

const TeamMemberCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
  borderRadius: theme.shape.borderRadius,
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

// Страница "О нас"
const AboutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Данные для секции ценностей
  const values = [
    {
      id: 1,
      icon: <VerifiedIcon fontSize="large" color="primary" />,
      title: 'Качество',
      description: 'Мы отбираем только лучшие сорта чая, гарантируя высокое качество каждой поставки.',
    },
    {
      id: 2,
      icon: <GroupsIcon fontSize="large" color="primary" />,
      title: 'Партнерство',
      description: 'Строим долгосрочные и взаимовыгодные отношения с клиентами и поставщиками.',
    },
    {
      id: 3,
      icon: <TimelineIcon fontSize="large" color="primary" />,
      title: 'Развитие',
      description: 'Постоянно изучаем рынок и расширяем ассортимент, следуя последним тенденциям.',
    },
    {
      id: 4,
      icon: <LocalShippingIcon fontSize="large" color="primary" />,
      title: 'Надежность',
      description: 'Обеспечиваем своевременные поставки и стабильное наличие продукции на складе.',
    },
  ];

  // Данные для секции команды
  const teamMembers = [
    {
      id: 1,
      name: 'Алексей Чайников',
      position: 'Генеральный директор',
      photo: '/images/team1.jpg',
    },
    {
      id: 2,
      name: 'Елена Листова',
      position: 'Руководитель отдела продаж',
      photo: '/images/team2.jpg',
    },
    {
      id: 3,
      name: 'Михаил Улунов',
      position: 'Главный технолог',
      photo: '/images/team3.jpg',
    },
  ];

  // Варианты анимации
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
      transition: { staggerChildren: 0.2 }
    }
  };

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
          <Typography color="text.primary">О компании</Typography>
        </Breadcrumbs>
      </Container>

      {/* Герой-секция */}
      <AboutHero>
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
              О компании "Чайный Маг"
            </Typography>
            <Typography 
              variant="h5" 
              align="center"
              sx={{ 
                maxWidth: 900, 
                mx: 'auto',
                mb: 4,
                opacity: 0.9
              }}
            >
              Мы создаем чайную культуру для вашего бизнеса, поставляя лучшие сорта чая со всего мира
            </Typography>
          </motion.div>
        </Container>
      </AboutHero>

      {/* История компании */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                component="img"
                src="/images/about-story.jpg"
                alt="История компании"
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  mb: { xs: 4, md: 0 }
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Наша история
              </Typography>
              <Typography variant="body1" paragraph>
                Компания "Чайный Маг" была основана в 2010 году группой энтузиастов, влюбленных в чай и его богатую культуру. Наше путешествие началось с небольшого офиса и склада площадью всего 50 квадратных метров.
              </Typography>
              <Typography variant="body1" paragraph>
                За годы работы мы выросли в одного из ведущих поставщиков премиального чая для ресторанов, кафе и чайных магазинов по всей России. Сегодня мы сотрудничаем напрямую с плантациями в Китае, Индии, Японии, Шри-Ланке и других странах, обеспечивая нашим клиентам доступ к лучшим сортам чая.
              </Typography>
              <Typography variant="body1">
                Наша команда регулярно посещает чайные фестивали, выставки и плантации, чтобы быть в курсе последних тенденций и инноваций в чайной индустрии. Это позволяет нам предлагать клиентам не только проверенную классику, но и уникальные новинки.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Миссия и ценности */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.paper', textAlign: 'center' }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h2" component="h2">
            Миссия и ценности
          </SectionTitle>
          <Typography variant="body1" sx={{ maxWidth: 900, mx: 'auto', mb: 6, color: 'text.secondary' }}>
            Наша миссия — продвигать культуру качественного чая в России, делая премиальные сорта доступными для бизнеса и конечных потребителей. Мы стремимся создавать и поддерживать высокие стандарты чайной индустрии.
          </Typography>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={4}>
              {values.map((value) => (
                <Grid item xs={12} sm={6} md={3} key={value.id}>
                  <motion.div variants={fadeInUp}>
                    <ValueCard>
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Box sx={{ mb: 2 }}>
                          {value.icon}
                        </Box>
                        <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                          {value.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {value.description}
                        </Typography>
                      </CardContent>
                    </ValueCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Преимущества работы с нами */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                Почему выбирают нас
              </Typography>
              <Typography variant="body1" paragraph>
                "Чайный Маг" — это не просто поставщик чая, а надежный партнер, который поможет вашему бизнесу процветать. Мы предлагаем полный спектр услуг: от подбора ассортимента до обучения персонала.
              </Typography>
              
              <List>
                {[
                  'Прямые поставки с плантаций без посредников',
                  'Гарантия свежести и качества каждой партии',
                  'Индивидуальный подход к формированию заказа',
                  'Оперативная доставка по всей России',
                  'Поддержка и консультации на всех этапах сотрудничества',
                  'Обучение персонала особенностям заваривания и подачи чая'
                ].map((item, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <CheckCircleOutlineIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box 
                component="img"
                src="/images/about-why-us.jpg"
                alt="Преимущества работы с нами"
                sx={{ 
                  width: '100%', 
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  mb: { xs: 4, md: 0 }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Наша команда */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.paper', textAlign: 'center' }}>
        <Container maxWidth="lg">
          <SectionTitle variant="h2" component="h2">
            Наша команда
          </SectionTitle>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', mb: 6, color: 'text.secondary' }}>
            Успех "Чайного Мага" — это заслуга нашей увлеченной и профессиональной команды. Каждый сотрудник компании разделяет нашу любовь к чаю и стремление к совершенству.
          </Typography>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={4} justifyContent="center">
              {teamMembers.map((member) => (
                <Grid item xs={12} sm={6} md={4} key={member.id}>
                  <motion.div variants={fadeInUp}>
                    <TeamMemberCard>
                      <Avatar
                        src={member.photo}
                        alt={member.name}
                        sx={{ 
                          width: 150, 
                          height: 150, 
                          mx: 'auto',
                          mb: 2,
                          boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.position}
                      </Typography>
                    </TeamMemberCard>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Наши партнеры */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.default', textAlign: 'center' }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h2" component="h2">
            Нам доверяют
          </SectionTitle>
          <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', mb: 6, color: 'text.secondary' }}>
            Среди наших клиентов — сотни ресторанов, кафе, отелей и магазинов по всей России. Мы гордимся тем, что многие из них остаются с нами на протяжении долгих лет.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {/* Здесь можно добавить логотипы партнеров */}
            <Grid item xs={6} sm={4} md={2}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: 100, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Партнер 1
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: 100, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Партнер 2
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: 100, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Партнер 3
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: 100, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Партнер 4
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Paper 
                sx={{ 
                  p: 3, 
                  height: 100, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  opacity: 0.7,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1
                  }
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Партнер 5
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutPage; 