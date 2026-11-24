import express from 'express';
import { logger } from './middlewares/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';
import productRoutes from './routes/products.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

// Раздача загруженных картинок по URL
app.use('/uploads', express.static('uploads'));

// Основные маршруты
app.use('/api/products', productRoutes);

// Глобальный обработчик ошибок (всегда подключается в самом конце)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`K-pop Merch API запущен на http://localhost:${PORT}`);
});
