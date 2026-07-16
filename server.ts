import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from dist directory in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// API Routes

// Contact form endpoint - proxies to Web3Forms
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message, budget, disciplines } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      });
    }

    // Get Web3Forms Access Key from environment
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!web3FormsKey) {
      console.error('WEB3FORMS_ACCESS_KEY not configured in environment variables');
      return res.status(500).json({ 
        error: 'Server configuration error: Web3Forms not configured' 
      });
    }

    // Forward to Web3Forms
    const web3FormsResponse = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        name,
        email,
        message,
        budget: budget || 'Not specified',
        disciplines: disciplines || 'Not specified',
        subject: 'New Contact Form Submission from Hexframe Portfolio',
      }),
    });

    if (web3FormsResponse.ok) {
      return res.status(200).json({ success: true });
    } else {
      const errorData = await web3FormsResponse.json().catch(() => ({}));
      console.error('Web3Forms error:', errorData);
      return res.status(web3FormsResponse.status).json({ 
        error: errorData.message || 'Failed to send message' 
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve frontend for all other routes (SPA routing)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
