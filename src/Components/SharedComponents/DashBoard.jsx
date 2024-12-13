import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashBoard.css';

const DashBoard = () => {
  const [statistics, setStatistics] = useState({
    fieldsCount: 0,
    roomsCount: 0,
    professorsCount: 0,
    studentsCount: 0,
    activeUsersCount: 0,
    departmentsCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch statistics data
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const fieldsResponse = await axios.get('http://localhost:8080/Back-end-1.0-SNAPSHOT/api/filieres');
        const roomsResponse = await axios.get('http://localhost:8080/Back-end-1.0-SNAPSHOT/api/salles');
        const professorsResponse = await axios.get('http://localhost:8080/Back-end-1.0-SNAPSHOT/api/utilisateurs?typeUser=PROFESSOR');
        const activeUsersResponse = await axios.get('http://localhost:8080/Back-end-1.0-SNAPSHOT/api/utilisateurs');

        setStatistics({
          fieldsCount: fieldsResponse.data.length,
          roomsCount: roomsResponse.data.length,
          professorsCount: professorsResponse.data.length,
          activeUsersCount: activeUsersResponse.data.length,
        });

        setLoading(false); // Set loading to false after the data is fetched
      } catch (err) {
        setError('Failed to fetch statistics');
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="stat">
        <div className="item">
          <h3>Total Fields</h3>
          <p>{statistics.fieldsCount}</p>
        </div>
        <div className="item">
          <h3>Total Rooms</h3>
          <p>{statistics.roomsCount}</p>
        </div>
        <div className="item">
          <h3>Total Professors</h3>
          <p>{statistics.professorsCount}</p>
        </div>
      
        <div className="item">
          <h3>Users</h3>
          <p>{statistics.activeUsersCount}</p>
        </div>
    
      </div>
    </div>
  );
};

export default DashBoard;
