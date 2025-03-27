/**
 * Вспомогательная функция для получения правильного пути к изображениям
 * при работе с GitHub Pages и HashRouter
 * 
 * @param {string} imagePath - Путь к изображению относительно директории public
 * @returns {string} - Корректный путь к изображению
 */
export const getImagePath = (imagePath) => {
  // Удаляем ведущий слеш, если он есть
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Определяем базовый путь в зависимости от среды (разработка/продакшн)
  const basePath = process.env.PUBLIC_URL || '';
  
  return `${basePath}/${cleanPath}`;
};

export default getImagePath; 