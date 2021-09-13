import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

//@desc     Fetch all products
//@router   /api/products
//@access   PUBLIC
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//@desc     Fetch one product
//@router   /api/products/id
//@access   PUBLIC
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc     Delete product
//@router   /api/products/:id
//@access   PRIVATE/ADMIN
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

//@desc     Create new product
//@router  POST /api/products/
//@access   PRIVATE/ADMIN
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample',
    price: 0,
    user: req.user._id,
    image: '/image/SampleImage.jgp',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description',
  });

  const createdProduct = await product.save();
  res.status(201).json(product);
});

//@desc     Update a product
//@router  PUT /api/products/:id
//@access   PRIVATE/ADMIN
const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, image, price, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.description = description;
    product.image = image;
    product.price = price;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
};
