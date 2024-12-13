import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Users.css';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [codeProfesseur, setCodeProfesseur] = useState('');
  const [typeUser, setTypeUser] = useState('prof');  // Default type to 'prof'
  const [selectedUsers, setSelectedUsers] = useState([]); 
  // const [admin , setAdmin] = useState(1);
  // Handle submit for adding a new user
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      nom,
      prenom,
      email,
      password,
      codeProfesseur,     // Ce champ peut avoir une valeur
      typeUser,           // Ce champ peut avoir une valeur
      codeEtudiant: null, // Valeur explicite 'null' pour codeEtudiant
      adminId: null,      // Valeur explicite 'null' pour adminId
    };

    try {
      const response = await axios.post('http://localhost:8080/Back-end-1.0-SNAPSHOT/api/utilisateurs', newUser);
      
      // Si l'utilisateur a été créé, on l'ajoute à la liste des utilisateurs
      if (response.data.id) {
        setUsers([...users, response.data]);
        closeModal();
      }
    } catch (error) {
      // Log détaillé de l'erreur
      if (error.response) {
        // L'API a renvoyé une réponse d'erreur (400, 500, etc.)
        console.error('Erreur lors de la création de l\'utilisateur:', error.response.data);
        setError(error.response.data.message || 'Erreur lors de la création de l\'utilisateur');
      } else if (error.request) {
        // La requête a été envoyée mais aucune réponse n'a été reçue
        console.error('Erreur de requête:', error.request);
        setError('Aucune réponse du serveur');
      } else {
        // Erreur dans la configuration de la requête
        console.error('Erreur:', error.message);
        setError('Erreur inconnue');
      }
    }
};




  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Back-end-1.0-SNAPSHOT/api/utilisateurs');
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array means this runs once on component mount


  const handleSelectUser = (userId) => {
    if (selectedUsers.includes(userId)) {
      // Si l'utilisateur est déjà sélectionné, on le retire de la liste
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      // Sinon, on l'ajoute à la liste
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  // Fonction pour supprimer les utilisateurs sélectionnés
  const handleDeleteSelected = async () => {
    if (window.confirm('Are you sure you want to delete selected users?')) {
      try {
        // Effectuer la suppression de chaque utilisateur sélectionné
        for (let userId of selectedUsers) {
          const response = await axios.delete(`http://localhost:8080/Back-end-1.0-SNAPSHOT/api/utilisateurs/${userId}`);
          
          // Si la suppression a réussi, on met à jour la liste des utilisateurs
          if (response.status === 200) {
            setUsers(users.filter(user => user.id !== userId));
          }
        }
        setSelectedUsers([]); // Réinitialiser la sélection après la suppression
      } catch (error) {
        console.error('Erreur lors de la suppression des utilisateurs:', error);
        setError('Erreur lors de la suppression des utilisateurs');
      }
    }
  };

  const handleModifySelected = async () => {
    
  };

  // Fonction pour ouvrir le modal
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
    // Reset form values when closing the modal
    setNom('');
    setPrenom('');
    setEmail('');
    setPassword('');
    setCodeProfesseur('');
    setTypeUser('prof'); // Reset typeUser to default
  };

  // Render loading state
  if (loading) {
    return <div>Loading users...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="usermanager">
      <div className="nav">
        <ul>
          <li><a href="#" onClick={() => openModal('Add User')}>Add User</a></li>
          <li><a href="#" onClick={() => openModal('Modify User')}>Modify User</a></li>
          <li><a href="#" onClick={handleDeleteSelected}>Delete User</a></li>
        </ul>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
            <th><input type="checkbox" onChange={(e) => {
                // Sélectionner/Désélectionner tous les utilisateurs
                if (e.target.checked) {
                  setSelectedUsers(users.map(user => user.id)); // Sélectionner tous
                } else {
                  setSelectedUsers([]); // Désélectionner tous
                }
              }} />
              </th>
              <th>Username</th>
              <th>Apogee</th>
              <th>Educational Email</th>
              <th>Connected As</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)} // Sélectionner/Désélectionner un utilisateur spécifique
                  />
                </td>
                <td>{user.nom} {user.prenom}</td>
                <td>{user.codeProfesseur}</td>
                <td>{user.email}</td>
                <td>{user.typeUser}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{modalContent}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name"
                value={nom}
                required
                onChange={(e) => setNom(e.target.value)}
              />
              <input
                type="text"
                placeholder="LastName"
                value={prenom}
                required
                onChange={(e) => setPrenom(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apogee"
                value={codeProfesseur}
                required
                onChange={(e) => setCodeProfesseur(e.target.value)}
              />
              <input
                type="email"
                placeholder="Educational Email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                value={typeUser}
                onChange={(e) => setTypeUser(e.target.value)}
                required
              >
                <option value="ADMINISTRATOR">ADMINISTRATOR</option>
                <option value="PROFESSOR">PROFESSOR</option>
                <option value="CLASSROOM_RESPONSABLE">CLASSROOM_RESPONSABLE</option>
                <option value="FIELD_RESPONSABLE">FIELD_RESPONSABLE</option>
              </select>
              <button type="submit">Submit</button>
              <button type="button" onClick={closeModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
