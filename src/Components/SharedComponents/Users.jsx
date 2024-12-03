import React, { useState } from 'react';
import './Users.css';
import { Link } from 'react-router-dom';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  // Fonction pour ouvrir le modal
  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  // Exemple de données pour le tableau
  const users = [
    { username: 'John Doe', apogee: '12345', email: 'johndoe@example.com', connectedAs: 'Admin' },
    { username: 'Jane Smith', apogee: '67890', email: 'janesmith@example.edu', connectedAs: 'Student' },
    { username: 'Alice Brown', apogee: '11223', email: 'alicebrown@example.edu', connectedAs: 'Teacher' },
  ];

  return (
    <div className="usermanager">
      <div className="nav">
        <ul>
          <li><a href="#" onClick={() => openModal('Add User')}>Add User</a></li>
          <li><a href="#" onClick={() => openModal('Modify User')}>Modify User</a></li>
          <li><a href="#">Delete User</a></li>
        </ul>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Apogee</th>
              <th>Educational Email</th>
              <th>Connected As</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.apogee}</td>
                <td>{user.email}</td>
                <td>{user.connectedAs}</td>
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
            <form action="">
            <input type="text" placeholder="Name" required />
            <input type="text" placeholder="LastName" required />
            <input type="text" placeholder="Apogee" required />
            <input type="email" placeholder="Educational Email" required  />
            <button onClick={closeModal}>Submit</button>
            <button onClick={closeModal}>Cancel</button>

            

            </form>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
