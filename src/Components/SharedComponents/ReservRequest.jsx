import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReservRequest.css';

const ReservRequest = ({ user }) => {
  const [reservations, setReservations] = useState([]); // State for reservation data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch reservations from the API
  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/PROJET_JEE_REST_war_exploded/api/reservations'
      );
      const enrichedData = await Promise.all(
        response.data.map(async (reservation) => {
          const salleResponse = await axios.get(
            `http://localhost:8080/PROJET_JEE_REST_war_exploded/api/salles/${reservation.salleId}`
          );
          return {
            ...reservation,
            salleName: salleResponse.data.nom || `Room ${reservation.salleId}`,
          };
        })
      );
      setReservations(enrichedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setError('Failed to load reservations');
      setLoading(false);
    }
  };

  // Update reservation status
  const updateReservationStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/PROJET_JEE_REST_war_exploded/api/reservations/${id}`,
        { status: newStatus }
      );
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: newStatus } : reservation
        )
      );
    } catch (error) {
      console.error(`Error updating reservation ${id} status:`, error);
    }
  };

const handleAcceptReservation = async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/PROJET_JEE_REST_war_exploded/api/reservations/${id}/status?status=APPROUVEE`);
    if (response.status === 200) {
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: 'APPROUVEE' } : reservation
        )
      );
    }
  } catch (error) {
    console.error(`Error updating reservation ${id} to APPROUVEE:`, error);
  }
};

const handleRejectReservation = async (id) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/PROJET_JEE_REST_war_exploded/api/reservations/${id}/status?status=REFUSEE`);
    if (response.status === 200) {
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: 'REFUSEE' } : reservation
        )
      );
    }
  } catch (error) {
    console.error(`Error updating reservation ${id} to REFUSEE:`, error);
  }
};



  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading) {
    return <div>Loading reservations...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getFullDayName = (shortDay) => {
    const daysMap = {
      MON: 'Monday',
      TUE: 'Tuesday',
      WED: 'Wednesday',
      THU: 'Thursday',
      FRI: 'Friday',
      SAT: 'Saturday',
      SUN: 'Sunday',
    };
    return daysMap[shortDay] || shortDay;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString); 
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }); 
  };

  const mapSessionToDuration = (session) => {
    const mapping = {
      "EIGHT_THIRTY_TO_TEN_THIRTY": '8h30-10h30',
      "TEN_THIRTY_TO_TWELVE_THIRTY": '10h30-12h30',
      "TWO_THIRTY_TO_FOUR_THIRTY": '14h30-16h30',
      "FOUR_THIRTY_TO_SIX_THIRTY": '16h30-18h30',
    };
    return mapping[session] || "Unknown session";
  };

  // Filter out the rejected reservations
  const filteredReservations = reservations
    .filter((reservation) => reservation.status !== 'REFUSEE')
    .sort((a, b) => new Date(b.dateCreation) - new Date(a.dateCreation)); // Sort by dateCreation in descending order

  return (
    <div className="reservation-management-container">
      <h2>Reservation Request Management:</h2>

      <div className="reservations-list">
        {filteredReservations.length > 0 ? (
          filteredReservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <h3>Request Number: {reservation.id}</h3>
              <p><strong>Reservation Date:</strong> {getFullDayName(reservation.jour)}</p>
              <p><strong>Created Date:</strong> {formatDate(reservation.dateCreation)}</p>
              <p><strong>Session:</strong> {mapSessionToDuration(reservation.duree)}</p>
              <p><strong>Classroom:</strong> {reservation.salleName}</p>
              <p><strong>Course Type:</strong> {reservation.typeSeance}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span
                  className={
                    reservation.status === 'APPROUVEE'
                      ? 'status-valid'
                      : reservation.status === 'REFUSEE'
                      ? 'status-rejected'
                      : 'status-in-progress'
                  }
                >
                  {reservation.status}
                </span>
              </p>
              {reservation.status === 'EN_ATTENTE' && (
                <div className="reservation-actions">
                  <button onClick={() => handleAcceptReservation(reservation.id)}>Approve</button>
                  <button onClick={() => handleRejectReservation(reservation.id)}>Reject</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No reservation requests</p>
        )}
      </div>
    </div>
  );
};

export default ReservRequest;
