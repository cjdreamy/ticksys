# Deploy to Render

This repository is configured for deployment on Render.com with both frontend and backend services.

## Deployment Setup

### Prerequisites
- GitHub repository connected to Render
- MongoDB database (MongoDB Atlas recommended for production)

### Services Configuration

#### Frontend Service
- **Type**: Static Site
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/build`
- **Node Version**: 22.22.0

#### Backend Service  
- **Type**: Web Service
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Node Version**: 22.22.0

### Environment Variables for Backend

Set these in your Render dashboard for the backend service:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ticketing_system
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d
CLIENT_URL=https://your-frontend-url.onrender.com
```

### Deployment Steps

1. **Connect Repository**: Connect this GitHub repository to Render
2. **Create Services**: Use the `render.yaml` file to automatically create both services
3. **Set Environment Variables**: Configure the backend environment variables
4. **Deploy**: Push changes to trigger automatic deployment

### Manual Deployment (if auto-creation fails)

If Render doesn't automatically create services from `render.yaml`:

#### Frontend Service
1. Create new "Static Site" service
2. Root directory: `frontend`
3. Build command: `npm install && npm run build`
4. Publish directory: `build`

#### Backend Service
1. Create new "Web Service" service  
2. Root directory: `backend`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables listed above

### Troubleshooting

**Build fails with "react-scripts not found"**
- Ensure the build command includes `npm install`: `cd frontend && npm install && npm run build`

**Backend can't connect to database**
- Verify MONGODB_URI is correctly set
- Ensure MongoDB cluster allows connections from Render's IP

**CORS errors**
- Set CLIENT_URL environment variable to your frontend URL
- Backend CORS is configured to use this variable

### Post-Deployment

1. Test frontend at your Render URL
2. Test backend API endpoints
3. Verify user registration and event creation work
4. Check that currency displays as KSH (Kenyan Shillings)
