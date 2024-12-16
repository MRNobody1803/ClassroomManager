import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FieldsManagement.css';

const FieldsManagement = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [tabs, setTabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fields, setFields] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newField, setNewField] = useState({
    nom: '',
    nbrEtudiants: '',
    responsableId: '',
  });

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/PROJET_JEE_REST_war_exploded/api/filieres');
        if (response.data && Array.isArray(response.data)) {
          const fetchedTabs = response.data.map((field) => ({
            label: field.nom,
            stats: {
              students: field.nbrEtudiants,
              courses: field.coursesCount || 0,
              hours: field.totalHours || 0,
            },
            content: field.levels || [],
          }));
          setTabs(fetchedTabs);
        } else {
          setError('No data available.');
        }
      } catch (err) {
        console.error('Error fetching tabs:', err);
        setError('Failed to fetch tabs');
      } finally {
        setLoading(false);
      }
    };

    fetchTabs();
  }, []);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        // Fetch fields data
        const response = await axios.get('http://localhost:8080/PROJET_JEE_REST_war_exploded/api/filieres');
        
        if (response.data && Array.isArray(response.data)) {
          setFields(response.data);  // Set the fields data

          // Now fetch the coordinator for each field
          const updatedFields = await Promise.all(response.data.map(async (field) => {
            try {
              // Fetch the coordinator for each field
              const MgField = await axios.get(`http://localhost:8080/PROJET_JEE_REST_war_exploded/api/utilisateurs/${field.responsableId}`);
              field.fieldManager = MgField.data ? `${MgField.data.nom} ${MgField.data.prenom}` : 'Not Available';  // Set the coordinator name
              return field;  // Return updated field with coordinator data
            } catch (err) {
              console.error('Error fetching coordinator:', err);
              field.fieldManager = 'Not Available';  // Fallback if coordinator fetch fails
              return field;
            }
          }));
          
          setFields(updatedFields);  // Update the fields state with the coordinator data
        } else {
          setError('No fields data available.');
        }
        
        setLoading(false);  // Set loading to false when done
      } catch (err) {
        console.error('Error fetching fields:', err);
        setError('Failed to fetch fields');
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewField((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Optimistically update the UI (without waiting for the backend)
    const optimisticField = { 
      ...newField,
      fieldManager: 'Loading...', // Optimistic placeholder
    };
    setFields((prevFields) => [...prevFields, optimisticField]);

    // Step 2: Send the API request to create the new field
    try {
      const response = await axios.post('http://localhost:8080/PROJET_JEE_REST_war_exploded/api/filieres', newField);
      const addedField = response.data;

      // Step 3: Fetch the field manager (coordinator) for the newly created field
      const MgField = await axios.get(`http://localhost:8080/PROJET_JEE_REST_war_exploded/api/utilisateurs/${addedField.responsableId}`);
      const fieldManager = MgField.data ? `${MgField.data.nom} ${MgField.data.prenom}` : 'Not Available';

      // Step 4: Update the fieldManager for the newly added field
      setFields((prevFields) => prevFields.map((field) => 
        field.nom === addedField.nom ? { ...field, fieldManager } : field
      ));

      // Update the tabs as well if needed
      setTabs((prevTabs) => [
        ...prevTabs,
        {
          label: addedField.nom,
          stats: {
            students: addedField.nbrEtudiants,
            courses: addedField.coursesCount || 0,
            hours: addedField.totalHours || 0,
          },
          content: addedField.levels || [],
        },
      ]);

      // Reset the form
      setNewField({ nom: '', nbrEtudiants: '', responsableId: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error adding field:', err);
      // Handle error (optionally show an error message)
    }
  };

  const handleDeleteField = async (fieldId) => {
    try {
      await axios.delete(`http://localhost:8080/PROJET_JEE_REST_war_exploded/api/filieres/${fieldId}`);
      setFields(fields.filter((field) => field.id !== fieldId)); // Remove the deleted field
      setTabs(tabs.filter((tab) => tab.label !== fieldId)); // Remove the deleted tab
    } catch (err) {
      console.error('Error deleting field:', err);
    }
  };

  if (loading) {
    return <div>Loading fields...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const currentTab = tabs.find((tab) => tab.label === activeTab);

  return (
    <div className="fields-management">
      <div className="nav">
        <ul>
          <li
            className={activeTab === 'Home' ? 'active' : ''}
            onClick={() => setActiveTab('Home')}
          >
            Home
          </li>
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

      {activeTab === 'Home' ? (
        <div className="fields">
          <div className="table">
            <button className="add-button" onClick={() => setShowForm(true)}>Add Field</button>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Enrollment</th>
                  <th>Field Manager</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={index}>
                    <td>{field.nom}</td>
                    <td>{field.nbrEtudiants}</td>
                    <td>{field.fieldManager}</td>
                    <td>
                      <button onClick={() => handleDeleteField(field.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Field Modal */}
          {showForm && (
            <div className="modal-overlay">
              <div className="modal">
                <h2>Add New Field</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="nom"
                    value={newField.nom}
                    onChange={handleInputChange}
                    placeholder="Field Name"
                    required
                  />
                  <input
                    type="number"
                    name="nbrEtudiants"
                    value={newField.nbrEtudiants}
                    onChange={handleInputChange}
                    placeholder="Number of Students"
                    required
                  />
                  <input
                    type="text"
                    name="responsableId"
                    value={newField.responsableId}
                    onChange={handleInputChange}
                    placeholder="Coordinator ID"
                    required
                  />
                  <button type="submit">Submit</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="tab-content">
          <div className="stats">
            <h2>Statistiques pour {activeTab}</h2>
            <p>Nombre d'étudiants : {currentTab?.stats.students}</p>
            <p>Nombre de cours : {currentTab?.stats.courses}</p>
            <p>Heures totales : {currentTab?.stats.hours}</p>
          </div>

          {currentTab?.content.map((level, index) => (
            <div key={index} className="level-section">
              <h3>Niveau : {level.level}</h3>
              <table>
                <thead>
                  <tr>
                    <th>Matière</th>
                    <th>Cours</th>
                    <th>TD</th>
                    <th>TP</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {level.subjects.map((subject, idx) => (
                    <tr key={idx}>
                      <td>{subject.name}</td>
                      <td>{subject.cours}</td>
                      <td>{subject.td}</td>
                      <td>{subject.tp}</td>
                      <td>{subject.cours + subject.td + subject.tp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FieldsManagement;
