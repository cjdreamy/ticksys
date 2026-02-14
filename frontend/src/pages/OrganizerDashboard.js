import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/organizer-dashboard.css';

const OrganizerDashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Music',
    startDate: '',
    endDate: '',
    location: '',
    city: '',
    country: '',
    capacity: '',
    price: ''
  });
  const { organizer } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, [organizer]);

  const fetchEvents = () => {
    try {
      if (!organizer) {
        setLoading(false);
        return;
      }

      // Get events for current organizer from localStorage
      const allEvents = JSON.parse(localStorage.getItem('organizerEvents') || '[]');
      const organizerEvents = allEvents.filter(e => e.organizerId === organizer.id);
      setEvents(organizerEvents);
    } catch (err) {
      setError('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description || !formData.location || !formData.capacity || !formData.price) {
        setError('Please fill in all required fields');
        return;
      }

      const newEvent = {
        _id: 'event_' + Date.now(),
        organizerId: organizer.id,
        organizer: { name: organizer.name, email: organizer.email, company: organizer.company },
        ...formData,
        capacity: parseInt(formData.capacity),
        ticketsAvailable: parseInt(formData.capacity),
        price: parseFloat(formData.price),
        status: 'Published',
        createdAt: new Date().toISOString()
      };

      const allEvents = JSON.parse(localStorage.getItem('organizerEvents') || '[]');
      allEvents.push(newEvent);
      localStorage.setItem('organizerEvents', JSON.stringify(allEvents));

      setEvents([...events, newEvent]);
      setFormData({
        title: '',
        description: '',
        category: 'Music',
        startDate: '',
        endDate: '',
        location: '',
        city: '',
        country: '',
        capacity: '',
        price: ''
      });
      setShowCreateEvent(false);
      setError('');
    } catch (err) {
      setError('Failed to create event');
    }
  };

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const allEvents = JSON.parse(localStorage.getItem('organizerEvents') || '[]');
        const filteredEvents = allEvents.filter(e => e._id !== eventId);
        localStorage.setItem('organizerEvents', JSON.stringify(filteredEvents));
        setEvents(events.filter(e => e._id !== eventId));
      } catch (err) {
        setError('Failed to delete event');
      }
    }
  };

  const getEventStats = (eventId) => {
    try {
      const allTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const eventTickets = allTickets.filter(t => t.event._id === eventId && t.status === 'Confirmed');
      
      const totalSold = eventTickets.reduce((sum, t) => sum + t.quantity, 0);
      const totalRevenue = eventTickets.reduce((sum, t) => sum + (t.price * t.quantity), 0);
      
      return { totalSold, totalRevenue, totalTickets: eventTickets.length };
    } catch (err) {
      return { totalSold: 0, totalRevenue: 0, totalTickets: 0 };
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="organizer-dashboard">
      <h2>Organizer Dashboard</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-header">
        <button
          className="btn-create"
          onClick={() => setShowCreateEvent(!showCreateEvent)}
        >
          {showCreateEvent ? 'Cancel' : 'Create Event'}
        </button>
      </div>

      {showCreateEvent && (
        <div className="create-event-form">
          <h3>Create New Event</h3>
          <form onSubmit={handleCreateEvent}>
            <div className="form-row">
              <div className="form-group">
                <label>Event Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Music">Music</option>
                  <option value="Sports">Sports</option>
                  <option value="Technology">Technology</option>
                  <option value="Art">Art</option>
                  <option value="Business">Business</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Education">Education</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Ticket Capacity *</label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ticket Price (KSH) *</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">Create Event</button>
          </form>
        </div>
      )}

      <div className="events-management">
        <h3>Your Events</h3>
        {events.length > 0 ? (
          <div className="events-table">
            <table>
              <thead>
                <tr>
                  <th>Event Title</th>
                  <th>Category</th>
                  <th>Start Date</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Capacity</th>
                  <th>Tickets Sold</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map(event => {
                  const stats = getEventStats(event._id);
                  return (
                    <tr key={event._id}>
                      <td>{event.title}</td>
                      <td>{event.category}</td>
                      <td>{new Date(event.startDate).toLocaleDateString()}</td>
                      <td>{event.location}</td>
                      <td>KSH {event.price}</td>
                      <td>{event.capacity}</td>
                      <td>{stats.totalSold} (KSH {stats.totalRevenue})</td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteEvent(event._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>You haven't created any events yet.</p>
        )}
      </div>
    </div>
  );
};

export default OrganizerDashboard;
