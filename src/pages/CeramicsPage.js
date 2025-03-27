import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions,
  Button,
  Chip,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Paper,
  Divider,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Стилизованные компоненты
const PageHero = styled(Box)(({ theme }) => ({
  backgroundColor: '#524a41',
  color: 'white',
  padding: theme.spacing(10, 0),
  marginBottom: theme.spacing(6),
  position: 'relative',
  '&::after': {
    content: '"Чайная керамика"',
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

const ProductCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
  borderRadius: theme.shape.borderRadius * 1.5,
  overflow: 'hidden',
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

// Категории керамики
const categories = [
  { id: 'all', label: 'Все категории' },
  { id: 'teapots', label: 'Чайники' },
  { id: 'cups', label: 'Чашки' },
  { id: 'sets', label: 'Наборы' },
  { id: 'accessories', label: 'Аксессуары' },
  { id: 'gaiwan', label: 'Гайвани' },
];

// Данные о керамике (временные)
const ceramicsData = [
  {
    id: 1,
    name: 'Глиняный чайник Исинь',
    category: 'teapots',
    description: 'Традиционный китайский чайник из исинской глины, идеально подходит для заваривания улунов и пуэров.',
    price: 3500,
    image: 'teapot',
    isNew: true,
    inStock: true
  },
  {
    id: 2,
    name: 'Керамический гайвань',
    category: 'gaiwan',
    description: 'Классический гайвань объемом 150 мл для традиционного китайского способа заваривания чая.',
    price: 1800,
    image: 'gaiwan',
    isNew: false,
    inStock: true
  },
  {
    id: 3,
    name: 'Набор для чайной церемонии',
    category: 'sets',
    description: 'Полный набор для проведения китайской чайной церемонии, включающий гайвань, чахай и 6 пиал.',
    price: 5900,
    image: 'set-1',
    isNew: true,
    inStock: true
  },
  {
    id: 4,
    name: 'Чайная пиала ручной работы',
    category: 'cups',
    description: 'Керамическая пиала объемом 50 мл, изготовлена и расписана вручную мастерами из Цзиндэчжэнь.',
    price: 950,
    image: 'cups',
    isNew: false,
    inStock: true
  },
  {
    id: 5,
    name: 'Чахай (чаша справедливости)',
    category: 'accessories',
    description: 'Чаша для переливания чая из гайвани перед подачей гостям, обеспечивающая равномерность крепости.',
    price: 1200,
    image: 'set-2',
    isNew: false,
    inStock: true
  },
  {
    id: 6,
    name: 'Японский чайник тэцубин',
    category: 'teapots',
    description: 'Чугунный чайник в японском стиле с внутренним керамическим покрытием для кипячения воды.',
    price: 4800,
    image: 'set-3',
    isNew: true,
    inStock: true
  },
  {
    id: 7,
    name: 'Набор керамических пиал',
    category: 'sets',
    description: 'Набор из 6 керамических пиал для чаепития, выполненных в минималистичном стиле.',
    price: 2500,
    image: 'set-2',
    isNew: false,
    inStock: true
  },
  {
    id: 8,
    name: 'Чайный столик из бамбука',
    category: 'accessories',
    description: 'Складной чайный столик для чайной церемонии с поддоном для слива воды.',
    price: 3200,
    image: 'set-1',
    isNew: false,
    inStock: true
  }
];

// Информация о традиционной чайной посуде
const ceramicsInfo = [
  {
    id: 1,
    title: 'Исинская глина',
    description: 'Особая глина из региона Исин в Китае, которая веками использовалась для изготовления чайников. Эта пористая глина обладает уникальными свойствами: она сохраняет тепло, не перебивает аромат чая и со временем «впитывает» вкус завариваемого чая, делая его богаче. Чайники из исинской глины не моют моющими средствами, только ополаскивают водой, чтобы сохранить накопленный аромат.'
  },
  {
    id: 2,
    title: 'Гайвань',
    description: 'Традиционная китайская посуда для заваривания чая, состоящая из чаши с крышкой и блюдца. Гайвань позволяет полностью контролировать процесс заваривания и оценить все нюансы аромата и вкуса чая. Особенно хорошо подходит для улунов и белых чаев.'
  },
  {
    id: 3,
    title: 'Чахай',
    description: 'Чаша справедливости или сливник используется для того, чтобы разливать чай из гайвани или чайника по чашкам. Это позволяет получить настой одинаковой крепости во всех чашках, так как при прямом разливе из чайника первая порция будет слабее последней.'
  },
  {
    id: 4,
    title: 'Чабань',
    description: 'Чайная доска или чайный столик с системой для стока воды. Используется для проведения чайной церемонии, помогает содержать чайное пространство в чистоте и создает атмосферу церемонии.'
  }
];

const CeramicsPage = () => {
  const theme = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');

  // Фильтрация товаров по категории
  const filteredCeramics = activeCategory === 'all' 
    ? ceramicsData 
    : ceramicsData.filter(item => item.category === activeCategory);

  // Обработчик изменения категории
  const handleCategoryChange = (event, newValue) => {
    setActiveCategory(newValue);
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
          <Typography color="text.primary">Чайная керамика</Typography>
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
              Чайная керамика
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
              Традиционная посуда для чайных церемоний и повседневного использования
            </Typography>
          </motion.div>
        </Container>
      </PageHero>

      {/* Введение */}
      <Container maxWidth="xl" sx={{ mb: 6 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <SectionTitle variant="h2" component="h2" sx={{ fontWeight: 700 }}>
              Искусство чайной керамики
            </SectionTitle>
            <Typography variant="body1" paragraph>
              Чайная керамика — это не просто посуда для заваривания чая, а настоящее произведение искусства, отражающее многовековые традиции и культуру чаепития. Правильно подобранная керамика раскрывает вкус и аромат чая, делая его более насыщенным и выразительным.
            </Typography>
            <Typography variant="body1" paragraph>
              В нашем ассортименте представлена традиционная керамика из Китая, Японии и других стран с богатыми чайными традициями. Каждое изделие изготовлено с соблюдением старинных технологий и отличается не только функциональностью, но и эстетической ценностью.
            </Typography>
            <Typography variant="body1">
              Выбирая чайную керамику, обращайте внимание на материал, из которого она изготовлена, и на тип чая, для которого она предназначена. Наши специалисты всегда готовы помочь вам с выбором и рассказать о тонкостях использования каждого изделия.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box 
              className="demo-image ceramics"
              data-label="Искусство чайной керамики"
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

      {/* Категории керамики */}
      <Box sx={{ backgroundColor: 'background.paper', py: 6 }}>
        <Container maxWidth="xl">
          <Paper sx={{ borderRadius: theme.shape.borderRadius }}>
            <Tabs
              value={activeCategory}
              onChange={handleCategoryChange}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                mb: 4,
                '& .MuiTab-root': {
                  fontWeight: 600,
                  fontSize: '1rem',
                  textTransform: 'none',
                }
              }}
            >
              {categories.map((category) => (
                <Tab 
                  key={category.id} 
                  value={category.id} 
                  label={category.label} 
                  id={`ceramics-tab-${category.id}`}
                />
              ))}
            </Tabs>
            
            {/* Товары */}
            <Box sx={{ p: 3 }}>
              <Grid container spacing={4}>
                {filteredCeramics.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <ProductCard>
                        <Box 
                          className={`demo-image ceramics ${item.image}`}
                          data-label={item.name}
                          sx={{ 
                            height: 200,
                            width: '100%'
                          }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography 
                              variant="body2" 
                              color="text.secondary"
                            >
                              {categories.find(cat => cat.id === item.category)?.label || 'Керамика'}
                            </Typography>
                            {item.isNew && (
                              <Chip 
                                label="Новинка" 
                                size="small" 
                                color="secondary" 
                                sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                              />
                            )}
                          </Box>
                          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                            {item.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {item.description}
                          </Typography>
                          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                            {item.price} ₽
                          </Typography>
                        </CardContent>
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth
                            startIcon={<AddShoppingCartIcon />}
                          >
                            В корзину
                          </Button>
                        </CardActions>
                      </ProductCard>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
              
              {/* Сообщение, если товары не найдены */}
              {filteredCeramics.length === 0 && (
                <Box sx={{ py: 5, textAlign: 'center' }}>
                  <Typography variant="h5" gutterBottom>
                    Товары не найдены
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Товары в данной категории временно отсутствуют. Пожалуйста, выберите другую категорию.
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Информация о традиционной чайной посуде */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.default' }}>
        <Container maxWidth="xl">
          <SectionTitle variant="h2" component="h2" sx={{ fontWeight: 700, mb: 5 }}>
            Особенности традиционной чайной посуды
          </SectionTitle>
          <Typography variant="body1" paragraph sx={{ mb: 5 }}>
            Чайная посуда из разных регионов имеет свои уникальные особенности, которые формировались веками под влиянием местных традиций, доступных материалов и видов чая. Понимание этих особенностей поможет вам сделать правильный выбор и полностью раскрыть потенциал вашего чая.
          </Typography>

          <Grid container spacing={4}>
            {ceramicsInfo.map((info, index) => (
              <Grid item xs={12} sm={6} key={info.id}>
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
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                      }
                    }}
                  >
                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {info.title}
                    </Typography>
                    <Typography variant="body1">
                      {info.description}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Рекомендации по уходу */}
      <Box component="section" sx={{ py: 8, backgroundColor: 'background.paper' }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
              <SectionTitle variant="h2" component="h2" sx={{ fontWeight: 700 }}>
                Уход за чайной керамикой
              </SectionTitle>
              <Typography variant="body1" paragraph>
                Правильный уход за чайной посудой не только продлевает срок ее службы, но и сохраняет ее способность раскрывать вкус и аромат чая. Вот несколько рекомендаций:
              </Typography>
              
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                Исинская глина
              </Typography>
              <Typography variant="body1" paragraph>
                Чайники из исинской глины не следует мыть моющими средствами. Просто ополаскивайте их горячей водой после использования и просушивайте на воздухе. Не используйте один чайник для разных типов чая.
              </Typography>
              
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                Фарфор и керамика
              </Typography>
              <Typography variant="body1" paragraph>
                Фарфоровую и керамическую посуду можно мыть с использованием мягких моющих средств. Избегайте резких перепадов температуры, которые могут привести к трещинам.
              </Typography>
              
              <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
                Чугунные чайники
              </Typography>
              <Typography variant="body1">
                Чугунные чайники тэцубин не требуют особого ухода, но их не следует оставлять влажными, чтобы избежать ржавчины. Протирайте их насухо после использования.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
              <Box 
                className="demo-image ceremony"
                data-label="Уход за чайной керамикой"
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
            Выбор, который радует
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 4 }}>
            Качественная чайная керамика — это инвестиция в ваше чайное удовольствие. Она не только раскрывает вкус и аромат чая, но и превращает каждое чаепитие в особый ритуал, наполненный эстетическим удовольствием.
          </Typography>
          <Typography variant="body1" paragraph>
            В "Чайном Маге" мы предлагаем только аутентичную керамику, изготовленную с соблюдением традиционных технологий. Наши эксперты всегда готовы помочь вам с выбором и дать рекомендации по использованию каждого изделия.
          </Typography>
          <Divider sx={{ my: 4 }} />
          <Typography variant="h6" component="p" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            "Чашка чая — это не просто сосуд для жидкости, а мост между традицией и современностью."
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default CeramicsPage; 