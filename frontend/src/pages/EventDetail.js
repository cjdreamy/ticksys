import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/event-detail.css';

// Mock events data - same as EventsList
const MOCK_EVENTS = {
  '1': {
    _id: '1',
    title: 'Summer Music Festival',
    description: 'Join us for the biggest music festival of the year featuring top artists from around the world. Enjoy live performances, food vendors, and amazing atmosphere.',
    category: 'Music',
    startDate: new Date(2026, 5, 15).toISOString(),
    endDate: new Date(2026, 5, 17).toISOString(),
    location: 'Central Park',
    city: 'New York',
    country: 'USA',
    price: 99,
    ticketsAvailable: 500,
    capacity: 1000,
    organizer: { name: 'Live Events Co', email: 'live@events.com', company: 'Live Events Co' },
    image: null
  },
  '2': {
    _id: '2',
    title: 'Tech Conference 2026',
    description: 'The leading technology conference bringing together innovators and industry leaders. Featuring keynotes from top tech companies and networking sessions.',
    category: 'Technology',
    startDate: new Date(2026, 3, 20).toISOString(),
    endDate: new Date(2026, 3, 22).toISOString(),
    location: 'Convention Center',
    city: 'San Francisco',
    country: 'USA',
    price: 299,
    ticketsAvailable: 200,
    capacity: 500,
    organizer: { name: 'Tech Corp', email: 'tech@corp.com', company: 'Tech Corp' },
    image: null
  },
  '3': {
    _id: '3',
    title: 'Championship Boxing',
    description: 'Watch the world championship boxing match live. Featuring the top boxers of 2026. Get premium seats with the best views.',
    category: 'Sports',
    startDate: new Date(2026, 4, 10).toISOString(),
    endDate: new Date(2026, 4, 10).toISOString(),
    location: 'Sports Arena',
    city: 'Las Vegas',
    country: 'USA',
    price: 149,
    ticketsAvailable: 1000,
    capacity: 5000,
    organizer: { name: 'Sports Events', email: 'sports@events.com', company: 'Sports Events' },
    image: null
  },
  '4': {
    _id: '4',
    title: 'Art Expo 2026',
    description: 'Explore contemporary and classical art from emerging and established artists worldwide. Interactive exhibits and artist meet-and-greets.',
    category: 'Art',
    startDate: new Date(2026, 6, 1).toISOString(),
    endDate: new Date(2026, 6, 30).toISOString(),
    location: 'Modern Art Museum',
    city: 'Los Angeles',
    country: 'USA',
    price: 45,
    ticketsAvailable: 300,
    capacity: 1000,
    organizer: { name: 'Art Gallery', email: 'gallery@art.com', company: 'Art Gallery' },
    image: null
  },
  '5': {
    _id: '5',
    title: 'Business Summit',
    description: 'Network with industry leaders and learn about the future of business in 2026. Workshops and panel discussions from experts.',
    category: 'Business',
    startDate: new Date(2026, 7, 15).toISOString(),
    endDate: new Date(2026, 7, 16).toISOString(),
    location: 'Downtown Hotel',
    city: 'Chicago',
    country: 'USA',
    price: 199,
    ticketsAvailable: 150,
    capacity: 300,
    organizer: { name: 'Business Co', email: 'business@co.com', company: 'Business Co' },
    image: null
  }
};

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isUserLoggedIn, userToken, user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const foundEvent = MOCK_EVENTS[id];
    if (foundEvent) {
      setEvent({ ...foundEvent, ticketsAvailable: foundEvent.ticketsAvailable });
    }
    setLoading(false);
  }, [id]);

  const handlePurchase = async () => {
    if (!isUserLoggedIn) {
      navigate('/user/login');
      return;
    }

    try {
      setError('');
      setSuccess('');

      if (event.ticketsAvailable < quantity) {
        setError('Not enough tickets available');
        return;
      }

      // Create ticket object
      const ticket = {
        id: 'ticket_' + Date.now(),
        ticketNumber: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        event: event,
        user: user.email,
        price: event.price,
        quantity: parseInt(quantity),
        status: 'Confirmed',
        paymentMethod,
        purchaseDate: new Date().toISOString(),
        transactionId: `TXN-${Date.now()}`
      };

      // Save ticket to localStorage
      let tickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      tickets.push(ticket);
      localStorage.setItem('userTickets', JSON.stringify(tickets));

      // Update event available tickets
      const updatedEvent = { ...event, ticketsAvailable: event.ticketsAvailable - quantity };
      setEvent(updatedEvent);

      // Update mock events
      MOCK_EVENTS[id] = updatedEvent;

      setSuccess(`Successfully purchased ${quantity} ticket(s)! Total: $${event.price * quantity}`);
      setQuantity(1);
      setTimeout(() => navigate('/my-tickets'), 2000);
    } catch (err) {
      setError('Purchase failed');
    }
  };

  if (loading) return <div className="loading">Loading event...</div>;
  if (!event) return <div className="error-message">Event not found</div>;

  return (
    <div className="event-detail-container">
      <div className="event-header">
        {event.image && <img src={event.image} alt={event.title} className="event-banner" />}
        <div className="event-header-info">
          <h1>{event.title}</h1>
          <p className="category-badge">{event.category}</p>
        </div>
      </div>

      <div className="event-content">
        <div className="event-main">
          <h3>About Event</h3>
          <p>{event.description}</p>

          <h3>Event Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <strong>Date:</strong>
              <p>{new Date(event.startDate).toLocaleDateString()}</p>
            </div>
            <div className="detail-item">
              <strong>Location:</strong>
              <p>{event.location}</p>
            </div>
            <div className="detail-item">
              <strong>City:</strong>
              <p>{event.city}</p>
            </div>
            <div className="detail-item">
              <strong>Organizer:</strong>
              <p>{event.organizer?.name}</p>
            </div>
          </div>
        </div>

        <div className="ticket-sidebar">
          <div className="ticket-box">
            <h3>Get Tickets</h3>
            <p className="price">${event.price} per ticket</p>
            <p className="available">
              {event.ticketsAvailable} tickets available
            </p>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                max={event.ticketsAvailable}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Payment Method</label>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="Card">Credit Card</option>
                <option value="Transfer">Bank Transfer</option>
                <option value="Wallet">Digital Wallet</option>
              </select>
            </div>

            <div className="price-summary">
              <p>Subtotal: <strong>${event.price * quantity}</strong></p>
              <p>Total: <strong>${event.price * quantity}</strong></p>
            </div>

            <button
              className="btn-purchase"
              onClick={handlePurchase}
              disabled={event.ticketsAvailable === 0}
            >
              {event.ticketsAvailable === 0 ? 'Sold Out' : 'Buy Tickets'}
            </button>

            {!isUserLoggedIn && (
              <p className="login-prompt">
                <a href="/user/login">Login</a> to purchase tickets
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
