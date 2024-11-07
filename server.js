const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');


const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());


mongoose.connect('YOUR_MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


const inventorySchema = new mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  qrCode: String, 
});

const Inventory = mongoose.model('Inventory', inventorySchema);


app.post('/api/inventory', async (req, res) => {
  const { name, description, quantity } = req.body;


  const qrData = `Name: ${name}, Description: ${description}, Quantity: ${quantity}`;
  
  try {

    const qrCode = await QRCode.toDataURL(qrData);


    const newItem = new Inventory({ name, description, quantity, qrCode });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


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
