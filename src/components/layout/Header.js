import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useScrollTrigger,
  Slide,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Divider,
  Badge,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import getImagePath from '../../utils/imageHelper';

// Скрытие AppBar при прокрутке вниз
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& img': {
    height: 50,
    marginRight: theme.spacing(1),
  },
  '& .logo-text': {
    display: 'flex',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('sm')]: {
    '& .logo-text span:last-child': {
      display: 'none',
    },
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  color: theme.palette.text.primary,
  fontWeight: 500,
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '&.active': {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
}));

const NavIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0, 0.5),
  color: theme.palette.text.primary,
}));

const TopBar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1, 0),
  fontSize: '0.9rem',
}));

const MobileNavItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2, 3),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&.active': {
    backgroundColor: 'rgba(3, 135, 52, 0.08)',
    '& .MuiListItemText-primary': {
      color: theme.palette.primary.main,
      fontWeight: 600,
    },
  },
}));

const menuItems = [
  { title: 'Главная', path: '/' },
  { title: 'Каталог', path: '/catalog', submenu: [
    { title: 'Черный чай', path: '/catalog?category=black' },
    { title: 'Зеленый чай', path: '/catalog?category=green' },
    { title: 'Улун', path: '/catalog?category=oolong' },
    { title: 'Пуэр', path: '/catalog?category=puerh' },
    { title: 'Белый чай', path: '/catalog?category=white' },
    { title: 'Травяной чай', path: '/catalog?category=herbal' }
  ] },
  { title: 'Керамика', path: '/ceramics' },
  { title: 'О компании', path: '/about' },
  { title: 'История чая', path: '/tea-history' },
  { title: 'Контакты', path: '/contact' },
];

const Header = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuOpen = (event, menuId) => {
    setMenuAnchor(event.currentTarget);
    setActiveMenu(menuId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setActiveMenu(null);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>


      <HideOnScroll {...props}>
        <AppBar position="sticky" color="default" elevation={0} sx={{ backgroundColor: 'background.paper' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {/* Логотип */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Logo component={Link} to="/" sx={{ flexGrow: { xs: 1, md: 0 }, mr: { md: 4 } }}>
                  <img src={getImagePath('/images/logo.png')} alt="Чайный Маг" />
                  <Box className="logo-text">
                    <Typography variant="h6" component="span" sx={{ fontWeight: 700, color: 'primary.main', lineHeight: 1.2 }}>
                      Чайный Маг
                    </Typography>
                    <Typography variant="caption" component="span" sx={{ color: 'text.secondary' }}>
                      Оптовые поставки чая
                    </Typography>
                  </Box>
                </Logo>
              </motion.div>

              {/* Десктопная навигация */}
              {!isMobile ? (
                <>
                  <Box sx={{ flexGrow: 1, display: 'flex', ml: 2 }}>
                    {menuItems.map((item, index) => (
                      <Box key={item.path}>
                        {item.submenu ? (
                          <>
                            <NavButton
                              aria-owns={activeMenu === item.path ? 'menu-list-grow' : undefined}
                              aria-haspopup="true"
                              onClick={(event) => handleMenuOpen(event, item.path)}
                              className={isActive(item.path) ? 'active' : ''}
                              endIcon={<KeyboardArrowDownIcon />}
                            >
                              {item.title}
                            </NavButton>
                            <Menu
                              id="menu-list-grow"
                              anchorEl={menuAnchor}
                              open={activeMenu === item.path}
                              onClose={handleMenuClose}
                              MenuListProps={{ onMouseLeave: handleMenuClose }}
                              PaperProps={{
                                elevation: 2,
                                sx: { mt: 1.5, borderRadius: 2 }
                              }}
                            >
                              {item.submenu.map((subItem) => (
                                <MenuItem 
                                  key={subItem.path} 
                                  component={Link} 
                                  to={subItem.path}
                                  onClick={handleMenuClose}
                                  sx={{ 
                                    minWidth: 180,
                                    '&:hover': {
                                      backgroundColor: 'rgba(3, 135, 52, 0.08)',
                                      color: 'primary.main'
                                    }
                                  }}
                                >
                                  {subItem.title}
                                </MenuItem>
                              ))}
                            </Menu>
                          </>
                        ) : (
                          <NavButton
                            component={Link}
                            to={item.path}
                            className={isActive(item.path) ? 'active' : ''}
                          >
                            {item.title}
                          </NavButton>
                        )}
                      </Box>
                    ))}
                  </Box>

                  {/* Иконки справа */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <NavIconButton aria-label="search">
                      <SearchIcon />
                    </NavIconButton>
                    <NavIconButton aria-label="profile">
                      <PersonOutlineIcon />
                    </NavIconButton>
                    <NavIconButton aria-label="cart">
                      <Badge badgeContent={3} color="primary">
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                    </NavIconButton>
                    <Button 
                      variant="contained" 
                      color="primary"
                      sx={{ ml: 2 }}
                    >
                      Оптовикам
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  {/* Мобильные иконки */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <NavIconButton aria-label="search">
                      <SearchIcon />
                    </NavIconButton>
                    <NavIconButton aria-label="cart">
                      <Badge badgeContent={3} color="primary">
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                    </NavIconButton>
                    <NavIconButton
                      aria-label="open drawer"
                      edge="end"
                      onClick={handleDrawerToggle}
                    >
                      <MenuIcon />
                    </NavIconButton>
                  </Box>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Мобильная навигация */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { width: '80%', maxWidth: 300 }
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Меню
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.path}>
              <MobileNavItem
                button
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                className={isActive(item.path) ? 'active' : ''}
              >
                <ListItemText primary={item.title} />
              </MobileNavItem>
              {item.submenu && (
                <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                  {item.submenu.map((subItem) => (
                    <MobileNavItem
                      key={subItem.path}
                      button
                      component={Link}
                      to={subItem.path}
                      onClick={handleDrawerToggle}
                      sx={{ pl: 5 }}
                      className={location.pathname === subItem.path ? 'active' : ''}
                    >
                      <ListItemText 
                        primary={subItem.title}
                        primaryTypographyProps={{ 
                          variant: 'body2',
                          sx: { fontWeight: 500 }
                        }}
                      />
                    </MobileNavItem>
                  ))}
                </Box>
              )}
            </React.Fragment>
          ))}
        </List>
        <Divider />
        <Box sx={{ p: 3 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Оптовикам
          </Button>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Контакты:
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="body2">
              8 (800) 123-45-67
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header; 