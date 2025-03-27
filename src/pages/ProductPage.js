import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Tabs,
  Tab,
  Breadcrumbs,
  Link as MuiLink,
  Rating,
  Chip,
  Divider,
  Paper,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareIcon from '@mui/icons-material/Share';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import BalanceOutlinedIcon from '@mui/icons-material/BalanceOutlined';

// Временная база данных чая (демо)
const teasDatabase = [
  {
    id: 1,
    name: 'Да Хун Пао (Большой красный халат)',
    category: 'Улун',
    price: 1200,
    discount: 15,
    rating: 4.8,
    origin: 'Уишань, Китай',
    year: 2023,
    inStock: true,
    description: 'Легендарный улун из скал Уишань. Обладает насыщенным вкусом с нотами корицы, древесной коры и сухофруктов. Прожаренный аромат и долгое послевкусие.',
    fullDescription: 'Да Хун Пао (大红袍) или «Большой красный халат» — один из самых знаменитых улунов Китая, произрастающий в горах Уишань провинции Фуцзянь. Легенда рассказывает, что этот чай помог выздороветь матери императора династии Мин, и в благодарность император накрыл чайные кусты своим красным халатом, защищая их.\n\nЧай собирается и обрабатывается вручную, проходя многоступенчатый процесс скручивания и прожарки. Да Хун Пао относится к сильно ферментированным (темным) улунам со степенью окисления 70-80%.\n\nВкусовой профиль: яркий, с доминирующими древесными и поджаренными нотами, оттенками орехов, карамели и сухофруктов. Послевкусие долгое и сладковатое с минеральными нотками.',
    brewing: {
      temperature: '95-98°C',
      amount: '5-7 г на 100 мл',
      infusionTime: '10-20 сек (первая заварка 5 сек)',
      infusions: '7-10 раз'
    },
    images: ["tea-1", "tea-2", "tea-3", "tea-4"]
  },
  {
    id: 2,
    name: 'Те Гуань Инь (Железная богиня милосердия)',
    category: 'Улун',
    price: 950,
    discount: 0,
    rating: 4.7,
    origin: 'Аньси, Китай',
    year: 2023,
    inStock: true,
    description: 'Классический улун из провинции Фуцзянь. Светло-зеленые скрученные листья, цветочный аромат и сладковатое послевкусие с нотами орхидеи.',
    fullDescription: 'Те Гуань Инь (铁观音) — знаменитый китайский улун из уезда Аньси провинции Фуцзянь. Название переводится как «Железная богиня милосердия» в честь буддийской богини Гуаньинь.\n\nЭтот сорт относится к средне-ферментированным улунам (окисление около 30-40%). В зависимости от степени прожарки различают более свежие, зеленые варианты и более традиционные, с насыщенным поджаренным ароматом.\n\nВкусовой профиль: яркий цветочный аромат с нотами свежей зелени и орхидеи в первых проливах, раскрывающийся фруктовыми и медовыми оттенками в последующих. Обладает эффектом «гань» — приятной сладостью, долго остающейся на нёбе.',
    brewing: {
      temperature: '90-95°C',
      amount: '5-6 г на 100 мл',
      infusionTime: '15-30 сек (первая заварка 10 сек)',
      infusions: '6-8 раз'
    },
    images: ["tea-2", "tea-3", "tea-1", "tea-4"]
  },
  {
    id: 3,
    name: 'Шу Пуэр (Мэнхай, 2018)',
    category: 'Пуэр',
    price: 1800,
    discount: 10,
    rating: 4.9,
    origin: 'Юньнань, Китай',
    year: 2018,
    inStock: true,
    description: 'Выдержанный шу пуэр с глубоким землистым вкусом и нотами чернослива, древесной коры и горького шоколада. Пятилетняя выдержка.',
    fullDescription: 'Шу Пуэр (熟普洱) или «приготовленный пуэр» — это чай, прошедший процесс ускоренной ферментации (wodui). Этот метод был разработан в 1970-х годах, чтобы воспроизвести вкусовые качества выдержанного чая за более короткое время.\n\nДанный пуэр из региона Мэнхай провинции Юньнань был изготовлен в 2018 году и имеет уже заметную выдержку, что придает ему более мягкий и гармоничный вкус по сравнению с молодыми шу пуэрами.\n\nВкусовой профиль: глубокий, насыщенный, с нотами влажной земли, древесины, чернослива и грибов. По мере проливов раскрывается сладость, напоминающая мед и темную карамель. Обладает согревающим эффектом.',
    brewing: {
      temperature: '95-100°C',
      amount: '5-6 г на 100 мл',
      infusionTime: '10-15 сек (первая заварка 5-10 сек)',
      infusions: '10-15 раз'
    },
    images: ["tea-3", "tea-1", "tea-2", "tea-4"]
  },
  {
    id: 4,
    name: 'Бай Хао Инь Чжэнь (Серебряные иглы)',
    category: 'Белый чай',
    price: 1400,
    discount: 0,
    rating: 4.6,
    origin: 'Фудин, Китай',
    year: 2023,
    inStock: true,
    description: 'Премиальный белый чай из почек, покрытых серебристым пухом. Нежный, сладкий вкус с медовыми и цветочными нотами. Урожай весны 2023 года.',
    fullDescription: 'Бай Хао Инь Чжэнь (白毫银针) или «Серебряные иглы с белым ворсом» — один из самых ценных и изысканных белых чаев Китая. Для производства используются только почки чайного куста, собранные ранней весной и покрытые серебристым пухом, которые потом высушиваются на солнце.\n\nЭтот деликатный чай происходит из уезда Фудин провинции Фуцзянь — исторической родины белых чаев Китая.\n\nВкусовой профиль: необычайно нежный, с тонкими медовыми и цветочными оттенками. Присутствуют нотки свежескошенного сена, сладких фруктов и дыни. Обладает освежающим послевкусием с едва уловимой сладостью.',
    brewing: {
      temperature: '80-85°C',
      amount: '4-5 г на 100 мл',
      infusionTime: '45-60 сек (первая заварка 30 сек)',
      infusions: '4-6 раз'
    },
    images: ["tea-4", "tea-1", "tea-2", "tea-3"]
  }
];

// Стилизованные компоненты
const ProductImage = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block',
  },
}));

const ThumbnailImage = styled(Box)(({ theme, active }) => ({
  width: '100%',
  height: 80,
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: active ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  opacity: active ? 1 : 0.7,
  '&:hover': {
    opacity: 1,
  },
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: 24,
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1.5),
  },
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  '&:hover': {
    backgroundColor: theme.palette.grey[300],
  },
}));

// Вкладки для информации о продукте
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`product-tabpanel-${index}`}
      aria-labelledby={`product-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const ProductGallery = ({ images, name }) => {
  const [mainImage, setMainImage] = useState(images[0]);
  
  return (
    <Box>
      {/* Главное изображение */}
      <Box 
        className={`demo-image tea ${mainImage}`} 
        data-label={name}
        sx={{ 
          width: '100%',
          height: 400,
          mb: 2,
          borderRadius: 2,
          boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
        }}
      />
      
      {/* Галерея миниатюр */}
      <Grid container spacing={2}>
        {images.map((img, index) => (
          <Grid item xs={3} key={index}>
            <Box 
              className={`demo-image tea ${img}`} 
              data-label=""
              sx={{ 
                width: '100%',
                height: 80,
                borderRadius: 1,
                opacity: mainImage === img ? 1 : 0.7,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  opacity: 0.9,
                  transform: 'scale(1.05)',
                }
              }}
              onClick={() => setMainImage(img)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ProductPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { productId } = useParams();
  const navigate = useNavigate();
  
  // Состояние для продукта
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  // Получение данных о продукте
  useEffect(() => {
    // Имитация загрузки данных с сервера
    const fetchProduct = async () => {
      setLoading(true);
      
      // Находим продукт по ID
      const id = parseInt(productId, 10);
      const foundProduct = teasDatabase.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // Если продукт не найден, перенаправляем на страницу 404
        navigate('/404');
      }
      
      setLoading(false);
    };
    
    fetchProduct();
  }, [productId, navigate]);

  // Изменение количества
  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Обработка изменения вкладки
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Обработка изменения изображения
  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  // Если продукт загружается, показываем заглушку
  if (loading || !product) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center">
          Загрузка...
        </Typography>
      </Container>
    );
  }

  // Получение связанных продуктов
  const relatedProducts = product.relatedProducts.map(id => 
    teasDatabase.find(p => p.id === id)
  ).filter(Boolean);

  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="xl">
        {/* Хлебные крошки */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <MuiLink underline="hover" color="inherit" component={Link} to="/">
            Главная
          </MuiLink>
          <MuiLink underline="hover" color="inherit" component={Link} to="/catalog">
            Каталог
          </MuiLink>
          <MuiLink 
            underline="hover" 
            color="inherit" 
            component={Link} 
            to={`/catalog?category=${product.category}`}
          >
            {product.category === 'black' ? 'Черный чай' : 
             product.category === 'green' ? 'Зеленый чай' : 
             product.category === 'oolong' ? 'Улуны' : 'Чай'}
          </MuiLink>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>

        {/* Основная информация о продукте */}
        <Grid container spacing={6}>
          {/* Изображения продукта */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ mb: 2 }}>
                <ProductGallery images={product.images} name={product.name} />
              </Box>
            </motion.div>
          </Grid>
          
          {/* Информация о продукте */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                >
                  {product.category === 'black' ? 'Черный чай' : 
                   product.category === 'green' ? 'Зеленый чай' : 
                   product.category === 'oolong' ? 'Улун' : 'Чай'}
                </Typography>
                
                {product.isNew && (
                  <Chip 
                    label="Новинка" 
                    size="small" 
                    color="secondary" 
                    sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                  />
                )}
              </Box>
              
              <Typography variant="h2" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
                {product.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                  ({product.reviewCount} отзывов)
                </Typography>
              </Box>
              
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
                {product.description}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Происхождение:</strong> {product.origin}
              </Typography>
              
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Фасовка:</strong> {product.weight}
              </Typography>
              
              <Box sx={{ my: 3 }}>
                <FeatureBox>
                  <VerifiedOutlinedIcon />
                  <Typography variant="body2">
                    Гарантия качества и происхождения чая
                  </Typography>
                </FeatureBox>
                
                <FeatureBox>
                  <LocalShippingOutlinedIcon />
                  <Typography variant="body2">
                    Доставка по всей России
                  </Typography>
                </FeatureBox>
                
                <FeatureBox>
                  <BalanceOutlinedIcon />
                  <Typography variant="body2">
                    Скидки при оптовых заказах
                  </Typography>
                </FeatureBox>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="p" color="primary" sx={{ fontWeight: 700 }}>
                  {product.price} ₽
                </Typography>
                
                {product.inStock ? (
                  <Chip 
                    label="В наличии" 
                    size="small" 
                    color="primary" 
                    variant="outlined"
                    sx={{ ml: 2, fontWeight: 600 }}
                  />
                ) : (
                  <Chip 
                    label="Нет в наличии" 
                    size="small" 
                    color="error" 
                    variant="outlined"
                    sx={{ ml: 2, fontWeight: 600 }}
                  />
                )}
              </Box>
              
              {/* Выбор количества и кнопки действий */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                  <QuantityButton 
                    aria-label="уменьшить количество" 
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                  >
                    <RemoveIcon />
                  </QuantityButton>
                  
                  <Typography sx={{ mx: 2, fontWeight: 600, minWidth: '30px', textAlign: 'center' }}>
                    {quantity}
                  </Typography>
                  
                  <QuantityButton 
                    aria-label="увеличить количество" 
                    onClick={() => handleQuantityChange('increase')}
                  >
                    <AddIcon />
                  </QuantityButton>
                </Box>
                
                <Button 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  startIcon={<AddShoppingCartIcon />}
                  disabled={!product.inStock}
                  sx={{ mr: 2, py: 1.5, px: 3 }}
                >
                  В корзину
                </Button>
                
                <IconButton color="primary" sx={{ mr: 1 }}>
                  <BookmarkBorderIcon />
                </IconButton>
                
                <IconButton color="primary">
                  <ShareIcon />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Вкладки с детальной информацией */}
        <Box sx={{ my: 6 }}>
          <Paper sx={{ borderRadius: theme.shape.borderRadius * 2, overflow: 'hidden' }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant={isMobile ? "scrollable" : "fullWidth"}
              scrollButtons={isMobile ? "auto" : false}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Описание" id="product-tab-0" />
              <Tab label="Рекомендации по завариванию" id="product-tab-1" />
              <Tab label="Состав" id="product-tab-2" />
              <Tab label="Отзывы" id="product-tab-3" />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              <TabPanel value={activeTab} index={0}>
                <div dangerouslySetInnerHTML={{ __html: product.fullDescription }} />
              </TabPanel>
              
              <TabPanel value={activeTab} index={1}>
                <Typography variant="body1" paragraph>
                  {product.brewingRecommendations}
                </Typography>
              </TabPanel>
              
              <TabPanel value={activeTab} index={2}>
                <Typography variant="body1" paragraph>
                  {product.ingredients}
                </Typography>
              </TabPanel>
              
              <TabPanel value={activeTab} index={3}>
                <Typography variant="body1" paragraph>
                  Отзывы покупателей будут добавлены в ближайшее время.
                </Typography>
              </TabPanel>
            </Box>
          </Paper>
        </Box>

        {/* Связанные продукты */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700, mb: 4 }}>
            Вам также может понравиться
          </Typography>
          
          <Grid container spacing={3}>
            {relatedProducts.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
                    },
                    borderRadius: theme.shape.borderRadius * 1.5,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {item.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                        {item.price} ₽
                      </Typography>
                      <Button 
                        component={Link} 
                        to={`/catalog/${item.id}`}
                        variant="outlined" 
                        size="small"
                      >
                        Подробнее
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductPage; 