import mongoose from "mongoose";
import fs from "fs";

// 1. Connect to MongoDB Atlas
const MONGODB_URI = "mongodb+srv://Kamal:Premakanth%40123@database.ca2mjix.mongodb.net/ecommweb?retryWrites=true&w=majority&appName=DATABASEE";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// 2. Define Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  image: String,
  rating: Number
});

const Product = mongoose.model("Product", productSchema);

// 3. Read products.json
const products = JSON.parse(fs.readFileSync("C:\\Users\\Kamal Nayan C\\Downloads\\products.json", "utf8"));

// 4. Insert into DB
Product.insertMany(products)
  .then(() => {
    console.log("Products inserted successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error inserting products:", err);
    mongoose.connection.close();
  });
