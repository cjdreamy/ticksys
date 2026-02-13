import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/tickets.css';

const MyTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const fetchTickets = () => {
    try {
      if (!user) {
        setLoading(false);
        return;
      }

      // Get tickets for current user from localStorage
      const allTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
      const userTickets = allTickets.filter(t => t.user === user.email);
      setTickets(userTickets);
    } catch (err) {
      setError('Failed to fetch tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelTicket = (ticketId) => {
    if (window.confirm('Are you sure you want to cancel this ticket?')) {
      try {
        const allTickets = JSON.parse(localStorage.getItem('userTickets') || '[]');
        const updatedTickets = allTickets.map(t =>
          t.id === ticketId ? { ...t, status: 'Cancelled' } : t
        );
        localStorage.setItem('userTickets', JSON.stringify(updatedTickets));
        setTickets(updatedTickets.filter(t => t.user === user.email));
      } catch (err) {
        setError('Failed to cancel ticket');
      }
    }
  };

  if (loading) return <div className="loading">Loading tickets...</div>;

  return (
    <div className="tickets-container">
      <h2>My Tickets</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="tickets-list">
        {tickets.length > 0 ? (
          tickets.map(ticket => (
            <div key={ticket.id} className="ticket-item">
              <div className="ticket-header">
                <h3>{ticket.event?.title}</h3>
                <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                  {ticket.status}
                </span>
              </div>

              <div className="ticket-details">
                <p><strong>Ticket #:</strong> {ticket.ticketNumber}</p>
                <p><strong>Quantity:</strong> {ticket.quantity}</p>
                <p><strong>Price per ticket:</strong> ${ticket.price}</p>
                <p><strong>Total:</strong> ${ticket.price * ticket.quantity}</p>
                <p><strong>Date:</strong> {new Date(ticket.event?.startDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {ticket.event?.location}</p>
                <p><strong>Payment Method:</strong> {ticket.paymentMethod}</p>
                <p><strong>Purchased:</strong> {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
              </div>

              {ticket.status === 'Confirmed' && (
                <button
                  className="btn-cancel"
                  onClick={() => handleCancelTicket(ticket.id)}
                >
                  Cancel Ticket
                </button>
              )}
            </div>
          ))
        ) : (
          <p>You haven't purchased any tickets yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
