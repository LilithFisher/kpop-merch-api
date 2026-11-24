import express from 'express';
import { products, getNextId } from '../data/products.js';
import { validateProduct } from '../middlewares/validate.js';
import { upload } from '../middlewares/upload.js';

const router = express.Router();

// 1. GET /api/products (фильтрация + пагинация)
router.get('/', (req, res) => {
  let result = [...products];
  const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

  if (category) {
    result = result.filter(p => p.category === category);
  }
  if (minPrice !== undefined) {
    result = result.filter(p => p.price >= Number(minPrice));
  }
  if (maxPrice !== undefined) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  const total = result.length;
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.max(1, parseInt(limit, 10) || 10);
  const startIndex = (pageNum - 1) * limitNum;

  const paginatedData = result.slice(startIndex, startIndex + limitNum);

  res.json({
    data: paginatedData,
    total,
    page: pageNum,
    limit: limitNum
  });
});

// 2. GET /api/products/:id (один товар)
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Мерч не найден' });
  res.json(product);
});

// 3. POST /api/products (создать товар)
router.post('/', validateProduct(false), (req, res) => {
  const newProduct = {
    id: getNextId(),
    ...req.body,
    imageUrl: null,
    createdAt: new Date().toISOString()
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// 4. PUT /api/products/:id (заменить товар полностью)
router.put('/:id', validateProduct(false), (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Мерч не найден' });

  const updatedProduct = {
    id: products[index].id,
    ...req.body,
    imageUrl: products[index].imageUrl,
    createdAt: products[index].createdAt
  };

  products[index] = updatedProduct;
  res.json(updatedProduct);
});

// 5. PATCH /api/products/:id (обновить частично)
router.patch('/:id', validateProduct(true), (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Мерч не найден' });

  Object.assign(product, req.body);
  res.json(product);
});

// 6. DELETE /api/products/:id (удалить товар)
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Мерч не найден' });

  products.splice(index, 1);
  res.status(204).send();
});

// 7. POST /api/products/:id/image (загрузить изображение товара)
router.post('/:id/image', upload.single('image'), (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Мерч не найден' });

  if (!req.file) {
    return res.status(400).json({ error: 'Файл изображения не передан (ожидается поле image)' });
  }

  product.imageUrl = `/uploads/${req.file.filename}`;
  res.json(product);
});

export default router;
