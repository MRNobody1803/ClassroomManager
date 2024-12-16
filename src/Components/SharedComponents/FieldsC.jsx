import React, { useState } from 'react';
import './FieldsC.css';

const FieldsC = () => {
  // Simulated initial data for fields
  const initialFields = [
    { id: 1, name: 'Informatique', studentCount: 120, domain: 'Technologie', level: 'L3' },
    { id: 2, name: 'Mathématiques', studentCount: 80, domain: 'Sciences', level: 'L2' },
  ];

  const [fields, setFields] = useState(initialFields || []); // Ensure it's always an array
  const [currentField, setCurrentField] = useState({
    id: null,
    name: '',
    studentCount: '',
    domain: '',
    level: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  // Handle changes in form inputs
  const handleFieldInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentField((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Add or Edit a field
  const handleFieldSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newField = {
        ...currentField,
        id: fields.length > 0 ? fields[fields.length - 1].id + 1 : 1, // Generate a new ID
      };
      setFields([...fields, newField]);
    } else {
      setFields(
        fields.map((field) =>
          field.id === currentField.id ? currentField : field
        )
      );
    }
    closeModal();
  };

  // Delete a field
  const handleDeleteField = (fieldId) => {
    setFields(fields.filter((field) => field.id !== fieldId));
  };

  // Open the modal for adding or editing a field
  const openFieldModal = (mode, field = null) => {
    setModalMode(mode);
    setIsModalOpen(true);
    if (mode === 'edit' && field) {
      setCurrentField(field);
    } else {
      setCurrentField({
        id: null,
        name: '',
        studentCount: '',
        domain: '',
        level: ''
      });
    }
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentField({
      id: null,
      name: '',
      studentCount: '',
      domain: '',
      level: ''
    });
  };

  return (
    <div className="field-management-container">
      <h1>Gestion des Filières</h1>

      <button
        onClick={() => openFieldModal('add')}
        className="add-field-btn"
      >
        Ajouter une Filière
      </button>

      <div className="fields-list">
        {Array.isArray(fields) && fields.map((field) => (
          <div key={field.id} className="field-card">
            <div className="field-header">
              <h2>{field.name}</h2>
              <div className="field-actions">
                <button onClick={() => openFieldModal('edit', field)}>
                  Modifier
                </button>
                <button onClick={() => handleDeleteField(field.id)}>
                  Supprimer
                </button>
              </div>
            </div>
            <div className="field-details">
              <p>Effectif: {field.studentCount} étudiants</p>
              <p>Niveau: {field.level}</p>
              <p>Domaine: {field.domain}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {modalMode === 'add'
                ? 'Ajouter une Filière'
                : 'Modifier la Filière'}
            </h2>
            <form onSubmit={handleFieldSubmit}>
              <input
                type="text"
                name="name"
                value={currentField.name}
                onChange={handleFieldInputChange}
                placeholder="Nom de la Filière"
                required
              />
              <input
                type="number"
                name="studentCount"
                value={currentField.studentCount}
                onChange={handleFieldInputChange}
                placeholder="Nombre d'étudiants"
                required
              />
              <select
                name="level"
                value={currentField.level}
                onChange={handleFieldInputChange}
                required
              >
                <option value="">Sélectionner le Niveau</option>
                <option value="L1">1er Année CI</option>
                <option value="L2">2ème Année CI</option>
                <option value="L3">3ème Année CI</option>
              </select>
              <input
                type="text"
                name="domain"
                value={currentField.domain}
                onChange={handleFieldInputChange}
                placeholder="Domaine"
                required
              />
              <div className="modal-actions">
                <button type="submit">
                  {modalMode === 'add' ? 'Ajouter' : 'Modifier'}
                </button>
                <button type="button" onClick={closeModal}>
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldsC;
