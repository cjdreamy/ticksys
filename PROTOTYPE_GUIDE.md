# Event Ticketing System - Prototype

This is a local, prototype version of the ticketing system using **localStorage** instead of APIs. No backend required!

## Quick Start

### Installation

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the app:
```bash
npm start
```

The app will open automatically at `http://localhost:3000`

## Features (Local Storage)

### User Features
- **Register/Login**: Create user account (stored locally)
- **Browse Events**: View 5 sample events with filters
- **Purchase Tickets**: Buy tickets for any event
- **View Tickets**: See all purchased tickets in "My Tickets"
- **Cancel Tickets**: Cancel purchased tickets

### Organizer Features
- **Register/Login**: Create organizer account (stored locally)
- **Create Events**: Add new events with details
- **Manage Events**: View and delete created events
- **Track Sales**: See tickets sold and revenue per event

## Sample Data

### Demo Users (Pre-loaded)
You can create your own accounts, or use these test accounts:

**User:**
- Email: user@test.com
- Password: test123

**Organizer:**
- Email: org@test.com
- Password: test123

### Sample Events
5 sample events are available by default:
1. Summer Music Festival - New York (Music)
2. Tech Conference 2026 - San Francisco (Technology)
3. Championship Boxing - Las Vegas (Sports)
4. Art Expo 2026 - Los Angeles (Art)
5. Business Summit - Chicago (Business)

## Data Storage

All data is stored in **browser localStorage**:
- User accounts: `mockUsers`
- Organizer accounts: `mockOrganizers`
- User tickets: `userTickets`
- Organizer events: `organizerEvents`
- Auth tokens: `userToken`, `organizerToken`

**To clear all data:**
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Delete entries starting with `mockUsers`, `mockOrganizers`, `userTickets`, `organizerEvents`
4. Refresh the page

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ProtectedUserRoute.js
│   │   └── ProtectedOrganizerRoute.js
│   ├── context/
│   │   └── AuthContext.js          (Local auth logic)
│   ├── pages/
│   │   ├── EventsList.js           (Mock events)
│   │   ├── EventDetail.js          (Ticket purchase)
│   │   ├── MyTickets.js            (User tickets)
│   │   ├── OrganizerDashboard.js   (Event management)
│   │   ├── UserLogin.js
│   │   ├── UserRegister.js
│   │   ├── OrganizerLogin.js
│   │   └── OrganizerRegister.js
│   ├── styles/                     (CSS files)
│   └── App.js
└── package.json
```

## How to Test

### As a User:
1. Click "User Login" or go to `/user/login`
2. Register a new account or use test account
3. Go to home page to browse events
4. Click "View Details" on any event
5. Select quantity and purchase tickets
6. View purchased tickets in "My Tickets"

### As an Organizer:
1. Click "Organizer Login" or go to `/organizer/login`
2. Register a new account or use test account
3. Go to "Dashboard"
4. Click "Create Event" and fill the form
5. View your created events in the table
6. See real-time ticket sales and revenue

## Limitations (Prototype)

- Data is lost on browser cache clear
- No payment processing (demo only)
- Single browser instance (not synced across tabs)
- No image uploads
- Limited validation

## Future: Moving to Backend

When ready to add a real backend:

1. Install axios: `npm install axios`
2. Update `frontend/package.json` to add `proxy: "http://localhost:5000"`
3. Install backend dependencies: `cd backend && npm install`
4. Update `.env` with MongoDB connection
5. Run backend: `npm run dev`
6. Update API calls in each component to use axios instead of localStorage

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge
- Firefox
- Safari

## Troubleshooting

**"npm install" fails:**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

**App won't start:**
- Make sure you're in the `frontend` folder
- Try: `npm cache clean --force` then `npm install`

**Data not saving:**
- Check if localStorage is enabled (not in private/incognito mode)
- Open DevTools > Application > Storage to verify

## Notes

This prototype uses **localStorage** for simplicity. For production:
- Implement real authentication (JWT with backend)
- Add MongoDB for persistent data
- Implement payment gateway (Stripe, etc.)
- Add email verification
- Add proper error handling
- Add tests
