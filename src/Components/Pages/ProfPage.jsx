import React ,{useState} from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
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
import AddResevation from '../SharedComponents/AddResevation';
import ProfTimetable from '../SharedComponents/ProfTimetable';
import MyReserv from '../SharedComponents/MyReserv';

const ProfPage = () => {
    const { user } = useUser();
    
    const userName = user?.nom && user?.prenom ? `${user.nom} ${user.prenom}` : 'Utilisateur';

    const buttonNames = [
        { label: 'TimeTable', path: '/profPage/timetable' },
        { label: 'Add Reservation', path: '/profPage/addreservation' },
        { label: 'My reservations', path: '/profPage/reservations' },
    ]
  return (
    <div className="ProfPage">
        <div className="fieldscoordinator">
            <HeaderAdm />
            <main className="dashboards">
                <SideBar buttonNames={buttonNames} profile={userName} />
                <div className="content">
                 <Routes>
                    <Route path="timetable" element={<ProfTimetable user={user}/>} />
                    <Route path="addreservation" element={<AddResevation user={user} />} />
                    <Route path="reservations" element={<MyReserv user={user} />} />
                   {/* <Route path="room" element={<Room />} /> */}
                </Routes> 
                </div>
            </main>
        </div>
    </div>
  )
}

export default ProfPage ;