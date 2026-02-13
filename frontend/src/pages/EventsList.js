import React, { useState, useEffect } from 'react';
import '../styles/events.css';

// Mock events data
const MOCK_EVENTS = [
  {
    _id: '1',
    title: 'Summer Music Festival',
    description: 'Join us for the biggest music festival of the year featuring top artists from around the world.',
    category: 'Music',
    startDate: new Date(2026, 5, 15).toISOString(),
    endDate: new Date(2026, 5, 17).toISOString(),
    location: 'Central Park',
    city: 'New York',
    price: 99,
    ticketsAvailable: 500,
    capacity: 1000,
    organizer: { name: 'Live Events Co', email: 'live@events.com' },
    image: null
  },
  {
    _id: '2',
    title: 'Tech Conference 2026',
    description: 'The leading technology conference bringing together innovators and industry leaders.',
    category: 'Technology',
    startDate: new Date(2026, 3, 20).toISOString(),
    endDate: new Date(2026, 3, 22).toISOString(),
    location: 'Convention Center',
    city: 'San Francisco',
    price: 299,
    ticketsAvailable: 200,
    capacity: 500,
    organizer: { name: 'Tech Corp', email: 'tech@corp.com' },
    image: null
  },
  {
    _id: '3',
    title: 'Championship Boxing',
    description: 'Watch the world championship boxing match live. Featuring the top boxers of 2026.',
    category: 'Sports',
    startDate: new Date(2026, 4, 10).toISOString(),
    endDate: new Date(2026, 4, 10).toISOString(),
    location: 'Sports Arena',
    city: 'Las Vegas',
    price: 149,
    ticketsAvailable: 1000,
    capacity: 5000,
    organizer: { name: 'Sports Events', email: 'sports@events.com' },
    image: null
  },
  {
    _id: '4',
    title: 'Art Expo 2026',
    description: 'Explore contemporary and classical art from emerging and established artists worldwide.',
    category: 'Art',
    startDate: new Date(2026, 6, 1).toISOString(),
    endDate: new Date(2026, 6, 30).toISOString(),
    location: 'Modern Art Museum',
    city: 'Los Angeles',
    price: 45,
    ticketsAvailable: 300,
    capacity: 1000,
    organizer: { name: 'Art Gallery', email: 'gallery@art.com' },
    image: null
  },
  {
    _id: '5',
    title: 'Business Summit',
    description: 'Network with industry leaders and learn about the future of business in 2026.',
    category: 'Business',
    startDate: new Date(2026, 7, 15).toISOString(),
    endDate: new Date(2026, 7, 16).toISOString(),
    location: 'Downtown Hotel',
    city: 'Chicago',
    price: 199,
    ticketsAvailable: 150,
    capacity: 300,
    organizer: { name: 'Business Co', email: 'business@co.com' },
    image: null
  }
];

const EventsList = () => {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [filteredEvents, setFilteredEvents] = useState(MOCK_EVENTS);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    city: '',
    search: ''
  });

  useEffect(() => {
    applyFilters();
  }, [filters, events]);

  const applyFilters = () => {
    let filtered = events.filter(event => {
      let matches = true;

      if (filters.category && event.category !== filters.category) {
        matches = false;
      }

      if (filters.city && event.city.toLowerCase() !== filters.city.toLowerCase()) {
        matches = false;
      }

      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        matches = event.title.toLowerCase().includes(searchLower) ||
                 event.description.toLowerCase().includes(searchLower);
      }

      return matches;
    });

    setFilteredEvents(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="events-container">
      <h2>Browse Events</h2>

      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Search events..."
          value={filters.search}
          onChange={handleFilterChange}
        />
        
        <select name="category" value={filters.category} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Music">Music</option>
          <option value="Sports">Sports</option>
          <option value="Technology">Technology</option>
          <option value="Art">Art</option>
          <option value="Business">Business</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Education">Education</option>
        </select>

        <input
          type="text"
          name="city"
          placeholder="City"
          value={filters.city}
          onChange={handleFilterChange}
        />
      </div>

      <div className="events-grid">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <div key={event._id} className="event-card">
              {event.image && <img src={event.image} alt={event.title} className="event-image" />}
              <div className="event-info">
                <h3>{event.title}</h3>
                <p className="event-category">{event.category}</p>
                <p className="event-date">
                  {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p className="event-location">📍 {event.location}</p>
                <p className="event-price">${event.price}</p>
                <p className="event-available">
                  {event.ticketsAvailable} tickets available
                </p>
                <a href={`/event/${event._id}`} className="btn-view">
                  View Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No events found</p>
        )}
      </div>
    </div>
  );
};

export default EventsList;
