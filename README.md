# URL Shortener

A simple and clean URL shortening service built with React, Express.js, and MongoDB.

## What it does

- **Shorten URLs**: Turn long URLs into short, shareable links
- **Track clicks**: See how many times your links have been accessed
- **Manage links**: Update or delete your shortened URLs
- **Dark UI**: Clean, modern interface with dark theme

## Tech Stack

- **Frontend**: React with Tailwind CSS
- **Backend**: Express.js
- **Database**: MongoDB with Mongoose
- **Features**: REST API, URL validation, click tracking

## Quick Start

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

### Environment Variables
Create a `.env` file in the backend directory:
```
MONGODB_URI=mongodb://localhost:27017/url-shortener
PORT=5000
```

## API Endpoints

- `POST /shorten` - Create short URL
- `GET /shorten/:shortCode` - Get original URL
- `PUT /shorten/:shortCode` - Update URL
- `DELETE /shorten/:shortCode` - Delete URL
- `GET /shorten/:shortCode/stats` - Get click statistics

## How it works

1. Paste your long URL
2. Get a random 6-character short code
3. Share the short link
4. Track clicks and manage your links

Simple as that! No account needed, just paste and go.

## Development

The project uses a clean folder structure with separate backend and frontend directories. Backend handles all API logic while frontend provides a smooth user experience with real-time updates.

Built with ❤️ by Muhammad Ahmed :) 