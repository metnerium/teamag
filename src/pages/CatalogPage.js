import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Pagination,
  Breadcrumbs,
  Link,
  Divider,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

// Импортируем вспомогательные функции для работы с изображениями
import getImagePath, { getBackgroundImageUrl } from '../utils/imageHelper';

// Стилизованные компоненты
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

const ProductImage = styled(CardMedia)(({ theme }) => ({
  paddingTop: '75%', // 4:3 соотношение
  position: 'relative',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

const CategoryBanner = styled(Box)(({ theme }) => ({
  backgroundImage: getBackgroundImageUrl('linear-gradient(rgba(0, 40, 10, 0.7), rgba(0, 40, 10, 0.7))', '/images/catalog-banner.jpg'),
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(6),
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(6, 0),
  },
}));

// Каталог товаров (временные данные)
const productData = [
  {
    id: 1,
    name: 'Кения GFOP',
    category: 'black',
    description: 'Крупнолистовой черный чай из Кении с мягким вкусом и солодовыми нотками',
    price: 850,
    weight: '100 г',
    image: '/images/black-tea.jpg',
    rating: 4.7,
    isNew: true,
    inStock: true
  },
  {
    id: 2,
    name: 'Сенча Удзи',
    category: 'green',
    description: 'Классический японский зеленый чай с травянистым вкусом и освежающим ароматом',
    price: 1200,
    weight: '50 г',
    image: '/images/green-tea.jpg',
    rating: 4.9,
    isNew: false,
    inStock: true
  },
  {
    id: 3,
    name: 'Да Хун Пао',
    category: 'oolong',
    description: 'Знаменитый китайский улун с насыщенным вкусом и минеральными нотками',
    price: 2500,
    weight: '50 г',
    image: '/images/oolong-tea.jpg',
    rating: 5.0,
    isNew: false,
    inStock: true
  },
  {
    id: 4,
    name: 'Лапсанг Сушонг',
    category: 'black',
    description: 'Копченый черный чай с характерным дымным ароматом и глубоким вкусом',
    price: 950,
    weight: '100 г',
    image: '/images/black-tea.jpg',
    rating: 4.5,
    isNew: false,
    inStock: true
  },
  {
    id: 5,
    name: 'Люй Инь Ло',
    category: 'green',
    description: 'Элитный зеленый чай с богатым вкусом и освежающим ароматом',
    price: 1800,
    weight: '50 г',
    image: '/images/green-tea.jpg',
    rating: 4.8,
    isNew: true,
    inStock: true
  },
  {
    id: 6,
    name: 'Габа-улун',
    category: 'oolong',
    description: 'Полуферментированный чай с богатым вкусом и цветочными нотками',
    price: 1950,
    weight: '50 г',
    image: '/images/oolong-tea.jpg',
    rating: 4.9,
    isNew: true,
    inStock: true
  },
  {
    id: 7,
    name: 'Ассам FTGFOP1',
    category: 'black',
    description: 'Элитный индийский черный чай с характерным солодовым вкусом и ароматом',
    price: 1100,
    weight: '100 г',
    image: '/images/black-tea.jpg',
    rating: 4.8,
    isNew: false,
    inStock: true
  },
  {
    id: 8,
    name: 'Лунцзин',
    category: 'green',
    description: 'Знаменитый китайский зеленый чай с плоскими листьями и ореховым вкусом',
    price: 2200,
    weight: '50 г',
    image: '/images/green-tea.jpg',
    rating: 5.0,
    isNew: false,
    inStock: true
  }
];

// Список категорий чая
const categories = [
  { id: 'all', name: 'Все категории' },
  { id: 'black', name: 'Черный чай' },
  { id: 'green', name: 'Зеленый чай' },
  { id: 'oolong', name: 'Улуны' },
  { id: 'herbal', name: 'Травяной чай' },
  { id: 'fruit', name: 'Фруктовый чай' },
  { id: 'premium', name: 'Премиум коллекция' }
];

// Варианты сортировки
const sortOptions = [
  { value: 'popularity', label: 'По популярности' },
  { value: 'price_low', label: 'По цене (сначала дешевые)' },
  { value: 'price_high', label: 'По цене (сначала дорогие)' },
  { value: 'name_asc', label: 'По названию (А-Я)' },
  { value: 'name_desc', label: 'По названию (Я-А)' }
];

// Функция для получения читаемого названия категории
const getCategoryName = (categoryId) => {
  const category = categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Все категории';
};

const CatalogPage = () => {
  const theme = useTheme();
  const location = useLocation();
  
  // Извлечение параметра category из URL
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy] = useState('popularity');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const productsPerPage = 8;
  
  // Фильтрация и сортировка продуктов
  useEffect(() => {
    let result = [...productData];
    
    // Фильтрация по категории
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Фильтрация по поисковому запросу
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query)
      );
    }
    
    // Сортировка результатов
    switch (sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default: // popularity
        // по умолчанию оставляем как есть
        break;
    }
    
    setFilteredProducts(result);
    setCurrentPage(1); // Сброс на первую страницу при изменении фильтров
  }, [selectedCategory, sortBy, searchQuery]);
  
  // Обработка изменения категории
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  // Обработка изменения сортировки
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  
  // Обработка изменения поискового запроса
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // Обработка изменения страницы
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Вычисление индексов для текущей страницы
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Вычисление общего количества страниц
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Варианты анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <Box component="section" sx={{ py: 4 }}>
      <Container maxWidth="xl">
        {/* Хлебные крошки */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          <Link underline="hover" color="inherit" href="/">
            Главная
          </Link>
          <Typography color="text.primary">Каталог</Typography>
          {selectedCategory !== 'all' && (
            <Typography color="text.primary">{getCategoryName(selectedCategory)}</Typography>
          )}
        </Breadcrumbs>

        {/* Заголовок и баннер */}
        <CategoryBanner>
          <Container>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 700, 
                textAlign: 'center',
                mb: 2
              }}
            >
              {selectedCategory === 'all' ? 'Каталог чая' : getCategoryName(selectedCategory)}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                maxWidth: 800, 
                mx: 'auto', 
                textAlign: 'center',
                opacity: 0.9
              }}
            >
              Широкий выбор премиальных сортов чая для вашего бизнеса. 
              Оптовые поставки от надежного поставщика.
            </Typography>
          </Container>
        </CategoryBanner>

        {/* Фильтры и поиск */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Категория</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Категория"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Сортировка</InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortChange}
                label="Сортировка"
              >
                {sortOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Поиск по названию или описанию"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        {/* Результаты фильтрации */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Найдено товаров: {filteredProducts.length}
          </Typography>
        </Box>

        {/* Список товаров */}
        {filteredProducts.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Grid container spacing={3}>
              {currentProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <motion.div variants={itemVariants}>
                    <ProductCard>
                      <ProductImage
                        image={product.image}
                        title={product.name}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                          >
                            {getCategoryName(product.category)}
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
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {product.description}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 0.5 }}>
                          Фасовка: {product.weight}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                          {product.price} ₽
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
          </motion.div>
        ) : (
          <Box sx={{ py: 5, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Товары не найдены
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Попробуйте изменить параметры поиска или выбрать другую категорию.
            </Typography>
          </Box>
        )}

        {/* Пагинация */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 2 }}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange} 
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default CatalogPage; 