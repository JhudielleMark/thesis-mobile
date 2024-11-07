const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

// Create an express app
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('YOUR_MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define Inventory Schema
const inventorySchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  qrCode: String, // Field for storing the QR code
});

const Inventory = mongoose.model('Inventory', inventorySchema);

// POST endpoint to add an inventory item
app.post('/api/inventory', async (req, res) => {
  const { name, description, quantity } = req.body;

  // Generate QR code data
  const qrData = `Name: ${name}, Description: ${description}, Quantity: ${quantity}`;
  
  try {
    // Generate QR code as a data URL
    const qrCode = await QRCode.toDataURL(qrData);

    // Create new inventory item
    const newItem = new Inventory({ name, description, quantity, qrCode });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET endpoint to fetch all inventory items
app.get('/api/inventory', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
