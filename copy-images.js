// copy-images.js
const fs = require('fs');
const path = require('path');

// Функция для рекурсивного копирования директории
function copyDirectory(source, destination) {
  // Создаем директорию назначения, если она не существует
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Получаем все файлы и поддиректории из исходной директории
  const files = fs.readdirSync(source);

  // Копируем каждый файл/директорию
  files.forEach(file => {
    const sourcePath = path.join(source, file);
    const destPath = path.join(destination, file);

    // Проверяем, является ли текущий элемент директорией
    const stats = fs.statSync(sourcePath);
    if (stats.isDirectory()) {
      // Рекурсивно копируем поддиректорию
      copyDirectory(sourcePath, destPath);
    } else {
      // Копируем файл
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Копирование: ${sourcePath} -> ${destPath}`);
    }
  });
}

// Исходная директория с изображениями
const sourceDir = path.join(__dirname, 'public', 'images');
// Директория назначения в build
const destDir = path.join(__dirname, 'build', 'images');

// Выполняем копирование
try {
  copyDirectory(sourceDir, destDir);
  console.log('Копирование изображений завершено успешно!');
} catch (error) {
  console.error('Ошибка при копировании изображений:', error);
  process.exit(1);
} 