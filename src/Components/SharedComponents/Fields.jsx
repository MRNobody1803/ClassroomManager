import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Fields.css';

export const Fields = () => {
  const [fields, setFields] = useState([]);       // To store the list of fields
  const [coordinator, setCoordinator] = useState([]);  // To store the coordinator for each field
  const [loading, setLoading] = useState(true);   // Loading state
  const [error, setError] = useState(null);       // Error state

  useEffect(() => {
    const fetchFields = async () => {
      try {
        // Fetch fields data
        const response = await axios.get('http://localhost:8080/Back-end-1.0-SNAPSHOT/api/filieres');
        
        if (response.data && Array.isArray(response.data)) {
          setFields(response.data);  // Set the fields data

          // Now fetch the coordinator for each field
          const updatedFields = await Promise.all(response.data.map(async (field) => {
            try {
              // Fetch the coordinator for each field
              const MgField = await axios.get(`http://localhost:8080/Back-end-1.0-SNAPSHOT/api/utilisateurs/${field.responsableId}`);
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
  }, []);  // Empty dependency array means this runs only once when the component is mounted

  // Render loading state
  if (loading) {
    return <div>Loading fields...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="fields">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Enrollment</th>
              <th>Field Manager</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={index}>
                <td>{field.nom}</td> {/* Field name */}
                <td>{field.nbrEtudiants}</td> {/* Number of students */}
                <td>{field.fieldManager}</td> {/* Field manager */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fields;
