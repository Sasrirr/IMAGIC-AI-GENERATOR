# 🚀 AI Image Generator - Complete Setup & Deployment Guide

*Step-by-step guide to set up your own API keys and deploy the application*

---

## 🔑 **Required API Keys & Services**

You need to set up accounts and get API keys from these services:

### **1. OpenAI API Key**
- **What it's for**: Image generation using DALL-E
- **Where to get it**: https://platform.openai.com/
- **Steps**:
  1. Create OpenAI account
  2. Go to API Keys section
  3. Create new API key
  4. Copy the key (starts with `sk-`)
- **Cost**: Pay-per-use (about $0.02 per image generation)

### **2. MongoDB Database**
- **What it's for**: Storing post metadata (name, prompt, image URLs)
- **Where to get it**: https://www.mongodb.com/atlas
- **Steps**:
  1. Create MongoDB Atlas account (free tier available)
  2. Create new cluster
  3. Create database user
  4. Get connection string
- **Cost**: Free tier available (500MB storage)

### **3. Cloudinary Account**
- **What it's for**: Image storage and CDN delivery
- **Where to get it**: https://cloudinary.com/
- **Steps**:
  1. Create Cloudinary account
  2. Go to Dashboard
  3. Copy Cloud Name, API Key, API Secret
- **Cost**: Free tier available (25GB storage, 25GB bandwidth)

---

## ⚙️ **Environment Setup**

### **Backend Environment Variables**
Create a `.env` file in the `server` directory:

```env
# server/.env

# MongoDB Connection
MONGODB_URL=mongodb+srv://username:password@cluster.mongodb.net/ai-image-generator?retryWrites=true&w=majority

# OpenAI API
OPENAI_API_KEY=sk-your-openai-api-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### **Frontend Environment Variables**
Create a `.env` file in the `client` directory:

```env
# client/.env

# API Base URL (for development)
REACT_APP_API_URL=http://localhost:8080/api

# For production, change to your deployed backend URL
# REACT_APP_API_URL=https://your-backend-url.herokuapp.com/api
```

**Update API Configuration:**
You'll need to modify `client/src/api/index.js`:

```javascript
import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api/",
});

export const GetPosts = async () => await API.get("/post/");
export const CreatePost = async (data) => await API.post("/post/", data);
export const GenerateImageFromPrompt = async (data) =>
  await API.post("/generateImage/", data);
```

---

## 🔧 **Detailed Setup Instructions**

### **Step 1: OpenAI API Setup**

1. **Create Account**:
   - Go to https://platform.openai.com/
   - Sign up with email or Google account
   
2. **Add Payment Method**:
   - Go to Billing section
   - Add credit card (required for API access)
   - Set usage limits if desired
   
3. **Generate API Key**:
   - Go to API Keys section
   - Click "Create new secret key"
   - Name it "AI Image Generator"
   - Copy the key immediately (you won't see it again)
   
4. **Test Your Key**:
```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer sk-your-key-here"
```

---

### **Step 2: MongoDB Atlas Setup**

1. **Create Cluster**:
   - Sign up at https://www.mongodb.com/atlas
   - Choose "Build a Database"
   - Select "Free" shared cluster
   - Choose cloud provider and region
   - Create cluster (takes 3-7 minutes)

2. **Database Access**:
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `aiImageUser` (or your choice)
   - Generate secure password
   - Database User Privileges: "Read and write to any database"

3. **Network Access**:
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP for better security

4. **Get Connection String**:
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `ai-image-generator`

**Example Connection String**:
```
mongodb+srv://aiImageUser:yourpassword@cluster0.abc123.mongodb.net/ai-image-generator?retryWrites=true&w=majority
```

---

### **Step 3: Cloudinary Setup**

1. **Create Account**:
   - Go to https://cloudinary.com/
   - Sign up for free account
   
2. **Get Credentials**:
   - After signup, you'll see your Dashboard
   - Copy these three values:
     - **Cloud Name**: (e.g., `dxyz123abc`)
     - **API Key**: (e.g., `123456789012345`)
     - **API Secret**: (e.g., `abcdefghijklmnopqrstuvwxyz123`)

3. **Optional Configuration**:
   - Go to Settings > Upload
   - Set up upload presets if needed
   - Configure auto-optimization settings

---

## 💻 **Local Development Setup**

### **Prerequisites**
```bash
# Check if you have Node.js installed
node --version  # Should be 14+ 
npm --version   # Should be 6+

# If not installed, download from: https://nodejs.org/
```

### **Clone and Setup Project**
```bash
# Clone the repository (if you haven't already)
git clone <your-repo-url>
cd AI_IMAGE_GENERATOR_MERN-master

# Install backend dependencies
cd server
npm install

# Install frontend dependencies  
cd ../client
npm install
```

### **Environment Files Setup**
```bash
# Create backend .env file
cd server
touch .env  # On Windows: type nul > .env

# Add your environment variables to server/.env
# (Use the template from earlier in this guide)

# Create frontend .env file
cd ../client  
touch .env  # On Windows: type nul > .env

# Add your environment variables to client/.env
```

### **Start Development Servers**
```bash
# Terminal 1: Start backend server
cd server
npm start
# Server runs on http://localhost:8080

# Terminal 2: Start frontend server
cd client
npm start  
# Client runs on http://localhost:3000
```

### **Test the Setup**
1. Open http://localhost:3000
2. Navigate to "Create Post"
3. Enter a prompt and generate an image
4. If successful, try sharing the image
5. Check if it appears in the gallery

---

## 🚀 **Deployment Options**

### **Option 1: Heroku (Easiest)**

**Backend Deployment**:
```bash
# Install Heroku CLI
# Create Heroku app
cd server
heroku create your-app-name-backend

# Set environment variables
heroku config:set MONGODB_URL="your-mongodb-connection-string"
heroku config:set OPENAI_API_KEY="your-openai-key"
heroku config:set CLOUDINARY_CLOUD_NAME="your-cloud-name"
heroku config:set CLOUDINARY_API_KEY="your-api-key"
heroku config:set CLOUDINARY_API_SECRET="your-api-secret"

# Deploy
git add .
git commit -m "Deploy backend"
git push heroku main
```

**Frontend Deployment**:
```bash
cd client
# Update .env with production API URL
echo "REACT_APP_API_URL=https://your-app-name-backend.herokuapp.com/api" > .env

# Build and deploy to Netlify/Vercel
npm run build

# Deploy to Netlify: drag build folder to netlify.com/drop
# Or deploy to Vercel: vercel --prod
```

---

### **Option 2: Railway (Modern Alternative)**

1. Go to https://railway.app/
2. Connect your GitHub repository
3. Deploy backend and frontend separately
4. Set environment variables in Railway dashboard
5. Update API URLs accordingly

---

### **Option 3: DigitalOcean App Platform**

1. Create account at https://cloud.digitalocean.com/
2. Use App Platform to deploy from GitHub
3. Configure environment variables
4. Set up custom domains if needed

---

## 🔒 **Security Best Practices**

### **Environment Variables Security**
```bash
# Never commit .env files
echo ".env" >> .gitignore

# Use different keys for development and production
# Rotate API keys regularly
# Set usage limits on OpenAI account
```

### **API Security**
```javascript
// Add rate limiting to backend
npm install express-rate-limit

// In server/index.js
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/generateImage/', limiter);
```

### **CORS Configuration**
```javascript
// In server/index.js - restrict CORS to your domain
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
```

---

## 📊 **Cost Estimation**

### **Monthly Costs (Approximate)**
- **OpenAI API**: $5-20 (depending on usage)
- **MongoDB Atlas**: Free (up to 500MB)
- **Cloudinary**: Free (up to 25GB)
- **Heroku**: Free tier discontinued, paid plans start at $7/month
- **Railway/Vercel**: Free tier available

### **Cost Optimization Tips**
- Use free tiers during development
- Set OpenAI usage limits
- Optimize images before Cloudinary upload
- Monitor API usage regularly

---

## 🐛 **Common Setup Issues & Solutions**

### **"Invalid API Key" Error**
```bash
# Check your .env file format
# Ensure no spaces around = sign
# Restart your server after adding .env
```

### **MongoDB Connection Failed**
```bash
# Check connection string format
# Ensure IP whitelist includes your IP
# Verify username/password are correct
```

### **CORS Errors**
```bash
# Update client API URL
# Check server CORS configuration
# Ensure both servers are running
```

### **Images Not Loading**
```bash
# Verify Cloudinary credentials
# Check network tab for failed requests
# Test Cloudinary upload manually
```

---

## ✅ **Final Checklist**

Before deploying, ensure:

- [ ] All API keys are working in development
- [ ] Environment variables are set correctly
- [ ] .env files are in .gitignore
- [ ] MongoDB connection is established
- [ ] Images generate successfully
- [ ] Images upload to Cloudinary
- [ ] Gallery loads and displays images
- [ ] Search functionality works
- [ ] Error handling works (try invalid prompts)
- [ ] Mobile responsiveness is good
- [ ] Production environment variables are set

---

## 🆘 **Getting Help**

If you encounter issues:

1. **Check the browser console** for error messages
2. **Check server logs** for backend errors
3. **Verify environment variables** are loaded correctly
4. **Test each service individually** (OpenAI, MongoDB, Cloudinary)
5. **Check API quotas and limits**

**Common Debug Commands**:
```bash
# Check if environment variables are loaded
node -e "console.log(process.env.OPENAI_API_KEY)"

# Test MongoDB connection
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGODB_URL).then(() => console.log('Connected')).catch(err => console.log(err))"
```

---

*Once you complete this setup, you'll have your own fully functional AI Image Generator with your own API keys and services!* 🎉