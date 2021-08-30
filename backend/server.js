import express from 'express';
import colors from 'colors';
import products from './data/products.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import dotenv from 'dotenv';
dotenv.config();
connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API working...');
});

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server working in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
