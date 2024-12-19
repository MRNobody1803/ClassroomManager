import React, { useState , useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

import "./GenerateTimetable.css";
import getMatiereIdByName from './../Functions/getMatiereByName'
import getRoomId from './../Functions/getRoomId'
import getProfessorsFromDatabase from "../Functions/getProfessorFromDatbase";

const GenerateTimetable = ({ user }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = ["08:30 - 10:30", "10:30 - 12:30", "14:30 - 16:30", "16:30 - 18:30"];
  const [rooms, setRooms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [professors , setProfessor] = useState([]);
  const [timetable, setTimetable] = useState(
    Array(days.length).fill().map(() => 
      Array(timeSlots.length).fill({ course: "", room: "", type: "", prof: "" })
    )
  );
  const getFiliereIdByResponsable = async (responsableId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/PROJET_JEE_REST_war_exploded/api/filieres/by-responsable/${responsableId}`
      );
      // L'API retourne un tableau, prenez le premier élément et récupérez l'ID
      const filiere = response.data[0]; 
      if (!filiere) {
        throw new Error("No filiere found for the given responsableId.");
      }
      console.log("Filiere ID:", filiere.id);
      return filiere.id; 
    } catch (error) {
      console.error("Error fetching filiereId:", error);
      throw error;
    }
  };
  
  const getRoomsFromDatabase = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/PROJET_JEE-REST-1.0-SNAPSHOT/api/salles"
      );
      return response.data; 
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  };
  const getCoursesFromDatabase = async (filiereId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/PROJET_JEE-REST-1.0-SNAPSHOT/api/matieres/filiere/${filiereId}`
      );
      return response.data; // Les matières de la filière
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) {
        console.error("User ID is undefined.");
        return;
      }
      try {
        const filiereId = await getFiliereIdByResponsable(user.id);
        if (!filiereId) {
          throw new Error("Filiere ID is undefined or invalid.");
        }
        const [roomsFromDb, coursesFromDb, professorsFromDb ] = await Promise.all([
          getRoomsFromDatabase(),
          getCoursesFromDatabase(filiereId),
          getProfessorsFromDatabase()
        ]);
        setRooms(roomsFromDb);
        setCourses(coursesFromDb);
        setProfessor(professorsFromDb)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  
  // Fonction pour récupérer les matières de la filière

  

  const handleUpdate = (dayIndex, slotIndex, field, value) => {
    const updatedTimetable = timetable.map((day, dIndex) =>
      dIndex === dayIndex
        ? day.map((slot, sIndex) =>
            sIndex === slotIndex ? { ...slot, [field]: value } : slot
          )
        : day
    );
    setTimetable(updatedTimetable);
  };

  const handleSaveTimetable = async () => {
    try {
      const filiereId = await getFiliereIdByResponsable(user.id); // Récupération de l'ID de la filière
      const sessions = []; // Liste des sessions à envoyer
  
      timetable.forEach((day, dayIndex) => {
        day.forEach((slot, slotIndex) => {
          if (slot.course && slot.room && slot.type) {
            sessions.push({
              matierId: slot.course, // Utiliser l'ID de la matière sélectionnée
              typeSeance: slot.type, // Type de séance
              duree: mapTimeSlotToDuration(timeSlots[slotIndex]), // Durée de la séance
              status: "PLANIFIE", // Statut
              salleId: slot.room, // Utiliser l'ID de la salle sélectionnée
              filiereId: filiereId, 
              responsableId: slot.prof ,
              jour: mapDayToCode(days[dayIndex]), // Jour (en code)
            });
          }
        });
      });
  
      console.log("Sessions to send:", sessions); // DEBUG : Vérifiez les données des sessions
  
      const responses = await Promise.all(
        sessions.map((session) =>
          axios.post(
            "http://localhost:8080/PROJET_JEE_REST_war_exploded/api/seances",
            session
          )
        )
      );
  
      console.log("API responses:", responses); // DEBUG
      alert("Timetable saved successfully!");
    } catch (error) {
      console.error("Error saving timetable:", error);
      alert("Failed to save timetable. Please try again.");
    }
  };
  
  
  
  
 



  const mapDayToCode = (day) => {
    const dayMapping = {
      Monday: "MON",
      Tuesday: "TUE",
      Wednesday: "WED",
      Thursday: "THU",
      Friday: "FRI",
      Saturday: "SAT",
    };
    return dayMapping[day];
  };

  const mapTimeSlotToDuration = (timeSlot) => {
    const durationMapping = {
      "08:30 - 10:30": "EIGHT_THIRTY_TO_TEN_THIRTY",
      "10:30 - 12:30": "TEN_THIRTY_TO_TWELVE_THIRTY",
      "14:30 - 16:30": "TWO_THIRTY_TO_FOUR_THIRTY",
      "16:30 - 18:30": "FOUR_THIRTY_TO_SIX_THIRTY",
    };
    return durationMapping[timeSlot];
  };

  return (
    <div className="timetable-container">
      <h2>Timetable Management , {user.id}</h2>
      <table className="timetable">
        <thead>
          <tr>
            <th>Day</th>
            {timeSlots.map((slot, index) => (
              <th key={index}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day, dayIndex) => (
            <tr key={dayIndex}>
              <td>{day}</td>
              {timeSlots.map((_, slotIndex) => (
                <td key={slotIndex}>
                   <select
                    value={timetable[dayIndex][slotIndex].course}
                    onChange={(e) =>
                      handleUpdate(dayIndex, slotIndex, "course", e.target.value)
                    }
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={timetable[dayIndex][slotIndex].type}
                    onChange={(e) =>
                      handleUpdate(dayIndex, slotIndex, "type", e.target.value)
                    }
                  >
                    <option value="">Select type</option>
                    <option value="COURS">COURS</option>
                    <option value="TD">TD</option>
                    <option value="TP">TP</option>
                  </select>
                  <select
                      value={timetable[dayIndex][slotIndex].room}
                      onChange={(e) =>
                        handleUpdate(dayIndex, slotIndex, "room", e.target.value)
                      }>
                      <option value="">Select a room</option>
                      {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.nom}
                        </option>
                      ))}
                    </select>
                    <select
                      value={timetable[dayIndex][slotIndex].prof}
                      onChange={(e) =>
                        handleUpdate(dayIndex, slotIndex, "prof", e.target.value)
                      }
                    >
                      <option value="">Select a Prof</option>
                      {professors.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.nom + " " + prof.prenom}
                        </option>
                      ))}
                    </select>

                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button className="save-button" onClick={handleSaveTimetable}>
          Save Timetable
        </button>
        <Link to="/fieldcoordinatorPage/fieldtimetable" className="save-button">
        View Timetable
      </Link>
      </div>
    </div>
  );
};

export default GenerateTimetable;
