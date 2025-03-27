import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  Divider,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  CardMedia,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Стилизованные компоненты
const PageHero = styled(Box)(({ theme }) => ({
  backgroundColor: '#033628',
  color: 'white',
  padding: theme.spacing(10, 0),
  position: 'relative',
  '&::after': {
    content: '"История чая"',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '24px',
    fontWeight: 'bold',
    opacity: 0.8
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

const TimelineCard = styled(Card)(({ theme }) => ({
  height: '100%',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
  borderRadius: theme.shape.borderRadius * 1.5,
  overflow: 'hidden',
}));

const TimelineDot = styled(Box)(({ theme }) => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  margin: '0 auto',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    height: '100%',
    width: 2,
    backgroundColor: theme.palette.primary.main,
    top: 20,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  '&.last': {
    '&::before': {
      display: 'none',
    },
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  paddingBottom: theme.spacing(1),
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 60,
    height: 3,
    backgroundColor: theme.palette.secondary.main,
  },
}));

// Данные о ключевых этапах истории чая
const timelineData = [
  {
    id: 1,
    period: '2737 г. до н.э.',
    title: 'Легендарное открытие',
    description: 'Согласно китайской легенде, император Шэнь-нун случайно обнаружил чай, когда листья с дерева упали в его котел с кипящей водой.',
    image: 'tea-1' // CSS класс
  },
  {
    id: 2,
    period: '350-418 гг.',
    title: 'Первые записи о чае',
    description: 'Первое письменное упоминание о чае появилось в медицинском трактате, где его описывали как лекарственное средство.',
    image: 'tea-2' // CSS класс
  },
  {
    id: 3,
    period: '618-907 гг.',
    title: 'Расцвет чайной культуры в Китае',
    description: 'В эпоху династии Тан чай стал популярным напитком среди всех слоев населения. Тогда же появился первый трактат о чае "Ча Цзин" (Чайный канон).',
    image: 'tea-3' // CSS класс
  },
  {
    id: 4,
    period: '1610 г.',
    title: 'Чай прибывает в Европу',
    description: 'Голландская Ост-Индская компания привозит первые партии чая в Европу, где он становится дорогим и престижным напитком.',
    image: 'tea-1' // CSS класс
  },
  {
    id: 5,
    period: '1773 г.',
    title: 'Бостонское чаепитие',
    description: 'Знаменитый протест колонистов против Британского налога на чай, ставший одним из событий, приведших к Американской революции.',
    image: 'tea-2' // CSS класс
  },
  {
    id: 6,
    period: '1830-1840-е гг.',
    title: 'Чай в России',
    description: 'Чай становится национальным напитком России, где развивается уникальная чайная культура с самоваром в центре традиции.',
    image: 'tea-3' // CSS класс
  },
  {
    id: 7,
    period: 'XXI век',
    title: 'Современная чайная культура',
    description: 'Возрождение интереса к качественному и аутентичному чаю, рост популярности специализированных чайных и чайных церемоний.',
    image: 'tea-1' // CSS класс
  }
];

// Виды чая
const teaTypes = [
  {
    id: 1,
    name: 'Черный чай',
    description: 'Полностью ферментированный чай с насыщенным вкусом и ароматом. Листья подвергаются полной ферментации, что придает им темный цвет и характерный вкус.',
    color: '#660000'
  },
  {
    id: 2,
    name: 'Зеленый чай',
    description: 'Неферментированный чай, сохраняющий природный цвет листа. Богат антиоксидантами и имеет освежающий, травянистый вкус.',
    color: '#006600'
  },
  {
    id: 3,
    name: 'Улун (Оолонг)',
    description: 'Полуферментированный чай, сочетающий свойства черного и зеленого. Отличается богатым, сложным вкусом и ароматом с цветочными или фруктовыми нотками.',
    color: '#996633'
  },
  {
    id: 4,
    name: 'Белый чай',
    description: 'Минимально обработанный чай из молодых почек и листьев. Имеет нежный, тонкий вкус и считается наиболее полезным.',
    color: '#CCCCCC'
  },
  {
    id: 5,
    name: 'Пуэр',
    description: 'Ферментированный чай, который может выдерживаться в течение многих лет. Имеет земляной, глубокий вкус и считается целебным.',
    color: '#333300'
  },
  {
    id: 6,
    name: 'Желтый чай',
    description: 'Редкий тип чая с особым процессом производства. Имеет сладковатый вкус и золотистый цвет настоя.',
    color: '#CCCC00'
  }
];

const TeaHistoryPage = () => {
  const theme = useTheme();

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
          <Typography color="text.primary">История чая</Typography>
        </Breadcrumbs>
      </Container>

      {/* Герой-секция */}
      <PageHero>
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
              История чая
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
              Путешествие через тысячелетия культуры и традиций чаепития
            </Typography>
          </motion.div>
        </Container>
      </PageHero>

      {/* Введение в историю чая */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <SectionTitle variant="h2" component="h2" sx={{ fontWeight: 700 }}>
                Напиток с богатой историей
              </SectionTitle>
              <Typography variant="body1" paragraph>
                История чая насчитывает более пяти тысячелетий. За это время чай из лекарственного напитка превратился в один из самых популярных напитков в мире, обрастая уникальными традициями и ритуалами в разных культурах.
              </Typography>
              <Typography variant="body1" paragraph>
                Чай начал свою историю в Древнем Китае, где сначала использовался как лекарственное средство, постепенно став частью повседневной культуры. Из Китая чай распространился в Японию, Корею, а затем и по всему миру, приобретая новые формы и традиции употребления.
              </Typography>
              <Typography variant="body1">
                В каждой стране чай приобрел свои уникальные характеристики — от церемониального японского матча до крепкого индийского чая с молоком, от русского чая с самоваром до английского файв-о-клок.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                className="demo-image ceremony"
                data-label="Чайная церемония"
                sx={{ 
                  width: '100%', 
                  height: 300,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  mb: { xs: 4, md: 0 }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Временная шкала истории чая */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" sx={{ fontWeight: 700, mb: 6 }}>
            Ключевые моменты в истории чая
          </Typography>

          <Grid container spacing={4}>
            {timelineData.map((item, index) => (
              <Grid item xs={12} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <TimelineCard>
                    <Grid container>
                      <Grid item xs={12} md={4}>
                        <Box 
                          className={`demo-image tea ${item.image}`}
                          data-label={item.title}
                          sx={{ 
                            height: 200,
                            width: '100%'
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={8}>
                        <CardContent sx={{ p: 3 }}>
                          <Typography variant="h6" component="h3" color="primary" gutterBottom sx={{ fontWeight: 700 }}>
                            {item.period}
                          </Typography>
                          <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body1">
                            {item.description}
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </TimelineCard>
                </motion.div>
                {index < timelineData.length - 1 && (
                  <Box sx={{ my: 2, display: 'flex', justifyContent: 'center' }}>
                    <TimelineDot className={index === timelineData.length - 2 ? 'last' : ''} />
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Виды чая */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h2" component="h2" sx={{ fontWeight: 700, mb: 5 }}>
            Основные виды чая
          </SectionTitle>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Несмотря на то, что все виды чая производятся из листьев одного растения — Camellia sinensis, различия в обработке и ферментации приводят к появлению разных типов чая с уникальными вкусами, ароматами и свойствами.
          </Typography>

          <Grid container spacing={4}>
            {teaTypes.map((tea, index) => (
              <Grid item xs={12} sm={6} md={4} key={tea.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      height: '100%',
                      borderRadius: theme.shape.borderRadius,
                      borderTop: `5px solid ${tea.color}`,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                      {tea.name}
                    </Typography>
                    <Typography variant="body1">
                      {tea.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Чайные традиции */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <SectionTitle variant="h2" component="h2" sx={{ fontWeight: 700 }}>
                Чайные традиции мира
              </SectionTitle>
              <Typography variant="body1" paragraph>
                Чай стал неотъемлемой частью культуры многих народов, каждый из которых создал свои уникальные традиции чаепития.
              </Typography>
              
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                Китайская чайная церемония Гунфу Ча
              </Typography>
              <Typography variant="body1" paragraph>
                Одна из древнейших чайных традиций, где важную роль играет не только вкус чая, но и эстетика процесса, мастерство заваривания и особая атмосфера.
              </Typography>
              
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                Японская чайная церемония Тядо
              </Typography>
              <Typography variant="body1" paragraph>
                Ритуализированная форма приготовления и подачи матча (порошкового зеленого чая), основанная на философии дзен-буддизма.
              </Typography>
              
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                Английское традиционное чаепитие
              </Typography>
              <Typography variant="body1" paragraph>
                Послеобеденный чай (файв-о-клок) с молоком и сахаром, сопровождаемый легкими закусками, сэндвичами и сладостями.
              </Typography>
              
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                Русское чаепитие с самоваром
              </Typography>
              <Typography variant="body1">
                Долгие чаепития с самоваром, где крепкий чай разбавляется кипятком по вкусу, подается с сахаром, вареньем, медом и выпечкой.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box 
                className="demo-image ceremony"
                data-label="Чайные церемонии мира"
                sx={{ 
                  width: '100%', 
                  height: 300,
                  borderRadius: 4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  mb: { xs: 4, md: 0 }
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Заключение */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.default', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Чай объединяет мир
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            За свою многовековую историю чай прошел путь от лекарственного средства до напитка, объединяющего людей по всему миру. Он стал символом гостеприимства и дружбы, частью культурного наследия многих народов.
          </Typography>
          <Typography variant="body1" paragraph>
            В компании "Чайный Маг" мы гордимся тем, что продолжаем эту богатую традицию, предлагая нашим клиентам лучшие сорта чая со всего мира, сохраняя культуру и искусство чаепития.
          </Typography>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" component="p" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            "Есть что-то в чае, что выводит наружу то, что находится глубоко внутри нас."
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            — Линь Юйтан, китайский писатель
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default TeaHistoryPage; 