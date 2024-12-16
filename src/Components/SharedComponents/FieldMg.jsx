import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FieldMg.css';

const FieldMg = ({user}) => {
  const [modules, setModules] = useState([]);
  const [newModule, setNewModule] = useState({ name: '', cours: 0, td: 0, tp: 0 });
  const [stats, setStats] = useState({ students: 0, courses: 0, hours: 0 });

  useEffect(() => {
    // Simulate fetching data (replace with API call)
    setModules([
      { name: 'Mathématiques', cours: 30, td: 15, tp: 10 },
      { name: 'Physique', cours: 20, td: 10, tp: 5 },
    ]);
    setStats({ students: 120, courses: 10, hours: 400 });
  }, []);

  const handleAddModule = () => {
    setModules([...modules, newModule]);
    setNewModule({ name: '', cours: 0, td: 0, tp: 0 });
  };

  const handleDeleteModule = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  return (
    <div className="field-mg">
      <div className="stats">
        <h2>Statistics of Field :</h2>
        <p>Number of Student : {stats.students}</p>
        <p>Number of courses : {stats.courses}</p>
        <p>Total of hours : {stats.hours}</p>
      </div>

      <div className="level-section">
        <h3>Field's Subjects</h3>
        <table>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Course</th>
              <th>TD</th>
              <th>TP</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module, index) => (
              <tr key={index}>
                <td>{module.name}</td>
                <td>{module.cours}</td>
                <td>{module.td}</td>
                <td>{module.tp}</td>
                <td>{module.cours + module.td + module.tp}</td>
                <td>
                  <button onClick={() => handleDeleteModule(index)} className="delete-button">
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
            placeholder="module name"
            value={newModule.name}
            onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Session"
            value={newModule.cours}
            onChange={(e) => setNewModule({ ...newModule, cours: parseInt(e.target.value) || 0 })}
            required
          />
          <input
            type="number"
            placeholder="TD"
            value={newModule.td}
            onChange={(e) => setNewModule({ ...newModule, td: parseInt(e.target.value) || 0 })}
            required
          />
          <input
            type="number"
            placeholder="TP"
            value={newModule.tp}
            onChange={(e) => setNewModule({ ...newModule, tp: parseInt(e.target.value) || 0 })}
            required
          />
          <button type="submit" className="add-button">Add</button>
        </form>
      </div>
    </div>
  );
};

export default FieldMg;
