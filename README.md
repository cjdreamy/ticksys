# Event Ticketing System

A complete full-stack ticketing platform where organizers can create and manage events, and users can browse, purchase, and manage event tickets.

## Features

### For Users
- User registration and login with JWT authentication
- Browse all available events with filters (category, city, search)
- View detailed event information
- Purchase event tickets
- View and manage purchased tickets
- Cancel tickets (if available)

### For Organizers
- Organizer registration and login
- Create, edit, and delete events
- Manage event details (capacity, price, location, dates)
- View sales statistics and ticket information
- Track ticket sales in real-time

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** for database
- **JWT** for authentication
- **Bcryptjs** for password hashing

### Frontend
- **React 18**
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** for styling

## Project Structure

```
ticketsys/
├── backend/
│   ├── config/
│   │   └── database.js          # MongoDB connection
│   ├── controllers/
│   │   ├── authUserController.js
│   │   ├── authOrganizerController.js
│   │   ├── eventController.js
│   │   └── ticketController.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── models/
│   │   ├── User.js
│   │   ├── Organizer.js
│   │   ├── Event.js
│   │   └── Ticket.js
│   ├── routes/
│   │   ├── authUserRoutes.js
│   │   ├── authOrganizerRoutes.js
│   │   ├── eventRoutes.js
│   │   └── ticketRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── ProtectedUserRoute.js
    │   │   └── ProtectedOrganizerRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── EventsList.js
    │   │   ├── EventDetail.js
    │   │   ├── MyTickets.js
    │   │   ├── UserLogin.js
    │   │   ├── UserRegister.js
    │   │   ├── OrganizerLogin.js
    │   │   ├── OrganizerRegister.js
    │   │   └── OrganizerDashboard.js
    │   ├── services/
    │   ├── styles/
    │   │   ├── index.css
    │   │   ├── navbar.css
    │   │   ├── auth.css
    │   │   ├── events.css
    │   │   ├── event-detail.css
    │   │   ├── tickets.css
    │   │   └── organizer-dashboard.css
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ticketing_system
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

5. Start the backend server:
```bash
# Development with auto-reload
npm run dev

# Or production
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/user/register` - Register new user
- `POST /api/auth/user/login` - User login
- `GET /api/auth/user/me` - Get user profile (Protected)
- `PUT /api/auth/user/profile` - Update user profile (Protected)

- `POST /api/auth/organizer/register` - Register new organizer
- `POST /api/auth/organizer/login` - Organizer login
- `GET /api/auth/organizer/me` - Get organizer profile (Protected)
- `PUT /api/auth/organizer/profile` - Update organizer profile (Protected)

### Events
- `GET /api/events` - Get all events (with filters)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create event (Organizer only)
- `PUT /api/events/:id` - Update event (Organizer only)
- `DELETE /api/events/:id` - Delete event (Organizer only)
- `GET /api/events/organizer/my-events` - Get organizer's events
- `GET /api/events/:id/stats` - Get event statistics (Organizer only)

### Tickets
- `POST /api/tickets/purchase` - Purchase tickets
- `GET /api/tickets/my-tickets` - Get user's tickets
- `GET /api/tickets/:id` - Get ticket details
- `PUT /api/tickets/:id/cancel` - Cancel ticket
- `GET /api/tickets/event/:eventId` - Get event tickets (Organizer only)

## User Roles & Permissions

### User
- Browse events
- Purchase tickets
- View own tickets
- Cancel own tickets

### Organizer
- Create and manage events
- View event statistics
- View ticket sales
- Manage event capacity and pricing

## Database Models

### User
- firstName, lastName, email, password
- phone, city, country, dateOfBirth
- profileImage, isVerified

### Organizer
- name, email, password
- company, phone, city, country
- description, profileImage, isVerified

### Event
- title, description, category
- startDate, endDate
- location, city, country
- capacity, ticketsAvailable, price
- organizer (ref), status, views

### Ticket
- ticketNumber, event (ref), user (ref)
- price, quantity, status
- transactionId, paymentMethod
- purchaseDate, usedAt

## Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Email notifications
- [ ] QR code ticket verification
- [ ] Advanced analytics dashboard
- [ ] Refund management
- [ ] Discount codes and coupons
- [ ] Event reviews and ratings
- [ ] Email verification
- [ ] Two-factor authentication
- [ ] Mobile app

## License

MIT License

## Support

For support, email support@eventtickets.com or create an issue in the repository.
