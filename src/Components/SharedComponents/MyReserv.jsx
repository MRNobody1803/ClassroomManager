import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyReserv.css';

const MyReserv = ({user}) => {
  // Initialisation du state pour les réservations
  const [reservations, setReservations] = useState([]);
  const [currentReservation, setCurrentReservation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction pour récupérer les réservations depuis l'API
  const fetchReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/PROJET_JEE_REST_war_exploded/api/reservations/demandeur/${user.id}`);
      const fetchedReservations = response.data.map((reservation, index) => ({
        id: reservation.id,
        reservationNumber: `Reservation number : ${index + 1}`,
        reservationDate: formatReservationDate(reservation.jour, reservation.duree), 
        createdDate: formatDate(reservation.dateCreation), 
        room: mapSalleToRoom(reservation.salleId), 
        session: mapDurationToSession(reservation.duree), 
        status: mapStatus(reservation.status), 
      }));
      setReservations(fetchedReservations);
    } catch (error) {
      console.error("Erreur lors de la récupération des réservations:", error);
    }
  };

  // Charger les réservations à chaque fois que le composant se monte
  useEffect(() => {
    fetchReservations();
  }, []);

  // Ouverture du modal pour ajouter ou modifier une réservation
  const openModal = (reservation = null) => {
    setCurrentReservation(reservation);
    setIsModalOpen(true);
  };

  // Fermeture du modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentReservation(null);
  };

  // Gestion des changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Ajouter ou modifier une réservation
  const handleSaveReservation = (e) => {
    e.preventDefault();
    if (currentReservation.id) {
      // Modifier une réservation existante
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === currentReservation.id ? currentReservation : reservation
        )
      );
    } else {
      // Ajouter une nouvelle réservation
      setReservations((prev) => [
        ...prev,
        { ...currentReservation, id: Date.now(), createdDate: new Date().toISOString().split('T')[0] },
      ]);
    }
    closeModal();
  };

  // Supprimer une réservation
  const handleCancelReservation = async (id) => {
    try {
      // Demander confirmation avant d'annuler
      const confirmCancel = window.confirm("Are you sure you want to cancel this reservation?");
      if (!confirmCancel) {
        return; // Si l'utilisateur annule, on quitte la fonction
      }
  
      // Appel API pour changer le statut de la réservation à "ANNULEE"
      const response = await axios.put(
        `http://localhost:8080/PROJET_JEE_REST_war_exploded/api/reservations/${id}/status?status=ANNULEE`
      );
  
      // Vérifier si la requête a réussi
      if (response.status === 200) {
        // Mettre à jour l'état local des réservations
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation.id === id ? { ...reservation, status: "ANNULEE" } : reservation
          )
        );
        alert("Reservation canceled successfully!");
      } else {
        alert("Failed to cancel the reservation. Please try again.");
      }
    } catch (error) {
      console.error("Error while canceling reservation:", error);
      alert("An error occurred while canceling the reservation. Please try again.");
    }
  };

  // Modifier une réservation dans la base de données
const handleUpdateReservation = async (e) => {
  e.preventDefault(); // Empêche le comportement par défaut du formulaire

  try {
    // Construire l'objet de données à envoyer
    const updatedReservation = {
      id: currentReservation.id,
      reservationNumber: currentReservation.reservationNumber,
      jour: reverseFormatReservationDate(currentReservation.reservationDate),
      salleId: reverseMapSalleToRoom(currentReservation.room),
      duree: reverseMapDurationToSession(currentReservation.session),
    };

    // Envoyer une requête PUT pour modifier la réservation
    const response = await axios.put(
      `http://localhost:8080/PROJET_JEE_REST_war_exploded/api/reservations/${updatedReservation.id}`,
      updatedReservation
    );

    // Vérifier si la requête a réussi
    if (response.status === 200) {
      // Mettre à jour l'état local
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === updatedReservation.id
            ? { ...reservation, ...currentReservation }
            : reservation
        )
      );
      alert("Reservation updated successfully!");
      closeModal(); // Fermer le modal après la mise à jour
    } else {
      alert("Failed to update the reservation. Please try again.");
    }
  } catch (error) {
    console.error("Error while updating reservation:", error);
    alert("An error occurred while updating the reservation. Please try again.");
  }
};

  

  return (
    <div className="reservation-management-container">
      <h2>Reservation request management:</h2>

      <div className="reservations-list">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-card">
              <h3>{reservation.reservationNumber}</h3>
              <p>Reservation Date: {reservation.reservationDate}</p>
              <p>Creation Date: {reservation.createdDate}</p>
              <p>ClassRoom: {reservation.room}</p>
              <p>Session: {reservation.session}</p>
              <p>Status: {reservation.status}</p>
              <div className="reservation-actions">
                <button onClick={() => handleCancelReservation(reservation.id)}>Cancel</button>
              </div>
            </div>
          ))
        ) : (
          <p>No reservation request</p>
        )}
      </div>

      {/* Modal d'ajout ou de modification de réservation */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{currentReservation ? 'Modifier la Réservation' : 'Ajouter une Réservation'}</h2>
            <form onSubmit={handleUpdateReservation}>
              <div className="form-group">
                <label>Reservation number:</label>
                <input
                  type="text"
                  name="reservationNumber"
                  value={currentReservation?.reservationNumber || ''}
                  onChange={handleInputChange}
                  required
                  disabled={currentReservation ? true : false}
                />
              </div>
              <div className="form-group">
                <label>Date de Réservation</label>
                <input
                  type="date"
                  name="reservationDate"
                  value={currentReservation?.reservationDate || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Salle</label>
                <input
                  type="text"
                  name="room"
                  value={currentReservation?.room || ''}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Séance</label>
                <select
                  name="session"
                  value={currentReservation?.session || ''}
                  onChange={handleInputChange}
                  required
                >
                  <option value="8h30-10h30">8h30 - 10h30</option>
                  <option value="10h30-12h30">10h30 - 12h30</option>
                  <option value="12h30-14h30">12h30 - 14h30</option>
                  <option value="14h30-16h30">14h30 - 16h30</option>
                  <option value="16h30-18h30">16h30 - 18h30</option>
                </select>
              </div>
              <div className="modal-actions">
                <button type="submit">Enregistrer</button>
                <button type="button" onClick={closeModal}>Annuler</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Fonction utilitaire pour formater la date de réservation
const formatReservationDate = (jour, duree) => {
  const dayMapping = {
    "MON": "2024-12-20",
    "TUE": "2024-12-21",
    // Ajouter les autres jours au besoin
  };

  const durationMapping = {
    "EIGHT_THIRTY_TO_TEN_THIRTY": "8h30-10h30",
    "TEN_THIRTY_TO_TWELVE_THIRTY": "10h30-12h30",
    "FOUR_THIRTY_TO_SIX_THIRTY": "16h30-18h30",
    // Ajouter d'autres horaires de durée
  };

  const date = dayMapping[jour];
  const sessionTime = durationMapping[duree];

  return `${date} ${sessionTime}`;
};

// Fonction utilitaire pour formater la date de création
const formatDate = (date) => {
  const dateParts = date.split("T")[0]; // Extraire la date de la chaîne
  return dateParts; // Retourner la date au format "YYYY-MM-DD"
};

// Fonction pour mapper la durée à une session spécifique
const mapDurationToSession = (duree) => {
  const durationMapping = {
    "EIGHT_THIRTY_TO_TEN_THIRTY": "8h30-10h30",
    "TEN_THIRTY_TO_TWELVE_THIRTY": "10h30-12h30",
    "FOUR_THIRTY_TO_SIX_THIRTY": "16h30-18h30",
    // Ajouter d'autres horaires de durée
  };
  return durationMapping[duree];
};

// Fonction pour mapper l'ID de la salle à un nom de salle
const mapSalleToRoom = (salleId) => {
  const roomMapping = {
    1: "Salle H1",
    4: "Salle H4",
    20: "Salle H11",
    // Ajouter d'autres mappings de salle
  };
  return roomMapping[salleId] || "Salle inconnue"; // Retourner "Salle inconnue" si la salle n'est pas trouvée
};

// Fonction pour mapper le statut à un format lisible
const mapStatus = (status) => {
  const statusMapping = {
    "EN_ATTENTE": "IN PROGRESS",
    "APPROUVEE": "RESERVATION VALID",
    "NOT_VALID": "NOT VALID",
    // Ajouter d'autres statuts si nécessaire
  };
  return statusMapping[status] || "NOT VALID"; // Par défaut "NOT VALID" si le statut n'est pas trouvé
};

export default MyReserv;
