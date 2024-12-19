import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FieldMg.css';

const FieldMg = ({ user }) => {
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState({ name: '', charge_horaire: 0 });
  const [stats, setStats] = useState({ students: 0, courses: 0, hours: 0 });

  // Fonction pour récupérer l'ID de la filière du responsable
  const getFiliereIdByResponsable = async (responsableId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/PROJET_JEE-REST-1.0-SNAPSHOT/api/filieres/by-responsable/${responsableId}`
      );
      return response.data[0].id; // Supposons qu'il y ait au moins une filière
    } catch (error) {
      console.error('Error fetching filiere ID:', error);
      throw error;
    }
  };

  // Fonction pour récupérer les modules depuis l'API
  const getModules = async () => {
    try {
      const filiereId = await getFiliereIdByResponsable(user.id);

      const response = await axios.get(
        `http://localhost:8080/PROJET_JEE-REST-1.0-SNAPSHOT/api/matieres/filiere/${filiereId}`
      );

      const modulesData = response.data;

      // Calcul des statistiques
      const totalHours = modulesData.reduce((sum, module) => sum + module.charge_horaire, 0);
      const coursesCount = modulesData.length;

      // Simuler le nombre d'étudiants (modifiable selon vos données réelles)
      const studentsCount = 120;

      setModules(modulesData);
      setStats({ students: studentsCount, courses: coursesCount, hours: totalHours });
    } catch (error) {
      console.error('Error fetching modules:', error);
    }
  };

  // Fonction pour ajouter un module à la base de données
  const handleAddModule = async () => {
    try {
      if (!newModule.name || newModule.charge_horaire <= 0) {
        alert('Please provide valid module details.');
        return;
      }

      const filiereId = await getFiliereIdByResponsable(user.id);

      const response = await axios.post(
        'http://localhost:8080/PROJET_JEE-REST-1.0-SNAPSHOT/api/matieres',
        {
          name: newModule.name,
          charge_horaire: newModule.charge_horaire,
          filiereId,
        }
      );

      setModules([...modules, response.data]);
      setNewModule({ name: '', charge_horaire: 0 });
      alert('Module added successfully!');
    } catch (error) {
      console.error('Error adding module:', error);
      alert('Failed to add module. Please try again.');
    }
  };

  // Fonction pour supprimer un module de la base de données
  const handleDeleteModule = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/PROJET_JEE-REST-1.0-SNAPSHOT/api/matieres/${id}`);
      setModules(modules.filter((module) => module.id !== id));
      alert('Module deleted successfully!');
    } catch (error) {
      console.error('Error deleting module:', error);
      alert('Failed to delete module. Please try again.');
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <div className="field-mg">
      <div className="stats">
        <h2>Statistics of Field :</h2>
        <p>Number of Students: {stats.students}</p>
        <p>Number of Courses: {stats.courses}</p>
        <p>Total Hours: {stats.hours}</p>
      </div>

      <div className="level-section">
        <h3>Field's Subjects</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Total Hours</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module.id}>
                <td>{module.name}</td>
                <td>{module.charge_horaire}</td>
                <td>
                  <button
                    onClick={() => handleDeleteModule(module.id)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="add-module">
        <h3>Add a Subject</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddModule();
          }}
        >
          <input
            type="text"
            placeholder="Module name"
            value={newModule.name}
            onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Total Hours"
            value={newModule.charge_horaire}
            onChange={(e) => setNewModule({ ...newModule, charge_horaire: parseInt(e.target.value) || 0 })}
            required
          />
          <button type="submit" className="add-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default FieldMg;
