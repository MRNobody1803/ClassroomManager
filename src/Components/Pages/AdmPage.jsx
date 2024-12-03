import React from 'react';
import SideBar from '../SharedComponents/SideBar';
import HeaderAdm from '../SharedComponents/HeaderAdm';
import DashBoard from '../SharedComponents/DashBoard';
import './admPage.css';
import Users from '../SharedComponents/Users';
import { Routes, Route } from 'react-router-dom';
import { Fields } from '../SharedComponents/Fields';
import Room from '../SharedComponents/Room'

const AdmPage = () => {
  const buttonNames = [
    { label: 'DashBoard', path: '/dashboard' },
    { label: 'Users', path: '/users' },
    { label: 'Fields', path: '/fields' },
    { label: 'Reservations', path: '/room' },
  ];

  return (
    <div>
      <HeaderAdm />
      <main className="dashboards">
        <SideBar buttonNames={buttonNames} />
        <div className="content">
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/fields" element={<Fields />} />
            <Route path="/room" element={<Room />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdmPage ;
