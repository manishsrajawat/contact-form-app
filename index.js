const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/contactform';
    console.log('🔄 Attempting to connect to MongoDB Atlas...');
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000, // Longer timeout for Atlas
      connectTimeoutMS: 15000,
      socketTimeoutMS: 15000,
      maxPoolSize: 10,
      retryWrites: true,
    });
    
    console.log('✅ Successfully connected to MongoDB Atlas!');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('🔄 Running in demo mode - form submissions will not be saved');
    return false;
  }
};

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', contactSchema);

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to save contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and phone'
      });
    }

    // If database is not connected, return demo response
    if (!isDBConnected) {
      console.log('Demo mode: Contact received:', { name, email, phone });
      return res.status(201).json({
        success: true,
        message: 'Your details have been saved successfully! (Demo mode - not actually saved)',
        contact: {
          name,
          email,
          phone,
          createdAt: new Date()
        }
      });
    }

    // Create new contact
    const newContact = new Contact({
      name,
      email,
      phone
    });

    // Save to database
    await newContact.save();

    res.status(201).json({
      success: true,
      message: 'Your details have been saved successfully!',
      contact: {
        name: newContact.name,
        email: newContact.email,
        phone: newContact.phone,
        createdAt: newContact.createdAt
      }
    });

  } catch (error) {
    console.error('Error saving contact:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data provided'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// API endpoint to get all contacts (for testing)
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: contacts.length,
      contacts
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Global variable to track database connection
let isDBConnected = false;

// Start server
const startServer = async () => {
  isDBConnected = await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit: http://localhost:${PORT}`);
    if (!isDBConnected) {
      console.log('⚠️  Database not connected - running in demo mode');
    }
  });
};

startServer();
