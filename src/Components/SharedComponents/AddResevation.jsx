import React, { useState } from "react";
import axios from "axios";
import "./AddReservation.css";
import useRoomsWithReservations from "./../Functions/useRoomsWithReservations"; // Hook personnalisé

const AddReservation = ({ user }) => {
  const rooms = useRoomsWithReservations(); // Salles avec réservations
  const [selectedRoom, setSelectedRoom] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newReservation, setNewReservation] = useState({
    status: "EN_ATTENTE",
    duree: "",
    jour: "",
    effectif: "",
    demandeurId: user?.id || "", // ID du demandeur
    salleId: "",
    typeSeance: "",
  });

  const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const sessions = [1, 2, 3, 4];

  const mapSessionToDuration = (session) => {
    const mapping = {
      1: "EIGHT_THIRTY_TO_TEN_THIRTY",
      2: "TEN_THIRTY_TO_TWELVE_THIRTY",
      3: "TWO_THIRTY_TO_FOUR_THIRTY",
      4: "FOUR_THIRTY_TO_SIX_THIRTY",
    };
    return mapping[session] || "";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoomSelection = (e) => {
    setSelectedRoom(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitReservation = async (e) => {
    e.preventDefault();

    if (!selectedRoom) {
      alert("Please select a room before submitting.");
      return;
    }

    try {
      // Étape 1 : Récupérer les informations de la salle par nom
      const salleResponse = await axios.get(
        `http://localhost:8080/PROJET_JEE_REST_war_exploded/api/salles/by-name?name=${selectedRoom}`
      );
      const salle = salleResponse.data[0];

      if (!salle || !salle.id) {
        throw new Error("Room not found or invalid.");
      }
      else if (salle.status === "BLOCKED") {
        throw new Error("ROOM SELECTED IS BLOCKED ! CHOSE AN OTHER ROOM");
      }

      // Étape 2 : Construire l'objet de réservation
      const newReservationObj = {
        ...newReservation,
        duree: mapSessionToDuration(newReservation.duree),
        salleId: salle.id,
      };

      // Étape 3 : Envoyer la réservation à l'API
      await axios.post(
        "http://localhost:8080/PROJET_JEE_REST_war_exploded/api/reservations",newReservationObj);

      // Étape 4 : Mettre à jour localement les réservations
      const room = rooms.find((r) => r.name === selectedRoom);
      if (room) {
        room.reservations.push({
          day: newReservation.jour,
          session: newReservation.duree,
          reserved: true,
        });
      }

      setShowModal(false); // Fermer le modal
    } catch (error) {
      console.error("Error adding reservation:", error);
      alert("Failed to add reservation. Please try again.");
    }
  };

  const filteredRooms = rooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="addreservation">
      <div className="head">
        <input
          type="search"
          placeholder="Search Room"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="tables">
        {searchQuery === "" ? (
          <div className="no-room-message">Please choose a specific room</div>
        ) : filteredRooms.length === 0 ? (
          <div className="no-room-message">No room found with that name</div>
        ) : (
          filteredRooms.map((room, index) => (
            <div key={index} className="pot">
              <div className="room-name">{room.name}</div>
              <div className="tab">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      {daysOfWeek.map((day, idx) => (
                        <th key={idx}>{day}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, idx) => (
                      <tr key={idx}>
                        <td>{`Session ${session}`}</td>
                        {daysOfWeek.map((day, index) => {
                          const reservation = room.reservations.find(
                            (r) => r.day === day && r.session === session
                          );
                          const isReserved = reservation ? reservation.reserved : false;
                          return (
                            <td
                              key={index}
                              className={isReserved ? "reserved" : "available"}
                            >
                              {isReserved ? "Reserved" : "Available"}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        )}
      </div>
      <button onClick={() => setShowModal(true)} className="add-reservation-button">
        Add Reservation
      </button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Reservation</h2>
            <form onSubmit={handleSubmitReservation}>
              <div className="form-group">
                <label>Room</label>
                <select value={selectedRoom} onChange={handleRoomSelection} required>
                  <option value="">Select Room</option>
                  {rooms.map((room, index) => (
                    <option key={index} value={room.name}>
                      {room.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Type Session</label>
                <select
                  name="typeSeance"
                  value={newReservation.typeSeance}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Type Session</option>
                  <option value="COURS">Lesson</option>
                  <option value="TD">Workshop</option>
                  <option value="TP">Practice</option>
                </select>
              </div>
              <div className="form-group">
                <label>Capacity</label>
                <input
                  type="number"
                  name="effectif"
                  value={newReservation.effectif}
                  onChange={handleInputChange}
                  placeholder="Capacity"
                  required
                />
              </div>
              <div className="form-group">
                <label>Day</label>
                <select
                  name="jour"
                  value={newReservation.jour}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Day</option>
                  {daysOfWeek.map((day, index) => (
                    <option key={index} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Session</label>
                <select
                  name="duree"
                  value={newReservation.duree}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Session</option>
                  <option value="1">8h30 - 10h30</option>
                  <option value="2">10h30 - 12h30</option>
                  <option value="3">14h30 - 16h30</option>
                  <option value="4">16h30 - 18h30</option>
                </select>
              </div>

              <button type="submit">Add Reservation</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReservation;
