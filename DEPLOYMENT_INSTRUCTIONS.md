# Hexframe Portfolio - Deployment Instructions

## Build Status
? Build completed successfully - Production ready files are in dist/ folder

## Architecture Overview

This project now includes a **free Express backend** to:
- Securely proxy contact form submissions to Formspree (no API keys exposed in frontend)
- Serve the React frontend in production
- Provide a foundation for future AI features via Gemini API proxy

**All services used are 100% FREE - no credit card required.**

## Local Development Setup

### 1. Install Dependencies
`ash
npm install
`

### 2. Set Up Environment Variables
Copy .env.example to .env and add your values:
`ash
cp .env.example .env
`

Edit .env with your actual values:
`env
PORT=3001
NODE_ENV=development
FORMSPREE_ID=your_actual_formspree_id_here
GEMINI_API_KEY=your_actual_gemini_key_here  # Optional
`

### 3. Run Development Server
`ash
# Terminal 1: Run Vite dev server (frontend)
npm run dev

# Terminal 2: Run Express server (backend)
npm run server
`

The frontend runs on http://localhost:3000 and the backend on http://localhost:3001.

### 4. Build for Production
`ash
npm run build
`

This creates the dist/ folder with optimized production files.

## Free-Tier Deployment: Render (Recommended)

Render offers a genuinely free tier for web services with no credit card required.

### Free-Tier Limitations
- **Free web services sleep after 15 minutes of inactivity**
- **Wake-up time: ~30 seconds** on first request after sleep
- **512 MB RAM, 0.1 CPU**
- **No custom domains on free tier** (upgrade to paid for custom domain)
- **SSL certificates included**

### Deployment Steps

#### 1. Get Your Free Formspree ID
1. Go to [formspree.io](https://formspree.io) and create a free account
2. Create a new form - you'll get a Form ID (looks like: xvbdqzje)
3. **Free tier: 50 submissions/month, no credit card required**

#### 2. Push Code to GitHub
`ash
git init
git add .
git commit -m  Initial commit
git branch -M main
git remote add origin https://github.com/yourusername/hexframe-portfolio.git
git push -u origin main
`

#### 3. Deploy to Render
1. Go to [render.com](https://render.com) and create a free account
2. Click **New +** ? **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: hexframe-portfolio
   - **Environment**: Node
   - **Build Command**: 
pm install && npm run build
   - **Start Command**: 
pm start
5. **Add Environment Variables** (in Render dashboard):
   - NODE_ENV: production
   - PORT: 10000 (Render's default port)
   - FORMSPREE_ID: your_actual_formspree_id_here
   - GEMINI_API_KEY: your_actual_gemini_key_here (optional)
6. Click **Create Web Service**

#### 4. Wait for Deployment
Render will build and deploy your app. This takes 2-5 minutes on first deploy.

#### 5. Get Your Live URL
Once deployed, Render will provide a URL like:
`
https://hexframe-portfolio.onrender.com
`

**Note**: The first visit may take ~30 seconds as the service wakes from sleep.

## Alternative Free Deployment Options

### Option 2: Railway (Free Tier)
- **Free tier**:  credit/month (enough for small apps)
- **Limitations**: Sleeps after inactivity, requires credit card for verification
- **Setup**: Similar to Render, connect GitHub repo

### Option 3: Vercel (Serverless Functions)
- **Free tier**: Generous, but serverless functions have execution limits
- **Limitations**: Not ideal for long-running Express servers
- **Setup**: Would require converting Express to Vercel serverless functions

## Important: Security Notes

### Environment Variables
- **NEVER commit .env file** to git (it's in .gitignore)
- **Always use environment variables** for API keys
- The Express server loads secrets from environment variables via dotenv
- Frontend never sees API keys - all sensitive calls go through backend

### Formspree Security
- Formspree ID is stored server-side only
- Frontend calls /api/contact which proxies to Formspree
- No API keys exposed in browser bundle

## Contact Form Validation

The Contact form validates all fields before submission:
- **Full Name**: Required
- **Email Address**: Required, must be valid email format
- **Discipline Tracks**: At least one must be selected (Web Engineering, Branding & UI/UX, Cinematic Post)
- **Target Project Budget**: Must select one option ( - ,  - , +)
- **Project Brief**: Required, cannot be empty

Error messages appear inline near each field with red border highlighting when validation fails.

## Files Modified for Backend Integration

### New Files
- server.ts - Express server with API routes
- .env.example - Environment variables template
- .gitignore - Prevents committing sensitive files

### Modified Files
- package.json - Added server scripts
- src/components/Contact.tsx - Changed to call /api/contact endpoint
- src/components/ConnectModal.tsx - Changed to call /api/contact endpoint

## Testing Checklist

- [ ] Contact form submits successfully (after Formspree setup)
- [ ] All social links open in new tabs
- [ ] Mobile menu works on small screens
- [ ] Smooth scrolling works on all pages
- [ ] Animations respect reduced motion preference
- [ ] Site loads quickly on mobile
- [ ] All navigation buttons work with keyboard
- [ ] Backend API routes respond correctly
- [ ] Environment variables are properly configured

## Current Status

? All functionality implemented
? Express backend with Formspree proxy
? Environment variable security
? Frontend-backend integration
?? **Requires Formspree ID setup for contact forms**
?? **Requires deployment to Render (or similar) for live URL**

## Free Services Summary

| Service | Free Tier Limitations | Cost |
|---------|---------------------|------|
| Formspree | 50 submissions/month |  |
| Render Web Service | Sleeps after 15min inactivity, 512MB RAM |  |
| GitHub | Unlimited public repos |  |
| Gemini API (optional) | 15 requests/minute |  |

**Total Monthly Cost: **
