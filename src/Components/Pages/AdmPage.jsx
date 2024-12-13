import React ,{useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import SideBar from '../SharedComponents/SideBar';
import HeaderAdm from '../SharedComponents/HeaderAdm';
import DashBoard from '../SharedComponents/DashBoard';
import './admPage.css';
import Users from '../SharedComponents/Users';
import { Fields } from '../SharedComponents/Fields';
import Room from '../SharedComponents/Room';
import { useLocation } from 'react-router-dom';
import { useUser } from '../SharedComponents/UserContext';
import FieldsManagement from '../SharedComponents/FieldsManagement';


const AdmPage = () => {
  const { user } = useUser();

  // Fallback if user is null
  const userName = user?.nom && user?.prenom 
    ? `${user.nom} ${user.prenom}` 
    : 'Utilisateur';

  // Vérifier si le nom et prénom existent avant de les afficher
  const buttonNames = [
    { label: 'DashBoard', path: '/admPage/dashboard' },
    { label: 'Users', path: '/admPage/users' },
    { label: 'Fields', path: '/admPage/fields' },
    { label: 'Reservations', path: '/admPage/room' },
  ];

  return (
    <div>
      <HeaderAdm />
      <main className="dashboards">
        <SideBar buttonNames={buttonNames} profile={userName} />
        <div className="content">
          <Routes>
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="users" element={<Users />} />
            <Route path="fields" element={<FieldsManagement />} />
            <Route path="room" element={<Room />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdmPage;
