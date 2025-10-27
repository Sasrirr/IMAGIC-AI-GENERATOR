# 🚀 Quick Start Instructions

## Prerequisites
- Node.js 14+ installed
- Git installed
- API keys obtained (see SETUP_DEPLOYMENT_GUIDE.md)

## 1. Environment Setup
```bash
# Backend environment
cp server/.env.example server/.env
# Edit server/.env with your API keys

# Frontend environment  
cp client/.env.example client/.env
# Edit client/.env if needed
```

## 2. Install Dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

## 3. Start Development Servers
```bash
# Terminal 1: Start backend (port 8080)
cd server
npm start

# Terminal 2: Start frontend (port 3000)
cd client
npm start
```

## 4. Test the Application
1. Open http://localhost:3000
2. Go to "Create Post" page
3. Enter a prompt and generate an image
4. Share the image to community
5. Check the gallery on home page

## 🆘 Need Help?
See `SETUP_DEPLOYMENT_GUIDE.md` for detailed setup instructions including:
- How to get API keys
- Deployment options
- Troubleshooting guide