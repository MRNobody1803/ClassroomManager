import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Room.css';

const Room = () => {
  const [activeTab, setActiveTab] = useState('Block H'); // State for the active tab
  const [rooms, setRooms] = useState([]); // State for all rooms
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Back-end-1.0-SNAPSHOT/api/salles');
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

  // Tabs for each block
  const tabs = [
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
      // Assuming you will toggle the status between 'AVAILABLE' and 'UNAVAILABLE'
      const roomToModify = rooms.find((room) => room.id === roomId);
      const newStatus = roomToModify.status === 'AVAILABLE' ? 'BLOCKED' : 'AVAILABLE';
      
      // Send the new status to the server (modify this URL according to your API)
      await axios.put(`http://localhost:8080/Back-end-1.0-SNAPSHOT/api/salles/${roomId}`, {
        ...roomToModify,
        status: newStatus,
      });
      
      // Update the local state after successful modification
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, status: newStatus } : room
        )
      );
    } catch (err) {
      console.error('Error modifying room status:', err);
      setError('Failed to modify room status');
    }
  };

  // Render loading state
  if (loading) {
    return <div>Loading rooms...</div>;
  }

  // Render error state
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
                  <button onClick={() => handleModifyStatus(room.id)}>
                    Modify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Room;
