import React from 'react';
import './Fields.css';

export const Fields = () => {
  const fields = [
    { name: 'Génie informatique', desc: '...', fieldManager: 'Hamid AKSASS' }
  ];

  return (
    <div className="fields">
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Description</th>
              <th>Field Manager</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={index}>
                <td>{field.name}</td>
                <td>{field.desc}</td>
                <td>{field.fieldManager}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Fields;
