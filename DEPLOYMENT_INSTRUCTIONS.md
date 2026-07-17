# Hexframe Portfolio - Deployment Instructions

## Build Status
? Build completed successfully - Production ready files are in dist/ folder

## Architecture Overview

This project now includes a **free Express backend** to:
- Serve the React frontend in production
- Provide a foundation for future AI features via Gemini API proxy

**Contact form submissions are handled directly from the frontend using Web3Forms, meaning no backend proxy is required for the forms to function on platforms like Vercel.**

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
VITE_WEB3FORMS_ACCESS_KEY=your_actual_web3forms_access_key_here
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

#### 1. Get Your Free Web3Forms Access Key
1. Go to [web3forms.com](https://web3forms.com) and create a free account
2. Create a new form - you'll get an Access Key
3. **Free tier: 250 submissions/month, no credit card required**

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
5. **Add Environment Variables** (in Render dashboard or Vercel dashboard):
   - NODE_ENV: production
   - PORT: 10000 (Render's default port)
   - VITE_WEB3FORMS_ACCESS_KEY: your_actual_web3forms_access_key_here
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
- Frontend code accesses keys via Vite's `VITE_` prefix (e.g. `import.meta.env.VITE_WEB3FORMS_ACCESS_KEY`)

### Web3Forms Security
- Web3Forms is designed to work directly from the frontend/browser.
- The access key is safe to be exposed in the frontend as it only allows submitting to your configured email address.

## Contact Form Validation

The Contact form validates all fields before submission:
- **Full Name**: Required
- **Email Address**: Required, must be valid email format
- **Discipline Tracks**: At least one must be selected (Web Engineering, Branding & UI/UX, Cinematic Post)
- **Target Project Budget**: Must select one option ( - ,  - , +)
- **Project Brief**: Required, cannot be empty

Error messages appear inline near each field with red border highlighting when validation fails.

## Files Modified for Frontend/Backend Integration

### New Files
- server.ts - Express server (remains in codebase, but no longer handles contact submissions)
- .env.example - Environment variables template
- .gitignore - Prevents committing sensitive files

### Modified Files
- package.json - Added server scripts
- src/components/Contact.tsx - Updated to call Web3Forms API directly from the frontend
- src/components/ConnectModal.tsx - Updated to call Web3Forms API directly from the frontend

## Testing Checklist

- [ ] Contact form submits successfully (after Web3Forms setup)
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
? Express backend with Web3Forms proxy
? Environment variable security
? Frontend-backend integration
?? **Requires Web3Forms Access Key setup for contact forms**
?? **Requires deployment to Render (or similar) for live URL**

## Free Services Summary

| Service | Free Tier Limitations | Cost |
|---------|---------------------|------|
| Web3Forms | 250 submissions/month |  |
| Render Web Service | Sleeps after 15min inactivity, 512MB RAM |  |
| GitHub | Unlimited public repos |  |
| Gemini API (optional) | 15 requests/minute |  |

**Total Monthly Cost: **
