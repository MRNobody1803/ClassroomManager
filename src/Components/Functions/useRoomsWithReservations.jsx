import { useState, useEffect } from "react";
import axios from "axios";

const useRoomsWithReservations = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRoomsAndReservations = async () => {
      try {
        // Récupérer toutes les salles
        const sallesResponse = await axios.get("http://localhost:8080/PROJET_JEE_REST_war_exploded/api/salles");
        const salles = sallesResponse.data;

        // Récupérer toutes les séances
        const seancesResponse = await axios.get("http://localhost:8080/PROJET_JEE_REST_war_exploded/api/seances");
        const seances = seancesResponse.data;

        // Transformer les données
        const structuredRooms = salles.map((salle) => {
          // Filtrer les séances pour cette salle
          const salleSeances = seances.filter((seance) => seance.salleId === salle.id);

          // Initialiser les réservations pour tous les jours et séances
          const daysOfWeek = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
          const sessions = [1, 2, 3, 4];

          const reservations = [];
          daysOfWeek.forEach((day) => {
            sessions.forEach((session) => {
              // Vérifier si une séance existe pour ce jour et cette session
              const correspondingSeance = salleSeances.find(
                (seance) =>
                  seance.jour === day &&
                  mapDurationToSession(seance.duree) === session
              );

              reservations.push({
                day,
                session,
                reserved: Boolean(correspondingSeance), // True si une séance existe
              });
            });
          });

          return {
            name: salle.nom,
            reservations,
          };
        });

        setRooms(structuredRooms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRoomsAndReservations();
  }, []);

  return rooms;
};

// Fonction utilitaire pour mapper la durée au numéro de session
const mapDurationToSession = (duree) => {
  const mapping = {
    EIGHT_THIRTY_TO_TEN_THIRTY: 1,
    TEN_THIRTY_TO_TWELVE_THIRTY: 2,
    TWO_THIRTY_TO_FOUR_THIRTY: 3,
    FOUR_THIRTY_TO_SIX_THIRTY: 4,
  };
  return mapping[duree];
};

export default useRoomsWithReservations;
