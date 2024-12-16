import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SalleMg.css'

const SalleMg = () => {
  const [activeTab, setActiveTab] = useState('Home'); // Set default active tab to "Home"
  const [rooms, setRooms] = useState([]); // State for all rooms
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Form state for adding a new room
  const [newRoom, setNewRoom] = useState({
    nom: '',
    capacite: '',
    typeSalle: '',
    departement: null, // Add departement field
    status: 'AVAILABLE',
  });
  

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/PROJET_JEE_REST_war_exploded/api/salles');
        setRooms(response.data); // Store the room data
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching rooms:', err);
        setError('Failed to fetch rooms'); // Set error message in case of failure
        setLoading(false);
      }
    };

    fetchRooms(); // Call the function to fetch rooms on component mount
  }, []);

  // Group rooms by block
  const groupedRooms = rooms.reduce((acc, room) => {
    const block = room.nom.charAt(0); // Assume block is the first character of the room name
    if (!acc[block]) {
      acc[block] = [];
    }
    acc[block].push(room);
    return acc;
  }, {});

  // Tabs for each block + Home
  const tabs = [
    { label: 'Home' },
    { label: 'Block H', content: groupedRooms['H'] || [] },
    { label: 'Block F', content: groupedRooms['F'] || [] },
    { label: 'Block K', content: groupedRooms['K'] || [] },
    { label: 'Amphi', content: groupedRooms['A'] || [] },
  ];

  // Set the current tab based on the active tab
  const currentTab = tabs.find((tab) => tab.label === activeTab);

  // Function to handle modifying room status
  const handleModifyStatus = async (roomId) => {
    try {
      const roomToModify = rooms.find((room) => room.id === roomId);
      const newStatus = roomToModify.status === 'AVAILABLE' ? 'BLOCKED' : 'AVAILABLE';

      await axios.put(`http://localhost:8080/PROJET_JEE_REST_war_exploded/api/salles/${roomId}`, {
        ...roomToModify,
        status: newStatus,
      });

      setRooms((prevRooms) =>
        prevRooms.map((room) => (room.id === roomId ? { ...room, status: newStatus } : room))
      );
    } catch (err) {
      console.error('Error modifying room status:', err);
      setError('Failed to modify room status');
    }
  };

  // Function to handle adding a new room
  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        nom: newRoom.nom,
        capacite: parseInt(newRoom.capacite, 10), // Ensure numeric type
        typeSalle: newRoom.typeSalle,
        departement: newRoom.departement || null, // Include the departement field
        status: newRoom.status,
      };
  
      const response = await axios.post(
        'http://localhost:8080/PROJET_JEE_REST_war_exploded/api/salles',
        payload
      );
  
      setRooms((prevRooms) => [...prevRooms, response.data]); // Update rooms list
      setNewRoom({ nom: '', capacite: '', typeSalle: '', departement: null, status: 'AVAILABLE' }); // Reset form
    } catch (err) {
      console.error('Error adding new room:', err.response?.data || err.message);
      setError('Failed to add room');
    }
  };
  
  const handleDeleteRoom = async (roomId) => {
    try {
      await axios.delete(`http://localhost:8080/PROJET_JEE_REST_war_exploded/api/salles/${roomId}`);
      setRooms((prevRooms) => prevRooms.filter((room) => room.id !== roomId)); // Remove room from state
    } catch (err) {
      console.error('Error deleting room:', err);
      setError('Failed to delete room');
    }
  };
  

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="room">
      <div className="nav">
        <ul>
          {tabs.map((tab) => (
            <li
              key={tab.label}
              className={activeTab === tab.label ? 'active' : ''}
              onClick={() => setActiveTab(tab.label)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="tab-content">
        {activeTab === 'Home' ? (
          <form onSubmit={handleAddRoom} className="add-room-form">
            <h3>Add New Room</h3>
            <label>
              Room Name:
              <input
                type="text"
                value={newRoom.nom}
                onChange={(e) => setNewRoom({ ...newRoom, nom: e.target.value })}
                required
              />
            </label>
            <label>
              Capacity:
              <input
                type="number"
                value={newRoom.capacite}
                onChange={(e) => setNewRoom({ ...newRoom, capacite: e.target.value })}
                required
              />
            </label>
            <label>
              Type:
              <select
                className="styled-select"
                value={newRoom.typeSalle}
                onChange={(e) => setNewRoom({ ...newRoom, typeSalle: e.target.value })} required >
                <option value="">Select Type</option>
                <option value="AMPHI">AMPHI(Seminar)</option>
                <option value="SALLE">Classroom</option>
                <option value="LABORATOIRE">Laboratory</option>
            </select>
            </label>
            <button type="submit">Add Room</button>
          </form>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Room</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Status</th>
                <th>Modify Status</th>
              </tr>
            </thead>
            <tbody>
                {currentTab.content.map((room) => (
                <tr key={room.id}>
                <td>{room.nom}</td>
                <td>{room.capacite}</td>
                <td>{room.typeSalle}</td>
                <td>{room.status}</td>
                <td>
                    <button onClick={() => handleModifyStatus(room.id)}>Modify</button>
                    <button onClick={() => handleDeleteRoom(room.id)} className="delete-button">Delete</button>
                </td>
                </tr>
                ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
};

export default SalleMg;
