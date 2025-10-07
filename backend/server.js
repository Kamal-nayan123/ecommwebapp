import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = "mongodb+srv://Kamal:Premakanth%40123@database.ca2mjix.mongodb.net/ecommweb?retryWrites=true&w=majority&appName=DATABASEE";

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Schema Definitions
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
  stock: Number
});

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  total: Number
});

const orderSchema = new mongoose.Schema({
  userId: String,
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
  }],
  total: Number,
  status: String,
  date: { type: Date, default: Date.now }
});

const reviewSchema = new mongoose.Schema({
  userId: String,
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

// Models
const Product = mongoose.model('Product', productSchema);
const Cart = mongoose.model('Cart', cartSchema);
const Order = mongoose.model('Order', orderSchema);
const Review = mongoose.model('Review', reviewSchema);

// Routes

// Product Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/products', ClerkExpressRequireAuth(), async (req, res) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cart Routes
app.get('/api/cart/:userId', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/cart', ClerkExpressRequireAuth(), async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Order Routes
app.get('/api/orders/:userId', ClerkExpressRequireAuth(), async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).populate('items.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/orders', ClerkExpressRequireAuth(), async (req, res) => {
  const order = new Order(req.body);
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Review Routes
app.get('/api/reviews/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/reviews', ClerkExpressRequireAuth(), async (req, res) => {
  const review = new Review(req.body);
  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});