/**
 * Вспомогательная функция для получения правильного пути к изображениям
 * при работе с собственным доменом или GitHub Pages
 * 
 * @param {string} imagePath - Путь к изображению относительно директории public
 * @returns {string} - Корректный путь к изображению
 */
export const getImagePath = (imagePath) => {
  // Удаляем ведущий слеш, если он есть
  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  // Определяем базовый путь из переменной окружения или из window.location
  // для работы как с GitHub Pages, так и с пользовательским доменом
  const baseUrl = process.env.PUBLIC_URL || 
    window.location.pathname.split('/').slice(0, -1).join('/');
  
  // Формируем полный путь
  return `${baseUrl}/${cleanPath}`;
};

/**
 * Вспомогательная функция для использования в фоновых изображениях CSS
 * 
 * @param {string} imagePath - Путь к изображению относительно директории public
 * @returns {string} - Строка CSS с правильным URL
 */
export const getBackgroundImageUrl = (gradient, imagePath) => {
  const imageUrl = getImagePath(imagePath);
  return `${gradient ? gradient + ', ' : ''}url("${imageUrl}")`;
};

export default getImagePath; 