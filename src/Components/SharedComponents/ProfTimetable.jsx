import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProfTimetable.css';

const ProfTimetable = ({ user }) => {
  const [timetableData, setTimetableData] = useState([]); // État pour les données des séances
  const [currentWeekRange, setCurrentWeekRange] = useState(''); // État pour la plage de dates de la semaine

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const sessions = ['EIGHT_THIRTY_TO_TEN_THIRTY', 'TEN_THIRTY_TO_TWELVE_THIRTY', 'TWO_THIRTY_TO_FOUR_THIRTY', 'FOUR_THIRTY_TO_SIX_THIRTY'];

  const mapDurationToReadable = {
    EIGHT_THIRTY_TO_TEN_THIRTY: '8h30 - 10h30',
    TEN_THIRTY_TO_TWELVE_THIRTY: '10h30 - 12h30',
    TWO_THIRTY_TO_FOUR_THIRTY: '14h30 - 16h30',
    FOUR_THIRTY_TO_SIX_THIRTY: '16h30 - 18h30',
  };

  const fetchTimetableData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/PROJET_JEE_REST_war_exploded/api/seances/responsable/${user.id}`
      );
      const fetchedData = await Promise.all(
        response.data.map(async (item) => {
          // Initialisation des données par défaut
          const filiereName = item.filiereId 
            ? (await axios.get(`http://localhost:8080/PROJET_JEE_REST_war_exploded/api/filieres/${item.filiereId}`)).data.nom 
            : 'N/A';
          const salleName = item.salleId 
            ? (await axios.get(`http://localhost:8080/PROJET_JEE_REST_war_exploded/api/salles/${item.salleId}`)).data.nom 
            : 'N/A';
          const matierName = item.matierId 
            ? (await axios.get(`http://localhost:8080/PROJET_JEE_REST_war_exploded/api/matieres/${item.matierId}`)).data.name 
            : 'N/A';

          return {
            ...item,
            filiereName,
            salleName,
            matierName,
          };
        })
      );
      setTimetableData(fetchedData);
    } catch (error) {
      console.error('Error fetching timetable data:', error);
    }
  };

  const getWeekDates = (date) => {
    const startDate = new Date(date);
    const dayOfWeek = startDate.getDay() || 7; // Le lundi est 1 et le dimanche est 7
    startDate.setDate(startDate.getDate() - dayOfWeek + 1); // Réinitialiser à lundi de la semaine

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6); // Le dimanche de la même semaine

    const formatDate = (date) => {
      const dd = String(date.getDate()).padStart(2, '0');
      const mm = String(date.getMonth() + 1).padStart(2, '0'); // Les mois sont basés sur 0
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  useEffect(() => {
    const today = new Date();
    const weekRange = getWeekDates(today);
    setCurrentWeekRange(weekRange);

    fetchTimetableData();
  }, []);

  const renderCellContent = (day, session) => {
    const reservation = timetableData.find(
      (item) => item.jour === day.substring(0, 3).toUpperCase() && item.duree === session
    );

    if (reservation) {
      return (
        <div>
          <div><strong>Subject:</strong> {reservation.typeSeance || 'N/A'}</div>
          <div><strong>Field:</strong> {reservation.filiereName}</div>
          <div><strong>Room:</strong> {reservation.salleName}</div>
          <div><strong>Course Name:</strong> {reservation.matierName}</div>
        </div>
      );
    }

    return 'None';
  };

  return (
    <div className="proftimetable">
      <div className="phead">
        <li>{`TimeTable Week: ${currentWeekRange}`}</li>
      </div>
      <div className="tables">
        <table>
          <thead>
            <tr>
              <th>Day / Session</th>
              {sessions.map((session, idx) => (
                <th key={idx}>{mapDurationToReadable[session]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {daysOfWeek.map((day, idx) => (
              <tr key={idx}>
                <td>{day}</td>
                {sessions.map((session, index) => (
                  <td key={index}>{renderCellContent(day, session)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfTimetable;
